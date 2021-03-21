/**
 * Componet for managing detailed view for Weather App.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WeatherDataService } from '../../services/weather-data.service';
import { WeatherByCity } from 'src/app/models/weather.model';

@Component({
  selector: 'app-weather-deatail-view',
  templateUrl: './weather-deatail-view.component.html',
  styleUrls: ['./weather-deatail-view.component.scss'],
})
export class WeatherDeatailViewComponent implements OnInit {
  public cityId: number;
  public cityInfo: WeatherByCity = null;
  constructor(
    private router: Router,
    private params: ActivatedRoute,
    private weatherService: WeatherDataService
  ) {
    this.params.params.subscribe((params) => {
      if (params.id) {
        this.cityId = Number.parseFloat(params.id);
        this.getCityInfo();
      } else {
        this.cityId = null;
      }
    });
  }

  ngOnInit(): void {
    this.getCityInfo();
  }
  getCityInfo(): void {
    this.weatherService.getDeatiledInfo(this.cityId).subscribe((resp) => {
      if (resp) {
        this.cityInfo = resp;
      } else {
        this.router.navigate(['detail-view']);
      }
    });
  }
  refreshWeather(): void {
    if (this.cityId) {
      this.weatherService.refreshCity(this.cityId).subscribe((res) => {
        this.getCityInfo();
      });
    }
  }
}
