import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TvShow } from '../models/tvshow';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  
  constructor(private http: HttpClient) { }

  tvShows : TvShow[] = [];
  tvShowsSubject = new Subject<TvShow[]>();
  tvShowDetailsSub = new Subject<TvShow>();

  getTvShowsListener(){
    return this.tvShowsSubject.asObservable();
  }

  getTvShowDetailsListener(){
    return this.tvShowDetailsSub.asObservable();
  }

  getTvShows(){
    this.http.get(environment.tvShowsURL).subscribe((tvShows:any) => {
      let fetchedTvShows = tvShows.results;
      this.tvShows = fetchedTvShows.slice(0, 10);
      this.tvShowsSubject.next([...this.tvShows]);
    });
  }


  searchTvShows(searchText:string){
    this.http.get(environment.searchTvShowsURL + searchText ).subscribe((tvShows:any) => {
      this.tvShows = tvShows.results;
      this.tvShowsSubject.next([...this.tvShows]);
    });
  }

  getTvShowDetails(id : number){
    this.http.get(environment.tvShowDetailsURL + id).subscribe((tvShow: TvShow) => {
      this.tvShowDetailsSub.next({...tvShow})
    });
  }

  
}
