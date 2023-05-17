import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { RatingComponent } from './components/rating-components/rating/rating.component';
import {createCustomElement} from "@angular/elements";
import { GuestCommentComponent } from './components/comment/comment.component';
import {FormsModule} from "@angular/forms";
import { ClearDataComponent } from './components/clear-data/clear-data.component';
import { ContentPollComponent } from './components/poll/content-poll/content-poll.component';
import { TotalCountComponent } from './components/poll/total-count/total-count.component';
import { AddComponent } from './components/discussion/add/add.component';
import { CheckUserByEmailComponent } from './components/check-user-by-email/check-user-by-email.component';
import { RatingTwoOptionsComponent } from './components/rating-components/rating-two-options/rating-two-options.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    RatingComponent,
    GuestCommentComponent,
    ClearDataComponent,
    ContentPollComponent,
    TotalCountComponent,
    AddComponent,
    CheckUserByEmailComponent,
    RatingTwoOptionsComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
      RecaptchaV3Module
    ],
  providers: [{
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: '6LdWSdglAAAAAIoDT_GHwy3Jf6WKud6ChZ67TQkw',
  }],
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

    const ContentPoll = createCustomElement(ContentPollComponent, {
      injector: this.injector
    });
    customElements.define("content-poll", ContentPoll);


    const ContentPollTotalVotes = createCustomElement(TotalCountComponent, {
      injector: this.injector
    });
    customElements.define("content-poll-total", ContentPollTotalVotes);

    const UserEmailValidation = createCustomElement(CheckUserByEmailComponent, {
      injector: this.injector
    });
    customElements.define("guest-email-validation", UserEmailValidation);

    const RatingTwoOptions = createCustomElement(RatingTwoOptionsComponent, {
      injector: this.injector
    });
    customElements.define("guest-rating-two-options", RatingTwoOptions);

  }
}
