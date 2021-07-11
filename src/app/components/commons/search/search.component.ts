import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { GuestmodalComponent } from '../guestmodal/guestmodal.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input ('country') country: boolean = true;
  @Input ('timeguest') timeguest: boolean = true;
  @Output('category') categoryEmitter: any = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(GuestmodalComponent, {
      width: '280px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

  categoryChange(ev: any){
    this.categoryEmitter.emit(ev);
  }

}
