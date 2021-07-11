import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { WritereviewComponent } from 'src/app/components/commons/writereview/writereview.component';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  read_more = false;
  cdnLink: string = environment.cdnLink;

  constructor(public dialog: MatDialog, private actvatedRoute: ActivatedRoute, private mainData: MainService, private sanitizer: DomSanitizer) {
  }

  writereview(): void {
    const dialogRef = this.dialog.open(WritereviewComponent, {
      width: '540px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  readmore(){
    this.read_more = !this.read_more;
  }

  slug: any;
  ngOnInit() {
    this.actvatedRoute.paramMap.subscribe(data => {
      this.slug = data['params'].slug;
      this.getVendor();
    })
  }

  vendor: any;
  youtubeLink: any;
  mapLink: any;
  getVendor(){
    this.mainData.get(`api/vendor/single-vendor?vendor_id=${this.slug}`).subscribe(data => {
      // console.log(data);
      this.vendor = data;
      if(this.vendor.video_url) {
        let link = `https://www.youtube.com/embed/${this.vendor.video_url}`;
        this.youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
      }
      if(this.vendor.vendor_latitude && this.vendor.vendor_longitude){
        this.mapLink = this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${this.vendor.vendor_latitude},${this.vendor.vendor_longitude}&z=8&output=embed`);
      }
    })
  }

}
