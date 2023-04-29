import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { RatingComponent } from './components/rating/rating.component';
import {createCustomElement} from "@angular/elements";
import { GuestCommentComponent } from './components/comment/comment.component';
import {FormsModule} from "@angular/forms";
import { ClearDataComponent } from './components/clear-data/clear-data.component';

@NgModule({
  declarations: [
    AppComponent,
    RatingComponent,
    GuestCommentComponent,
    ClearDataComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
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

    const GuestComment = createCustomElement(GuestCommentComponent, {
      injector: this.injector
    });
    customElements.define("guest-comment", GuestComment);

    const ClearData = createCustomElement(ClearDataComponent, {
      injector: this.injector
    });
    customElements.define("guest-clear-data", ClearData);

  }
}
