import { Directive, TemplateRef } from '@angular/core';

// Expose a reference to the template so it can be queried and rendered on demand
@Directive({
  selector: '[listControlContent]',
  exportAs: 'listControlContent',
})
export class ListControlContentDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
