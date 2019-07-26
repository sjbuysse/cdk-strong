import {Injectable} from '@angular/core';
import {fromEvent, merge, Observable, ReplaySubject, Subject} from 'rxjs';
import {filter, map, mapTo, publishReplay, refCount, startWith, switchMap, takeUntil} from 'rxjs/operators';
import TrackObjectFull = SpotifyApi.TrackObjectFull;

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  currentTrack$ = new ReplaySubject<TrackObjectFull>(1);
  audio$: Observable<HTMLAudioElement> = this.currentTrack$.pipe(
    filter(v => !!v),
    map(track => new Audio(track.preview_url)),
    publishReplay(1),
    refCount()
  );
  private play$ = new Subject<boolean>();
  private pause$ = new Subject<boolean>();

  playing$ = merge(
    this.play$.pipe(mapTo(true)),
    this.pause$.pipe(mapTo(false))
  ).pipe(
    startWith(false)
  )

  time$ = this.audio$.pipe(
    switchMap(audio => fromEvent(audio, 'timeupdate').pipe(mapTo(audio))),
    map(audio => audio.currentTime)
  );
  duration$ = this.audio$.pipe(
    switchMap(audio => fromEvent(audio, 'timeupdate').pipe(mapTo(audio))),
    map(audio => audio.duration)
  );

  constructor() {
    this.audio$.pipe(
      switchMap(audio => this.pause$.pipe(mapTo(audio)))
    ).subscribe((audio: HTMLAudioElement) => {
      audio.pause();
    });
    this.audio$.pipe(
      switchMap(audio => this.play$.pipe(
        mapTo(audio)
      ))
    ).subscribe((audio: HTMLAudioElement) => {
      audio.play();
    });
  }

  setTrack(track: TrackObjectFull): void {
    this.pause$.next();
    this.currentTrack$.next(track);
  }

  play(): void {
    this.play$.next(true);
  }

  pause(): void {
    this.pause$.next(true);
  }
}
