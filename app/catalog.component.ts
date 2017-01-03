import { Component, OnInit} from '@angular/core';
import { CatalogService } from './catalog.service';
import { Catalog } from './vo/catalog';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'catalog',
  template: `
  <h1>Catalog</h1>
  <div *ngIf="eMsg">{{eMsg}}</div>
  <ul class="playlists">
    <li *ngFor="let pl of catalog?.playLists" (tap)="gotoPlayList(pl.id)">
      <span class="title">{{pl.title}}</span>
    </li>
  <ul>

<!--
  <ul class="heroes">
      <li *ngFor=" let hero of heroes"
          (click)="onSelect(hero)"
          [class.selected]="hero === selectedHero">
        <span class="badge">{{hero.id}}</span>
        <span>{{hero.name}}</span>
        <button class="delete"
                (click)="delete(hero); $event.stopPropagation()">x</button>
      </li>
  </ul>
-->
  `,
  styleUrls: ['catalog.component.css']


})
export class CatalogComponent implements OnInit {
  catalog: Catalog;
  eMsg:string;


  constructor(private catalogService: CatalogService, private router: Router) { }

  ngOnInit(): void {
    this.catalogService.getCatalog(999)
      .then(catalog => this.catalog = catalog )
      .catch(err => {
        this.eMsg = err;
        console.log(err);
      });
  }

  gotoPlayList(id:number) : void {
    this.router.navigate(['/play', id]);
  }

}
