import {Component} from '@angular/core';
import {SpotifyService} from './services/spotify.service';
import {Router} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import {MusicPlayerService} from './services/music-player.service';

@Component({
  selector: 'sb-root',
  template: `
    <ng-container *ngIf="isAuthorized$|async; else unauthorized">
      <mat-sidenav-container class="sidenav">
        <mat-sidenav mode="side" [opened]="menuOpen">
          <sb-sidebar
            [playlists]="playlists$|async"
            [me]="me$|async"
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
      <sb-music-player
        [playing]="playing$|async"
        [time]="time$|async"
        [duration]="duration$|async"
        [currentTrack]="currentTrack$|async"
        (playStart)="playStart()"
        (pauseStart)="pauseStart()"></sb-music-player>
    </ng-container>
    <ng-template #unauthorized>
      <router-outlet></router-outlet>
    </ng-template>

  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuOpen = true;
  playlists$ = this.spotifyService.playlists$;
  isAuthorized$ = this.spotifyService.isAuthorized();
  me$ = this.spotifyService.me$;

  playing$ = this.musicPlayerService.playing$;
  currentTrack$ = this.musicPlayerService.currentTrack$;
  time$ = this.musicPlayerService.time$;
  duration$ = this.musicPlayerService.duration$;

  constructor(
    private spotifyService: SpotifyService,
    private musicPlayerService: MusicPlayerService,
    private router: Router) {
    this.isAuthorized$.subscribe(res => {
      if (res === false) {
        this.router.navigate(['unauthorized']);
      }
    });
  }

  onLogout(): void {
    this.spotifyService.logout();
    this.router.navigate(['unauthorized']);
  }

  playStart(): void {
    this.musicPlayerService.play();
  }

  pauseStart(): void {
    this.musicPlayerService.pause();
  }
}
