import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-viryf-email',
  templateUrl: './viryf-email.component.html',
  styleUrls: ['./viryf-email.component.css']
})
export class ViryfEmailComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
