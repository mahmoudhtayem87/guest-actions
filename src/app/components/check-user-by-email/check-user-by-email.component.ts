import { Component } from '@angular/core';
import {CheckUserByEmailService} from "../../services/check-user-by-email.service";

@Component({
  selector: 'guest-email-validation',
  templateUrl: './check-user-by-email.component.html',
  styleUrls: ['./check-user-by-email.component.css']
})
export class CheckUserByEmailComponent {
    email: any;

    result : any;
    constructor(private service:CheckUserByEmailService) {
    }
    async validate() {
        this.result = await this.service.ValidateUserByEmail(this.email);
    }
}
