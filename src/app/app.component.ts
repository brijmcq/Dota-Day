import { Component } from '@angular/core';
import {DataService} from './data-service';
import {DotaInfo} from './dotaInfo.model';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import 'rxjs/add/observable/forkJoin';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Human';
  form: FormGroup;

  //test dota id
  dotaId = '135100007';
  testDotaId = '135100007';
  selectedDay='';
  wins:Array<DotaInfo>;
  losses:Array<DotaInfo>;
  weekDayWin= Array(7);
  weekDayLose = Array(7);
  isDataLoaded= false;
  profilePic:string;
  estimateMMR:number;
  totalGames = 0;
  calculatedData = Array(7);
  constructor(private dataService:DataService,
    private fb: FormBuilder){
       this.form = fb.group({
        dotaId: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      }
    );
    }
  ngOnInit(){
  }
  resetValues(){
    console.log('clearing data..');
   this.form.reset();
    this.form.controls['dotaId'].markAsPristine();
    this.form.controls['dotaId'].markAsUntouched();
    this.form.updateValueAndValidity();
   
  }
  initializeData(){
    this.totalGames = 0;
    this.isDataLoaded  = false;
    this.dotaId = this.form.controls['dotaId'].value;
    this.weekDayWin.fill(0);
    this.weekDayLose.fill(0);
    this.calculatedData.fill(0);
    

     var dataSource=[
      this.dataService.getAllWins(this.dotaId),
      this.dataService.getAllLosses(this.dotaId),
      this.dataService.getProfilePic(this.dotaId)
    ]

     Observable.forkJoin(dataSource)
       .subscribe( data =>{
         this.wins = data[0];
         this.losses = data[1];
         console.log('profile', data[2]);
         this.profilePic = data[2].profile.avatarmedium;
         this.estimateMMR = data[2].mmr_estimate.estimate;
         if(this.wins.length=== 0 ){
           return ;
         }
         this.getWinsForEachDay();
         this.getLossesForEachDay();
         this.computeWinRatio();
         this.isDataLoaded = true;
       //arr.indexOf(Math.max(...arr));
      //console.log('the max value', Math.max(...this.calculatedData));
     let dayIndex = this.calculatedData.indexOf(Math.max(...this.calculatedData));
     this.selectedDay = this.getDayOfTheWeek(dayIndex);
       });


  }
  setTestDotaId(){
    this.form.controls['dotaId'].setValue(this.testDotaId);
  }
  getWinsForEachDay(){
    for (var win of this.wins) {
      const jsDate =  new Date(win.start_time*1000);
      const dayIndex = jsDate.getDay();
      this.weekDayWin[dayIndex]++; 
      this.totalGames++;
    }
  //  console.log('wins', this.weekDayWin);
  }

   getLossesForEachDay(){
    for (var lose of this.losses) {
      const jsDate =  new Date(lose.start_time*1000);
      const dayIndex = jsDate.getDay();
      this.weekDayLose[dayIndex]++; 
      this.totalGames++;
    }
   // console.log('losses', this.weekDayLose);
  }

  computeWinRatio(){
    for( var i = 0 ; i<7; i++){
      this.calculatedData[i] = this.weekDayWin[i] / ( this.weekDayWin[i] + this.weekDayLose[i]);
    }
  }


  getDayOfTheWeek(index){
    let day ='';
    switch(index){
      case 0 :
      day ='Sunday';
      break;
      case 1:
      day = "Monday";
      break;
      case 2:
      day = "Tuesday";
      break;
       case 3:
      day = "Wednesday";
      break;
         case 4:
      day = "Thursday";
      break;
         case 5:
      day = "Friday";
      break;
         case 6:
      day = "Saturday";
      break;
    }

    return day;

  }




}
