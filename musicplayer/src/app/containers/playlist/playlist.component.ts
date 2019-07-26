import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, mapTo, mergeMap, switchMap} from 'rxjs/operators';
import {SpotifyService} from '../../services/spotify.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {MusicPlayerService} from '../../services/music-player.service';

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
        [currentlyPlaying]="track$|async"
        [tracks]="tracks$|async"
        [searchMode]="false"
        [playlists]="playlists$|async"
        (removeFromPlaylist)="removeFromPlaylist($event)"
        (reorder)="reorderTracks($event)"
        (playTrack)="onPlay($event)"
      ></sb-track-list>
    </ng-container>
  `,
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnDestroy {
  playlistId$ = this.activatedRoute.params.pipe(map(v => v.id));
  trigger$ = new BehaviorSubject(true);
  playlist$ = this.playlistId$.pipe(
    mergeMap((id: string) => this.trigger$.pipe(mapTo(id))), // reload
    switchMap(id => this.spotifyService.getPlayList(id)));
  playlists$ = this.spotifyService.playlists$;
  tracks$ = this.playlist$.pipe(
    map(playlist => playlist.tracks.items.map(item => item.track))
  );
  track$ = this.musicPlayerService.currentTrack$;
  destroy$ = new Subject();

  constructor(private activatedRoute: ActivatedRoute,
              private spotifyService: SpotifyService,
              private musicPlayerService: MusicPlayerService,
              private matSnackBar: MatSnackBar) {
    this.tracks$.subscribe(tracks => this.musicPlayerService.setTrackList(tracks));
  }

  onPlay(track: TrackObjectFull): void {
    this.musicPlayerService.setTrack(track);
    this.musicPlayerService.play();
  }

  removeFromPlaylist(uri: string): void {
    this.spotifyService.removeFromPlaylist(uri, this.activatedRoute.snapshot.params.id).subscribe(resp => {
      this.trigger$.next(true);
      this.matSnackBar.open('Successfully removed track from playlist!');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  reorderTracks({currentIndex, newIndex}): void {
    this.spotifyService.reorderTracks(currentIndex, newIndex, this.activatedRoute.snapshot.params.id).subscribe(resp => {
      this.trigger$.next(true);
      this.matSnackBar.open('Order succesfully updated');
    });
  }
}
