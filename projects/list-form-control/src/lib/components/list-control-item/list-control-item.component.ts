import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { FocusableOption } from '@angular/cdk/a11y';

@Component({
  selector: 'lib-list-control-item',
  templateUrl: './list-control-item.component.html',
  host: { tabindex: '-1' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListControlItemComponent implements OnInit, FocusableOption {
  @Input() value: string;
  focus$: Observable<string>;

  constructor(private host: ElementRef) {}

  get element() {
    return this.host.nativeElement;
  }

  ngOnInit(): void {
    // Creates an observable to inform if the item is on focus
    // Binds the value of each item to stream as res when on focus
    this.focus$ = fromEvent(this.element, 'focus').pipe(mapTo(this.value));
  }

  // Sets the item on focus
  focus(): void {
    this.element.focus();
  }
}
