import {Component, EventEmitter, Input, Output} from '@angular/core';
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {combineLatest, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'sb-music-player',
  template: `
    <div class="left">
      <mat-card *ngIf="currentTrack">
        <mat-card-header>
          <img [attr.src]="getImage(currentTrack)" mat-card-avatar alt="">
          <mat-card-title>{{currentTrack?.name}}</mat-card-title>
          <mat-card-subtitle>{{getArtists(currentTrack)}}</mat-card-subtitle>
        </mat-card-header>
      </mat-card>
    </div>
    <div class="middle">
      <div class="button-wrapper">
        <button mat-icon-button [disabled]="!currentTrack" (click)="previous.emit()">
          <mat-icon>skip_previous</mat-icon>
        </button>
        <button mat-icon-button *ngIf="!playing" (click)="playStart.emit()" [disabled]="!currentTrack">
          <mat-icon>play_circle_filled</mat-icon>
        </button>
        <button mat-icon-button *ngIf="playing" (click)="pauseStart.emit()" [disabled]="!currentTrack">
          <mat-icon>pause_circle_filled</mat-icon>
        </button>
        <button mat-icon-button [disabled]="!currentTrack" (click)="next.emit()">
          <mat-icon>skip_next</mat-icon>
        </button>
      </div>
      <div class="progress-wrapper" *ngIf="currentTrack">
        <span>{{timeStr}}</span>
        <mat-progress-bar color="accent" mode="determinate" [value]="progress$|async"></mat-progress-bar>
        <span>{{durationStr}}</span>
      </div>
    </div>
    <div class="right">
      <ng-container *ngIf="currentTrack">
        <mat-icon>speaker</mat-icon>
        <mat-slider
          [value]="volume" [min]="0" [max]="1" [step]="0.1"
          (valueChange)="updateVolume.emit($event)"
        ></mat-slider>
      </ng-container>
    </div>

  `,
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent {
  timeStr: string;
  durationStr: string;
  time$ = new ReplaySubject<number>(1);
  duration$ = new ReplaySubject<number>(1);
  @Input() currentTrack: TrackObjectFull;
  @Input() playing: boolean;
  @Input() volume: number;

  @Input() set time(v: number) {
    const date = new Date(null);
    date.setSeconds(v);
    this.timeStr = date.toISOString().substr(14, 5);
    this.time$.next(v);
  }

  @Input() set duration(v: number) {
    const date = new Date(null);
    date.setSeconds(v);
    this.durationStr = date.toISOString().substr(14, 5);
    this.duration$.next(v);
  }

  @Output() playStart = new EventEmitter();
  @Output() pauseStart = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() updateVolume = new EventEmitter<number>();

  progress$ = combineLatest(this.time$, this.duration$).pipe(
    map(([time, duration]) => {
        return Math.floor(time / duration * 100);
      }
    )
  );

  getArtists(track: TrackObjectFull): string {
    return track && track.artists && track.artists.map(v => v.name).join(', ');
  }

  getImage(track: TrackObjectFull): string {
    return track && track.album.images && track.album.images[0].url;
  }
}
