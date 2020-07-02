import { Component, QueryList, ContentChildren } from '@angular/core';
import { ListControlItemComponent } from '../list-control-item/list-control-item.component';

@Component({
  selector: 'lib-list-control-content',
  templateUrl: './list-control-content.component.html',
  exportAs: 'listControl',
})
export class ListControlContentComponent {
  // Gets a reference of all the list item DOM elements
  @ContentChildren(ListControlItemComponent) listItemElements: QueryList<any>;

  public isVisible = false;

  // Sets the visibility of the lost
  toggleList(focus: boolean) {
    this.isVisible = focus;
  }
}
