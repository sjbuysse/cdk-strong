import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentQueueComponent } from './containers/current-queue/current-queue.component';
import { PlaylistComponent } from './containers/playlist/playlist.component';
import { CreatePlaylistComponent } from './containers/create-playlist/create-playlist.component';
import { UnauthorizedComponent } from './containers/unauthorized/unauthorized.component';


const routes: Routes = [
  {
    path: '',
    component: CurrentQueueComponent
  }, {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'playlists/create',
    component: CreatePlaylistComponent
  },
  {
    path: 'playlists/:id',
    component: PlaylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
