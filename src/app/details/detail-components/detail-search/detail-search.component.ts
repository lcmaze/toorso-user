import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GuestmodalComponent } from 'src/app/components/commons/guestmodal/guestmodal.component';

@Component({
  selector: 'app-detail-search',
  templateUrl: './detail-search.component.html',
  styleUrls: ['./detail-search.component.scss']
})
export class DetailSearchComponent implements OnInit {

  @Input('data') data: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    // console.log(this.data)
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(GuestmodalComponent, {
      width: '280px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
