import {Injectable} from '@angular/core';
import {BehaviorSubject, NEVER, Observable, ReplaySubject} from 'rxjs';
import * as SpotifyWebApi from 'spotify-web-api-js';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, filter, map, mergeMap, shareReplay, switchMap, tap} from 'rxjs/operators';
import * as settings from '../../../spotify-credentials.json';
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse;
import CurrentlyPlayingResponse = SpotifyApi.CurrentlyPlayingResponse;
import CreatePlaylistResponse = SpotifyApi.CreatePlaylistResponse;
import TrackSearchResponse = SpotifyApi.TrackSearchResponse;
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import AddTracksToPlaylistResponse = SpotifyApi.AddTracksToPlaylistResponse;
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified;
import PlaylistSearchResponse = SpotifyApi.PlaylistSearchResponse;

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId = settings.clientId;
  private spotifyTokenKey = settings.spotifyTokenKey;
  private baseUrl = 'https://accounts.spotify.com';
  private redirectUri = 'http://localhost:4200';
  private scopes = [
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-collaborative',
    'user-read-private',
    'user-read-birthdate',
    'user-read-email',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-modify-playback-state',
    'app-remote-control',
    'streaming',
    'user-follow-modify',
    'user-follow-read',
    'user-top-read',
    'user-read-recently-played',
    'user-library-read',
    'user-library-modify'
  ];
  private spotify;
  private spotifyToken$ = new BehaviorSubject(
    window.localStorage.getItem(this.spotifyTokenKey)
  );

  me$ = new ReplaySubject<SpotifyApi.CurrentUsersProfileResponse>(1);
  refreshTrigger$ = new BehaviorSubject(true);

  playlists$ = this.isAuthorized().pipe(
    filter(v => !!v),
    mergeMap(() => this.refreshTrigger$),
    switchMap(() => this.getPlayLists()),
    shareReplay(1)
  );

  constructor(private router: Router, private matSnackBar: MatSnackBar) {
    const accessToken = window.location.hash.split('=')[1];
    if (accessToken) {
      window.localStorage.setItem(this.spotifyTokenKey, accessToken);
      window.location.replace(this.redirectUri);
    }

    if (this.spotifyToken$.getValue()) {
      this.spotify = new (SpotifyWebApi as any)();
      this.spotify.setAccessToken(this.spotifyToken$.getValue());
      this.handleRequest(this.spotify.getMe()).subscribe((me: SpotifyApi.CurrentUsersProfileResponse) => {
        this.me$.next(me);
      });

    }
  }

  isAuthorized(): Observable<boolean> {
    return this.spotifyToken$.pipe(map(v => !!v));
  }

  authorize(): void {
    const scopes = this.scopes.join(' ');
    window.location.replace(
      `${this.baseUrl}/authorize` +
      `?response_type=token` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&client_id=${this.clientId}` +
      `&redirect_uri=${encodeURIComponent(this.redirectUri)}`
    );
  }

  private getPlayLists(): Observable<SpotifyApi.PlaylistObjectSimplified[]> {
    return this.me$.pipe(
      switchMap(me => this.handleRequest(this.spotify.getUserPlaylists(me.id))),
      map((resp: SpotifyApi.ListOfUsersPlaylistsResponse) => resp.items)
    );
  }

  getPlayList(id: string): Observable<SinglePlaylistResponse> {
    return this.handleRequest(this.spotify.getPlaylist(id));
  }

  getMyCurrentPlayingTrack(): Observable<CurrentlyPlayingResponse> {
    return this.handleRequest(this.spotify.getMyCurrentPlayingTrack());
  }

  logout(): void {
    window.localStorage.removeItem(this.spotifyTokenKey);
    this.spotifyToken$.next(null);
  }

  createPlaylist(body: { name: string, description: string, public: boolean }): Observable<CreatePlaylistResponse> {
    return this.me$.pipe(
      switchMap(me => this.handleRequest(this.spotify.createPlaylist(me.id, body)) as Observable<CreatePlaylistResponse>),
      tap(() => this.refreshTrigger$.next(true)) // reload
    );
  }

  search(term: string): Observable<TrackSearchResponse> {
    return this.handleRequest(this.spotify.searchTracks(term));
  }

  searchPlaylists(term: string, offset = 0): Observable<PlaylistObjectSimplified[]> {
    return this.handleRequest(this.spotify.searchPlaylists(term, {offset})).pipe(
      map((response: PlaylistSearchResponse) => response.playlists.items)
    );
  }

  addToPlaylist(uri: any, playlistId: any): Observable<AddTracksToPlaylistResponse> {
    return (this.handleRequest(this.spotify.addTracksToPlaylist(playlistId, [uri])) as Observable<AddTracksToPlaylistResponse>)
      .pipe(
        tap(() => this.refreshTrigger$.next(true)) // reload
      );
  }

  removeFromPlaylist(uri: string, id: any) {
    return this.handleRequest(this.spotify.removeTracksFromPlaylist(id, [uri]))
      .pipe(
        tap(() => this.refreshTrigger$.next(true)) // reload
      );
  }

  reorderTracks(currentIndex: number, newIndex: number, playlistId: string) {
    return this.handleRequest(this.spotify.reorderTracksInPlaylist(playlistId, currentIndex, newIndex));
  }

  private handleRequest<T>(promise: Promise<T>): Observable<T> {
    return fromPromise(promise).pipe(catchError(e => {
      if (e.status === 401) {
        this.matSnackBar.open('You are unauthorized');
        this.router.navigate(['/unauthorized']);
      }
      return NEVER;
    }));
  }
}
