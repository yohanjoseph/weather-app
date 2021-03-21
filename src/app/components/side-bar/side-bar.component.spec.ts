import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Routes } from '@angular/router';

import { SideBarComponent } from './side-bar.component';
import { WeatherDeatailViewComponent } from '../weather-deatail-view/weather-deatail-view.component';
import { WeatherDataService } from '../../services/weather-data.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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
const updatedRes = [
  {
    id: 2643743,
    name: 'London City',
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

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let weatherDataService: WeatherDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideBarComponent, WeatherDeatailViewComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [WeatherDataService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    weatherDataService = TestBed.get(WeatherDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('check whether countryList is generating according the input', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.route-link'))).toEqual([]);
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
    component.countryList = resp;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.route-link')).length).toEqual(
      component.countryList.length
    );
  });
  it('check whether add city is working or not', async(() => {
    fixture.detectChanges();
    expect(component.countryList.length).toEqual(0);
    spyOn(weatherDataService, 'getCity').and.returnValue(of(resp));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.countryList.length).toEqual(1);
    });
    component.cityName = 'Kochi';
    component.btnDisable = false;
    component.addCity();
  }));
  it('check wheter refresh city is working or not', async(() => {
    component.countryList = resp;
    fixture.detectChanges();
    expect(component.countryList[0].name === 'London').toBeTruthy();
    spyOn(weatherDataService, 'refreshCity').and.returnValue(of(updatedRes));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.countryList[0].name === 'London').toBeFalsy();
      expect(component.countryList[0].name === 'London City').toBeTruthy();
    });
    component.refreshCity(component.countryList[0]);
  }));
  it('check whether Remove all cities working or not', async(() => {
    component.countryList = resp;
    fixture.detectChanges();
    expect(component.countryList.length).toEqual(1);
    spyOn(weatherDataService, 'removeAllCities').and.returnValue(of([]));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.countryList.length).toEqual(0);
    });
    component.clearAll();
  }));
});
