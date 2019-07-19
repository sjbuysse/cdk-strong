import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'sb-playlist',
  template: `
    <ng-container *ngIf="playlist$|async as playlist">
      <mat-toolbar color="primary">
        <img *ngIf="playlist?.images?.length > 0" [attr.src]="playlist?.images[0]?.url" class="img-small">
        <mat-icon *ngIf="playlist?.images?.length === 0">playlist_play</mat-icon>
        <span>Playlist: {{playlist?.name}}</span>
      </mat-toolbar>
      <sb-track-list
        [tracks]="playlist?.tracks?.items"
        [playlists]="playlists$|async"
        (playTrack)="onPlay($event)"
      ></sb-track-list>
    </ng-container>
  `,
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  playlistId$ = this.activatedRoute.params.pipe(map(v => v.id));
  playlist$ = this.playlistId$.pipe(switchMap(id => this.spotifyService.getPlayList(id)));
  playlists$ = this.spotifyService.getPlayLists();

  constructor(private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService) {
  }

  onPlay(id: string): void {
    this.spotifyService.play(id);
  }
}
