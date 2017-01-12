/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Routes, RouterModule, provideRoutes } from '@angular/router';
import { AppComponent } from './app.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ModalComponent } from './modal/modal.component';
import { RedirectEditComponent } from './redirect-edit/redirect-edit.component';
import { ToastService } from './toast/toast.service';

describe('AppComponent', () => {
  let position;
  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        ToastService,
        provideRoutes([{path: 'fakeRouteForTesting', redirectTo: 'fakeRouteForTesting', pathMatch:'full'}])
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', inject([ToastService], (toastService) => {
    toastService.position$.subscribe((pos) => position = pos);
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let el = compiled.querySelector('router-outlet');
    console.log('$$$$$$$', el);
    expect(el).toBeTruthy();
  }));
});
