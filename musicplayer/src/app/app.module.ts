import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import {
  MatButtonModule, MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CurrentQueueComponent } from './containers/current-queue/current-queue.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PlaylistComponent } from './containers/playlist/playlist.component';
import { CreatePlaylistComponent } from './containers/create-playlist/create-playlist.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { UnauthorizedComponent } from './containers/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackListComponent,
    CurrentQueueComponent,
    SidebarComponent,
    PlaylistComponent,
    CreatePlaylistComponent,
    MusicPlayerComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTableModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
