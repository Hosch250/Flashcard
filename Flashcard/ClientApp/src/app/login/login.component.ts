import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'fcd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup = this.fb.group({
    username: '',
    password: ''
  });

  constructor(private readonly fb: FormBuilder,
    private readonly loginService: LoginService) { }

  public login() {
    this.loginService.login(this.form.get("username").value, this.form.get("password").value).subscribe();
  }
}
