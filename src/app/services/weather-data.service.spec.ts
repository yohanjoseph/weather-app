import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { WeatherDataService } from './weather-data.service';

describe('WeatherDataService', () => {
  let service: WeatherDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WeatherDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
