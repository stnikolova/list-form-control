import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ListControlContentComponent } from './components/list-control-content/list-control-content.component';
import { ListControlContentDirective } from './directives/list-control-content.directive';
import { ListControlDirective } from './directives/list-control.directive';
import { ListControlItemComponent } from './components/list-control-item/list-control-item.component';

@NgModule({
  declarations: [
    ListControlContentComponent,
    ListControlContentDirective,
    ListControlDirective,
    ListControlItemComponent,
  ],
  imports: [CommonModule, OverlayModule],
  exports: [
    ListControlContentComponent,
    ListControlItemComponent,
    ListControlContentDirective,
    ListControlDirective,
  ],
})
export class ListFormControlModule {}
