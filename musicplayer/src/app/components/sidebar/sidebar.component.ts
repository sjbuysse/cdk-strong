import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified;
import CurrentUsersProfileResponse = SpotifyApi.CurrentUsersProfileResponse;

@Component({
  selector: 'sb-sidebar',
  template: `
    <mat-card>
      <mat-card-header>
        <img mat-card-avatar [attr.src]="me?.images && me?.images[0]?.url" alt="">
        <span mat-card-title>Hi {{me?.display_name}}</span>
        <span mat-card-subtitle>Have a wonderful day!</span>
        <button mat-icon-button (click)="closeMenu.emit()">
          <mat-icon>close</mat-icon>
        </button>
      </mat-card-header>
    </mat-card>
    <button mat-menu-item routerLink="/search">
      <mat-icon>search</mat-icon>
      <span>Search</span>
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
          <mat-icon [matBadgeColor]="playlist?.tracks?.total === 0? 'primary':'accent'"
                    [matBadge]="playlist?.tracks?.total">play_circle_filled
          </mat-icon>
          <span>{{playlist?.name}}</span>
        </button>
      </ng-container>
    </mat-menu>
    <button mat-menu-item (click)="logout.emit()">
      <mat-icon>exit_to_app</mat-icon>
      <span>Logout</span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() playlists: PlaylistObjectSimplified[];
  @Input() me: CurrentUsersProfileResponse;
  @Output() closeMenu = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
