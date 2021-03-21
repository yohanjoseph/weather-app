import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';

import { WeatherDeatailViewComponent } from './weather-deatail-view.component';
import { WeatherDataService } from '../../services/weather-data.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

const resp = [
  {
    id: 2643743,
    name: 'London',
    coord: {
      lat: 51.5085,
      lon: -0.1257,
    },
    country: 'GB',
    population: 1000000,
    timezone: 3600,
    sunrise: 1591069687,
    sunset: 1591128560,
    weather: {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01n',
      temp: '15C',
      windspeed: '1.5ms 0 deg',
      pressure: 1022,
      iconPath: 'assets/icons/amcharts_weather/animated/day.svg',
    },
    daily: [
      {
        day: 'Tue',
        date: 2,
        weather: {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04d',
          windspeed: '2.75ms 337 deg',
          pressure: 1020,
          temp: '22.91C',
          iconPath: 'assets/icons/amcharts_weather/animated/cloudy.svg',
        },
      },
      {
        day: 'Wed',
        date: 3,
        weather: {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
          windspeed: '4.66ms 36 deg',
          pressure: 1008,
          temp: '16.85C',
          iconPath: 'assets/icons/amcharts_weather/animated/rainy-6.svg',
        },
      },
      {
        day: 'Thu',
        date: 4,
        weather: {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
          windspeed: '5.77ms 342 deg',
          pressure: 1004,
          temp: '15.52C',
          iconPath: 'assets/icons/amcharts_weather/animated/rainy-6.svg',
        },
      },
      {
        day: 'Fri',
        date: 5,
        weather: {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
          windspeed: '4.65ms 294 deg',
          pressure: 1004,
          temp: '15.74C',
          iconPath: 'assets/icons/amcharts_weather/animated/rainy-6.svg',
        },
      },
      {
        day: 'Sat',
        date: 6,
        weather: {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
          windspeed: '6.21ms 297 deg',
          pressure: 1003,
          temp: '17.26C',
          iconPath: 'assets/icons/amcharts_weather/animated/rainy-6.svg',
        },
      },
    ],
  },
];

const routes: Routes = [
  {
    path: '',
    redirectTo: '/detail-view',
    pathMatch: 'full',
  },
  {
    path: 'detail-view',
    component: WeatherDeatailViewComponent,
  },
  {
    path: 'detail-view/:id',
    component: WeatherDeatailViewComponent,
  },
  {
    path: '**',
    redirectTo: '/detail-view',
    pathMatch: 'full',
  },
];

describe('WeatherDeatailViewComponent', () => {
  let component: WeatherDeatailViewComponent;
  let fixture: ComponentFixture<WeatherDeatailViewComponent>;
  let weatherDataService: WeatherDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [WeatherDataService],
      declarations: [WeatherDeatailViewComponent, SideBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDeatailViewComponent);
    component = fixture.componentInstance;
    weatherDataService = TestBed.get(WeatherDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('check whether all city info loading correctly', async(() => {
    component.cityId = resp[0].id;
    fixture.detectChanges();
    expect(component.cityInfo).toBeNull();
    spyOn(weatherDataService, 'getDeatiledInfo').and.returnValue(of(resp[0]));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(
        fixture.debugElement.query(By.css('h2')).nativeElement.textContent
      ).toEqual('London');
      expect(component.cityInfo).toBeTruthy();
    });
    component.getCityInfo();
  }));
});
