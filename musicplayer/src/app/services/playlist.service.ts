import { Injectable } from '@angular/core';
import { Playlist } from '../types/playlist.type';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  fetchAll(): Observable<Playlist[]> {
    return of(this.mock(10));
  }

  private mock(amount: number): Playlist[] {
    const res = [];
    for (let i = 0; i < amount; i++) {
      res.push({
        id: i.toString(),
        name: 'fakename' + i,
        numberOfTracks: Math.floor(Math.random() * 60) + 1
      });
    }
    return res;
  }
}
