/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Routes, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { RedirectComponent } from './redirect.component';
import { ModalComponent } from '../modal/modal.component';
import { RedirectEditComponent } from '../redirect-edit/redirect-edit.component';
import { RedirectService } from './redirect.service';

describe('RedirectComponent', () => {
  let component: RedirectComponent;
  let fixture: ComponentFixture<RedirectComponent>;
  let redirectServiceStub;
  let redirectService;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectComponent, ModalComponent, RedirectEditComponent ],
      imports: [
        FormsModule,
        RouterModule,
        MaterialModule.forRoot()
      ],
      providers: [
        RedirectService,
        ActivatedRoute
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
    de = fixture.debugElement.query(By.css('.welcome'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
