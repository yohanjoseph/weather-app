/**
 * Common data service for entire Weather Application.CENTER POINT OF DATA.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { WeatherByCity, Daily } from '../models/weather.model';
import { environment as _env } from '../../environments/environment';
import { AppSettings as _const } from '../app-settings/app.settings';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  public apiUrlByCity = _env.apiUrlByCity;
  public apiUrlOneCall = _env.apiUrlOneCall;
  public cityList: WeatherByCity[] = [];
  public selecetdCity: WeatherByCity;

  private countryListSubject$ = new BehaviorSubject<WeatherByCity[]>(
    this.cityList
  );
  public countryListChanged = this.countryListSubject$.asObservable();

  constructor(private http: HttpClient) {}

  getCity(cityName: string): Observable<WeatherByCity[]> {
    const url = `${this.apiUrlByCity}?q=${cityName}&appid=${_env.apiKey}`;
    return this.http.get(url).pipe(
      mergeMap((res) => {
        const obj: WeatherByCity = res[_const.City];
        const allOneUrl = `${this.apiUrlOneCall}?lat=${obj.coord.lat}&lon=${obj.coord.lon}&exclude=${_const.QueryString}&appid=${_env.apiKey}&units=metric`;
        return this.http.get(allOneUrl).pipe(
          map((allData) => {
            this.cityList.unshift({
              ...res[_const.City],
              weather: this.generateWeatherData(allData),
              daily: this.processDailyData(allData[_const.Daily]),
            });
            this.limitCountryList();
            this.countryListSubject$.next(this.cityList);
            return this.cityList;
          })
        );
      }),
      catchError((error) => of(null))
    );
  }
  removeCity(cityId: number): Observable<WeatherByCity[]> {
    const findIndex = this.cityList.findIndex((item) => item.id === cityId);
    if (findIndex > -1) {
      this.cityList.splice(findIndex, 1);
      return of(this.cityList);
    }
  }
  refreshCity(cityId: number): Observable<WeatherByCity[]> {
    const index = this.cityList.findIndex((item) => item.id === cityId);
    const obj = this.cityList[index];

    const allOneUrl = `${this.apiUrlOneCall}?lat=${obj.coord.lat}&lon=${obj.coord.lon}&exclude=${_const.QueryString}&appid=${_env.apiKey}&units=metric`;
    return this.http.get(allOneUrl).pipe(
      map((res) => {
        this.cityList[index].weather = this.generateWeatherData(res);
        this.cityList[index].daily = this.processDailyData(res[_const.Daily]);
        this.countryListSubject$.next(this.cityList);
        return this.cityList;
      })
    );
  }
  removeAllCities(): Observable<WeatherByCity[]> {
    this.cityList = [];
    return of(this.cityList);
  }
  private limitCountryList(): void {
    if (this.cityList.length > 8) {
      this.cityList.pop();
    }
  }
  getDeatiledInfo(cityId: number): Observable<WeatherByCity> {
    const index = this.cityList.findIndex((item) => item.id === cityId);
    this.selecetdCity = this.cityList[index];
    return of(this.selecetdCity);
  }
  private generateWeatherData(rawData: any): any {
    const data: WeatherByCity = {
      ...rawData[_const.Current][_const.Weather][0],
      temp: `${Math.round(rawData[_const.Current][_const.Temp])}C`,
      windspeed: `${rawData[_const.Current][_const.WindSpeed]}ms ${
        rawData[_const.Current][_const.WindDeg]
      } deg`,
      pressure: rawData[_const.Current][_const.Pressure],
      iconPath: _const.mapWeatherIconImage(
        rawData[_const.Current][_const.Weather][0][_const.Main]
      ),
    };
    return data;
  }
  private processDailyData(rawData: any): Daily[] {
    const data: Daily[] = [];
    for (let step = 0; step < 5; step++) {
      const daily: Daily = {
        day: _const.Week[new Date(rawData[step].dt * 1000).getUTCDay()],
        date: new Date(rawData[step].dt * 1000).getUTCDate(),
        weather: {
          ...rawData[step][_const.Weather][0],
          windspeed: `${rawData[step][_const.WindSpeed]}ms ${
            rawData[step][_const.WindDeg]
          } deg`,
          pressure: rawData[step][_const.Pressure],
          temp: `${rawData[step][_const.Temp].day}C`,
          iconPath: _const.mapWeatherIconImage(
            rawData[step][_const.Weather][0][_const.Main]
          ),
        },
      };
      data.push(daily);
    }
    return data;
  }
}
