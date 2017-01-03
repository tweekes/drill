import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
@Component({
  selector: 'my-app',
  template: `
    <a routerLink="/setup">Setup</a>
    <a routerLink="/catalog">Catalog</a>
    `,
})
export class AppComponent {
  name = 'Drill';
}
