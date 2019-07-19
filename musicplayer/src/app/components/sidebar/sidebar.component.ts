import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Playlist } from '../../types/playlist.type';

@Component({
  selector: 'sb-sidebar',
  template: `
    <div class="top">
      <button mat-icon-button (click)="closeMenu.emit()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <button mat-menu-item routerLink="/">
      <mat-icon>queue_music</mat-icon>
      <span>Current queue</span>
    </button>
    <button mat-menu-item [matMenuTriggerFor]="playlistsMenu">
      <mat-icon>playlist_play</mat-icon>
      <span>Playlists</span>
    </button>
    <mat-menu #playlistsMenu="matMenu">
      <button mat-menu-item [routerLink]="['playlists', 'create']">
        <mat-icon>playlist_add</mat-icon>
        <span>Create new playlist</span>
      </button>
      <ng-container *ngFor="let playlist of playlists">
        <button mat-menu-item [routerLink]="['playlists', playlist?.id]">
          <mat-icon>play_circle_filled</mat-icon>
          <span>{{playlist?.name}}</span>
        </button>
      </ng-container>
    </mat-menu>
    <mat-divider></mat-divider>
    <button mat-menu-item (click)="logout.emit()">
      <mat-icon>exit_to_app</mat-icon>
      <span>Logout</span>
    </button>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() playlists: Playlist[];
  @Output() closeMenu = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
