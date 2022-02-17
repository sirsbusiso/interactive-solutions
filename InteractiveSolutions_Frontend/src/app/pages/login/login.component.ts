import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginErrorMessage = '';
  returnUrl = '';

  model = {
    idNumber: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/summary';
  }

  login(loginForm: NgForm) {
    let loginFormValues = loginForm.value;

    this.customerService.login(loginFormValues.idNumber).subscribe(() => {
      this.router.navigate([this.returnUrl]);
    });
  }
}
