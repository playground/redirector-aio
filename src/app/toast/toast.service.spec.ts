/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastyService, ToastyConfig, ToastOptions, ToastService]
    });
  });

  it('should ...', inject([ToastService], (service: ToastService) => {
    expect(service).toBeTruthy();
  }));
});
