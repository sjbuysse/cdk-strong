import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-create-playlist',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-card>
        <mat-card-title>Create new playlist</mat-card-title>
        <mat-card-subtitle>In this form we can create brand new playlists</mat-card-subtitle>
        <mat-card-content>
          <mat-form-field>
            <input formControlName="name" matInput type="text" placeholder="Name">
          </mat-form-field>
          <mat-form-field>
            <textarea formControlName="description" matInput placeholder="Description"></textarea>
          </mat-form-field>
          <mat-checkbox formControlName="public">Public</mat-checkbox>
        </mat-card-content>
        <mat-card-actions>
          <a routerLink="/" mat-flat-button>Cancel</a>
          <button mat-flat-button color="primary" [disabled]="form.invalid">Create</button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent {
  form = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    public: [false]
  });

  constructor(
    private formBuilder: FormBuilder,
    private spotifyService: SpotifyService,
    private router: Router
  ) {
  }

  submit() {
    this.spotifyService.createPlaylist(this.form.value).subscribe(response => {
      this.router.navigate(['playlists', response.id]);
    });
  }

}
