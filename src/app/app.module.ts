import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { RatingComponent } from './components/rating/rating.component';
import {createCustomElement} from "@angular/elements";

@NgModule({
  declarations: [
    AppComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule{
  ngDoBootstrap() {}
  constructor(private injector: Injector) {

    const GuestRating = createCustomElement(RatingComponent, {
      injector: this.injector
    });
    customElements.define("guest-rating", GuestRating);

  }
}
