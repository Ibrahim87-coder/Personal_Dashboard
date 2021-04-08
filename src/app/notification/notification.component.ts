import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { notificationData } from '../shared/notification-data.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations:[
    trigger('notificationAnim',[
      transition(':enter',[
        style({
          opacity:0,
          transform:'translateY(5px)'
        }),
        animate('150ms 125ms ease-out')
      ]),
      transition(':leave',[
        animate(125,style({
          opacity:0,
          transform:'scale(0.85)'
        }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {
  
  constructor(private notificationService: NotificationService) {}

  notification?: notificationData[]

  timeOut?: any;

  ngOnInit(): void {
    this.notificationService.notifications.subscribe((notification: notificationData) => {
      this.notification = Array(notification) ;

      clearTimeout(this.timeOut);

      this.timeOut = setTimeout(() => {
        this.notification = null!;
      }, notification.duration);
    });
  }
}
