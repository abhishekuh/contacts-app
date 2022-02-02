import { TestBed } from '@angular/core/testing';
import { Country } from '../models/country.model';

import { ContactsService } from './contacts.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const expectedCountries: Country[] = [
  {
    "iso2": "DE",
    "name": "Germany"
  },
  {
    "iso2": "AT",
    "name": "Austria"
  },
  {
    "iso2": "CH",
    "name": "Switzerland"
  },
  {
    "iso2": "NL",
    "name": "Netherlands"
  },
  {
    "iso2": "GB",
    "name": "United Kingdom"
  },
  {
    "iso2": "BE",
    "name": "Belgium"
  },
  {
    "iso2": "CZ",
    "name": "Czech Republic"
  },
  {
    "iso2": "HU",
    "name": "Hungary"
  },
  {
    "iso2": "SI",
    "name": "Slovenia"
  },
  {
    "iso2": "FR",
    "name": "France"
  },
  {
    "iso2": "IT",
    "name": "Italy"
  },
  {
    "iso2": "PL",
    "name": "Poland"
  },
  {
    "iso2": "ES",
    "name": "Spain"
  }
]

describe('ContactsService', () => {
  let service: ContactsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(ContactsService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected country list ', (done: DoneFn) => {

    httpClientSpy.get.and.returnValue(of(expectedCountries));

    service.getCountryList().subscribe(
      countries => {
        expect(countries).toEqual(expectedCountries, 'expected countries');
        done();
      },
      done.fail
    );
  });
});
