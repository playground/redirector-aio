import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { DndModule } from 'ng2-dnd';
import { ToastyModule } from 'ng2-toasty';

import { AppComponent } from './app.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ModalComponent } from './modal/modal.component';
import { RedirectEditComponent } from './redirect-edit/redirect-edit.component';
import { ToastService } from './toast/toast.service';
import { APP_REDUCERS } from './reducers/reducers';

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
    MaterialModule.forRoot(),
    DndModule.forRoot(),
    ToastyModule.forRoot(),
    StoreModule.provideStore(APP_REDUCERS)
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
