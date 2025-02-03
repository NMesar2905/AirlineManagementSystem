import { TestBed } from '@angular/core/testing';

import { AirIndiaFlightService } from './air-india-flight.service';

describe('AirIndiaFlightService', () => {
  let service: AirIndiaFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirIndiaFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
