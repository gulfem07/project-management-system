import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../state/project.repository';
import { ProjectService } from '../state/project.service';
import { ProjectStatus } from '../project-add-component/project-add-component.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-edit-component',
  templateUrl: './project-edit-component.component.html',
  styleUrls: ['./project-edit-component.component.scss'],
})
export class ProjectEditComponentComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  productID!: number;
  status: ProjectStatus[] = [
    { type: 'Not Started', text: 'Başlanmadı' },
    { type: 'In Progress', text: 'Devam Ediliyor' },
    { type: 'Completed', text: 'Tamamlandı' },
  ];
  form = new FormGroup({
    project: new FormGroup({
      name: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      startDate: new FormControl(new Date(), Validators.required),
      endDate: new FormControl(new Date(), Validators.required),
      status: new FormControl<ProjectStatus | null>(null, Validators.required),
    }),
  });

  project!: Project[];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.route.params.subscribe(
      (params: any) => (this.productID = params['id'])
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = this.projectService
      .getProjectWithID(this.productID)
      .subscribe((value) => {
        this.project = value as unknown as Project[];
        console.log(this.project);

        if (this.project) {
          this.form.get('project.name')?.patchValue(this.project[0].name);
          this.form
            .get('project.desc')
            ?.patchValue(this.project[0].description);
          this.form
            .get('project.startDate')
            ?.setValue(this.project[0].startDate);
          this.form.get('project.endDate')?.setValue(this.project[0].endDate);
          this.form
            .get('project.status')
            ?.setValue(this.project[0].status as unknown as ProjectStatus);
        }
      });
  }
  onSubmit() {
    const addedProject = {
      id: this.project[0].id,
      name: this.form.value.project?.name,
      description: this.form.value.project?.desc,
      startDate: this.form.value.project?.startDate,
      endDate: this.form.value.project?.endDate,
      status: this.form.value.project?.status
        ? this.form.value.project?.status
        : 'Not Started',
      tasks: this.project[0].tasks,
    } as Project;
    this.projectService.updateProject(addedProject, this.productID);
    this.router.navigate(['/projects']);
  }
}
