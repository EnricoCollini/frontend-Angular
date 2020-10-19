import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-autentication',
  templateUrl: './autentication.component.html',
  styleUrls: ['./autentication.component.css']
})
export class AutenticationComponent implements OnInit {

  constructor(private authenticationService: AuthService ) { }

  email: string;
  password: string;
  consoleMessage= "";

  ngOnInit() {
  }
  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
    }
     
    signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
    }
     
    signOut() {
    this.authenticationService.SignOut();
    }

    async alertMex() {
      alert(this.consoleMessage);
    }


}