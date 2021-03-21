import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { WeatherDeatailViewComponent } from './weather-deatail-view/weather-deatail-view.component';

@NgModule({
  declarations: [SideBarComponent, WeatherDeatailViewComponent],
  imports: [CommonModule],
  exports: [SideBarComponent, WeatherDeatailViewComponent],
})
export class SharedModule {}
