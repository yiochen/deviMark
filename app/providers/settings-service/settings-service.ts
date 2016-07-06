import { Injectable } from '@angular/core';


let PouchDB = require('pouchdb');
window["PouchDB"] = PouchDB;

let SETTINGS_ID = "settings_id";
export class Settings {
  _id = SETTINGS_ID;
  mature = false;
}
/*
  Generated class for the SettingsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SettingsService {
  private _db;
  private _settings: Settings;

  constructor() {

  }

  initDB() {
    console.log("creating db");
    this._db = new PouchDB('settings', { adapter: 'websql' });
    console.log(this._db);
    this._db.info().then(console.log.bind(console));
  }

  get() {
    if (!this._settings) {
      return this._db.get(SETTINGS_ID)
        .catch(err => {
          console.log('creating new setting object');
          let settings = new Settings();
          return this._db.put(settings).then(() =>this._db.get(SETTINGS_ID))
        }).then(dbSettings => this._settings = dbSettings)
        .then(() => this._settings);
    } else {
      return Promise.resolve(this._settings);
    }
  }

  updateDB(settings) {
    let id=this._settings._id;
    let rev=this._settings['_rev'];
    Object.assign(this._settings, settings, {_id:id, _rev:rev});
    console.log(this._settings);
    return this._db.put(this._settings)
    .then(()=>this._db.get(SETTINGS_ID))
    .then(dbSetting=>this._settings=dbSetting)
    .catch(err => console.log(err));
  }

}

