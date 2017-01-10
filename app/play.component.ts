import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { CatalogService} from './catalog.service';
import { PlayList, PlayItem } from './vo/play-list';
import { AudioDetails } from './vo/audio-details';
import 'rxjs/add/operator/switchMap';
import * as _ from "underscore";
declare var window:any;

@Component({
  moduleId: module.id,
  selector: 'play',
  templateUrl: 'play.component.html',
  styleUrls: ['play.component.css']

})
export class PlayComponent implements OnInit, OnDestroy {
  playList: PlayList;
  playItems : PlayItem[];
  currentPlayItem : number;
  action: string;
  context: AudioContext;
  source: AudioBufferSourceNode;
  preloadedMp3s: AudioBuffer[];
  counter : number = 0;
  intervalHndl : number;

  constructor(
    private zone: NgZone,
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

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
    this.intervalHndl = window.setInterval(() => {this.tick()},1000);
  }

  ngOnDestroy() { 
      if ( this.intervalHndl) {
        clearInterval( this.intervalHndl);
      }
  }
   
  playAudio(audioBufferIndex :number) : void {
      this.source = this.context.createBufferSource();
      this.source.buffer = this.preloadedMp3s[audioBufferIndex];
      this.source.connect(this.context.destination);
      this.source.start(0);
  }

  play(): void {
    this.action = "play";
    this.playAudio(this.playItems[this.currentPlayItem].whatMp3.audioIndex);
    this.counter = 0;
  }

  answer(): void {
    this.action = "answer";
    this.playAudio(this.playItems[this.currentPlayItem].ansMp3.audioIndex);
    this.counter = 0;
  }

  next(): void {
    this.currentPlayItem++;
    if (this.currentPlayItem >= this.playItems.length ) {
      this.reset(); // reshuffle & start again.
    }
  }

  reset() : void {
    this.playItems = _.shuffle(this.playList.items) as PlayItem[];
    this.currentPlayItem = 0;
  }

  tick() : void {
    this.counter++;
    if (this.counter == 50) {
      this.play();
      this.counter = 0;
    }
  }
  
}
