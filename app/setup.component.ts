import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
@Component({
  selector: 'setup',
  template: `
      <button (click)="update()">Update</button>
      <p>width: {{width}}</p>
      <p>height: {{height}}</p>
      <p>Awidth: {{aWidth}}</p>
      <p>Aheight: {{aHeight}}</p>

    `,
})
export class SetupComponent {
  width : number = screen.width;
  height : number = screen.height;
  aHeight : number = screen.availHeight;
  aWidth : number = screen.availWidth;

  constructor(private catalogService: CatalogService) {

  }

  update() : void {
    this.catalogService.updateCatalogList();
  }

}
