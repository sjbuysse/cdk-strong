import { ComponentRef, Injectable, Injector } from '@angular/core';
import { Overlay, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { merge } from 'rxjs';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  positionStrategy = this.createDefaultPositionStrategy();
  overlayConfig = {
    maxHeight: '400px',
    height: 'auto',
    width: '600px',
    hasBackdrop: true,
    scrollStrategy: this.overlay.scrollStrategies.block(),
    positionStrategy: this.positionStrategy
  };

  constructor(private injector: Injector, private overlay: Overlay) {
  }

  createDefaultPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
  }

  openConfirmModal(title: string, body: string): ComponentRef<ConfirmModalComponent> {
    const overlayRef = this.overlay.create(this.overlayConfig);
    const containerPortal = new ComponentPortal(ConfirmModalComponent, null, this.injector);

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

