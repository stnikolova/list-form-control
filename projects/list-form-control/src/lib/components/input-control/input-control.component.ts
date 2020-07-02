import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-input-control',
  templateUrl: './input-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputControlComponent implements OnInit, ControlValueAccessor {
  @Output() public valueChange: EventEmitter<any> = new EventEmitter();
  @Output() public inputFocus: EventEmitter<any> = new EventEmitter();

  public input: Subject<string> = new Subject();
  public val = '';

  public onChange: any = () => {};
  public onTouch: any = () => {};
  public hasValue: any = () => this.val;

  set value(val) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.input.next(val);
    }
  }
  // ControlValueAccessor functions are used to propagate the value changes

  // Writes passed in value to the input element
  writeValue(value: any) {
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

  ngOnInit(): void {
    // Delay value change emit to avoid excessive function calls
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

  // Listens for when the user is typing
  public modelChange(event) {
    this.input.next(event);
  }

  // Clears the input field
  public clearInput() {
    this.value = '';
  }
}
