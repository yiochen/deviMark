import {Component, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {NavController, ActionSheet} from 'ionic-angular';
import {DeviService} from '../../providers/devi-service/devi-service';
import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';
import {PreviewImageComponent} from '../../components/preview-image/preview-image';
@Component({
  templateUrl: 'build/pages/search/search.html',
  directives: [PreviewImageComponent]
})
export class SearchPage {

  keyword: string;
  items: any[];
  console = console;
  constructor(private navController: NavController,
    private deviService: DeviService,
    private bookmarkService: BookmarkService,
    private el: ElementRef) {
  }
  search(key: string) {
    this.el.nativeElement.querySelector('#search_bar').querySelector('input').blur();
    this.deviService.loadSearch(key)
      .then(items => this.items = items);
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
