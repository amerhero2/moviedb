import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  private moviesSub: Subscription;
  isLoading = false;
  movies: Movie [] = [];

  constructor(private http: HttpClient , private moviesService: MoviesService, public router: Router) { }

  ngOnInit(){

    this.moviesService.getMovies();
    this.isLoading = true;

    this.moviesSub = this.moviesService.getMoviesListener().subscribe((movies : Movie[] )=> {
      this.movies = movies;
      this.isLoading = false;
    })
  }

  openMovieDetails(movie){
    this.router.navigate(['/details'], { queryParams: { mode:'movie', id: movie.id } });
  }

  ngOnDestroy(){
    if(this.moviesSub) this.moviesSub.unsubscribe();
  }
}
