import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  username: string;
  password: string;

  pvValid = false;

  constructor() { }

  ngOnInit() {
  }

  clearFields()
  {
    this.username = '';
    this.password = '';
  }

  test(a: any)
  {
    console.log(a);
  }
}
