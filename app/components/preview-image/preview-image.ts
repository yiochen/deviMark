import { Component, OnInit, Input } from '@angular/core';
import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';
import {Artwork} from '../../providers/artwork/artwork';
@Component({
    selector: 'preview-image',
    templateUrl: 'build/components/preview-image/preview-image.html'
})
export class PreviewImageComponent implements OnInit {
    @Input() artwork;
    @Input() showSaveButton = false;
    constructor(private bookmarkService:BookmarkService) { }

    ngOnInit() { 

    }
    saveToCollection(artwork){
        this.bookmarkService.add(artwork);
    }

}