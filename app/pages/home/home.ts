import {Component, NgZone} from '@angular/core';
import {NavController, ActionSheet, Modal} from 'ionic-angular';
import {OnInit} from '@angular/core';
import {DeviService} from '../../providers/devi-service/devi-service';
import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';
import {PreviewImageComponent} from '../../components/preview-image/preview-image';
import {ImageModal} from '../../components/image-modal/image-modal';
import {SettingsPage} from '../settings/settings';
import {SettingsService} from '../../providers/settings-service/settings-service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [PreviewImageComponent]
})
export class HomePage implements OnInit{
  items: any[];
  constructor(private navController: NavController,
    private deviService: DeviService,
    private bookmarkService: BookmarkService,
    private settingsService: SettingsService) {

  }

  ngOnInit(){
    this.settingsService.get();
  }

  onPageWillEnter() {
    console.log("load home");
    this.deviService.loadHome()
      .then(items => this.items = items);
  }
  
  pressAction(item) {
    console.log(item);
    let actionSheet = ActionSheet.create({
      title: 'action',
      buttons: [
        {
          text: 'Add to collection',
          handler: () => {
            this.bookmarkService.add(item);
          }
        },
        {
          text: 'open modal',
          handler: () => this.showImageModal(item)

        }
      ]
    });
    this.navController.present(actionSheet);
  }
 
  showImageModal(item) {
    let modal = Modal.create(ImageModal, { item: item });
    this.navController.present(modal);
  }
  openSettings() {
    this.navController.push(SettingsPage);
  }
}
