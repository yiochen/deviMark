import {Component, NgZone} from '@angular/core';
import {NavController} from 'ionic-angular';
import {OnInit} from '@angular/core';
import {DeviService} from '../../providers/devi-service/devi-service';
import {PreviewImageComponent} from '../../components/preview-image/preview-image';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives:[PreviewImageComponent]
})
export class HomePage implements OnInit {
  items:any[];
  constructor(private navController: NavController,
    private deviService: DeviService) {

  }
  ngOnInit() {
    this.deviService.loadHome()
    .then(items=>this.items=items);
  }
}
