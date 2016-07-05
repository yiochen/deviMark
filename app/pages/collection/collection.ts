import {Component, NgZone} from '@angular/core';
import {NavController, ActionSheet} from 'ionic-angular';
import {OnInit} from '@angular/core';
import {PreviewImageComponent} from '../../components/preview-image/preview-image';
import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';
import {Artwork} from '../../providers/artwork/artwork';
@Component({
  templateUrl: 'build/pages/collection/collection.html',
  directives: [PreviewImageComponent]
})
export class CollectionPage implements OnInit {
  bookmarks: Artwork[];

  constructor(private navController: NavController,
    private bookmarkService: BookmarkService,
    private zone: NgZone
  ) {
  }
  ngOnInit() {
    this.bookmarkService.getAll()
    .then(data => {
     
      this.zone.run(() => {
        this.bookmarks = data;
      });
    })
    .catch(console.error.bind(console));
  }
  pressAction(item){
    let actionSheet = ActionSheet.create({
      title: 'action',
      buttons: [
        {
          text: 'Remove',
          role: 'destructive',
          handler: ()=>{
            this.bookmarkService.delete(item);
          }
        }
      ]
    });
    this.navController.present(actionSheet);
    console.log("pressedd");
    console.log(item._id);
  }
}
