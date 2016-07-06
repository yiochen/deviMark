import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SettingsService, Settings} from '../../providers/settings-service/settings-service';
/*
  Generated class for the SettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage implements OnInit {
  settings:Settings;
  constructor(private nav: NavController,
    private settingsService:SettingsService,
    private platform:Platform
  ) {}
  ngOnInit(){
    this.platform.ready().then(()=>this.settingsService.get()).then(settings=>this.settings=settings);
  }
  updateSettings(checked) {
    this.settingsService.updateDB(this.settings)
    .then(()=>this.settingsService.get())
    .then(dbSettings=>this.settings=dbSettings);
  }
}
