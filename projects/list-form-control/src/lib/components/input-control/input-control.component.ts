import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => InputControlComponent),
      multi: true,
    },
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputControlComponent implements OnInit, ControlValueAccessor {
  @Output() public valueChange: EventEmitter<any> = new EventEmitter();
  @Output() public inputFocus: EventEmitter<any> = new EventEmitter();

  public input: Subject<string> = new Subject();
  // public inputValue: string;

  val = '';

  public onChange: any = () => {};
  public onTouch: any = () => {};
  public hasValue: any = () => this.val;

  constructor(private cd: ChangeDetectorRef) {}

  set value(val) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.input.next(val);
      // this.onChange(val);
      // this.onTouch(val);
    }
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    // this.cd.detectChanges();
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  ngOnInit(): void {
    this.input.pipe(debounceTime(300), distinctUntilChanged()).subscribe((value) => {
      this.onChange(value);
      this.onTouch(value);
    });
  }

  public onValueEnter(event) {
    this.valueChange.emit(event.target.value);
    this.clearInput();
  }

  public onFocus() {
    this.inputFocus.emit(true);
  }

  public modelChange(event) {
    this.input.next(event);
  }

  public clearInput() {
    this.value = '';
  }
}
