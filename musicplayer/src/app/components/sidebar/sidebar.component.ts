import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified;
import CurrentUsersProfileResponse = SpotifyApi.CurrentUsersProfileResponse;

@Component({
  selector: 'sb-sidebar',
  template: `
    <button
      (click)="closeMenu.emit()"
      mat-icon-button
      color="primary">
      <mat-icon>close</mat-icon>
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
