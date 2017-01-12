import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class ToastService {
  private toastSub: any;
  private themes = {
    default: 'default',
    material: 'material',
    bootstrap: 'bootstrap'
  };
  private positions = {
    'top-left': 'top-left',
    'top-center': 'top-center',
    'top-right': 'top-right',
    'bottom-left': 'bottom-left',
    'bottom-center': 'bottom-center',
    'bottom-right': 'bottom-right',
    'center-center': 'center-center'
  };

  private options = {
    title: 'Toast It!',
    msg: 'Mmmm, toasty...',
    showClose: true,
    timeout: 5000,
    theme: this.themes.default,
    type: 'info'
  };
  private newToast = new Subject<{}>();
  private newToast$ = this.newToast.asObservable();
  private position = new Subject<string>();
  position$ = this.position.asObservable();

  constructor(private toastyService: ToastyService) {
    // Listen for new toast
    console.log('subscribe');
    this.toastSub = this.newToast$.subscribe((options) => {
      console.log('sub toast', options)
      this.makeToast(options || this.options);
    });
  }

  makeToast(opts) {
    console.log('new toast', opts)
    //noinspection TypeScriptValidateTypes
    let toastOptions: ToastOptions = {
      title: opts.title ? opts.title : this.options.title,
      msg: opts.msg ? opts.msg : this.options.msg,
      showClose: opts.showClose != false ? true : false,
      timeout: opts.timeout ? opts.timeout : this.options.timeout,
      theme: this.themes[opts.theme] ? opts.theme : this.options.theme,
      //position: this.positions[opts.position] ? opts.position : this.options.position,
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function(toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    }
    console.log(toastOptions)
    switch (opts.type || this.options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }

  showNewToast(options) {
    console.log('this new toast', options)
    // broadcast toast position
    this.position.next(options.position);
    this.newToast.next(options);
  }
}
