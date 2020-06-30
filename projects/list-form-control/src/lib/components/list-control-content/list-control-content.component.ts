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
} from '@angular/core';
import { ListKeyManager, FocusTrapFactory, FocusMonitor } from '@angular/cdk/a11y';
import { UP_ARROW, DOWN_ARROW, ENTER } from '@angular/cdk/keycodes';
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

  @ViewChildren(ListControlItemComponent) listItems: QueryList<any>;
  public keyboardEventsManager: ListKeyManager<any>;
  // public keyManager: any;

  constructor(private focusTrap: FocusTrapFactory, private focusMonitor: FocusMonitor) {}

  public ngOnInit(): void {}

  public ngAfterViewInit() {
    console.log(this.content.tpl.elementRef.nativeElement);
    // this.keyManager = new ListKeyManager(this.listItems);
    this.keyboardEventsManager = new ListKeyManager(this.listItems); // initializing the event manager here
  }

  @HostListener('window:keyup', ['$event'])
  keyFunc(event) {
    if (event.code !== 'Tab') {
      this.keyboardEventsManager.onKeydown(event);
      this.focusMonitor.focusVia(this.keyboardEventsManager.activeItem.nativeElement, 'keyboard');
    } else {
      // 'artificially' updates the active element in case the user uses Tab instead of arrows
      this.keyboardEventsManager.onKeydown(event);
      this.keyboardEventsManager.setNextItemActive();
    }
  }
  // public handleKeyUp(event: KeyboardEvent) {
  //   event.stopImmediatePropagation();
  //   if (this.keyboardEventsManager) {
  //     if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW) {
  //       // passing the event to key manager so we get a change fired
  //       this.keyboardEventsManager.onKeydown(event);
  //       return false;
  //     }
  //   }
  // }
}
