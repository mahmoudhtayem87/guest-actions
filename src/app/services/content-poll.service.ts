import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

declare const Liferay: any;
@Injectable({
  providedIn: 'root'
})
export class ContentPollService {

  private baseUrl_VotingObject =  '/o/c/contentvotings';
  private baseUrl_PollStructure =  '/o/headless-delivery/v1.0/structured-contents';
  constructor(private http:HttpClient) { }

  public postVote(WebContentId : string,WebContentKey:string, VoteValue:string,ipAddress : string)
  {
    let prom = new Promise((resolve, reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let body = {
        entryId : WebContentId,
        voteValue : VoteValue,
        ipAddress: ipAddress,
        entryKey:WebContentKey

      }
      this.http.post(`${this.baseUrl_VotingObject}?p_auth=${Liferay.authToken}`,JSON.stringify(body),httpOptions).subscribe(result=>{
        resolve(result);
      },error => {
        reject(error);
      })
    });
    return prom;
  }
  public getPollStructure(WebContentId:string)
  {

    let prom = new Promise((resolve, reject)=>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept-Language':Liferay.ThemeDisplay.getLanguageId().replace('_','-')
        })
      };
      this.http.get(`${this.baseUrl_PollStructure}/${WebContentId}?fields=key,contentFields&p_auth=${Liferay.authToken}`,httpOptions).subscribe(result=>{
        resolve(result);
      },error=>{
        reject(error)
      })
    });
    return prom;
  }

  public getPollResult(WebContentId:string)
  {
    let prom = new Promise((resolve, reject)=>{

      this.http.get(`${this.baseUrl_VotingObject}/?aggregationTerms=voteValue&flatten=facets&filter=entryId%20eq%20%27${WebContentId}%27&p_auth=${Liferay.authToken}`).subscribe(result=>{
        resolve(result);
      },error=>{
        reject(error)
      })
    });
    return prom;
  }

  public getPollResultByEntryKey(WebContentKey:string)
  {
    let prom = new Promise((resolve, reject)=>{

      this.http.get(`${this.baseUrl_VotingObject}/?aggregationTerms=voteValue&flatten=facets&filter=entryKey%20eq%20%27${WebContentKey}%27&p_auth=${Liferay.authToken}`).subscribe(result=>{
        resolve(result);
      },error=>{
        reject(error)
      })
    });
    return prom;
  }

}
