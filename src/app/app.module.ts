import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { MoviesListComponent } from './components/home/movies-list/movies-list.component';
import { TvshowsListComponent } from './components/home/tvshows-list/tvshows-list.component';
import { APIKeyInterceptor } from './interceptors/api-key-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    DetailsComponent,
    MoviesListComponent,
    TvshowsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: APIKeyInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
