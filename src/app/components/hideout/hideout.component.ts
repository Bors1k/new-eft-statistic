import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
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


  constructor(public authServise: AuthService)  {

    this.Items = [];

    this.authServise.afs.collection('users').doc(`${JSON.parse(localStorage.getItem('user')).uid}`).collection('ubezh').get().subscribe(data=>{
      data.docs.forEach(doc=>{
        this.Items.push({
         id: doc.id,
         name: doc.data().name,
         need_count: doc.data().need_count,
         have_count: doc.data().have_count,
         img_url: doc.data().img_url
        })
      })
    },error=>{console.log(error.message)});
  }

  ngOnInit(){

  }

  UpdateItem(item: Items){
    this.onCancel();

    this.authServise.afs.collection(`users`).doc(`${JSON.parse(localStorage.getItem('user')).uid}`).collection('ubezh').doc(`${item.id}`).update(
      {
        name: item.name,
        need_count: item.need_count,
        have_count: item.have_count,
        img_url: item.img_url
      }
    );

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
