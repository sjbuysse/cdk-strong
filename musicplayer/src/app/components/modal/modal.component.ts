import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';


@Component({
  selector: 'sb-modal',
  template: `
    <ng-template cdkPortal>
      <sb-modal-inner (destroy)="destroy.emit()" [headerLabel]="headerLabel">
        <ng-content sb-modal-body select="[sb-modal-body]"></ng-content>
        <ng-content sb-modal-footer select="[sb-modal-footer]"></ng-content>
      </sb-modal-inner>
    </ng-template>
  `
})
export class ModalComponent implements OnDestroy, AfterViewInit {
  @Input() headerLabel: string;
  @Output() destroy = new EventEmitter();

  constructor(private overlay: Overlay) {
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
  }
}
