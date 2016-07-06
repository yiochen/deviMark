import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {Xml} from './providers/xml/xml';
import {DeviService} from './providers/devi-service/devi-service';
import {BookmarkService} from './providers/bookmark-service/bookmark-service';
import {SettingsService} from './providers/settings-service/settings-service';
import {SettingsPage} from './pages/settings/settings';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers:[Xml, DeviService, BookmarkService, SettingsService]
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform,
  private bookmarkService:BookmarkService,
  private settingsService:SettingsService) {
    //this.rootPage = TabsPage;
    this.rootPage = SettingsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      bookmarkService.initDB();
      bookmarkService.getAll();
      settingsService.initDB();
    });
  }
}

ionicBootstrap(MyApp)
