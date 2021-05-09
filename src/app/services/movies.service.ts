import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  allMovies: Movie [] = [];
  moviesSubject = new Subject<Movie[]>();
  movieDetailsSub = new Subject<Movie>();

  getMoviesListener(){
    return this.moviesSubject.asObservable();
  }

  getMovieDetailsListener(){
    return this.movieDetailsSub.asObservable();
  }

  getMovies(){
    this.http.get(environment.moviesURL).subscribe((movies:any) => {
      let fetchedMovies = movies.results;
      this.allMovies = fetchedMovies.slice(0, 10);
      this.moviesSubject.next([...this.allMovies]);
    })
  }


  searchMovies(searchText: string){
    this.http.get(environment.searchMoviesURL + searchText ).subscribe((movies:any) => {
      this.allMovies = movies.results;
      this.moviesSubject.next([...this.allMovies]);
    })
  }


  getMovieDetails(id: number){
    this.http.get(environment.movieDetailsURL + id).subscribe((movie: Movie) => {
      this.movieDetailsSub.next({...movie});
    })
  }
}
