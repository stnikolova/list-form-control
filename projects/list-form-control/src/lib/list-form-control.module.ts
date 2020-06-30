import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ListFormControlComponent } from './list-form-control.component';
import { ListControlContentDirective } from './directives/list-control-content.directive';
import { ListControlDirective } from './directives/list-control.directive';

@NgModule({
  declarations: [ListFormControlComponent, ListControlContentDirective, ListControlDirective],
  imports: [CommonModule, OverlayModule],
  exports: [ListFormControlComponent, ListControlContentDirective, ListControlDirective],
})
export class ListFormControlModule {}
