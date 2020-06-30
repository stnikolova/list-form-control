import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ContentChild,
  ViewEncapsulation,
} from '@angular/core';
import { ListControlContentDirective } from './directives/list-control-content.directive';

@Component({
  selector: 'lib-list-form-control',
  templateUrl: './list-form-control.component.html',
  styleUrls: ['./list-form-control.component.scss'],
  exportAs: 'listControl',
  encapsulation: ViewEncapsulation.None,
})
export class ListFormControlComponent implements OnInit {
  // Obtain a reference to the root template
  @ViewChild('root') rootTemplate: TemplateRef<any>;

  // Obtain a reference to the directive in order to pass the template to be referenced
  @ContentChild(ListControlContentDirective)
  content: ListControlContentDirective;

  constructor() {}

  public ngOnInit(): void {}
}
