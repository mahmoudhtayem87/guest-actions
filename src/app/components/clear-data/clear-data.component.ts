import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
declare const Liferay: any;
@Component({
  selector: 'clear-data',
  templateUrl: './clear-data.component.html',
  styleUrls: ['./clear-data.component.css']
})
export class ClearDataComponent {
  object: any;
  Items: any = [];
  constructor(private http:HttpClient) {
  }

  getData()
  {
    var prom = new Promise((resolve, reject)=>{
      this.http.get(`/o/c/${this.object}?p_auth=${Liferay.authToken}`).subscribe(result=>{resolve(result)})
    });
    return prom;
  }

  deleteItem(id:string)
  {
    var prom = new Promise((resolve, reject)=>{
      this.http.delete(`/o/c/${this.object}/${id}?p_auth=${Liferay.authToken}`).subscribe(result=>{resolve(result)})
    });
    return prom;
  }

  async clearData()
  {
    // @ts-ignore
    let items = (await this.getData()).items;
    console.log(items)
    for (let i = 0 ; i < items.length ; i++)
    {
      this.Items.push(`Removing Item Number ${items[i].id}`);
      console.log(items[i].id)
      await this.deleteItem(items[i].id);
    }
  }

}
