import { ListKeyManager, FocusKeyManager } from '@angular/cdk/a11y';
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
} from '@angular/core';
import { merge } from 'rxjs';
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
export class ListControlComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() listItems: Array<string>;

  @ViewChild(ListControlContentComponent)
  content: ListControlContentComponent;

  @ContentChild(ListControlDirective) input: ListControlDirective;
  public keyboardEventsManager: ListKeyManager<any>;
  public focusKeyManager: FocusKeyManager<ListControlItemComponent>;

  public selectedValue;
  public showMessage;
  public onChange: any = () => {};
  public onTouch: any = () => {};

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {}

  public ngAfterViewInit() {
    this.focusKeyManager = new FocusKeyManager(this.content.listItemElements).withWrap();
    this.mergeFocus(this.content.listItemElements).subscribe((val: string) => {
      this.value = val;
    });

    this.itemsFocus().subscribe((val: string) => {
      this.value = val;
    });
  }

  set value(val) {
    if (val !== undefined && this.selectedValue !== val) {
      this.selectedValue = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  writeValue(value: any) {
    if (!value) {
      return;
    }
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

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

  public onValueChanged(value: string) {
    this.listItems.unshift(value);
  }

  private itemsFocus() {
    return this.content.listItemElements.changes.pipe(
      switchMap((items) => {
        return this.mergeFocus(items);
      }),
    );
  }

  mergeFocus(items: any) {
    const focus$ = items.map((item) => {
      return item.focus$;
    });
    return merge(...focus$);
  }

  onShowMessage() {
    this.showMessage = true;
    this.cd.detectChanges();
  }
}
