import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  
  constructor(private _router: Router) { 
  }
  
  ngOnInit(): void {
    this._router.navigate(["/projects/projects"])
  }
}
