import {
  Directive,
  OnInit,
  Input,
  ElementRef,
  ViewContainerRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgControl, AbstractControl } from '@angular/forms';
import {
  OverlayRef,
  Overlay,
  ConnectionPositionPair,
  OverlayConfig,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';

import { fromEvent, ReplaySubject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { ListControlContentComponent } from '../components/list-control-content/list-control-content.component';

@Directive({
  selector: '[listControl]',
  exportAs: 'listControl',
})
export class ListControlDirective {
  @Input() public listControl: ListControlContentComponent;

  private origin: HTMLInputElement;
  private overlayRef: OverlayRef;

  constructor(private host: ElementRef, private vcr: ViewContainerRef, private overlay: Overlay) {
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

  // public openDropdown() {
  //   // Create an overlay instance
  //   this.overlayRef = this.overlay.create(this.getOverlayConfig());

  //   // Pass the template to be rendered in the overlay, e.g. the list
  //   // const template = new TemplatePortal(this.listControl.rootTemplate, this.vcr);
  //   this.overlayRef.attach(new ComponentPortal(ListControlContentComponent));

  //   // Attach event listener for when the user clicks outside of the control
  //   this.overlayClickOutside(this.overlayRef, this.origin).subscribe(() => this.close());
  // }

  // private close(): void {
  //   this.overlayRef.detach();
  //   this.overlayRef = null;
  // }

  // private getOverlayConfig(): OverlayConfig {
  //   return new OverlayConfig({
  //     width: this.origin.offsetWidth,
  //     positionStrategy: this.getOverlayPosition(),
  //     scrollStrategy: this.overlay.scrollStrategies.reposition(),
  //   });
  // }

  // private getOverlayPosition(): PositionStrategy {
  //   // Determine the position on-screen relative to the input element
  //   const positionStrategy = this.overlay
  //     .position()
  //     .flexibleConnectedTo(this.origin)
  //     .withPositions(this.getPositions())
  //     .withPush(false);

  //   return positionStrategy;
  // }

  // private getPositions(): ConnectionPositionPair[] {
  //   // The most suitable position will be selected
  //   // based on how well the overlay fits within the viewport
  //   // taking into account the following preferential order
  //   return [
  //     // Positions list below input
  //     {
  //       originX: 'center',
  //       originY: 'bottom',
  //       overlayX: 'center',
  //       overlayY: 'top',
  //     },
  //     // Fallback the list position above input
  //     {
  //       originX: 'center',
  //       originY: 'top',
  //       overlayX: 'center',
  //       overlayY: 'bottom',
  //     },
  //   ];
  // }

  // Listen for a click event and close the list when either the click target isn’t the origin
  // or it isn’t the dropdown or any one of its children.
  private overlayClickOutside(overlayRef: OverlayRef, origin: HTMLElement): Observable<MouseEvent> {
    return fromEvent<MouseEvent>(document, 'click').pipe(
      filter((event) => {
        const clickTarget = event.target as HTMLElement;
        const notOrigin = clickTarget !== origin;
        const notOverlay =
          !!overlayRef && overlayRef.overlayElement.contains(clickTarget) === false;
        return notOrigin && notOverlay;
      }),
      takeUntil(overlayRef.detachments()),
    );
  }
}
