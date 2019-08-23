import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SpotifyService} from '../../services/spotify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'sb-create-playlist',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div>
        <input formControlName="name" type="text" placeholder="Name">
      </div>
      <div>
        <textarea formControlName="description" placeholder="Description"></textarea>
      </div>
      <div> public <input type="checkbox" formControlName="public"/></div>
      <a routerLink="/" mat-flat-button>Cancel</a>
      <button mat-flat-button color="primary" [disabled]="form.invalid">Create</button>
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
    })
  }

}
