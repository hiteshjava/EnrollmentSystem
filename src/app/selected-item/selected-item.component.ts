import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FccService } from '../services/fcc.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnrolleItem } from '../model/enrolleItem.model';

@Component({
  selector: 'app-selected-item',
  templateUrl: './selected-item.component.html',
  styleUrls: ['./selected-item.component.css']
})
export class SelectedItemComponent implements OnInit,OnDestroy {

  id: any = 0; 
  subs :Subscription[] = [];
  item : any;
  isLoaded : boolean = false;
  isReadMode = true;
  isWriteMode = false;
  editForm :FormGroup;
  submitted = false;
  msg = "";

  constructor(private formBuilder :FormBuilder, private router: Router,
    private route: ActivatedRoute,private service: FccService) { }
  


  ngOnInit(): void {
    let sub = this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.getItemDetails(params.id);
    });
    this.subs.push(sub);

    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      active: ['', Validators.required],
      id:[],
      dateOfBirth:[]
  });
  }

  get f() { return this.editForm.controls; }

  getItemDetails(id){
    this.msg = "";
    this.isLoaded = false;
    let items = this.service.getItemDetails(id).subscribe(data => {
      let dataa : any = data;
      this.item = dataa.item;
      this.isReadMode = true;
      this.isWriteMode = false;
      this.isLoaded = true;
    });
    this.subs.push(items);
  }

  edit(){
    this.msg = "";
    this.isReadMode = false;
    this.isWriteMode = true;
    this.f.id.setValue(this.item.id);
    this.f.name.setValue(this.item.name);
    this.f.active.setValue(this.item.active);
    this.f.dateOfBirth.setValue(this.item.dateOfBirth);
  }
  backToList(){
    this.router.navigate(["/home"]);
  }

  onSubmit(){
    this.msg = "";
    this.submitted = true;
    console.log(this.f.name);
      let saveItem = new EnrolleItem(this.f.id,
      this.f.name,
      this.f.active,
      this.f.dateOfBirth);

      let res =this.service.saveItem(saveItem).subscribe(data => {
        let dataa : any = data;
        if(dataa.id  != null){
          this.msg = "Saved Successfully";
        }
      }); 
      this.subs.push(res);     
  }

  cancell(id){
    this.getItemDetails(id);   
  }

  ngOnDestroy(): void {
    this.subs.forEach(dataa => {
      dataa.unsubscribe();
    });
  }
}
