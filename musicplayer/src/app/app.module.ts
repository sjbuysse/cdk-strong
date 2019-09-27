import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TrackListComponent} from './components/track-list/track-list.component';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatChipsModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule, MatSliderModule, MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {PlaylistComponent} from './containers/playlist/playlist.component';
import {CreatePlaylistComponent} from './containers/create-playlist/create-playlist.component';
import {MusicPlayerComponent} from './components/music-player/music-player.component';
import {UnauthorizedComponent} from './containers/unauthorized/unauthorized.component';
import {SearchComponent} from './containers/search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchPlaylistsComponent } from './containers/search-playlists/search-playlists.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    TrackListComponent,
    SidebarComponent,
    PlaylistComponent,
    CreatePlaylistComponent,
    MusicPlayerComponent,
    UnauthorizedComponent,
    SearchComponent,
    SearchPlaylistsComponent
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
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatListModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}

  ]
})
export class AppModule {
}
