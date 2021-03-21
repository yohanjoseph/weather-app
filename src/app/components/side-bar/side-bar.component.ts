/**
 * Define - All Sidebar Component Operations
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WeatherByCity } from '../../models/weather.model';
import { WeatherDataService } from '../../services/weather-data.service';
import { AppSettings as _const } from '../../app-settings/app.settings';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  public cityName: string = null;
  public countryList: WeatherByCity[] = [];
  public btnDisable: boolean = false;

  constructor(
    private weatherDataService: WeatherDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cityName = 'London';
    this.addCity();
  }

  addCity(): void {
    if (this.cityName && this.cityName.trim() !== '' && !this.btnDisable) {
      this.btnDisable = true;
      this.weatherDataService.getCity(this.cityName).subscribe((res: any) => {
        if (!res) {
          alert('Country not found !!!');
        } else {
          this.countryList = res;
          this.router.navigate(['/detail-view', res[0].id]);
        }
        this.cityName = null;
        this.btnDisable = false;
      });
    }
  }
  getValue(value: string): void {
    this.cityName = value;
  }
  /***
   *
   * We can move all events to an global Host Listner.As of now implenting using events handler for each element
   *
   */

  refreshCity(city: WeatherByCity): void {
    this.weatherDataService.refreshCity(city.id).subscribe((res) => {
      this.setCityValue(res);
    });
  }
  removeCity(city: WeatherByCity): void {
    this.weatherDataService.removeCity(city.id).subscribe((res) => {
      this.setCityValue(res);
      this.router.navigate(['/detail-view', this.countryList[0].id]);
    });
  }
  clearAll(): void {
    this.weatherDataService.removeAllCities().subscribe((res) => {
      this.setCityValue(res);
      this.router.navigate(['detail-view']);
    });
  }
  detailView(countryId: number): void {
    this.router.navigate(['/detail-view', countryId]);
  }
  setCityValue(value: any): void {
    this.countryList = value;
  }
}
