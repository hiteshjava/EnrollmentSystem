import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FccService {
    serverUrl = environment.serverUrl;
  
    constructor(private http: HttpClient) {
      }
    
    getEnrollees(){
        //return this.http.get('./assets/jsons/sample.json');
        return this.http.get(this.serverUrl+"enrollees");
    }
    getItemDetails(id){
        //return this.http.get('./assets/jsons/sample.json');
        return this.http.get(this.serverUrl+"enrollees/"+id);
    }

    saveItem(id,item){
       return this.http.put(this.serverUrl+"enrollees/"+id, item);
    }
}
