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
    this.pollResult = await this.service.getPollResultByEntryKey(this.entryId);
    this.getResponseTotalCount();
    this.isLoading = false;
  }
  getResponseTotalCount()
  {
    this.pollResultTotalCount = this.pollResult.totalCount;
  }
  @Input('entryId')
  entryId : string = "";
  @Input('countLabel')
  CountLabel : string = "Voted";
  ngOnInit(): void {
    this.loadData();
  }
}
