import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'lib-list-control-item',
  templateUrl: './list-control-item.component.html',
  styleUrls: ['./list-control-item.component.css'],
})
export class ListControlItemComponent implements OnInit {
  @Input() value: string;
  public item: ElementRef<any>;

  constructor(private host: ElementRef) {
    this.item = this.host.nativeElement;
  }

  ngOnInit(): void {}
}
