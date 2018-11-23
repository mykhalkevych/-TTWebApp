import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  singUp() {
    const authUser = {
      email: '32ds453@asd.com',
      password: '12345678'
    };
    this.authService.signUp(authUser).then(res => {
      console.log(res);
    });
  }

  login() {
    const authUser = {
      email: '32ds453@asd.com',
      password: '12345678'
    };
    this.authService.login(authUser)
    .then(res => {
      console.log(res);
    });
  }

  logout() {
    this.authService.logout();
  }

}
