import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
       BrowserAnimationsModule,
       HttpClientModule,
       MatToolbarModule,
       MatTabsModule,
       MatListModule,
       MatButtonModule,
       MatAutocompleteModule,
       FormsModule,
       ReactiveFormsModule,
       MatFormFieldModule,
       MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
