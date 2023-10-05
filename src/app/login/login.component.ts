import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import {AuthenticationService} from './../shared/services/authentication.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

   loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authenticationService:AuthenticationService,private router:Router){

  }
  public ngOnInit() {
    this.loginForm = this.fb.group({
      username: [[], Validators.required],
      password: [[], Validators.required],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
   
      this.authenticationService.login(username,password).subscribe(res=>{

        if(!res){
          //error
          this.authenticationService.setIsAuth('false');
          return
        }
        console.log('res',res);//token
        this.authenticationService.setToken(res);
        this.authenticationService.setIsAuth('true');
        this.router.navigate(['dashboard']);

      })
      console.log('Form submitted:', this.loginForm.value);
    }
  }
}
