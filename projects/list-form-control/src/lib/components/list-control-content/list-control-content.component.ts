import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ContentChild,
  ViewEncapsulation,
  QueryList,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  HostListener,
  ContentChildren,
} from '@angular/core';
import { ListKeyManager, FocusTrapFactory, FocusMonitor } from '@angular/cdk/a11y';
import { UP_ARROW, DOWN_ARROW, ENTER } from '@angular/cdk/keycodes';
import { switchMap, merge } from 'rxjs/operators';
import { ListControlContentDirective } from '../../directives/list-control-content.directive';
import { ListControlItemComponent } from '../list-control-item/list-control-item.component';

@Component({
  selector: 'lib-list-control-content',
  templateUrl: './list-control-content.component.html',
  styleUrls: ['./list-control-content.component.scss'],
  exportAs: 'listControl',
  encapsulation: ViewEncapsulation.None,
})
export class ListControlContentComponent implements OnInit {
  // Obtain a reference to the root template
  @ViewChild('root') rootTemplate: TemplateRef<any>;

  // Obtain a reference to the directive in order to pass the template to be referenced
  @ContentChild(ListControlContentDirective)
  content: ListControlContentDirective;

  // @ViewChildren(ListControlItemComponent) listItems: QueryList<any>;
  @ContentChildren(ListControlItemComponent) listItems: QueryList<any>;
  @ContentChildren('cmp') cmpTest: QueryList<ListControlItemComponent>;

  // public keyboardEventsManager: ListKeyManager<any>;
  // public keyManager: any;
  public isVisible = false;

  constructor(private focusTrap: FocusTrapFactory, private focusMonitor: FocusMonitor) {}

  public ngOnInit(): void {}

  toggleDropdown(focus: boolean) {
    this.isVisible = focus;
  }
}
