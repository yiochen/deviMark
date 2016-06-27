import { Injectable } from '@angular/core';

/*
  Generated class for the Xml provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var X2JS:any;
@Injectable()
export class Xml {
  
  data: any;
  x2js:any;
  constructor() {
    this.x2js = new X2JS();
  }

  convert(xml:String){
    return this.x2js.xml2js(xml);
  }
  
}

