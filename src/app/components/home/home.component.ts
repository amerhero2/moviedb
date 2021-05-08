import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies;
  searchDelay;
  searchInput;
  moviesSub: Subscription;
  tabValue: number = 2;

  constructor(private moviesService: MoviesService , private router: Router , private tvShowsService: TvShowsService) { }

  ngOnInit(){
    if(this.router.url == '/home/movies') this.tabValue = 1;
  }

  search(searchText : string){
    //clears the stack of the user's inputs
    clearTimeout(this.searchDelay);
    //handles multiple requests on each keystroke and minimal required name length
    this.searchDelay = setTimeout(()=>{
        if(searchText.length < 1){
          this.searchInput = ''
          this.getUnfilteredData();
        }else if(searchText.length > 2){
          this.getFilteredData(searchText);
          this.searchInput = searchText;
        }
    }, 700)
  }


  toggleMovies(){
    this.tabValue = 1;
    this.searchInput = '';
  }


  toggleTvShows(){
    this.tabValue = 2;
    this.searchInput = '';
  }


  getFilteredData(searchText: string){
    if(this.router.url == '/home/movies'){
      this.moviesService.searchMovies(searchText);
    }else{
      this.tvShowsService.searchTvShows(searchText);
    }
  }

  getUnfilteredData(){
    if(this.router.url == '/home/movies'){
      this.moviesService.getMovies();
    }else{
      this.tvShowsService.getTvShows();
    }
  }


}
