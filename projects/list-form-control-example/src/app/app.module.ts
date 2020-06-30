import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListFormControlModule } from 'list-form-control';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule, ListFormControlModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
