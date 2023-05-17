import {Component, Input} from '@angular/core';
import { isEmpty } from 'lodash';
import {IpUtilService} from "../../services/ip-util.service";
import {RatingService} from "../../services/rating.service";
import {CommentService} from "../../services/comment.service";
import {ReCaptchaV3Service} from "ng-recaptcha";
declare const location: any;

@Component({
  selector: 'guest-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class GuestCommentComponent {
    comment: any;
    public isLoading = false;
    public IPAddress="";
    @Input('entryId')
    entryId : string = "";
    @Input('entryType')
    entryType:string = "";

    @Input('objectDefinitionId')
    ObjectDefinitionId = "";

    @Input('buttonLabel')
    buttonLabel:string = "Reply";
    constructor(private ip:IpUtilService, private commentService:CommentService,private recaptchaV3Service: ReCaptchaV3Service) {
    }
    public get IsEnabled()
    {
        return isEmpty(this.comment);
    }
    reCAPTCHAToken: string = "";
    tokenVisible: boolean = false;
    generateRecaptcha()
    {
        let prom = new Promise((resolve,reject)=>{
            this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
                resolve(token);
            },error => {
                console.log(error.message);
                reject(error);
            });
        });
        return prom;
    }
    async postComment() {
        this.reCAPTCHAToken  = (await  this.generateRecaptcha()) as string;
        if (isEmpty(this.reCAPTCHAToken))
            return;
        this.isLoading = true;
        this.IPAddress = (await this.ip.getCurrentUserIpAddress()).ip;
        if (!isEmpty(this.comment)) {
            await this.commentService.submitComment(this.IPAddress,this.entryId,this.entryType,this.comment,this.ObjectDefinitionId,this.reCAPTCHAToken);
            location.reload();
        }
        this.isLoading = false;
    }
}
