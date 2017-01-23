
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { CatalogService} from './catalog.service';
import { PlayList, PlayItem } from './vo/play-list';
import * as _ from 'lodash';


@Component({
  moduleId: module.id,
  selector: 'play-preference',
  template: `
   
  <div class="container-endless">
    <div class="title">{{playList.title}}</div>    
    <div *ngFor="let item of playList?.items ; let i = index" class="lspace-cell">
        <div class="pitem">        
          <div class="text">{{item.title}}</div>
          <div class="twcheckbox" [ngClass]="applySelectedClass(i)" (tap)="select(i)"> </div>
        </div>
    </div> 
    <div class="clear"></div>
    <div class="bbutton btitle" (tap)="gotoPlayList()">Start </div>   
  <div>
  
  `,
  styleUrls: ['play-preference.component.css']
})
export class PlayPreferenceComponent implements OnInit, OnDestroy {
  playList : PlayList;

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}


  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    let audioDetails = this.catalogService.getPlayListAndAudioDetails(id);
    this.playList = audioDetails.playList;   
  }

  ngOnDestroy() { 

  }


  applySelectedClass(i : number) : string {
      return (this.playList.items[i].selected) ? "tw-selected" : "tw-not-selected";
  } 


  select(i : number) : void {
    this.playList.items[i].selected = !this.playList.items[i].selected;
  };

  gotoPlayList() : void {  
    let selectedItems : string = "";
    let i = 0;
    _.each(this.playList.items, (pitem) => {
        if (pitem.selected) {
          selectedItems+="" + i + "~";
        }
        i++;
    });
    this.router.navigate(['/play', this.playList.id, { selected: selectedItems }]);
  }

}