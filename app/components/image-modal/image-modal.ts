import { Component, OnInit } from '@angular/core';
import { Modal, NavController, ViewController, NavParams } from 'ionic-angular';
import { Artwork } from '../../providers/artwork/artwork';


@Component({
    templateUrl: 'build/components/image-modal/image-modal.html'
})
export class ImageModal implements OnInit {
    item: Artwork;
    constructor(
        private params: NavParams,
        private viewCtrl: ViewController
    ) {

    }
    ngOnInit() {
        this.item = this.params.get('item');
    }
    close() {
        this.viewCtrl.dismiss();
    }
    getBackground(){
        var test="http://www.gravatar.com/avatar/64537dfe80f44978663e378d375c7138?s=150&d=identicon&r=PG";
        var style='url('+test+')';
        console.log(style);
        return style;
    }
}