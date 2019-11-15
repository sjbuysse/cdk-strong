import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified;

@Component({
  selector: 'sb-track-list',
  template: `
    <table mat-table [dataSource]="tracks"
           [dataSource]="tracks" cdkDropList (cdkDropListDropped)="drop($event)">
      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Title</th>
        <td mat-cell *matCellDef="let element"> {{element?.name}}</td>
      </ng-container>
      <ng-container matColumnDef="artists">
        <th mat-header-cell *matHeaderCellDef>Artists</th>
        <td mat-cell *matCellDef="let element"> {{getArtists(element)}}</td>
      </ng-container>
      <ng-container matColumnDef="album">
        <th mat-header-cell *matHeaderCellDef>Album</th>
        <td mat-cell *matCellDef="let element"> {{element?.album?.name}}</td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="columnsToDisplay; sticky: true"></tr>
      <tr mat-row *matRowDef="let row; columns: columnsToDisplay;"  cdkDrag [cdkDragData]="row">
        <div *cdkDragPreview class="drag-preview">{{getArtists(row)}} - {{row?.name}}</div>
        <td colspan="5" class="drag-placeholder" *cdkDragPlaceholder></td>
      </tr>
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
  columnsToDisplay = ['title', 'artists', 'album'];

  getArtists(track: TrackObjectFull): string {
    return track && track.artists && track.artists.map(v => v.name).join(', ');
  }

  drop(event: CdkDragDrop<string[]>): void {
    console.log('update order:', {currentIndex: event.previousIndex, newIndex: event.currentIndex, uri: event.item.data.uri});
    this.reorder.emit({currentIndex: event.previousIndex, newIndex: event.currentIndex, uri: event.item.data.uri});
  }

  openInSpotify(uri: string): void {
    window.open(uri);
  }
}
