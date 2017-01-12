/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { ToastyModule } from 'ng2-toasty';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { RedirectEditComponent } from './redirect-edit.component';
import { ToastService } from '../toast/toast.service';

describe('RedirectEditComponent', () => {
  let component: RedirectEditComponent;
  let fixture: ComponentFixture<RedirectEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectEditComponent ],
      providers: [ToastService, ToastyService, ToastyConfig, ToastOptions],
      imports: [
        FormsModule,
        MaterialModule,
        ToastyModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
