import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {Xml} from './providers/xml/xml';
import {DeviService} from './providers/devi-service/devi-service';
import {BookmarkService} from './providers/bookmark-service/bookmark-service';
@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers:[Xml, DeviService, BookmarkService]
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform,
  private bookmarkService:BookmarkService) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      bookmarkService.initDB();
      bookmarkService.getAll();
    });
  }
}

ionicBootstrap(MyApp)
