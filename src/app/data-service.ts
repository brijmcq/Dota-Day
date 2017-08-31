import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {DotaInfo} from './dotaInfo.model';
@Injectable()
export class DataService {
  url ='https://api.opendota.com/api';

  constructor(private http: Http) { }
  getMatches(dotaId){
    return this.http.get(this.url+'/players/' + dotaId+'/matches' )
    .map(res=> <Array<DotaInfo>>res.json())
  }
   getAllWins(dotaId){
    return this.http.get(this.url+'/players/' + dotaId+'/matches?win=1' )
    .map(res=> <Array<DotaInfo>>res.json())
  }
   getAllLosses(dotaId){
    return this.http.get(this.url+'/players/' + dotaId+'/matches?win=0' )
    .map(res=> <Array<DotaInfo>>res.json())
  }

  getProfilePic(dotaId){
    return this.http.get(this.url+'/players/'+dotaId)
    .map(res => res.json())
  }

  
}