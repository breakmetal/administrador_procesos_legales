import { Component, OnInit } from '@angular/core';
import { LoginService } from "../servicios/login.service";
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /*public user = {
    username: '',
    password:''
  };*/
  user = new FormGroup({
    username : new FormControl(),
    password : new FormControl()
  }) 
  public token:any;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }
  /**
 * login
 */
  public login() {
    this.loginService.login(this.user)
  }
}

/*this.loginService.login('naruto', 'naruto123456').subscribe(
  res => {
    console.log(res)
  }
) */