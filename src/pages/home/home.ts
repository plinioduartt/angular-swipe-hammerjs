import { Component, ViewChildren, QueryList, NgZone, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import "hammerjs";
import * as Hammer from "hammerjs";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChildren('card') cards;
  @ViewChildren('unlike') unlikeELement;
  @ViewChildren('like') likeELement;
  @ViewChild('unlikeHover') unlikeHover;
  @ViewChild('likeHover') likeHover;


  items:any =[];

  constructor(public navCtrl: NavController, private zone: NgZone) {
    this.init();   
  }

  init() {
    this.items = [
      {
        title: "Swipe right or left 1",
        name: "@pj_duarte - 1",
        role: "Administrator",
        phone: "(19) 9 9999-9999"
      },
      {
        title: "Swipe right or left 2",
        name: "@pj_duarte - 2",
        role: "Customer",
        phone: "(19) 9 9999-9999"
      },
      {
        title: "Swipe right or left 3",
        name: "@pj_duarte - 3",
        role: "Customer",
        phone: "(19) 9 9999-9999"
      },
      {
        title: "Swipe right or left 4",
        name: "@pj_duarte - 4",
        role: "Customer",
        phone: "(19) 9 9999-9999"
      },
      {
        title: "Swipe right or left 5",
        name: "@pj_duarte - 5",
        role: "Customer",
        phone: "(19) 9 9999-9999"
      },
    ];
  }

  async handlePan(event) {
      this.cards.last.nativeElement.style.transition = 0.18+"s";

      var percentage = 100 / 1 * event.deltaX / (<any>window).innerWidth;

      var rotate = event.deltaX / 30;
      this.cards.last.nativeElement.style.transform =  'rotate('+rotate+'deg) translateX(' + percentage + '%)';          

      if (event.deltaX > 200) {
        this.likeHover.nativeElement.style.opacity = 1;
        this.likeHover.nativeElement.classList.add('animated', 'heartBeat');
      } else {
        this.likeHover.nativeElement.style.opacity = 0;
        this.likeHover.nativeElement.classList.remove('animated', 'heartBeat');
      }

      if (event.deltaX < -200) {
        this.unlikeHover.nativeElement.style.opacity = 1;
        this.unlikeHover.nativeElement.classList.add('animated', 'heartBeat');
      } else {
        this.unlikeHover.nativeElement.style.opacity = 0;
        this.unlikeHover.nativeElement.classList.remove('animated', 'heartBeat');
      }

      if (event.isFinal) 
        this.calcDeltaX(event);
  }

  async calcDeltaX(event) {
    if (event.deltaX > -200 && event.deltaX < 200) {
      this.cards.last.nativeElement.style.transition = 0.5 + 's';
      this.cards.last.nativeElement.style.transform = 'translateX(' + 0 + '%)';
    }

    if (event.deltaX < -200) 
      this.swipeUnlikeFunction();

    if (event.deltaX > 200)
      this.swipeLikeFunction();
  }

  async swipeUnlikeFunction() {
    this.cards.last.nativeElement.classList.add('animated', 'fadeOut');
    this.unlikeHover.nativeElement.classList.remove('animated', 'heartBeat');
    this.unlikeHover.nativeElement.style.opacity = 0;
    setTimeout( () => {
      this.items.splice( (this.items.length - 1), 1);
    }, 800);
  }

  async swipeLikeFunction() {
    this.cards.last.nativeElement.classList.add('animated', 'fadeOut');
    this.likeHover.nativeElement.classList.remove('animated', 'heartBeat');
    this.likeHover.nativeElement.style.opacity = 0;
    setTimeout( () => {
      this.items.splice( (this.items.length - 1), 1);
    }, 800);
  }

  unlikeClickFunction(i) {
    this.unlikeELement.last.nativeElement.style.color = "red";
    this.cards.last.nativeElement.classList.add('animated', 'fadeOutLeft');
    setTimeout( () => {
      this.items.splice(i, 1);
    },800);
    setTimeout( () => {
      this.unlikeELement.last.nativeElement.style.color = "#fff";
    }, 300);
  }

  likeClickFunction(i) {
    this.likeELement.last.nativeElement.style.color = "red";
    this.cards.last.nativeElement.classList.add('animated', 'fadeOutRight');
    setTimeout( () => {
      this.items.splice(i, 1);
    },800);    
    setTimeout( () => {
      this.likeELement.last.nativeElement.style.color = "#fff";
    }, 300);
  }

}
      