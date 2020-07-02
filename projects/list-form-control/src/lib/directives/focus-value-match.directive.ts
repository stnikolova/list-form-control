import {
  Directive,
  ElementRef,
  Input,
  ContentChildren,
  QueryList,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ListControlItemComponent } from '../components/list-control-item/list-control-item.component';

@Directive({
  selector: '[focusMatch]',
  exportAs: 'focusMatch',
})
export class FocusValueMatchDirective implements OnChanges {
  @Output() public showMessage: EventEmitter<boolean> = new EventEmitter();

  @Input() focusMatch: string;
  @Input() originalListItem: Array<string>;

  @ContentChildren(ListControlItemComponent) listItems: QueryList<ListControlItemComponent>;

  constructor(private host: ElementRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.focusMatch && !changes.focusMatch.firstChange) {
      const matchInOriginalList = this.originalListItem.find((item) => item === this.focusMatch);
      const matchInView = this.listItems.find((item) => item.value === this.focusMatch);

      if (matchInView) {
        matchInView.focus();
        return;
      }

      if (!matchInView && matchInOriginalList) {
        this.showMessage.emit(true);
      }
    }
  }
}
