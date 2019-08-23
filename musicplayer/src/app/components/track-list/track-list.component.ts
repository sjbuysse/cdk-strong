import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified;

@Component({
  selector: 'sb-track-list',
  template: `
    <pre>
      {{tracks|json}}
    </pre>
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
