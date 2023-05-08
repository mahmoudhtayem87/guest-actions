import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

declare const Liferay: any;

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private serviceUrl =  '/o/c/guestcontentratingratings/';
  constructor(private http:HttpClient) { }




  public async getRating(assetEntryId:string,assetType:string)
  {
    switch (assetType)
    {
      case 'blog':
        return await this.getBlogPostRating(assetEntryId);
        break;
      case 'journalArticle':
        return await this.getArticleRating(assetEntryId);
        break;
    }
    return this.getBlogPostRating(assetEntryId);
  }
  public async getArticleRating(assetEntryId:any)
  {
    let prom = new Promise((resolve, reject)=>{
      let serviceUrl = `/o/headless-delivery/v1.0/structured-contents/${assetEntryId}?fields=aggregateRating`;
      this.http.get(serviceUrl).subscribe(result=>{

        resolve(result);

      }, error=>{

        reject(error);

      })
    });
    return prom;
  }
  public async getBlogPostRating(assetEntryId:any)
  {
    let serviceUrl = `/o/headless-delivery/v1.0/blog-postings/${assetEntryId}?fields=aggregateRating&p_auth=${Liferay.authToken}`;
    let prom = new Promise((resolve, reject)=>{
      this.http.get(serviceUrl).subscribe(result=>{resolve(result)},error=>{reject(error)});
    });
    return prom;
  }

  public async submitRating(ip:any,entryId:any,entryType:any,rating:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let currentUser = Liferay.ThemeDisplay.isSignedIn()?Liferay.ThemeDisplay.getUserId():0;
    let lastAction =Liferay.ThemeDisplay.isSignedIn()? await this.getRatingByIPAddressAndUserId(ip,entryId): await this.getRatingByIPAddress(ip,entryId);
    let lastActionUserId = "";
    // @ts-ignore
    if (lastAction && lastAction["items"] && lastAction["items"][0])
    {
      // @ts-ignore
      lastActionUserId =lastAction["items"][0]["lastActionUserId"] ==""? lastAction["items"][0]["ratedByUserId"] : lastAction["items"][0]["lastActionUserId"];
    }
    let body = {
      ipAddress:ip,
      assetEntryId:entryId,
      assetEntryType:entryType,
      rating:rating,
      ratedByUserId : currentUser,
      recaptcha:'',
      lastActionUserId: lastActionUserId
    }
    let prom = new Promise((resolve, reject)=>{
      this.http.post(`${this.serviceUrl}?p_auth=${Liferay.authToken}`,JSON.stringify(body),httpOptions).subscribe(result=>{
        resolve(result)
          }
          ,err=>{
        reject(err)
          });
    });
    return prom;
  }

  public async submitRatingAuto(ip:any,entryId:any,entryType:any,rating:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let currentUser = Liferay.ThemeDisplay.isSignedIn()?Liferay.ThemeDisplay.getUserId():0;
    let lastAction =await this.getRatingByIPAddress(ip,entryId);
    let lastActionUserId = "";
    // @ts-ignore
    if (lastAction && lastAction["items"] && lastAction["items"][0])
    {
      // @ts-ignore
      rating = lastAction["items"][0]["rating"] == "1"? 0:1;
      // @ts-ignore
      lastActionUserId =lastAction["items"][0]["lastActionUserId"] ==""? lastAction["items"][0]["ratedByUserId"] : lastAction["items"][0]["lastActionUserId"];
    }
    let body = {
      ipAddress:ip,
      assetEntryId:entryId,
      assetEntryType:entryType,
      rating:rating,
      ratedByUserId : currentUser,
      recaptcha:'',
      lastActionUserId: lastActionUserId
    }
    let prom = new Promise((resolve, reject)=>{
      this.http.post(`${this.serviceUrl}?p_auth=${Liferay.authToken}`,JSON.stringify(body),httpOptions).subscribe(result=>{
            resolve(result)
          }
          ,err=>{
            reject(err)
          });
    });
    return prom;
  }

  public async getRatingByIPAddressAndUserId(ipAddress:any,entryId:any)
  {
    let baseURL = `/o/c/guestcontentratingratings/?filter=ratedByUserId%20eq%20%27${Liferay.ThemeDisplay.getUserId()}%27%20and%20assetEntryId%20eq%20%27${entryId}%27&sort=id%3Adesc&p_auth=${Liferay.authToken}`;
    let prom = new Promise((resolve, reject)=>{
      this.http.get(baseURL).subscribe(result=>{resolve(result)},error=>{reject(error)});
    });
    return prom;
  }
  public async getRatingBy_IPAddress(ipAddress:any,entryId:any)
  {
    let baseURL = `/o/c/guestcontentratingratings/?filter=ipAddress%20eq%20%27${ipAddress}%27%20and%20assetEntryId%20eq%20%27${entryId}%27&sort=id%3Adesc&p_auth=${Liferay.authToken}`;
    let prom = new Promise((resolve, reject)=>{
      this.http.get(baseURL).subscribe(result=>{resolve(result)},error=>{reject(error)});
    });
    return prom;
  }

  public async getRatingByIPAddress(ipAddress:any,entryId:any)
  {
    return (Liferay.ThemeDisplay.isSignedIn() ?  await this.getRatingByIPAddressAndUserId(ipAddress,entryId) :  await this.getRatingBy_IPAddress(ipAddress,entryId));
  }
}
