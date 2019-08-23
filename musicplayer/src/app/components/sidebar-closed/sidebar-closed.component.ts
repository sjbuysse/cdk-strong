import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'sb-sidebar-closed',
  template: `
    <div class="menu-open-bar" *ngIf="show">
      <button mat-icon-button (click)="openMenu.emit()">
        <mat-icon>more_vert</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./sidebar-closed.component.scss']
})
export class SidebarClosedComponent {
  @Input() show: boolean;
  @Output() openMenu = new EventEmitter();
}
