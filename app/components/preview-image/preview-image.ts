import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'preview-image',
    templateUrl: 'build/components/preview-image/preview-image.html',
})
export class PreviewImageComponent implements OnInit {
    @Input()src;
    constructor() { }

    ngOnInit() { }

}