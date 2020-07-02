import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { InputControlComponent } from './input-control.component';

describe('InputControlComponent', () => {
  let component: InputControlComponent;
  let fixture: ComponentFixture<InputControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [InputControlComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call inputFocus emitter with true', () => {
    spyOn(component.inputFocus, 'emit');

    // trigger the focus
    const { nativeElement } = fixture;
    const input = nativeElement.querySelector('input');
    input.dispatchEvent(new Event('focus'));

    expect(component.inputFocus.emit).toHaveBeenCalledWith(true);
  });

  it('should clear input value when clearInput is called', () => {
    const testValue = 'coco jumbo';
    component.val = testValue;

    expect(component.val).toEqual(testValue);

    component.clearInput();

    expect(component.val).toEqual('');
  });

  it('should pass a value to writeValue and fill in the input', () => {
    const testValue = 'coco jumbo';

    expect(component.val).toEqual('');

    component.writeValue(testValue);

    expect(component.val).toEqual(testValue);
  });

  it('should call onValueEnter function after user hits enter', () => {
    const spy = spyOn(component, 'onValueEnter');

    const testValue = 'coco jumbo';
    component.val = testValue;

    expect(component.val).toEqual(testValue);

    // Trigger input enter
    const { nativeElement } = fixture;
    const input = nativeElement.querySelector('input');
    input.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
      }),
    );

    expect(spy).toHaveBeenCalled();
  });
});
