import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

declare const Liferay: any;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private serviceUrl =  '/o/c/guestcontentcomments/';
  constructor(private http:HttpClient) { }



  public async submitComment(ip:any,entryId:any,entryType:any,comment:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let currentUser = Liferay.ThemeDisplay.isSignedIn()?Liferay.ThemeDisplay.getUserId():0;

    let body = {
      ipAddress:ip,
      assetEntryId:entryId,
      assetEntryType:entryType,
      comment:comment,
      ratedByUserId : currentUser,
      recaptcha:'',
      lastActionUserId:''
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

}
