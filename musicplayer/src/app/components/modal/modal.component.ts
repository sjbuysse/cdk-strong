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
  @ViewChild(CdkPortal, { static: false }) portal;
  @Input() headerLabel: string;
  @Output() destroy = new EventEmitter();

  positionStrategy = this.overlay.position()
    .global()
    .centerHorizontally()
    .centerVertically();

  overlayConfig = {
    maxHeight: '400px',
    height: 'auto',
    width: '600px',
    hasBackdrop: true,
    scrollStrategy: this.overlay.scrollStrategies.block(),
    positionStrategy: this.positionStrategy
  };

  overlayRef = this.overlay.create(this.overlayConfig);

  constructor(private overlay: Overlay) {
  }

  ngOnDestroy(): void {
    this.destroy.emit();
    this.overlayRef.detach();
    this.overlayRef.dispose();
  }

  ngAfterViewInit(): void {
    this.overlayRef.attach(this.portal);
  }

}
