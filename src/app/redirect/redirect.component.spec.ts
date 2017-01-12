/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, Routes, ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { DndModule } from 'ng2-dnd';
import { ToastyModule } from 'ng2-toasty';

import { ToastService } from '../toast/toast.service';
import { APP_REDUCERS } from '../reducers/reducers';

import { RedirectComponent } from './redirect.component';
import { ModalComponent } from '../modal/modal.component';
import { RedirectEditComponent } from '../redirect-edit/redirect-edit.component';
import { RedirectService } from './redirect.service';

describe('RedirectComponent', () => {
  let component: RedirectComponent;
  let fixture: ComponentFixture<RedirectComponent>;
  let redirectComponent;
  let redirectService;
  let de: DebugElement;
  let el: HTMLElement;
  const routes: Routes = [
    {path: ':status', component: RedirectComponent},
    {path: '**', redirectTo: '/all'}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectComponent, ModalComponent, RedirectEditComponent ],
      imports: [
        FormsModule,
        RouterModule.forRoot(routes),
        MaterialModule.forRoot(),
        DndModule.forRoot(),
        ToastyModule.forRoot(),
        StoreModule.provideStore(APP_REDUCERS)
      ],
      providers: [
        RedirectService,
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        ToastService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectComponent);
    component = fixture.componentInstance;

    // RedirectService injected
    redirectService = TestBed.get(RedirectService);

    //  get the "welcome" element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.redirectapp'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Redirector', () => {
    de = fixture.debugElement.query(By.css('md-toolbar-row'));
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Redirector');
  })
});
