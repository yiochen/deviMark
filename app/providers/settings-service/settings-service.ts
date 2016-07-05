import { Injectable } from '@angular/core';


let PouchDB = require('pouchdb');
window["PouchDB"] = PouchDB;

let SETTINGS_ID= "settings_id";
export class Settings {
  _id=SETTINGS_ID;
  mature=true;
}  
/*
  Generated class for the SettingsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SettingsService {
  private _db;
  private _settings:Settings;

  constructor() {
    
  }

  initDB() {
    this._db = new PouchDB('settings', { adapter: 'websql' });
    this._db.info().then(console.log.bind(console));
  }

  get(){
    if (!this._settings) {
      return this._db.get(SETTINGS_ID)
      .then(docs => {
        if (docs.rows.length<=0){
          //there is no settings yet.
          this._settings= new Settings();
          return this._db.put(this._settings);
        }
      })
      .then(
        ()=>
      )
      // else{
      //     this._settings = docs.rows[0].doc;
      //   }
        
      //   this._db.changes({ live: true, since: 'now', include_docs: true })
      //     .on('change', this.onDatabaseChange);

      // })
      // .then(
      //   settings
      // );
    }else{
      return Promise.resolve(this._settings);
    }
  }

  private onDatabaseChange=(change)=>{
    //handle changes
  }



  
}

