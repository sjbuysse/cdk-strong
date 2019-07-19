import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Playlist } from '../../types/playlist.type';
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import TrackObjectFull = SpotifyApi.TrackObjectFull;

@Component({
  selector: 'sb-track-list',
  template: `

    <table mat-table
           [cdkDropListData]="dataSource"
           [dataSource]="tracks" cdkDropList (cdkDropListDropped)="drop($event)">
      <ng-container matColumnDef="artist">
        <th mat-header-cell *matHeaderCellDef>Artist</th>
        <td mat-cell *matCellDef="let element">{{getArtists(element?.track)}}</td>
      </ng-container>

      <ng-container matColumnDef="play">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <button mat-mini-fab class="play-action" (click)="playTrack.emit(element?.track?.id)">
            <mat-icon>play_arrow</mat-icon>
          </button>
        </td>
      </ng-container>

      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Title</th>
        <td mat-cell *matCellDef="let element"> {{element?.track?.name}}</td>
      </ng-container>

      <ng-container matColumnDef="album">
        <th mat-header-cell *matHeaderCellDef>Album</th>
        <td mat-cell *matCellDef="let element"> {{element?.track?.album?.name}}</td>
      </ng-container>
      <ng-container matColumnDef="options">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <mat-menu #trackMenu="matMenu">
            <button mat-menu-item>
              <mat-icon>remove_from_queue</mat-icon>
              <span>Remove from queue</span>
            </button>
            <button mat-menu-item [matMenuTriggerFor]="playlistsMenu">
              <mat-icon>add_to_queue</mat-icon>
              <span>Add to playlist</span>
            </button>
            <button mat-menu-item>
              <mat-icon>share</mat-icon>
              <span>Share</span>
            </button>
          </mat-menu>
          <mat-menu #playlistsMenu="matMenu">
            <ng-container *ngFor="let playlist of playlists">
              <button mat-menu-item>
                <mat-icon>add</mat-icon>
                <span>{{playlist?.name}}t</span>
              </button>
            </ng-container>
          </mat-menu>


          <button mat-icon-button [matMenuTriggerFor]="trackMenu" class="more-action">
            <mat-icon>more_horiz</mat-icon>
          </button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="columnsToDisplay; sticky: true"></tr>
      <tr mat-row *matRowDef="let row; columns: columnsToDisplay;" cdkDrag [cdkDragData]="row">
        <div *cdkDragPreview class="drag-preview">{{getArtists(row?.track)}} - {{row?.track?.name}}</div>
        <td colspan="5" class="drag-placeholder" *cdkDragPlaceholder></td>
      </tr>
    </table>
  `,
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {
  @Input() playlists: Playlist[];
  @Input() tracks: PlaylistTrackObject[];
  @Output() playTrack = new EventEmitter<string>();
  columnsToDisplay = ['play', 'artist', 'title', 'album', 'options'];

  getArtists(track: TrackObjectFull): string {
    return track && track.artists && track.artists.map(v => v.name).join(', ');
  }

  drop(event: CdkDragDrop<string[]>): void {

  }

  ngOnInit() {
  }

}
