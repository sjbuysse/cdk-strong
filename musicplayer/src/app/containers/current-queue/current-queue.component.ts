import { Component } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'sb-current-queue',
  template: `
    <mat-toolbar color="primary">
      <mat-icon>queue_music</mat-icon>
      <span>Current queue</span>
    </mat-toolbar>

    <sb-track-list [playlists]="playlists$|async"></sb-track-list>
  `,
  styleUrls: ['./current-queue.component.scss']
})
export class CurrentQueueComponent {
  playlists$ = this.playlistService.fetchAll();

  constructor(private playlistService: PlaylistService) {

  }

}
