import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';


@Component({
  selector: 'setup',
  template: `
    <div class="container">
        <div class="bbutton btitle" (tap)="update()">Update </div>
    </div>

    `
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
