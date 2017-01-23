import { Component, OnInit} from '@angular/core';
import { CatalogService } from './catalog.service';
import { Catalog } from './vo/catalog';
import { PlayList } from './vo/play-list';
import { Router } from '@angular/router';
import * as _ from "lodash"; 

@Component({
  moduleId: module.id,
  selector: 'catalog',
  template: `
    <div *ngIf="eMsg">{{eMsg}}</div>
  
    <div class="twlist">
      <div *ngFor="let row of playListsInRows" class="row">
        <div *ngIf="row[0]" class="item left">
          <div class="text" (tap)="gotoPlayList(row[0].id)">{{row[0].title}}</div>
          <div class="twbutton" (tap)="gotoPlayListPreference(row[0].id)"> </div>
        </div> 
        <div *ngIf="row[1]" class="item right" >
          <div class="text" (tap)="gotoPlayList(row[1].id)" >{{row[1].title}}</div>
          <div class="twbutton" (tap)="gotoPlayListPreference(row[1].id)"> </div>
        </div>  
      </div>
    </div>
  `,

  styleUrls: ['catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalog: Catalog;
  playListsInRows: PlayList[][];
  eMsg:string;


  constructor(private catalogService: CatalogService, private router: Router) { }

  ngOnInit(): void {
    this.catalogService.getCatalog(999)
      .then(catalog => {
       this.playListsInRows = _.chunk(catalog.playLists,2)
      })
      .catch(err => {
        this.eMsg = err;
        console.log(err);
      });
  }

  gotoPlayList(id:number) : void {
    this.router.navigate(['/play', id]);
  }

  gotoPlayListPreference(id:number) : void {
    this.router.navigate(['/play-preference', id]);
  }

}
