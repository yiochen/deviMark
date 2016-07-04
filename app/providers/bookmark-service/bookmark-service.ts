import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


let PouchDB = require('pouchdb');
window["PouchDB"] = PouchDB;  

/*
  Generated class for the BookmarkService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BookmarkService {
  private _db;
  private _artworks;

  constructor(){
    
  }
  initDB() {
    this._db = new PouchDB('bookmarks', { adapter: 'websql' });
    this._db.info().then(console.log.bind(console));
    
  }

  add(artwork) {
    
    let newArtwork={};
    Object.assign(newArtwork,artwork,{_id:new Date().getTime()+''});
    return this._db.put(newArtwork);
  }

  delete(artwork) {
    return this._db.remove(artwork);
  }

  getAll() {
    if (!this._artworks) {
      return this._db.allDocs({ include_docs: true })
        .then(docs => {
          this._artworks = docs.rows.map(row => row.doc);
          this._db.changes({ live: true, since: 'now', include_docs: true })
            .on('change', this.onDatabaseChange);
       
        });

    }else{
      return Promise.resolve(this._artworks);
    }
  }

  //TODO: bad design
  //the index returned by this function is not the index of the element if the element with that id doesn't exist.
  private findIndex(array, id){
    var low = 0, high = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid +1 : high = mid;
    }
    return low;
  }
 
 //use instance arrow function to prevent lost of this context
  private onDatabaseChange=(change)=>{
    var index = this.findIndex(this._artworks, change.id);
    var artwork = this._artworks[index];

    if (change.deleted) {
      if (artwork) {
        this._artworks.splice(index, 1);
      }
    }else{
     
      if (artwork && artwork._id === change.id) {
        this._artworks[index] =  change.doc;
       
      }else{
        this._artworks.splice(index, 0, change.doc);
      }
    }
  }

  
}

