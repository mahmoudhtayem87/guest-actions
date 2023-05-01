import {Component, Input, OnInit} from '@angular/core';
import {ContentPollService} from "../../../services/content-poll.service";
import {IpUtilService} from "../../../services/ip-util.service";

@Component({
  selector: 'app-total-count',
  templateUrl: './total-count.component.html',
  styleUrls: ['./total-count.component.css']
})
export class TotalCountComponent  implements OnInit{
  public pollResultTotalCount = 0 ;
  private pollResult: any;
  public isLoading = false;
  constructor(private ip:IpUtilService,private service:ContentPollService) {

  }

  async loadData()
  {
    this.pollResultTotalCount = 0;
    this.isLoading = true;
    this.pollResult = await this.service.getPollResult(this.entryId);
    this.pollResult = this.pollResult.facets[0].facetValues;
    this.getResponseTotalCount();
    this.isLoading = false;
  }

  getResponseTotalCount()
  {
    for (let i = 0 ; i < this.pollResult.length ; i++)
    {
      this.pollResultTotalCount+=this.pollResult[i].numberOfOccurrences;
    }
  }

  @Input('entryId')
  entryId : string = "";

  ngOnInit(): void {
    this.loadData();
  }


}
