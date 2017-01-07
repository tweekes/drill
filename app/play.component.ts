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
    <div id="container">
      <div class="play btitle" (tap)="play()">
        Play
      </div>
      <div class="answer btitle" (tap)="answer()">
        Answer
      </div>
      <div class="next btitle" (tap)="next();play()">
        Next
      </div>
    </div>
  `,
  styles:[`

  /* Mobile = 360 x 640 */

  .btitle {
      text-align: center;
      line-height: 3em;
      font-size: 150%;
  }

  .btitle:active {
    border-top-style:solid;
    border-top-width:10px;
    border-top-color:#FF4545;
  }


  @media (max-height:639px) and (orientation: portrait){
    #container {
      height:460px;
      width:360px;
      background-color: #000000;
    }

    .play, .answer, .next {
        padding-bottom: 0;
        height: 29%;
    }

    .play {
      background-color: #25E5B5; /* Blue */
        margin-top: 5px;
        margin-bottom: 10px;
     }

    .answer {
      background-color: #A965CA; /* Purple */
      margin-bottom: 10px;
    }

    .next {
      background-color: #9ACC00; /* Green / lime*/
      margin-bottom: 0px;
    }
  }

  @media (orientation: landscape) {
    #container {
      height: 360px;
      width: 640px
      background-color: #000000;
    }

    .play, .answer, .next {
        float: left;
        padding-bottom: 0;
        width: 31%;
        height:95%;
    }

    .play {
        background-color: #25E5B5; /* Blue */
        margin-right: 10px;
     }

    .answer {
        background-color: #A965CA; /* Purple */
        margin-right: 10px;
    }

    .next {
        background-color: #9ACC00; /* Green / lime*/
        margin-right: 0;
    }
  }

`]

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
