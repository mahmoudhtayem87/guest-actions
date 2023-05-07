import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


declare const Liferay: any;
@Injectable({
  providedIn: 'root'
})
export class CheckUserByEmailService {

  private serviceUrl =  '/o/c/uservalidationrequests';
  constructor(private http:HttpClient) { }

  public createValidationRequest(emailAddress:string)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body={
      email:emailAddress
    };
    let prom = new Promise((resolve, reject)=>{
      this.http.post(`${this.serviceUrl}`,body,httpOptions).subscribe(result=>{
        resolve(result);
      })
    });
    return prom;
  }

  public getValidationRequestResult(requestId:string)
  {
    let prom = new Promise((resolve, reject)=>{
      this.http.get(`${this.serviceUrl}/${requestId}`).subscribe(result=>{
        resolve(result);
      })
    });
    return prom;
  }

  public async ValidateUserByEmail(emailAddress:string)
  {
    let request = await this.createValidationRequest(emailAddress);
    // @ts-ignore
    let result = await this.getValidationRequestResult(request.id);
    return result;
  }

}
