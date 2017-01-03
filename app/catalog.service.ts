import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Catalog }  from './vo/catalog';
import { PlayList, PlayItem }  from './vo/play-list';


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
  constructor(private http: Http) { }

  updateCatalogList() : boolean {
     this.http.get(this.url)
      .toPromise()
      .then(response => {
          let r = response.json().data as Catalog[];
          this.catalogList = r;
          let rr = this.catalogList[0] as Catalog;
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

  getPlayList(id: number): PlayList {
    return this.catalogList[0].playLists.find(e => e.id === id);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred'); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
