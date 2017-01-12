import { Component } from '@angular/core';
import {ToastService} from "./toast/toast.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private position = 'bottom-right';
  title = 'app works!';

  constructor(private toastService: ToastService) {
    toastService.position$.subscribe((position) => this.position = position);
  }
}
