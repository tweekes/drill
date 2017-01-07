import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
@Component({
  selector: 'my-app',
  template: `
  <div id="main">
    <a routerLink="/setup">Setup</a>
    <a routerLink="/catalog">Catalog</a>
    <router-outlet> </router-outlet>
  </div>
    `,
  styles: [`

  `]
})
export class AppComponent {
  name = 'Drill';
}
