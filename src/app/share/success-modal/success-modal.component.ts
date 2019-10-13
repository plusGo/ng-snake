import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit {
  number = new Array(500);

  constructor() {
  }

  ngOnInit() {
  }

}
