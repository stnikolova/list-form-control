import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { FocusableOption } from '@angular/cdk/a11y';

@Component({
  selector: 'lib-list-control-item',
  templateUrl: './list-control-item.component.html',
  styleUrls: ['./list-control-item.component.scss'],
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
    this.focus$ = fromEvent(this.element, 'focus').pipe(mapTo(this.value));
  }

  focus(): void {
    this.element.focus();
  }
}
