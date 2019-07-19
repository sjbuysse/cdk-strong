import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import * as SpotifyWebApi from 'spotify-web-api-js';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Device } from '../types/device.type';
import { map, switchMap } from 'rxjs/operators';
import * as settings from '../../../spotify-credentials.json';
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse;
import CurrentlyPlayingResponse = SpotifyApi.CurrentlyPlayingResponse;

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

  constructor() {
    const accessToken = window.location.hash.split('=')[1];
    if (accessToken) {
      window.localStorage.setItem(this.spotifyTokenKey, accessToken);
      window.location.replace(this.redirectUri);
    }

    if (this.spotifyToken$.getValue()) {
      this.spotify = new (SpotifyWebApi as any)();
      this.spotify.setAccessToken(this.spotifyToken$.getValue());
      fromPromise(this.spotify.getMe()).subscribe((me: SpotifyApi.CurrentUsersProfileResponse) => {
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

  getDevices(): Observable<Device[]> {
    return fromPromise(this.spotify.getMyDevices()).pipe(
      map((v: any) => v.devices)
    );
  }

  play(trackId: string): any {
    console.log('play');
    this.spotify.play();
    // return this.getDevices().pipe(switchMap(devices => this.spotify.transferMyPlayback([devices[0].id]))).subscribe(console.log);
  }

  getPlayLists(): Observable<SpotifyApi.PlaylistObjectSimplified[]> {
    return this.me$.pipe(
      switchMap(me => fromPromise(this.spotify.getUserPlaylists(me.id))),
      map((resp: SpotifyApi.ListOfUsersPlaylistsResponse) => resp.items)
    );
  }

  getTracksFromList(id: string): Observable<PlaylistTrackObject[]> {
    return fromPromise(this.spotify.getPlaylistTracks(id)).pipe(
      map((resp: SpotifyApi.PlaylistTrackResponse) => resp.items)
    );
  }

  getPlayList(id: string): Observable<SinglePlaylistResponse> {
    return fromPromise(this.spotify.getPlaylist(id));
  }

  getMyCurrentPlayingTrack(): Observable<CurrentlyPlayingResponse> {
    return fromPromise(this.spotify.getMyCurrentPlayingTrack());
  }

  logout(): void {
    window.localStorage.removeItem(this.spotifyTokenKey);
    this.spotifyToken$.next(null);
  }
}
