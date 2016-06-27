import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DeviService} from '../../providers/devi-service/devi-service';
import {PreviewImageComponent} from '../../components/preview-image/preview-image';
@Component({
  templateUrl: 'build/pages/search/search.html',
  directives:[PreviewImageComponent]
})
export class SearchPage {
  keyword:string;
  items:any[];
  constructor(private navController: NavController,
    private deviService:DeviService) {
  }
  search(key:string){
   this.deviService.loadSearch(key)
      .then(items=>this.items=items);
  }
}
