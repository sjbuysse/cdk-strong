import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, scan, switchMap, tap } from 'rxjs/operators';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import playlistObjectSimplified = SpotifyApi.PlaylistObjectSimplified;

@Component({
  selector: 'sb-search-playlists',
  template: `
    <mat-toolbar color="primary">
      <mat-form-field>
        <input (input)="term$.next($event?.target?.value)" matInput type="text" placeholder="Search for playlists"
               autocomplete="off">
        <mat-icon>search</mat-icon>
      </mat-form-field>
    </mat-toolbar>
    <cdk-virtual-scroll-viewport itemSize="107" class="playlists-list" (scrolledIndexChange)="getNextPlaylists($event)">
      <mat-card *cdkVirtualFor="let playlist of playlists$ | async" class="playlist-card" (click)="listenToplaylist(playlist)">
        <span class="name">{{playlist.name }}</span>
        <div class="owner">
          <mat-icon>account_circle</mat-icon>
          <span>{{playlist.owner.display_name}}</span>
        </div>
        <div class="song-counter">
          <mat-icon>music_note</mat-icon>
          {{playlist.tracks?.total}}
        </div>
        <img [src]="playlist?.images[0]?.url" alt="album-preview">
      </mat-card>
    </cdk-virtual-scroll-viewport>
  `,
  styleUrls: ['./search-playlists.component.scss']
})
export class SearchPlaylistsComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, {static: false})
  viewport: CdkVirtualScrollViewport;

  term$ = new Subject<string>();
  offset$ = new BehaviorSubject<number>(0);
  playlists$: Observable<playlistObjectSimplified[]>;

  constructor(private spotifyService: SpotifyService,
              private router: Router) {
  }

  ngOnInit() {
    this.playlists$ = this.term$.pipe(
      tap(_ => {
        this.offset$.next(0);
        this.viewport.scrollToIndex(0);
      }),
      switchMap(term => {
        return this.offset$
          .pipe(
            debounceTime(200),
            switchMap(offset => this.spotifyService.searchPlaylists(term, offset)),
            scan((acc, cur) => ([...acc, ...cur]), [])
          )
      })
    );
  }

  listenToplaylist(playlist: playlistObjectSimplified) {
    this.router.navigate(['playlists', playlist.id]);
  }

  getNextPlaylists() {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log('triggered', end, total);
    if (end === total) {
      console.log('fetching new');
      this.offset$.next(this.offset$.value + 20);
    }
  }
}
