import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherDeatailViewComponent } from './components/weather-deatail-view/weather-deatail-view.component';

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
