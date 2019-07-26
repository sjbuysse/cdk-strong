import {Component} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {ReplaySubject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'sb-search',
  template: `
    <mat-toolbar color="primary">
      <mat-form-field>
        <input (input)="term$.next($event?.target?.value)" matInput type="text" placeholder="Search for songs" autocomplete="off">
        <mat-icon>search</mat-icon>
      </mat-form-field>
    </mat-toolbar>
    <sb-track-list
      [tracks]="(results$|async)?.tracks?.items"
      [searchMode]="true"
      [playlists]="playlists$|async"
      (playTrack)="onPlay($event)"
      (addToPlaylist)="addToPlaylist($event)"
    ></sb-track-list>

  `,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  term$ = new ReplaySubject<string>(1);
  playlists$ = this.spotifyService.playlists$;
  results$ = this.term$.pipe(
    debounceTime(200),
    switchMap(v => this.spotifyService.search(v))
  )

  constructor(private spotifyService: SpotifyService, private matSnackBar: MatSnackBar) {

  }

  onPlay(e: any): void {

  }

  addToPlaylist({uri, playlistId}): void {
    this.spotifyService.addToPlaylist(uri, playlistId).subscribe(resp => {
      this.matSnackBar.open('Successfully added track to playlist!');
    })
  }
}
