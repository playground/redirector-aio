import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MdDialogRef, MdDialog } from '@angular/material';

import { RedirectService } from './redirect.service';
import { Redirect } from "./redirect.model";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
  providers: [RedirectService]
})
export class RedirectComponent implements OnInit {
  private redirects;
  private newRedirect;
  private activeRedirects;
  private disabledRedirects;
  private tempRedirect;
  private path;
  private query;
  private copy;
  private title;
  private showModal: boolean = false;
  private showEdit: boolean = false;
  private message;
  private okText;
  private value;


  constructor(
    private redirectService: RedirectService,
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private viewContainerRef: ViewContainerRef
  ) {
    this.newRedirect = redirectService.create();
    this.tempRedirect = {};
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
        this.redirects = this.redirects.filter((redirect) => redirect.ruleName.toLowerCase().indexOf(this.query.toLowerCase()) >= 0);
        console.log('&&&', this.redirects);
      } else {
        this.redirects = this.copy.slice();
      }
    } else if(this.redirects.length !== this.copy.length) {
      this.redirects = this.copy.slice();
    }
  }

  getRedirects(query = '') {
    return this.redirectService.get(query)
      .then((redirects) => {
        this.redirects = redirects;
        this.copy = this.redirects.slice();
        this.activeRedirects = this.redirects.filter((redirect) => redirect.active).length;
        this.disabledRedirects = this.redirects.filter((redirect) => !redirect.active).length;
        console.log(this.disabledRedirects, this.activeRedirects)
      })
  }

  createRedirect() {
    this.value = this.newRedirect;
    this.title = "New redirect";
    this.okText = 'Save';
    this.showEdit = true;
  }

  editRedirect(redirect) {
    this.setTempRedirect(redirect);
    this.value = this.tempRedirect;
    this.title = `Edit ${redirect.ruleName}`;
    this.okText = 'Update';
    this.showEdit = true;
  }

  setTempRedirect(redirect) {
    this.tempRedirect = {};
    Object.assign(this.tempRedirect, redirect);
  }

  toggle(redirect) {
    this.setTempRedirect(redirect);
    this.tempRedirect.active = !this.tempRedirect.active;
    this.updateRedirect(this.tempRedirect);
  }

  updateRedirect(redirect) {
    console.log(this.tempRedirect, redirect)
    if(redirect) {
      let task = redirect.id ? 'put' : 'add';
      return this.redirectService[task](redirect)
        .then(() => {
          if(task === 'add') {
            this.newRedirect = this.redirectService.create();
          }
          this.showEdit = false;
          return this.getRedirects(this.path);
        });
    } else {
      this.showEdit = false;
    }
  }

  deleteRedirect(redirect) {
    if(redirect !== null) {
      console.log('delete', redirect.id)
      this.redirectService.delete(redirect)
        .then(() => {
          return this.getRedirects();
        })
    }
    this.showModal = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.path = params['status'];
      this.redirectService.getRedirects()
        .then((redirects) => {
          this.getRedirects(this.path);
        })
    });
  }

}
