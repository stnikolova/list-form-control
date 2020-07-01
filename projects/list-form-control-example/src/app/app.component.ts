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
  public items = ['stefi', 'joro', 'kakodja', 'parporo'];

  public ngOnInit() {
    // this.myForm
    this.myControl.valueChanges.subscribe((res) => console.log(res));
  }

  public onChange(event) {
    console.log(event);
  }
}
