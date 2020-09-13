import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FccService } from '../services/fcc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  enrollees : any = [];
  enrSub :  Subscription[] = [];
  constructor(private service: FccService,private router: Router) {
  }
  
  ngOnInit(): void {
    this.getEnrollees();
   }

   getEnrollees(){
     let enr = this.service.getEnrollees().subscribe(data => {
       let dataa: any = data;
      this.enrollees = dataa;
     });
     this.enrSub.push(enr);
   }

   selectRow(id){
    this.router.navigate(['/item'],
        {
          queryParams: {
            "id": id
          }
        });
   }

   ngOnDestroy(): void {
    this.enrSub.forEach(dataa => {
      dataa.unsubscribe();
    });
  }
}
