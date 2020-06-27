import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ListFormControlModule } from 'list-form-control';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ListFormControlModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
