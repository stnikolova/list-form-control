import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { ListControlContentComponent } from './components/list-control-content/list-control-content.component';
import { ListControlContentDirective } from './directives/list-control-content.directive';
import { ListControlDirective } from './directives/list-control.directive';
import { FocusValueMatchDirective } from './directives/focus-value-match.directive';
import { ListControlItemComponent } from './components/list-control-item/list-control-item.component';
import { ListControlComponent } from './components/list-control/list-control.component';
import { InputControlComponent } from './components/input-control/input-control.component';

@NgModule({
  declarations: [
    ListControlContentComponent,
    ListControlContentDirective,
    ListControlDirective,
    FocusValueMatchDirective,
    ListControlItemComponent,
    ListControlComponent,
    InputControlComponent,
  ],
  imports: [CommonModule, OverlayModule, FormsModule],
  exports: [
    ListControlContentComponent,
    ListControlItemComponent,
    ListControlComponent,
    ListControlContentDirective,
    ListControlDirective,
    FocusValueMatchDirective,
    InputControlComponent,
  ],
})
export class ListFormControlModule {}
