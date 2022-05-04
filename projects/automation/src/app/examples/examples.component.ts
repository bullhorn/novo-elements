import { CompHostDirective } from './../directives/host.directive';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EXAMPLE_COMPONENTS } from 'novo-examples';

@Component({
  selector: 'app-automation-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css']
})
export class AutomationExamplesComponent implements OnInit {

  @ViewChild(CompHostDirective, {static: true}) compHost!: CompHostDirective;

  showList = false;

  exampleList: string[] = [];

  constructor(private route: ActivatedRoute) { 
    this.exampleList = Object.keys(EXAMPLE_COMPONENTS);
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params: Params )=> {
        params.componentName ? this.loadComponent(params.componentName) : this.clearRef();
      }
    );
  }

  clearRef(): void {
    this.compHost.viewContainerRef.clear();
    this.showList = true
  }

  loadComponent(componentName: string): void {
    const viewContainerRef = this.compHost.viewContainerRef;
    viewContainerRef.clear();
    const component = EXAMPLE_COMPONENTS[componentName]?.component;
    if (component) {
      this.showList = false;
      viewContainerRef.createComponent<any>(component);
    } else {
      this.showList = true;
      alert('Invalid component name!');
    }
  }
}

