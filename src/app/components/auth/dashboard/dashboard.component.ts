import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  file: File;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onUpdatePhoto(event){
    this.authService.onUploadPhoto(event.target.files[0]);
  }
}
