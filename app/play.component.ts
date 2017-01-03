import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { CatalogService} from './catalog.service';
import { PlayList, PlayItem } from './vo/play-list';
import 'rxjs/add/operator/switchMap';
import * as _ from "underscore";

@Component({
  selector: 'play',
  template: `
    <h1>Play</h1>
    <p>Play list title: {{playList.title}}</p>
    <p>Current item: {{playItems[currentPlayItem].title}} </p>
    <p>action: {{action}}</p>
    <div>
    <button (click)="play()">Play</button>
    </div>
    <div>
    <button (click)="answer()">Answer</button>
    </div>
    <div>
    <button (click)="next()">Next</button>
    </div>
  `,

})
export class PlayComponent implements OnInit {
  playList: PlayList;
  playItems : PlayItem[];
  currentPlayItem : number;
  action: string;
  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  play(): void {
    this.action = "play";
  }

  answer(): void {
    this.action = "answer";
  }

  next(): void {
    this.currentPlayItem++;
    this.currentPlayItem = (this.currentPlayItem >= this.playItems.length ) ? 0 : this.currentPlayItem;
  }

  // See https://angular.io/docs/ts/latest/guide/router.html
  // A more robust approach might be to use swichMap but need to learn more about observables.
  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.playList = this.catalogService.getPlayList(id);
    this.playItems = _.shuffle(this.playList.items) as PlayItem[];
    this.currentPlayItem = 0;
    this.action = "none!"

  }
}
