import { ComponentRef, Injectable, Injector } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private injector: Injector, private overlay: Overlay) {
  }


  openConfirmModal(title: string, body: string): ComponentRef<ConfirmModalComponent> {
    // const containerPortal = ...
    // const overlayRef = ...
    // const componentRef = ...

    // when the component gets approved or declined, detach and dispose the overlayRef

    return; // componentRef;
  }
}

