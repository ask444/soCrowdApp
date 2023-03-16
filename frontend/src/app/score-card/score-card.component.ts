import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Fixture } from '../models/fixture';
import * as _ from 'lodash';
import { ChatSocketService } from '../chat-socket.service';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ScoreCardComponent implements OnInit {

  // @Input() fixture: any = [];
  @Input() scoreData!: any;
  public showcomp: boolean = false;
  public fixtures: any;

  public matchScores: any;

  constructor(private scoredataServC: ChatSocketService) {


  }

  ngOnInit() {
    const newDATA = this.scoreData.map((ele: any) => {
      ele.minutes = this.scoredataServC.callMinutes(ele);
      ele.aboutNotified = this.scoredataServC.callAboutNotified(ele);
      ele.endmillisecs = this.scoredataServC.callEndMilliseconds(ele);
      return ele;
    })
    this.fixtures = this.scoredataServC.orderScores(newDATA);

    // this.showcomp=true;

  }

  itemtooltiptext(updated: any) {
    return `${updated}'`;
  }
}
