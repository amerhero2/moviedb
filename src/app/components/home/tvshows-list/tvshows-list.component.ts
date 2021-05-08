import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TvShow } from 'src/app/models/tvshow';
import { TvShowsService } from 'src/app/services/tv-shows.service';

@Component({
  selector: 'app-tvshows-list',
  templateUrl: './tvshows-list.component.html',
  styleUrls: ['./tvshows-list.component.scss']
})
export class TvshowsListComponent implements OnInit {

  private tvShowsSub: Subscription;
  isLoading = false;
  tvShows: TvShow[] = [];

  constructor(private tvShowsService: TvShowsService , private router: Router) { }

  ngOnInit(): void {
    this.tvShowsService.getTvShows();
    this.isLoading = true;

    this.tvShowsSub = this.tvShowsService.getTvShowsListener().subscribe((tvShows:TvShow[]) => {
      this.tvShows = tvShows
      this.isLoading = false;
    });

  }

  openTvShowDetails(tvShow){
    this.router.navigate(['/details'], { queryParams: { mode:'tvshow', id: tvShow.id }});
  }

  ngOnDestroy(){
    this.tvShowsSub.unsubscribe();
  }

}
