import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-guestmodal',
  templateUrl: './guestmodal.component.html',
  styleUrls: ['./guestmodal.component.scss']
})
export class GuestmodalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GuestmodalComponent>) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
