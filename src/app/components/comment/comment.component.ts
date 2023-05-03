import {Component, Input} from '@angular/core';
import { isEmpty } from 'lodash';
import {IpUtilService} from "../../services/ip-util.service";
import {RatingService} from "../../services/rating.service";
import {CommentService} from "../../services/comment.service";
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
    constructor(private ip:IpUtilService, private commentService:CommentService) {
    }
    public get IsEnabled()
    {
        return isEmpty(this.comment);
    }

    async postComment() {
        this.isLoading = true;
        this.IPAddress = (await this.ip.getCurrentUserIpAddress()).ip;
        if (!isEmpty(this.comment)) {
            console.log(this.comment);
            console.log(this.entryType);
            console.log(this.entryId);
            console.log(this.buttonLabel);
        }
        await this.commentService.submitComment(this.IPAddress,this.entryId,this.entryType,this.comment,this.ObjectDefinitionId);
        this.isLoading = false;
        location.reload();

    }
}
