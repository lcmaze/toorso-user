import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() { }

  ngOnInit() {

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

    this.galleryImages = [
      {
        small: 'assets/images/resort.jpg',
        medium: 'assets/images/resort.jpg',
        big: 'assets/images/resort.jpg'
      },
      {
        small: 'assets/images/resort.jpg',
        medium: 'assets/images/resort.jpg',
        big: 'assets/images/resort.jpg'
      }, {
        small: 'assets/images/resort.jpg',
        medium: 'assets/images/resort.jpg',
        big: 'assets/images/resort.jpg'
      }, 
      {
        small: 'assets/images/resort.jpg',
        medium: 'assets/images/resort.jpg',
        big: 'assets/images/resort.jpg'
      },
      {
        small: 'assets/images/resort.jpg',
        medium: 'assets/images/resort.jpg',
        big: 'assets/images/resort.jpg'
      },
    ];

  }

}
