import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const Liferay: any;

@Injectable({
  providedIn: 'root'
})
export class IpUtilService {

  constructor(private http: HttpClient) { }

  async getCurrentUserIpAddress(): Promise<any> {

    if(Liferay.ThemeDisplay.isSignedIn())
    {
      return {ip:'0.0.0.0'};
    }else {
      let prom = new Promise((resolve,reject)=>{
        this.http.get('https://api.ipify.org/?format=json').subscribe(result=>{
          resolve(result);
        },(err)=>{
          reject(err);
        })
      });
      return prom;
    }

  }

}
