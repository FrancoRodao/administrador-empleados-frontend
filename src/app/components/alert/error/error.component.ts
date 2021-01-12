import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-alert-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorAlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
