/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RedirectService } from './redirect.service';
import {Redirect} from "./redirect.model";

// Mock response data
const mockResponse = [
  {
    "active": true,
    "redirectCode": 301,
    "id": 0,
    "ruleName": "Ad Choices 9899",
    "path": "/adchoices.asp",
    "query": "",
    "redirectUrl": "/ad-choices"
  },
  {
    "ruleName": "Full Screen Weather",
    "path": "",
    "query": "brand=wxmap",
    "active": true,
    "redirectUrl": "/fullscreenweather",
    "redirectCode": 301,
    "id": 1
  },
  {
    "ruleName": "Full Screen Weather auto/wxmap*",
    "path": "/auto/wxmap*",
    "query": "",
    "active": true,
    "redirectUrl": "/fullscreenweather",
    "redirectCode": 301,
    "id": 2
  },
  {
    "active": true,
    "redirectCode": "301",
    "id": 3,
    "ruleName": "Legal - Terms of Service",
    "path": "/members/tos.asp",
    "query": "",
    "redirectUrl": "/legal",
    "editing": false
  },
  {
    "active": true,
    "redirectCode": "301",
    "id": 4,
    "ruleName": "Legal - Ad Network",
    "path": "/members/ad-network.asp",
    "query": "",
    "redirectUrl": "/members/ad-network",
    "editing": false
  },
  {
    "active": true,
    "redirectCode": "301",
    "id": 5,
    "ruleName": "Legal - Ad Services",
    "path": "/members/ad-services.asp",
    "query": "",
    "redirectUrl": "/members/ad-services"
  },
  {
    "active": true,
    "redirectCode": "301",
    "ruleName": "WunderMap",
    "path": "/micro/wundermap/",
    "redirectUrl": "/wundermap",
    "id": 6
  },
  {
    "active": true,
    "redirectCode": "301",
    "ruleName": "About - Contact Us",
    "path": "/about/contact.asp",
    "redirectUrl": "/about/contact-us",
    "id": 7
  },
  {
    "ruleName": "task3 ",
    "path": "path3",
    "query": "",
    "active": false,
    "redirectUrl": "",
    "redirectCode": "301",
    "id": 9
  },
  {
    "active": true,
    "redirectCode": "301",
    "ruleName": "Preparedness - Wildfire",
    "path": "/prepare/wildfire.asp",
    "redirectUrl": "/prepare/wildfire",
    "id": 18
  }
];

describe('RedirectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RedirectService,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [
            MockBackend,
            BaseRequestOptions
          ]
        },
        MockBackend,
        BaseRequestOptions
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([RedirectService], (service: RedirectService) => {
    expect(service).toBeTruthy();
  }));

  it('should response with data from getRedirects',
    inject([RedirectService, MockBackend], (redirectService, mockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: mockResponse
        })));
      });

      redirectService.getRedirects().subscribe((redirects) => {
        console.log('length: ', redirects.length)
        expect(redirects.length).toBe(10);
        expect(redirects[0].active).toBe(true);
      });
    }));
});
