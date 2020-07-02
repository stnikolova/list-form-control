import { Directive, Input, ElementRef, ViewContainerRef, HostListener } from '@angular/core';
import { ListControlContentComponent } from '../components/list-control-content/list-control-content.component';

@Directive({
  selector: '[listControl]',
  exportAs: 'listControl',
})
export class ListControlDirective {
  @Input() public listControl: ListControlContentComponent;

  private origin: HTMLInputElement;

  constructor(private host: ElementRef, private vcr: ViewContainerRef) {
    this.origin = this.host.nativeElement;
  }

  @HostListener('inputFocus', ['$event'])
  keyFunc(event) {
    this.listControl.toggleDropdown(event);
  }

  @HostListener('window:click', ['$event'])
  clickFunc(event) {
    event.stopPropagation();
    const clickTarget = event.target.parentElement as HTMLElement;
    const isOrigin = clickTarget === this.origin;
    this.listControl.toggleDropdown(isOrigin);
  }
}
