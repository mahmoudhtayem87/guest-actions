import {Component, Input} from '@angular/core';
import {IpUtilService} from "../../../services/ip-util.service";
import {RatingService} from "../../../services/rating.service";

@Component({
  selector: 'guest-rating-two-options',
  templateUrl: './rating-two-options.component.html',
  styleUrls: ['./rating-two-options.component.css']
})
export class RatingTwoOptionsComponent {

  public thumbColor="gray";
  public IPAddress="";
  lastAction:any;
  public isLoading = false;
  @Input('entryId')
  entryId=0;

  @Input('labelAgree')
  label_agree="Agree";
  @Input('labelDisagree')
  label_disagree="Disagree";
  @Input('entryType')
  entryType='';
  public Rating :any = 0 ;

  public thumbUpDisabled = true;
  public thumbDownDisabled = true;


  constructor(private ip:IpUtilService, private ratingService:RatingService) {
    this.loadData();
  }

  async loadData()
  {
    this.isLoading = true;


    this.IPAddress = (await this.ip.getCurrentUserIpAddress()).ip;
    // @ts-ignore
    let ratingResponse = await this.ratingService.getRating(this.entryId,this.entryType);
    // @ts-ignore
    if (ratingResponse["aggregateRating"])
    {
      // @ts-ignore
      this.Rating = ratingResponse["aggregateRating"]["ratingValue"];
    }else
      this.Rating = 0;

    // @ts-ignore
    this.lastAction = await this.ratingService.getRatingByIPAddress(this.IPAddress,this.entryId);
    this.getThumbColor();
    this.isLoading = false;
  }

  getThumbColor()
  {
    let lastActionItem = this.lastAction["items"][0];
    console.log(lastActionItem);
    if (!this.lastAction || this.lastAction.totalCount == 0)
    {
      this.thumbUpDisabled = false;
      this.thumbDownDisabled = false;

      console.log(this.thumbUpDisabled );
      console.log(this.thumbDownDisabled );


      return;
    }


    if (lastActionItem["rating"] == "1")
    {
      this.thumbUpDisabled = true;
      this.thumbDownDisabled = false;
    }
    else if (lastActionItem["rating"] == "0")
    {
      this.thumbUpDisabled = false;
      this.thumbDownDisabled = true;
    }else
    {
      this.thumbUpDisabled = false;
      this.thumbDownDisabled = false;
    }

    console.log(this.thumbUpDisabled );
    console.log(this.thumbDownDisabled );


  }
  async postRating(rating:number) {
    this.isLoading = true;
    await this.ratingService.submitRating(this.IPAddress,this.entryId,this.entryType,rating);
    this.isLoading = false;
    await this.loadData();
  }
}
