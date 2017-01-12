import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { RedirectService } from './redirect.service';
import { Redirect } from "./redirect.model";
import {AppState, IState} from "../common/interfaces";
import * as AppActions from '../common/actions';
import {ToastService} from "../toast/toast.service";

const routeMap = {
  all: AppActions.SHOW_ALL,
  active: AppActions.SHOW_ACTIVE,
  disabled: AppActions.SHOW_INACTIVE
};

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
  providers: [RedirectService]
})
export class RedirectComponent implements OnInit {
  private redirects = [];
  private newRedirect: Redirect;
  private activeRedirects;
  private disabledRedirects;
  private tempRedirect: Redirect;
  private path;
  private query;
  private copy;
  private title;
  private showModal: boolean = false;
  private showEdit: boolean = false;
  private message;
  private okText;
  private value;
  private isDirty: boolean = false;
  private isRedoable: boolean = false;
  private currentStateSaved: boolean = true;
  private appActions = AppActions;

  constructor(
    private redirectService: RedirectService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MdDialog,
    private viewContainerRef: ViewContainerRef,
    private store: Store<AppState>,
    private toastService: ToastService
  ) {
    console.log('constructor')
    this.newRedirect = redirectService.create();
    this.tempRedirect = redirectService.create();
    this.initialise();

    this.store.select('redirects')
      .subscribe((state: IState) => {
      console.log('statemachine', state );
      if(state !== {}) {
        let {past, present, future} = state;
        this.isDirty = past.length > 0 ? true : false;
        this.isRedoable = future.length > 0 ? true : false;
        this.currentStateSaved = this.isDirty ? false : true;
        console.log('statemachine2', present)
        if(present.config && present.config.path !== this.path) {
          console.log('navigate', `/${present.config.path}`)
          this.router.navigate([`/${present.config.path}`]);
        }
        this.filterRedirects(present);
        this.copy = this.cloneRedirects(this.redirects);
      }
    });
  }

  initialise() {
    let redirects;

    this.route.params.subscribe((params) => {
      this.path = params['status'];
      console.log('ngoninit');
      this.stateMachine(routeMap[this.path], this.redirects);
    });
    this.redirectService.getRedirects()
      .subscribe((data) => {
        redirects = data;
      }, (err) => {
        console.log(err);
      }, () => {
        this.copy = redirects.map((redirect) => {
          return Object.assign(this.redirectService.create(), redirect);
        });
        this.store.dispatch({
          type: AppActions.INIT,
          payload: {data: this.copy, config: {path: this.path}}
        });
      });
  }

  filterRedirects(present) {
    this.redirects = present.redirects && present.redirects.filter((redirect) => {
        if(present.config.path === 'all') {
          return Object.assign(this.redirectService.create(), redirect);
        } else {
          const filter = present.config.path === 'active';
          return filter === redirect.active ? Object.assign(this.redirectService.create(), redirect) : false;
        }
      });
  }

  confirmDelete(redirect) {
    this.okText = 'Delete';
    this.value = redirect;
    this.message = `Yes, delete ${redirect.ruleName} redirect`;
    this.showModal = true;
    console.log(this.showModal, this.value)
  }

  search() {
    if(this.query.length > 2) {
      if(this.query.length > 0) {
        this.redirects = this.copy.filter((redirect) => redirect.ruleName.toLowerCase().indexOf(this.query.toLowerCase()) >= 0);
        console.log('&&&', this.redirects);
      } else {
        this.redirects = this.copy.slice();
      }
    } else if(this.redirects.length !== this.copy.length) {
      this.redirects = this.copy.slice();
    }
  }

  reorderSuccess(redirect) {
    console.log('reorder', redirect, this.redirects)
    this.store.dispatch({
      type: AppActions.REORDER,
      payload: {data: this.redirects, config: {path: this.path}}
    });
  }

  getRedirects(query = '') {
    let redirects;
    return Observable.create((subscriber) => {
      this.redirectService.get(query)
        .subscribe((data) => {
          redirects = data
        }, (err) => {
        }, () => {
          this.redirects = redirects;
          this.copy = this.redirects.slice();
          this.activeRedirects = this.redirects.filter((redirect) => redirect.active).length;
          this.disabledRedirects = this.redirects.filter((redirect) => !redirect.active).length;
          console.log(this.disabledRedirects, this.activeRedirects)
          subscriber.next(this.redirects);
          subscriber.complete();
        })
    })
  }

  createRedirect() {
    this.newRedirect.clear();
    this.value = this.newRedirect;
    this.title = "New redirect";
    this.okText = 'Save';
    this.showEdit = true;
    console.log('new', this.value)
  }

  editRedirect(redirect) {
    this.tempRedirect = this.cloneRedirect(redirect);
    console.log('set edit', this.tempRedirect, redirect, this.tempRedirect === redirect)
    this.value = this.tempRedirect;
    this.title = `Edit ${redirect.ruleName}`;
    this.okText = 'Update';
    this.showEdit = true;
  }

  cloneRedirect(redirect) {
    let temp = this.redirectService.create();
    return Object.assign(temp, redirect);
  }

  cloneRedirects(redirects) {
    return redirects ? redirects.map((redirect) => {
      return Object.assign(this.redirectService.create(), redirect);
    }) : [];

  }

  toggle(redirect) {
    console.log('toggle')
    Object.assign(this.tempRedirect, redirect);
    this.tempRedirect.active = !this.tempRedirect.active;
    this.updateRedirect(this.tempRedirect);
  }

  updateRedirect(redirect) {
    if(redirect) {
      let task = AppActions.UPDATE;
      if(redirect.id === undefined || redirect.id < 0) {
        redirect.id = this.redirectService.generateId();
        task = AppActions.ADD;
      }
      console.log('task', task)
      this.stateMachine(task, redirect);
    }
    this.showEdit = false;
  }

  editTooltips(redirect) {
    console.log('toast ');
    let options = {
      title: redirect.ruleName,
      theme: 'bootstrap',
      type: 'default',
      position: 'top-right',
      timeout: 500,
      msg: 'Click to edit this redirect.'
    };
    this.toastService.showNewToast(options);

  }

  deleteRedirect(redirect) {
    if(redirect !== null) {
      console.log('delete', redirect.id)
      this.stateMachine(AppActions.DELETE, redirect);
    }
    this.showModal = false;
  }

  saveAll() {
    console.log('save all')
    this.redirectService.save(this.redirects)
      .subscribe((data) => {
        console.log('redirects saved successfully.');
      });
  }

  stateMachine(type, payload) {
    console.log('statemachine is called')
    this.store.dispatch({
      type: type,
      payload: {data: payload, config: {path: this.path}}
    });
    //this.cloneState();
  }

  //cloneState() {
  //  console.log('call select')
  //  this.store.select('redirects').subscribe((state: IState) => {
  //    console.log('statemachine', state);
  //    if(state && state.present) {
  //      let present = state.present;
  //      this.redirects = present.map((redirect) => {
  //        return Object.assign(this.redirectService.create(), redirect);
  //      });
  //    }
  //  });
  //}

  ngOnInit() {
    //let redirects;
    //this.redirectService.getRedirects()
    //  .subscribe((data) => {
    //    redirects = data;
    //  }, (err) => {
    //    console.log(err);
    //  }, () => {
    //    this.route.params.subscribe((params) => {
    //      this.path = params['status'];
    //        console.log('ngoninit', redirects);
    //        const copy = redirects.map((redirect) => {
    //          return Object.assign(this.redirectService.create(), redirect);
    //        });
    //        this.store.dispatch({
    //          type: AppActions.INIT,
    //          payload: copy
    //        });
    //    });
    //  });
  }

}
