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
  public imgSrc = "";
  public isModleVisible : boolean = false;
  public showModle(imgUrl:any)
  {
    this.imgSrc = imgUrl;
    this.isModleVisible = true;

  }
  public hideModle()
  {
    this.imgSrc = "";
    this.isModleVisible = false;

  }
  public entryKey = "";
  async prepareResults() {
    //this.pollResult.facets[0].facetValues
    for (let i = 0 ; i < this.PollOptions.length ; i ++)
    {
      var key = this.getText(this.PollOptions[i],'OptionKey');
      var result = {
        numberOfOccurrences:await this.service.getTotalVotesByAnswer(this.entryId,key),
        term: key
      };
      this.pollResult.facets[0].facetValues.push(result);
    }

  }
  async loadData()
  {
    this.pollResultTotalCount = 0;
    this.isLoading = true;
    this.IPAddress = (await this.ip.getCurrentUserIpAddress()).ip;
    this.pollSchemaRaw = await this.service.getPollStructure(this.entryId);
    this.pollResult = await this.service.getPollResult(this.entryId);
    await this.prepareSchema();
    this.entryKey = this.pollSchemaRaw.key;
    this.pollResult = this.pollResult.facets[0].facetValues;
    this.getResponseTotalCount();
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
    console.log(this.pollResult)
    for (let i = 0 ; i < this.pollResult.length ; i++)
    {
      this.pollResultTotalCount+=this.pollResult[i].numberOfOccurrences;
    }
  }
  async prepareSchema()
  {
    let contentFields = this.pollSchemaRaw["contentFields"];
    // @ts-ignore
    let rawType = contentFields.filter(element=>element.name == "PollType")[0] ;
    this.pollType = rawType.contentFieldValue.data== "Image Poll"?"image":"text";
    // @ts-ignore
    this.PollOptions  = contentFields.filter(element=>element.name == "PollOptions");
    if (this.pollResult.facets[0].facetValues.length == 0)
    {
      await this.prepareResults();
    }

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
