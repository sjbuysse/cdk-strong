import {Component, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'sb-sidebar-closed',
  template: `
    <div class="menu-open-bar" *ngIf="show">
      <button mat-icon-button (click)="open.emit()">
        <mat-icon>more_vert</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./sidebar-closed.component.scss']
})
export class SidebarClosedComponent  {
  @Input() show: boolean;
  @Input() open = new EventEmitter();
}
