import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden',
        }),

        query(
          ':enter,:leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'block',
            }),
          ],
          { optional: true }
        ),

        //  query(':enter',[
        //    style({ opacity:0 })
        //  ], { optional:true}),

        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(-50px)',
                })
              ),
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              style({
                transform: 'translateX(50px)',
                opacity: 0,
              }),
              animate(
                '250ms 120ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden',
        }),

        query(
          ':enter,:leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'block',
            }),
          ],
          { optional: true }
        ),

        //  query(':enter',[
        //    style({ opacity:0 })
        //  ], { optional:true}),

        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(+50px)',
                })
              ),
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              style({
                transform: 'translateX(-50px)',
                opacity: 0,
              }),
              animate(
                '250ms 120ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
    trigger('bgAnim',[
      transition(':leave',[
        animate(1000,style({
          opacity:0
        }))
      ])
    ]),
    trigger('fadeAnim',[
      transition(':enter',[
        style({
          opacity:0
        }),
        animate(250,style({
          opacity:1
        }))
      ]),
      transition(':leave',[
        animate(250,style({
          opacity:0
        }))
      ])
    ])
  ]
})
export class AppComponent {
  bgs?: string []=[
    'https://images.unsplash.com/photo-1616626578044-e5689b3aa390?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixlib=rb-1.2.1&q=80&w=1920'
    
  ]


    loadingbg?:boolean

  async changebg() {

    this.loadingbg=true
    const result = await fetch(
      'https://source.unsplash.com/1920x1080/?nature,mountains',
      {
        method: 'HEAD',
      }
    );
 
    this.bgs?.push(result.url);
  }
  onbgload(imgEvent:Event){

    // remove the old bg image
    const imgelet = imgEvent.target as HTMLImageElement
    const src = imgelet.src
    this.bgs = this.bgs?.filter(b => b ===src)
    this.loadingbg=false
  }
  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) return outlet.activatedRouteData['tab'];
    else return;
  }
}
