import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Redirect } from './redirect.model';
import {environment} from "../../environments/environment";

@Injectable()
export class RedirectService {
  redirects = [];
  constructor(private http: Http) {
  }

  getRedirects() {
    return Observable.create((subscriber) => {
      this.loadRedirects()
        .subscribe(redirects => {
          console.log('redirects', redirects)
          redirects.forEach((redirect) => {
            this.redirects.push(new Redirect(redirect));
          });
          subscriber.next(this.redirects);
          subscriber.complete();
        });
    });
  }

  getRedirects2() {
    return Observable.create((subscriber) => {
      if(this.redirects.length === 0) {
        this.loadRedirects()
          .subscribe(redirects => {
            console.log('redirects', redirects)
            redirects.forEach((redirect) => {
              this.redirects.push(new Redirect(redirect));
            });
            subscriber.next(this.redirects);
            subscriber.complete();
          });
      } else {
        subscriber.next(this.redirects);
        subscriber.complete();
      }
    });
  }

  loadRedirects() {
    return this.http.get(environment.getRedirects)
      .map(response => response.json());
  }

  addRedirect(redirect) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = environment.addRedirect;
    console.log('***', url, redirect);
    return this.http.post(url, redirect, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateRedirect(redirect, remove) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = remove ? `${environment.deleteRedirect}/${redirect.id}` : `${environment.updateRedirect}/${redirect.id}`;
    console.log('***', url, redirect);
    return this.http.post(url, redirect, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  get(query = ''){
    return Observable.create((subscriber) => {
      let data;

      if(query === 'active' || query === 'disabled') {
        let active = query === 'active';
        data = this.redirects.filter(redirect => redirect.active === active);
      } else {
        console.log('***', this.redirects)
        data = this.redirects;
      }
      subscriber.next(data);
      subscriber.complete();
    });
  }

  create(options: Object = {}) {
    return new Redirect(options);
  }

  save(redirects) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = `${environment.saveRedirects}`;
    console.log('***', url);
    return this.http.post(url, redirects, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  generateId() {
    let newId = this.redirects.length;
    let index = this.redirects.findIndex((redirect) => redirect.id === newId);
    while(index >= 0) {
      index = this.redirects.findIndex((redirect) => redirect.id === ++newId);
    }
    return newId;
  }

  add(data) {
    return new Promise(resolve => {
      let newId = this.redirects.length;
      let index = this.redirects.findIndex((redirect) => redirect.id === newId);
      while(index >= 0) {
        index = this.redirects.findIndex((redirect) => redirect.id === ++newId);
      }
      data.id = newId;
      this.addRedirect(data).subscribe((res) => {
        console.log('!!***', res)
        this.redirects.push(data);
        resolve(data);
      });
    });
  }

  put(data) {
    return new Promise(resolve => {
      let index = this.redirects.findIndex((redirect) => redirect.id === data.id);
      if(index >= 0) {
        this.updateRedirect(data, false).subscribe((res) => {
          console.log('!!***', res)
          Object.assign(this.redirects[index], data);
          resolve(data);
        });
      }
    });
  }

  delete(data) {
    console.log('service', data.id)
    return new Promise(resolve => {
      let index = this.redirects.findIndex((redirect) => redirect.id === data.id);
      if(index >= 0) {
        this.updateRedirect(data, true).subscribe((res) => {
          console.log('!!***', res)
          this.redirects.splice(index, 1);
          resolve(data);
        });
      }
    });
  }

  deleteCompleted() {
    return new Promise((resolve) => {
      this.redirects = this.redirects.filter((redirect) => redirect.disabled);
      resolve(this.redirects);
    });
  }
}
