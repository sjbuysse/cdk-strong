import { Component } from '@angular/core';
import { PlaylistService } from './services/playlist.service';
import { SpotifyService } from './services/spotify.service';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'sb-root',
  template: `
    <mat-sidenav-container class="sidenav">
      <mat-sidenav mode="side" [opened]="menuOpen">
        <sb-sidebar
          [playlists]="playlists$|async"
          (closeMenu)="menuOpen = false"
          (logout)="onLogout()"
        ></sb-sidebar>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="menu-open-bar" *ngIf="!menuOpen">
          <button mat-icon-button (click)="menuOpen =true">
            <mat-icon>more_vert</mat-icon>
          </button>
        </div>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
    <sb-music-player [currentlyPlaying]="currentPlayingTrack$|async"></sb-music-player>

  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuOpen = true;
  playlists$ = this.spotifyService.isAuthorized().pipe(
    filter(v => !!v),
    switchMap(() => this.spotifyService.getPlayLists())
  );
  currentPlayingTrack$ = this.spotifyService.isAuthorized().pipe(
    filter(v => !!v),
    switchMap(() => this.spotifyService.getMyCurrentPlayingTrack())
  );

  constructor(private playlistService: PlaylistService, private spotifyService: SpotifyService, private router: Router) {

  }

  onLogout(): void {
    this.spotifyService.logout();
    this.router.navigate(['unauthorized']);
  }
}
