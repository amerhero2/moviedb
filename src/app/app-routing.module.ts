import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesListComponent } from './components/home/movies-list/movies-list.component';
import { TvshowsListComponent } from './components/home/tvshows-list/tvshows-list.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    children :[
      {
        path: '', 
        component: TvshowsListComponent, 
      },
      {
        path: 'movies', 
        component: MoviesListComponent, 
      },
      {
        path: 'tvshows',
        component: TvshowsListComponent,
      },
    ]
  },
  {
    path: "details",
    component: DetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
