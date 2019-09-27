import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-unauthorized',
  template: `
    <mat-toolbar color="primary">
      <mat-icon>perm_identity</mat-icon>
      <span>You are unauthorized!</span>
    </mat-toolbar>
    <div class="unauthorized-wrapper">
      <button mat-flat-button color="accent" (click)="authorize()">Authorize</button>
    </div>
  `,
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private spotifyService: SpotifyService,
              private router: Router) {
  }

  ngOnInit() {
    this.spotifyService.isAuthorized().pipe(
      first()
    ).subscribe(isLoggedIn => {
      console.log('isloggedIn', isLoggedIn)
      if (isLoggedIn) {
        this.router.navigate(['/']);
      }
    })
  }

  authorize(): void {
    this.spotifyService.authorize();
  }
}
