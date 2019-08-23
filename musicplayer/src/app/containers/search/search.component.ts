import {Component} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {ReplaySubject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {MusicPlayerService} from '../../services/music-player.service';
import TrackObjectFull = SpotifyApi.TrackObjectFull;

@Component({
  selector: 'sb-search',
  template: `
    <mat-toolbar color="primary">
      <input (input)="term$.next($event?.target?.value)" type="text" placeholder="Search for songs"
             autocomplete="off">
      <mat-icon>search</mat-icon>
    </mat-toolbar>
    <sb-track-list
      [currentlyPlaying]="track$|async"
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
  track$ = this.musicPlayerService.currentTrack$;

  constructor(
    private spotifyService: SpotifyService,
    private matSnackBar: MatSnackBar,
    private musicPlayerService: MusicPlayerService) {
    this.results$.subscribe(resp => this.musicPlayerService.setTrackList(resp.tracks.items));
  }

  onPlay(track: TrackObjectFull): void {
    this.musicPlayerService.setTrack(track);
    this.musicPlayerService.play();
  }

  addToPlaylist({uri, playlistId}): void {
    this.spotifyService.addToPlaylist(uri, playlistId).subscribe(resp => {
      this.matSnackBar.open('Successfully added track to playlist!');
    })
  }
}
