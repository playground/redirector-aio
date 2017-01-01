import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-redirect-edit',
  templateUrl: './redirect-edit.component.html',
  styleUrls: ['./redirect-edit.component.css']
})
export class RedirectEditComponent implements OnInit {
  @Input() showModal: boolean;
  @Input() title: string;
  @Input() redirect: any;
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
