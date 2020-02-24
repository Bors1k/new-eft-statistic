import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import "@angular/fire/storage";

import { Router } from "@angular/router";
import { User } from '../../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  userDBdata: any;
  timeout: number = 5;  

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  //  public firestorage: AngularFireStorage
    )

    {
      this.afAuth.authState.subscribe(user=>{
        if(user){
          this.userData = user;
          localStorage.setItem('user',JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        }
        else{
          localStorage.setItem('user',null);
          JSON.parse(localStorage.getItem('user'));
        }
      })

      try{

      let getDoc = this.afs.collection('users').doc(`${JSON.parse(localStorage.getItem('user')).uid}`).get().toPromise() //получаем по uid данные из дб, для отображения
        .then(doc=>{
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            this.userDBdata = doc.data();
          }
        })
      }
      catch(err){
        console.log('Приложение хочет получить получить по id инфу по профилю из базы данных. Но из-за того, что локально ничего не храниться выдает ошибку. Ибо я кривой и не знаю как подругому');
      }
      
    } 

  onSignUp(email, password, name){
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then((result)=>{
      this.SendVerificationMail();
      let localUser: User = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: name,
        photoURL: result.user.photoURL,
        emailVerified: result.user.emailVerified
      }
      this.SetUserData(localUser);
    }).catch((error)=>{
      window.alert(error.message);
    })
  }

  SendVerificationMail(){
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['veryf-email']);
      setTimeout(()=>{
        this.router.navigate(['']);
      },5000)
    })
  }

   async onUploadPhoto(file: File){ //загрузка картинки в профиль
    var storageRef = firebase.storage().ref();
    
    var mountainImagesRef = storageRef.child(`${this.userDBdata.uid}/ProfilePhoto.jpg`);
  
    await mountainImagesRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      });   

    await mountainImagesRef.getDownloadURL().then((obj)=>{
      this.userDBdata.photoURL = obj;
    })

    this.SetUserData(this.userDBdata);
   }

  SetUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    
    return userRef.set(userData, {
      merge: true
    })
  }

  onSignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        let getDoc = this.afs.collection('users').doc(`${result.user.uid}`).get().toPromise()
        .then(doc=>{
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            this.userDBdata = doc.data();
            this.SetUserData(doc.data());
          }
        })
         
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    })
  }
}
