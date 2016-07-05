import {Component, NgZone} from '@angular/core';
import {NavController, ActionSheet} from 'ionic-angular';
import {OnInit} from '@angular/core';
import {DeviService} from '../../providers/devi-service/devi-service';
import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';
import {PreviewImageComponent} from '../../components/preview-image/preview-image';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives:[PreviewImageComponent]
})
export class HomePage implements OnInit {
  items:any[];
  constructor(private navController: NavController,
    private deviService: DeviService,
    private bookmarkService: BookmarkService) {

  }
  ngOnInit() {
    this.deviService.loadHome()
    .then(items=>this.items=items);
  }
  pressAction(item){
    let actionSheet = ActionSheet.create({
      title: 'action',
      buttons: [
        {
          text: 'Add to collection',
          handler: () => {
            this.bookmarkService.add(item);
          }
        }
      ]
    });
    this.navController.present(actionSheet);
  }
}
