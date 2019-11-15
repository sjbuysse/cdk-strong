import {Component} from '@angular/core';
import {SpotifyService} from './services/spotify.service';
import {Router} from '@angular/router';
import {MusicPlayerService} from './services/music-player.service';

@Component({
  selector: 'sb-root',
  template: `
    <ng-container *ngIf="isAuthorized$|async; else unauthorized">
      <sb-music-player
        [playing]="playing$|async"
        [volume]="volume$|async"
        [time]="time$|async"
        [duration]="duration$|async"
        [currentTrack]="currentTrack$|async"
        (updateVolume)="updateVolume($event)"
        (next)="onNext()"
        (previous)="onPrevious()"
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
  volume$ = this.musicPlayerService.volume$;

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

  updateVolume(value: number): void {
    this.musicPlayerService.updateVolume(value);
  }

  onNext(): void {
    this.musicPlayerService.next();
  }

  onPrevious(): void {
    this.musicPlayerService.previous();
  }

  onOpenMenu(): void {
    // TODO: implement
  }

  onCloseMenu(): void {
    // TODO: implement
  }
}
