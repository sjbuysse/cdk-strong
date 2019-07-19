import { Component, Input, OnInit } from '@angular/core';
import CurrentlyPlayingResponse = SpotifyApi.CurrentlyPlayingResponse;

@Component({
  selector: 'sb-music-player',
  template: `
    <!--<img [attr.src]="currentlyPlaying?." alt="">-->
    <div class="button-wrapper">
      <button mat-icon-button [disabled]="!currentlyPlaying">
        <mat-icon>skip_previous</mat-icon>
      </button>
      <button mat-icon-button [disabled]="!currentlyPlaying">
        <mat-icon>play_circle_filled</mat-icon>
      </button>
      <button mat-icon-button [disabled]="!currentlyPlaying">
        <mat-icon>skip_next</mat-icon>
      </button>
    </div>

    <div class="progress-wrapper" *ngIf="currentlyPlaying">
      <span>3:06</span>
      <mat-progress-bar color="accent" mode="determinate" value="40"></mat-progress-bar>
      <span>3:19</span>
    </div>
  `,
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
  @Input() currentlyPlaying: CurrentlyPlayingResponse;
  constructor() {
  }

  ngOnInit() {
  }

}
