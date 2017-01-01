import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ModalComponent } from './modal/modal.component';
import { RedirectEditComponent } from './redirect-edit/redirect-edit.component';

const routes: Routes = [
  {path: ':status', component: RedirectComponent},
  {path: '**', redirectTo: '/all'}
]

@NgModule({
  declarations: [
    AppComponent,
    RedirectComponent,
    ModalComponent,
    RedirectEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
