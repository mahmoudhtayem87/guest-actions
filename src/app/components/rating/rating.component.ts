import {Component, Input} from '@angular/core';
import {IpUtilService} from "../../services/ip-util.service";
import {RatingService} from "../../services/rating.service";
import {last} from "rxjs";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  public thumbColor="gray";
  public IPAddress="";
  lastAction:any;
  public isLoading = false;
  @Input('entryId')
  entryId=0;
  @Input('entryType')
  entryType='';
  public Rating :any = 0 ;

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
    if (!this.lastAction || this.lastAction.totalCount == 0)
    {
      this.thumbColor = "gray";
      return;
    }

    let lastActionItem = this.lastAction["items"][0];
    if (lastActionItem["rating"] == "1")
      this.thumbColor = "var(--primary)"
    else
      this.thumbColor = "gray";

  }
  async postRating() {
    this.isLoading = true;
    await this.ratingService.submitRating(this.IPAddress,this.entryId,this.entryType,1);
    this.isLoading = false;
    await this.loadData();
  }
}
