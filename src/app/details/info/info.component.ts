import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WritereviewComponent } from 'src/app/components/commons/writereview/writereview.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  read_more = false;

  constructor(public dialog: MatDialog) {
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

  ngOnInit() {
  }

}
