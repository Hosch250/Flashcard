import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';

export function checkMatchValidator(field1: string, field2: string) {
    return function (control) {

        if (!control || !control.parent) {
            return null;
        }

        let field1Value = control.parent.get(field1).value;
        let field2Value = control.parent.get(field2).value;

        if (field1Value !== '' && field1Value !== field2Value) {
            return { 'mismatch': `Field value mismatch` }
        }
        return null;
    }
}

@Component({
    selector: 'fcd-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

    public form: FormGroup = this.fb.group({
        username: this.fb.control('', Validators.required),
        password: this.fb.control('', {
            validators: [
                Validators.required,
                Validators.pattern(/^[.]{6,}$/g),
                Validators.pattern(/\d/g),
                Validators.pattern(/[a-z]/g),
                Validators.pattern(/[A-Z]/g),
                Validators.pattern(/\W/g)
            ], updateOn: 'blur' }),
        passwordConfirmation: this.fb.control('', { validators: [checkMatchValidator('password', 'passwordConfirmation')], updateOn: 'blur' })
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
