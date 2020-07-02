import { Component, QueryList, ContentChildren } from '@angular/core';
import { ListControlItemComponent } from '../list-control-item/list-control-item.component';

@Component({
  selector: 'lib-list-control-content',
  templateUrl: './list-control-content.component.html',
  exportAs: 'listControl',
})
export class ListControlContentComponent {
  @ContentChildren(ListControlItemComponent) listItemElements: QueryList<any>;
  @ContentChildren('cmp') cmpTest: QueryList<ListControlItemComponent>;

  public isVisible = false;

  toggleDropdown(focus: boolean) {
    this.isVisible = focus;
  }
}
