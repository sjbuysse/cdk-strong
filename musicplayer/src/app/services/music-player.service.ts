import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, merge, Observable, ReplaySubject, Subject} from 'rxjs';
import {filter, map, mapTo, publishReplay, refCount, startWith, switchMap, take, takeUntil} from 'rxjs/operators';
import TrackObjectFull = SpotifyApi.TrackObjectFull;

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  currentTrack$ = new BehaviorSubject<TrackObjectFull>(null);
  audio$: Observable<HTMLAudioElement> = this.currentTrack$.pipe(
    filter(v => !!v),
    map(track => new Audio(track.preview_url)),
    publishReplay(1),
    refCount()
  );
  currentTrackList: TrackObjectFull[];
  private play$ = new Subject<boolean>();
  private pause$ = new Subject<boolean>();

  playing$ = merge(
    this.play$.pipe(mapTo(true)),
    this.pause$.pipe(mapTo(false))
  ).pipe(
    startWith(false)
  );

  time$ = this.audio$.pipe(
    switchMap(audio => fromEvent(audio, 'timeupdate').pipe(mapTo(audio))),
    map(audio => audio.currentTime)
  );
  duration$ = this.audio$.pipe(
    switchMap(audio => fromEvent(audio, 'timeupdate').pipe(mapTo(audio))),
    map(audio => audio.duration)
  );

  volume$ = this.audio$.pipe(
    switchMap(audio => merge(this.audio$, fromEvent(audio, 'volumechange').pipe(mapTo(audio)))),
    map(audio => audio.volume)
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

  updateVolume(value: number) {
    this.audio$
      .pipe(take(1))
      .subscribe(audio => {
        audio.volume = value;
      });
  }

  setTrackList(tracks: SpotifyApi.TrackObjectFull[]) {
    this.currentTrackList = tracks;
  }


  next(): void {
    const currentTrack = this.currentTrack$.getValue();
    const index = currentTrack && this.currentTrackList.map(item => item.id).indexOf(currentTrack.id);
    if (index > -1 && index < this.currentTrackList.length -1) {
      this.setTrack(this.currentTrackList[index + 1]);
      this.play();
    }
  }

  previous(): void {
    const currentTrack = this.currentTrack$.getValue();
    const index = currentTrack && this.currentTrackList.indexOf(this.currentTrack$.getValue());
    if (index > 0) {
      this.setTrack(this.currentTrackList[index - 1]);
      this.play();
    }
  }
}
