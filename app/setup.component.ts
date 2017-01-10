import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';


@Component({
  selector: 'setup',
  template: `
      <div>
        <button (click)="update()">Update</button>
      </div>
      
      <!--
      <div>
        <button (click)="hbStart()">Start Heartbeat</button>
      </div>
      <div>
        <button (click)="hbStop()">stop Heartbeat</button>
      </div>
      -->

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
