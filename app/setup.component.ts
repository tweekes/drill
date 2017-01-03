import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
@Component({
  selector: 'setup',
  template: `
      <button (click)="update()">Update</button>
    `,
})
export class SetupComponent {
  constructor(private catalogService: CatalogService) {
    
  }

  update() : void {
    this.catalogService.updateCatalogList();
  }

}
