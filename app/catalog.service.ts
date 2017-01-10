import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Catalog }  from './vo/catalog';
import { PlayList, PlayItem }  from './vo/play-list';
import { AudioDetails } from './vo/audio-details';
import * as _ from "underscore";

declare var BufferLoader: any;

// The highest level is a Catalog list.
// A Catalog list constains a list of Catalogs
// A Catalog contains a list of play lists.
// A play list gets selected
// A play list contains a set of play-items.
// A play item contains:
//    play-item-question
//    play-item-answer (optional)

@Injectable()
export class CatalogService {
  private catalogList : Catalog[] = [];
  private headers = new Headers({'Content-Type': 'application/json'});
  private url = "api/catalog";
  private mp3TitlesList : string [];
  private preloadedAudios : AudioBuffer[];
  private context : AudioContext;
  constructor(private http: Http) { }

  updateCatalogList() : boolean {
     this.http.get(this.url)
      .toPromise()
      .then(response => {
          let r = response.json().data as Catalog[];
          this.catalogList = r;
          let rr = this.catalogList[0] as Catalog;
          this.mp3TitlesList = [];
          this.preloadedAudios = [];
          this.loadMp3sFromServer();
      })
      .catch(this.handleError);
      return true;
  }

  getCatalog(id:number): Promise<Catalog> {
    if (this.catalogList.length > 0 ) {
      return new Promise<Catalog>((resolve, reject) => {
        resolve(this.catalogList[0]);
      })
    } else {

    return new Promise<Catalog>((resolve, reject) => {
      reject("ERROR: Catalog List not updated from server.");
    })

      /* TODO: Remove later.
      return this.http.get(this.url)
        .toPromise()
        .then(response => {
            let r = response.json().data as Catalog[];
            this.catalogList = r;
            let rr = this.catalogList[0] as Catalog;
            return rr;
        })
        .catch(this.handleError);
      */
    }
  }

  loadMp3sFromServer() : void {
    this.context = new AudioContext();
    this.generateMp3List();

    let bufferLoader = new BufferLoader(
       this.context,
       this.mp3TitlesList,
       (bufferList:AudioBuffer[]) => {
           this.preloadedAudios = bufferList;
       }
    );
    bufferLoader.load();
  }

  private generateMp3List() : void {
      let cursor = 0;
      let p = "audio/";
      _.each(this.catalogList, (catalog) => {
          _.each(catalog.playLists, (playList) => {
            _.each(playList.items, (playItem) => {
                if (playItem.whatMp3 != null) {
                  this.mp3TitlesList.push(p + playItem.whatMp3.title + ".mp3");
                  playItem.whatMp3.audioIndex = cursor++;
                }
                if (playItem.ansMp3 != null) {
                  this.mp3TitlesList.push(p + playItem.ansMp3.title + ".mp3");
                  playItem.ansMp3.audioIndex = cursor++;
                }
            })
          })
    })
  }

  getPlayListAndAudioDetails(id: number): AudioDetails {
    let ad = new AudioDetails();
    ad.playList = this.catalogList[0].playLists.find(e => e.id === id);
    ad.audioContext = this.context;
    ad.loadedAudio = this.preloadedAudios;
    return ad;
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred'); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
