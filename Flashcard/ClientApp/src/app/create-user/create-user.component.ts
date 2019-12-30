import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fcd-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  public form: FormGroup = this.fb.group({
    username: '',
    password: '',
    passwordConfirmation: ''
  });

  constructor(private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router) { }

  public signup() {
    if (this.form.get("password").value !== this.form.get("passwordConfirmation").value) {
      return;
    }

    this.loginService.signup(this.form.get("username").value, this.form.get("password").value)
      .subscribe(a => {
        this.router.navigate(['/'])
      }, a => {
        this.router.navigate(['/signup'])
      });
  }
}
