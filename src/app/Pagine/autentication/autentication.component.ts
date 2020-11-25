import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmministratoreService } from 'src/app/Services/amministratoreService/amministratore.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-autentication',
  templateUrl: './autentication.component.html',
  styleUrls: ['./autentication.component.css']
})
export class AutenticationComponent implements OnInit {

  constructor(private authenticationService: AuthService,
    private router: Router,
    private _amministratoreService: AmministratoreService) { }

  email: string;
  private currentemail: string;
  private currentpsw: string;
  token;
  mail: string;
  password: string;
  consoleMessage= "";
  private isTokenGenerated = false;
  private errorMex = "";
  private showErr = false;

  ngOnInit() {
  }


  signUp() {
    console.log(this.email);
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
    }
  
  genToken(){
    if(this.currentemail == undefined){
      this.errorMex = "You need to logout and newly log in"
      this.showErr = true;
    }
    let amministratore= '{ "email":"' + this.currentemail + '", "password":"' + this.currentpsw+'"}';
    console.log(amministratore);
    this._amministratoreService.postGenNewToken(JSON.parse(amministratore))
    .subscribe(data =>{
      console.log(data);
      this.token = data.JWT;
      this.isTokenGenerated = true;
    });
  }
     
    signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.currentemail = this.email;
    this.currentpsw = this.password;
    this.email = '';
    this.password = '';
    }
     
    signOut() {
    this.authenticationService.SignOut();
    this.showErr = false;
    }

    async alertMex() {
      alert(this.consoleMessage);
    }

    navToAdminPage(){
      this.router.navigate(['/admin'], {queryParams: {jwt: this.token, email: this.currentemail}});
    }


}
