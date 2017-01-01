/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ModalComponent } from './modal/modal.component';
import { RedirectEditComponent } from './redirect-edit/redirect-edit.component';

describe('AppComponent', () => {
  const routes: Routes = [
    {path: ':status', component: RedirectComponent},
    {path: '**', redirectTo: '/all'}
  ]

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterModule.forRoot(routes),
        MaterialModule.forRoot()
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
