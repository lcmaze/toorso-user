import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  cdnLink: string = environment.cdnLink;

  @Input('data') data: any;
  constructor() { }

  ngOnInit() {

    this.galleryImages = [];
    if(this.data && this.data.length > 0) {
      for (let image of this.data) {
        this.galleryImages.push({
          small: `${this.cdnLink}gallery/${image.filename}`,
          medium: `${this.cdnLink}gallery/${image.filename}`,
          big: `${this.cdnLink}gallery/${image.filename}`
        });
      }
    }

    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        thumbnailsColumns: 5,
        thumbnailsMargin: 2,
        thumbnailMargin: 2,
        imagePercent: 80,
        thumbnailsPercent: 20,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 1200, 
        thumbnailsColumns: 4,
      },
      {
        breakpoint: 576,
        thumbnailsColumns: 3,
        preview: false,
      }
    ];

    // this.galleryImages = [
    //   {
    //     small: 'assets/images/resort.jpg',
    //     medium: 'assets/images/resort.jpg',
    //     big: 'assets/images/resort.jpg'
    //   },
    //   {
    //     small: 'assets/images/resort.jpg',
    //     medium: 'assets/images/resort.jpg',
    //     big: 'assets/images/resort.jpg'
    //   }, {
    //     small: 'assets/images/resort.jpg',
    //     medium: 'assets/images/resort.jpg',
    //     big: 'assets/images/resort.jpg'
    //   }, 
    //   {
    //     small: 'assets/images/resort.jpg',
    //     medium: 'assets/images/resort.jpg',
    //     big: 'assets/images/resort.jpg'
    //   },
    //   {
    //     small: 'assets/images/resort.jpg',
    //     medium: 'assets/images/resort.jpg',
    //     big: 'assets/images/resort.jpg'
    //   },
    // ];

  }

}
