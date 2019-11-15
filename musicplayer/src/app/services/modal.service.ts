import { ComponentRef, Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private injector: Injector, private overlay: Overlay) {
  }

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

  openConfirmModal(title: string, body: string): ComponentRef<ConfirmModalComponent> {
    const containerPortal = new ComponentPortal(ConfirmModalComponent, null, this.injector);

    const overlayRef = this.overlay.create(this.overlayConfig);
    const componentRef = overlayRef.attach(containerPortal);
    componentRef.instance.headerLabel = title;
    componentRef.instance.body = body;

    merge(componentRef.instance.decline, componentRef.instance.approve).subscribe(() => {
      overlayRef.detach();
      overlayRef.dispose();
    });

    return componentRef;
  }
}

