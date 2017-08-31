import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {DataService} from './data-service';
import { HelloComponent } from './hello.component';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {MdButtonModule,
 MdCheckboxModule,
 MdCardModule,
 MdInputModule,
 MdToolbarModule} from '@angular/material';


@NgModule({
  imports:      [ BrowserModule,
  BrowserAnimationsModule,
  MdButtonModule, MdCheckboxModule,
  MdCardModule,
  MdToolbarModule,
  MdInputModule,
  HttpModule,
  ReactiveFormsModule
   ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ],
  providers:[DataService]
})
export class AppModule { }
