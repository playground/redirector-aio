import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() showModal: boolean;
  @Input() title: string;
  @Input() value: any;
  @Input() message: string;
  @Input() okText: string;
  @Input() cancelText: string;
  @Output() valueEmitted = new EventEmitter<string>();

  constructor() {
    this.okText = 'OK';
    this.cancelText = 'Cancel';
  }

  ngOnInit() {
  }

  emitValue(value) {
    console.log('emit', value)
    this.valueEmitted.emit(value);
  }
}