import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PlaylistComponent } from './containers/playlist/playlist.component';
import { CreatePlaylistComponent } from './containers/create-playlist/create-playlist.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { UnauthorizedComponent } from './containers/unauthorized/unauthorized.component';
import { SearchComponent } from './containers/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarClosedComponent } from './components/sidebar-closed/sidebar-closed.component';
import { ModalInnerComponent } from './components/inner-modal/modal-inner.component';
import { ModalComponent } from './components/modal/modal.component';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

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
    SidebarClosedComponent,
    ModalInnerComponent,
    ModalComponent,
    ConfirmModalComponent
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
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule,
    PortalModule,
    OverlayModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }

  ],
  entryComponents: [
    ConfirmModalComponent
  ]
})
export class AppModule {
}
