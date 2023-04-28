import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IpUtilService {

  constructor(private http: HttpClient) { }

  async getCurrentUserIpAddress(): Promise<any> {
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
