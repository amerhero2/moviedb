import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { Details } from 'src/app/models/details';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id:number;
  mode:string;
  isLoading = false;
  aboutString:string;
  detailsSub: Subscription;
  details:Details = {};


  constructor(private router: Router, private moviesService: MoviesService, private tvShowsService: TvShowsService , private location: Location) { 
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    this.id = parseInt(snapshot.root.queryParams.id);
    this.mode = snapshot.root.queryParams.mode;
  }

  ngOnInit(): void {
    this.isLoading = true;
    if(this.mode == 'movie'){
       this.aboutString = 'About the movie: '
       this.moviesService.getMovieDetails(this.id);

       this.detailsSub = this.moviesService.getMovieDetailsListener().subscribe((movie:Details) => {
         this.details = movie;
         this.isLoading = false;
       });
    }else{
      this.aboutString = 'About the tv show: '
      this.tvShowsService.getTvShowDetails(this.id);

      this.detailsSub = this.tvShowsService.getTvShowDetailsListener().subscribe((tvShow:Details) => {
        this.details = tvShow;
        this.isLoading = false;
        this.details.title = tvShow.original_name;
      });
    }
  }

  goBack() {
    this.location.back();
}

  ngOnDestroy(){
    this.detailsSub.unsubscribe();
  }
}
