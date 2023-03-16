import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})


export class ChatSocketService {
  constructor() {
  }

  callMinutes = (fixture: any) => {
    let start = new Date(fixture.startTime);
    let end = new Date(fixture.endTime);
    let diffMs = end.getTime() - start.getTime();
    let minutes = Math.floor(diffMs / 60000);
    // let seconds = ((diffMs % 60000) / 1000).toFixed(0);
    // fixture.minutes=minutes;
    return minutes;
  }

  callEndMilliseconds = (fixture: any) => {
    let end = new Date(fixture.endTime);
    let endMilliS = end.getTime();
    return endMilliS;
  }

  callAboutNotified = (fixture: any) => {
    let start = new Date(fixture.startTime);
    let end = new Date();
    if (start > end) {
      return true
    }
    else { return false; }
  }

  orderScores=(fixtures:any)=>{
    _.orderBy(fixtures, ['minutes','endmillisecs','endNotified'], ['desc','asc','desc']);
    fixtures.sort((a:any, b:any) => (a.endNotified - b.endNotified));
    const newArr = [
      ...fixtures.filter((c:any) => c.aboutNotified === false),
      ...fixtures.filter((c:any) => c.aboutNotified === true)
  ];

    console.log('newDATA fixtures', newArr);
    return newArr;
  }


}
