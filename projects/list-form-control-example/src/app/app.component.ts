import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public myControl = new FormControl();
  public myForm: FormGroup = new FormGroup({ myControl: this.myControl });
  public items = [
    'alpha',
    'bravo',
    'charlie',
    'delta',
    'echo',
    'foxtrot',
    'golf',
    'hotel',
    'india',
    'juliet',
  ];

  public ngOnInit() {
    this.myControl.valueChanges.subscribe((res) => console.log(res));
  }
}
