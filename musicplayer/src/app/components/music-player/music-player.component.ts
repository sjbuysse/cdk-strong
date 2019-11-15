import { Component, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import TrackObjectFull = SpotifyApi.TrackObjectFull;

@Component({
  selector: 'sb-music-player',
  template: `
    <div class="left">
      <mat-card *ngIf="currentTrack">
        <!-- replace div with mat-card and use mat-card-header, mat-card-avatar, mat-card-title and mat-card-subtitle. -->
        <div>
          <img [attr.src]="getImage(currentTrack)" alt="">
          <div></div>
          <div>{{getArtists(currentTrack)}}</div>
        </div>
      </mat-card>
    </div>
    <div class="middle">
      <div class="button-wrapper">
        <!-- use mat-icon-button directive with the following mat-icon components:
         skip_previous
         play_circle_filled
         pause_circle_filled
         skip_next
        -->
        <button [disabled]="!currentTrack" (click)="previous.emit()">
          <span>skip_previous</span>
        </button>
        <button *ngIf="!playing" (click)="playStart.emit()" [disabled]="!currentTrack">
          <span>play_circle_filled</span>
        </button>
        <button *ngIf="playing" (click)="pauseStart.emit()" [disabled]="!currentTrack">
          <span>pause_circle_filled</span>
        </button>
        <button [disabled]="!currentTrack" (click)="next.emit()">
          <span>skip_next</span>
        </button>
      </div>
      <div class="progress-wrapper" *ngIf="currentTrack">
        <span>{{timeStr}}</span>
        <!-- add a mat-progress-bar with color set to accent, mode to determinate
        and bind the value input to the progress$ with the async pipe -->
        <span>{{durationStr}}</span>
      </div>
    </div>
    <div class="right">
      <ng-container *ngIf="currentTrack">
        <mat-icon>speaker</mat-icon>
        <!-- use the mat-slide component (min value is 0, max value is 1 and the steps are 0.10)
        if the value changes, emit to the updateVolume eventEmitter
        -->
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
