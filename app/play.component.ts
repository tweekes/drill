import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { CatalogService} from './catalog.service';
import { PlayList, PlayItem } from './vo/play-list';
import { AudioDetails } from './vo/audio-details';
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
  context: AudioContext;
  source: AudioBufferSourceNode;
  preloadedMp3s: AudioBuffer[];

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  playAudio(audioBufferIndex :number) : void {
      this.source = this.context.createBufferSource();
      this.source.buffer = this.preloadedMp3s[audioBufferIndex];
      this.source.connect(this.context.destination);
      this.source.start(0);
  }

  play(): void {
    this.action = "play";
    this.playAudio(this.playItems[this.currentPlayItem].whatMp3.audioIndex);
  }

  answer(): void {
    this.action = "answer";
    this.playAudio(this.playItems[this.currentPlayItem].ansMp3.audioIndex);
  }

  next(): void {
    this.currentPlayItem++;
    if (this.currentPlayItem >= this.playItems.length ) {
      this.reset(); // reshuffle & start again.
    }
  }

  // See https://angular.io/docs/ts/latest/guide/router.html
  // A more robust approach might be to use swichMap but need to learn more about observables.
  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    let audioDetails = this.catalogService.getPlayListAndAudioDetails(id);
    this.playList = audioDetails.playList;
    this.preloadedMp3s = audioDetails.loadedAudio;
    this.context = audioDetails.audioContext;
    this.reset();
    this.action = "none!"
  }

  reset() : void {
    this.playItems = _.shuffle(this.playList.items) as PlayItem[];
    this.currentPlayItem = 0;
  }



}
