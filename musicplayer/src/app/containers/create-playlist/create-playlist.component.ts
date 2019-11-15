import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sb-create-playlist',
  template: `
    <sb-modal headerLabel="Create new Playlist" (destroy)="onDestroy()">
      <div sb-modal-body>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <mat-form-field>
            <input formControlName="name" matInput type="text" placeholder="Name">
          </mat-form-field>
          <mat-form-field>
            <textarea formControlName="description" matInput placeholder="Description"></textarea>
          </mat-form-field>
          <mat-checkbox formControlName="public">Public</mat-checkbox>
        </form>
      </div>
      <div sb-modal-footer>
        <a routerLink="../../" mat-flat-button>Cancel</a>
        <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="submit()">Create</button>
      </div>
    </sb-modal>
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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  submit() {
    this.spotifyService.createPlaylist(this.form.value).subscribe(response => {
      this.router.navigate(['../', response.id], { relativeTo: this.activatedRoute });
    });
  }

  onDestroy(): void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }
}
