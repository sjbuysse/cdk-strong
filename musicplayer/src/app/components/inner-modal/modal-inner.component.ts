import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sb-modal-inner',
  template: `
    <div class="wrapper">
      <div class="header">
        <h2>{{headerLabel}}</h2>
        <button mat-icon-button (click)="destroy.emit()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div class="body">
        <ng-content select="[sb-modal-body]"></ng-content>
      </div>
      <div class="footer">
        <ng-content select="[sb-modal-footer]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./modal-inner.component.scss']
})
export class ModalInnerComponent {
  @Input() headerLabel: string;
  @Output() destroy = new EventEmitter();
}
