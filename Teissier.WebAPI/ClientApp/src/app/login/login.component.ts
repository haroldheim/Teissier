import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    showSpinner: boolean;
    loginForm: FormGroup = this.formBuilder.group({
        email: [null, Validators.required],
        password: [null, Validators.required],
    });
    email = '';
    password = '';
    constructor(
        private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit() {
        this.authService.logout();
    }

    onFormSubmit() {
        this.showSpinner = true;
        this.authService.login(this.loginForm.value).subscribe(
            (res) => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['']);
                }
                this.showSpinner = false;
            },
            (err) => {
                console.log(err);
            },
        );
    }
}
