import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[listControlContent]',
})
export class ListControlContentDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
