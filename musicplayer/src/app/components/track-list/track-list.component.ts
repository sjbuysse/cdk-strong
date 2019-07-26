import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified;

@Component({
  selector: 'sb-track-list',
  template: `

    <table mat-table
           [cdkDropListData]="tracks"
           [dataSource]="tracks" cdkDropList (cdkDropListDropped)="drop($event)">
      <ng-container matColumnDef="artist">
        <th mat-header-cell *matHeaderCellDef>Artist</th>
        <td mat-cell *matCellDef="let element">{{getArtists(element)}}</td>
      </ng-container>

      <ng-container matColumnDef="play">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <button *ngIf="currentlyPlaying?.id !== element?.id"mat-mini-fab class="play-action" (click)="playTrack.emit(element)">
            <mat-icon>play_arrow</mat-icon>
          </button>
          <mat-icon *ngIf="currentlyPlaying?.id === element?.id">volume_up</mat-icon>
        </td>
      </ng-container>

      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Title</th>
        <td mat-cell *matCellDef="let element"> {{element?.name}}</td>
      </ng-container>

      <ng-container matColumnDef="album">
        <th mat-header-cell *matHeaderCellDef>Album</th>
        <td mat-cell *matCellDef="let element"> {{element?.album?.name}}</td>
      </ng-container>
      <ng-container matColumnDef="options">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <mat-menu #trackMenu="matMenu">
            <button *ngIf="searchMode" mat-menu-item [matMenuTriggerFor]="playlistsMenu">
              <mat-icon>add_to_queue</mat-icon>
              <span>Add to playlist</span>
            </button>
            <button mat-menu-item (click)="openInSpotify(element.uri)">
              <mat-icon>play_circle_filled</mat-icon>
              <span>Open in spotify</span>
            </button>
            <button *ngIf="!searchMode" mat-menu-item (click)="removeFromPlaylist.emit(element.uri)">
              <mat-icon>remove_from_queue</mat-icon>
              <span>Remove from playlist</span>
            </button>
            <button mat-menu-item>
              <mat-icon>share</mat-icon>
              <span>Share</span>
            </button>
          </mat-menu>
          <mat-menu #playlistsMenu="matMenu">
            <ng-container *ngFor="let playlist of playlists">
              <button mat-menu-item (click)="addToPlaylist.emit({playlistId: playlist?.id, uri: element.uri})">
                <mat-icon>add</mat-icon>
                <span>{{playlist?.name}}</span>
                <span> ({{playlist?.tracks?.total}})</span>
              </button>
            </ng-container>
          </mat-menu>


          <button mat-icon-button [matMenuTriggerFor]="trackMenu" class="more-action">
            <mat-icon>more_horiz</mat-icon>
          </button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="columnsToDisplay; sticky: true"></tr>
      <ng-container *ngIf="!searchMode; else reorderingDisabled">
        <tr mat-row *matRowDef="let row; columns: columnsToDisplay;" cdkDrag [cdkDragData]="row">
          <div *cdkDragPreview class="drag-preview">{{getArtists(row)}} - {{row?.name}}</div>
          <td colspan="5" class="drag-placeholder" *cdkDragPlaceholder></td>
        </tr>
      </ng-container>
      <ng-template #reorderingDisabled>
        <tr mat-row *matRowDef="let row; columns: columnsToDisplay;">
        </tr>
      </ng-template>
    </table>
    <div class="no-results" *ngIf="tracks?.length === 0 || tracks === null">No results found</div>
  `,
  // no onpush, doesnt work with the drag and drop from cdk
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent {
  @Input() currentlyPlaying: TrackObjectFull;
  @Input() playlists: PlaylistObjectSimplified[];
  @Input() searchMode: boolean;
  @Input() tracks: TrackObjectFull[];
  @Input() reorderingEnabled: boolean;
  @Output() playTrack = new EventEmitter<TrackObjectFull>();
  @Output() addToPlaylist = new EventEmitter<{ playlistId: string, uri: string }>();
  @Output() removeFromPlaylist = new EventEmitter<string>();
  @Output() reorder = new EventEmitter<{ currentIndex: number, newIndex: number, uri: string }>();
  columnsToDisplay = ['play', 'artist', 'title', 'album', 'options'];

  getArtists(track: TrackObjectFull): string {
    return track && track.artists && track.artists.map(v => v.name).join(', ');
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.reorder.emit({currentIndex: event.previousIndex, newIndex: event.currentIndex, uri: event.item.data.uri});
  }

  openInSpotify(uri: string): void {
    window.open(uri);
  }
}
