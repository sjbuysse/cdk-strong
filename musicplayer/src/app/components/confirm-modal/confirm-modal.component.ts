import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'sb-confirm-modal',
  template: `
    <sb-modal-inner (destroy)="decline.emit()" [headerLabel]="headerLabel">
      <div sb-modal-body>
        {{ body }}
      </div>
      <div sb-modal-footer>
        <button mat-stroked-button color="default" (click)="decline.emit()">Cancel</button>
        <button mat-flat-button color="primary" (click)="approve.emit()">Ok</button>
      </div>
    </sb-modal-inner>
  `,
})
export class ConfirmModalComponent {
  @Input() headerLabel: string;
  @Input() body: string;
  @Output() decline = new EventEmitter();
  @Output() approve = new EventEmitter();
}
