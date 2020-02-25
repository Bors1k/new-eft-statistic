import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HideoutService } from 'src/app/services/hideout/hideout.service';
import { Items } from 'src/app/interfaces/items';

@Component({
  selector: 'app-hideout',
  templateUrl: './hideout.component.html',
  styleUrls: ['./hideout.component.css']
})
export class HideoutComponent implements OnInit {

  Items: Items[];
  editState: boolean = false;
  itemToEdit: Items;
  

  constructor(public shelterService: HideoutService)  { 

  }

  ngOnInit(){
    this.Items = this.shelterService.getItems();
  }

  UpdateItem(item: Items){
    this.onCancel();
    this.shelterService.UpdateItem(item);  
  }

  onEdit(event,item){
    this.editState = true;
    this.itemToEdit = item;
  }
  onCancel(){
    this.editState = false;
    this.itemToEdit = null;
  }

}
