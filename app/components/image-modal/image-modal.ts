import { Component, OnInit } from '@angular/core';
import { Modal, NavController, ViewController, NavParams } from 'ionic-angular';
import { Artwork } from '../../providers/artwork/artwork';
import { Insomnia } from 'ionic-native';

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
        Insomnia.keepAwake().then(
            () => console.log('success'),
            () => console.log('error')
        );
    }
    close() {
        Insomnia.allowSleepAgain().then(
            () => console.log('success'),
            () => console.log('error')
        );
        this.viewCtrl.dismiss();
    }
    
}