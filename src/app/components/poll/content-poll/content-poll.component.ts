import {Component, Input, OnInit} from '@angular/core';
import {ContentPollService} from "../../../services/content-poll.service";
import {IpUtilService} from "../../../services/ip-util.service";

@Component({
  selector: 'content-poll',
  templateUrl: './content-poll.component.html',
  styleUrls: ['./content-poll.component.css']
})
export class ContentPollComponent implements OnInit{

  public isLoading = false;
  public pollType:any;
  public selectedOption:any = "";


  public get CanVote()
  {
    return this.selectedOption != "";
  }
  constructor(private ip:IpUtilService,private service:ContentPollService) {
  }
  @Input('entryId')
  entryId : string = "";
  ngOnInit(): void {
    this.loadData();
  }
  public IPAddress="";
  pollSchemaRaw:any;

  pollResult : any;
  pollResultTotalCount : number = 0;
  PollOptions: any;
  @Input('voteActionLabel')
  voting_action_label: any = "Vote";

  @Input('actionClasses')
  public actionClasses: any = "";

  public entryKey = "";
  async loadData()
  {
    this.pollResultTotalCount = 0;
    this.isLoading = true;
    this.IPAddress = (await this.ip.getCurrentUserIpAddress()).ip;
    this.pollSchemaRaw = await this.service.getPollStructure(this.entryId);
    this.entryKey = this.pollSchemaRaw.key;
    this.pollResult = await this.service.getPollResult(this.entryId);
    this.pollResult = this.pollResult.facets[0].facetValues;
    this.getResponseTotalCount();
    this.prepareSchema();
    this.isLoading = false;
  }

  public getProgress(key:string)
  {
    // @ts-ignore
    let keyResponses = this.pollResult.filter( Occurrences => Occurrences.term == key)[0];
    return (Math.ceil((keyResponses.numberOfOccurrences / this.pollResultTotalCount) *100));
  }
  public getProgressColor(key:string)
  {
    // @ts-ignore
    let keyResponses = this.pollResult.filter( Occurrences => Occurrences.term == key)[0];
    return ((Math.ceil((keyResponses.numberOfOccurrences / this.pollResultTotalCount) *100))) > 50 ? "black":"grey";
  }
  getResponseTotalCount()
  {
    for (let i = 0 ; i < this.pollResult.length ; i++)
    {
      this.pollResultTotalCount+=this.pollResult[i].numberOfOccurrences;
    }
  }
  prepareSchema()
  {
    let contentFields = this.pollSchemaRaw["contentFields"];
    // @ts-ignore
    let rawType = contentFields.filter(element=>element.name == "PollType")[0] ;
    this.pollType = rawType.contentFieldValue.data== "Image Poll"?"image":"text";
    // @ts-ignore
    this.PollOptions  = contentFields.filter(element=>element.name == "PollOptions");

  }

  async vote() {
    this.isLoading = true;
    await this.service.postVote(this.entryId,this.entryKey, this.selectedOption, this.IPAddress);
    this.isLoading = false;
    this.loadData();
  }

  public getImage(element:any,field:string)
  {
    // @ts-ignore
    return element.nestedContentFields.filter(item=> item.name== field)[0].contentFieldValue.image.contentUrl;
  }
  public getText(element:any,field:string)
  {
    // @ts-ignore
    return element.nestedContentFields.filter(item=> item.name== field)[0].contentFieldValue.data;
  }
}
