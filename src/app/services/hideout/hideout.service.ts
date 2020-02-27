import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Items } from 'src/app/interfaces/items';


@Injectable({
  providedIn: 'root'
})
export class HideoutService {

  Items: Items[] = [];
  PastUID: string;

  constructor(public authServise: AuthService) {
    this.authServise.afAuth.authState.subscribe(user=>{
      if(user){
        this.Items = [];
        this.PastUID = JSON.parse(localStorage.getItem('user')).uid;
        this.onGetHideoutItems();
      }
    })

  }

 onGetHideoutItems() : Items[]{
    this.authServise.afs.collection('users').doc(`${this.PastUID}`).collection("ubezh").get().toPromise()
    .then(snapshot => {
          snapshot.forEach(doc => {
          this.Items.push({
             id: doc.id,
             name: doc.data().name,
             need_count: doc.data().need_count,
             have_count: doc.data().have_count,
             img_url: doc.data().img_url
          });
      })
    });
    return this.Items;
  }

  getItems(): Items[]{
    return this.Items;
  }

  UpdateItem(item: Items){
      this.authServise.afs.collection(`users`).doc(`${this.PastUID}`).collection('ubezh').doc(`${item.id}`).update(
      {
        name: item.name,
        need_count: item.need_count,
        have_count: item.have_count,
        img_url: item.img_url
      }
      )
  }


}
