import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener,
  ViewChild,
  ContentChild,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { ListKeyManager, FocusKeyManager } from '@angular/cdk/a11y';
import { merge, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListControlItemComponent } from '../list-control-item/list-control-item.component';
import { ListControlContentComponent } from '../list-control-content/list-control-content.component';
import { ListControlDirective } from '../../directives/list-control.directive';

@Component({
  selector: 'lib-list-control',
  templateUrl: './list-control.component.html',
  styleUrls: ['./list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ListControlComponent
  implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  // Initial list items
  @Input() listItems: Array<string> = [];

  // Gets access to the list items
  @ViewChild(ListControlContentComponent)
  content: ListControlContentComponent;

  // Gets a reference to the HTML input element
  @ContentChild(ListControlDirective) input: ListControlDirective;

  // Used to store observables subscriptions
  private subscriptions: Array<Subscription> = [];

  // Use Accessibility CDK (a11y) to handle arrow navigation
  public keyboardEventsManager: ListKeyManager<any>;
  public focusKeyManager: FocusKeyManager<ListControlItemComponent>;

  public selectedValue;
  public showMessage;
  public listItemsCopy: Array<string>;
  public onChange: any = () => {};
  public onTouch: any = () => {};

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit() {
    // Reverse the items to show them in descending order
    this.listItemsCopy = [...this.listItems].reverse();
  }

  public ngAfterViewInit() {
    // Initialize the FocusKeyManager with the elements to handle
    this.focusKeyManager = new FocusKeyManager(this.content.listItemElements).withWrap();

    this.subscriptions.push(
      // Observe for when a list item is focused and populate it in the input
      // First subscription works only for initially loaded elements
      this.mergeFocus(this.content.listItemElements).subscribe((val: string) => {
        this.value = val;
        // TODO: Need to dispose of the subscription when the one one change is fired
      }),

      // Need to make another subscription for when new elements are added
      this.itemsFocus().subscribe((val: string) => {
        this.value = val;
      }),
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  set value(val) {
    if (val !== undefined && this.selectedValue !== val) {
      this.selectedValue = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  // ControlValueAccessor functions are used to propagate the value changes

  // Writes passed in value to the input element
  writeValue(value: any) {
    if (!value) {
      return;
    }
    this.value = value;
  }

  // Called when the control's value changes in the UI
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // Update the form model on blur
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  // could be a directive?? use ng-container
  @HostListener('keydown', ['$event'])
  keyFunc(event) {
    event.stopImmediatePropagation();

    if (event.keyCode === 40 || event.keyCode === 38) {
      this.focusKeyManager.onKeydown(event);
    }
  }

  // Use to add items to the list
  public onValueChanged(value: string) {
    this.listItemsCopy.unshift(value);
  }

  // Show message when an item already exists but is not in view
  public onShowMessage() {
    this.showMessage = true;
    setTimeout(() => {
      // Auto hide the message after 3000ms
      this.showMessage = false;
      this.cd.detectChanges();
    }, 3000);

    this.cd.detectChanges();
  }

  // Listens for changes in the list, e.g. a new element is added
  // and creates a new observable to include the new list items in the DOM
  private itemsFocus() {
    return this.content.listItemElements.changes.pipe(
      switchMap((items) => {
        return this.mergeFocus(items);
      }),
    );
  }

  // Create a merged observable to monitor each item if it's on focus
  private mergeFocus(items: any) {
    const focus$ = items.map((item) => {
      return item.focus$;
    });
    return merge(...focus$);
  }
}
