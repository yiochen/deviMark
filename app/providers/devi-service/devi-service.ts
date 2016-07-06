import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Xml } from '../xml/xml';
import { Artwork } from '../artwork/artwork'

/*
  Generated class for the DeviService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DeviService {
        dataHome: Artwork[];
        
        dataSearch: Artwork[];
        

        constructor(private http: Http,
                private xml: Xml) {

                this.dataHome = null;
                this.dataSearch = null;
               
        }

        loadSearch(key: string, newSearch: boolean) {
                let encodedKey = encodeURI(key);
                if (newSearch) {
                        this.dataSearch = null;
                }
                return this.load("dataSearch", `http://backend.deviantart.com/rss.xml?q=boost%3Apopular+${encodedKey}&amp;type=deviation`);
        }
        loadHome() {
                return this.load("dataHome", 'http://backend.deviantart.com/rss.xml?q=boost%3Apopular+meta%3Aall+max_age%3A24h&amp;type=deviation');
        }
        load(tag: string, url: string) {
                if (this[tag]) {
                        // already loaded data
                        return Promise.resolve(this[tag]).then(this.process);
                }

                // don't have the data yet
                return new Promise(resolve => {
                        // We're using Angular Http provider to request the data,
                        // then on the response it'll map the JSON data to a parsed JS object.
                        // Next we process the data and resolve the promise with the new data.
                        this.http.get(url)
                                .map(res => res.text())
                                .subscribe(data => {
                                        // we've got back the raw data, now generate the core schedule data
                                        // and save the data for later reference
                                        this[tag] = this.xml.convert(data);
                                        resolve(this[tag]);
                                });
                }).then(this.process);
        }
        process(data) {
                console.log(data);
                return data.rss.channel.item.filter(item => typeof item.thumbnail == "object")
                        .map(item => new Artwork({
                                name: item.title[0] || "unnamed",
                                link: item.link,
                                mature: item.rating.__text!=="nonadult",//TODO: I can test it here, test it back.
                                thumbnail: item.thumbnail.reduce(
                                        (preThumb, curThumb, index) => (+curThumb._height) * (+curThumb._width) >= (+preThumb._height) * (+preThumb._width) ? curThumb : preThumb,
                                        { _height: 0, _width: 0 }
                                )
                        })
                        );
        }
}