import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlaylistComponent} from './containers/playlist/playlist.component';
import {CreatePlaylistComponent} from './containers/create-playlist/create-playlist.component';
import {UnauthorizedComponent} from './containers/unauthorized/unauthorized.component';
import {SearchComponent} from './containers/search/search.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  }, {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'search',
    component: SearchComponent
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
