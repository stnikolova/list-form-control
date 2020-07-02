# List Control with Input

## Functionality
An input form control consisting of two parts – an input and a list.
- Typing into the input and pressing Enter adds the text to the top of the list
- An incremental index is displayed.
- Up/down arrows pressed while the input is focused navigate through the list and highligh the active row.
- The input value shows the highlighted value, except when adding a new one.
- The list displays only the last 10 values
- No two exact values can be present in the list
- An original copy of the list is kept for referencing all existing values
- If user writes an existing value an informative message is shown that the value exist but is not displayed in the list

## Usage

You'll need to add `ListControlModule` to your application module in order to use the component

### Dependencies
`FormsModule`
`ReactiveFormModule` (optional) - if you want to use Model-Driven Form

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormModule,
    ListControlModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
```

### Example

Here's a simple example of using the `<lib-list-control>`:

##### Template-Driven Form

Simply add `lib-list-control` element with options to your form:

```html
<form #form="ngForm">
    <lib-list-control ngModel name="customInput"></lib-list-control>
</form>
```

##### Model-Driven Form

You'll need to add form initialization to your app-component at first:

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      customInput: ''
    });
  }
}
```
And then add `lib-list-control` element to your form:

```html
<form [formGroup]="form">
    <lib-list-control formControlName="customInput"></lib-list-control>
</form>
```

### Bound Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| `listItems` | `array` | The list values to be loaded into the component |


