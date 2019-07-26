import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'sb-unauthorized',
  template: `
    <mat-toolbar color="primary">
      <mat-icon>perm_identity</mat-icon>
      <span>You are unauthorized!</span>
    </mat-toolbar>
    <div class="unauthorized-wrapper">
      <button mat-flat-button color="accent" (click)="authorize()">Authorize</button>
    </div>
  `,
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {

  constructor(private spotifyService: SpotifyService) {
  }

  authorize(): void {
    this.spotifyService.authorize();
  }
}
