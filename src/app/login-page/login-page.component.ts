import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  username: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  test(a: any)
  {
    // console.log(a);
  }
}
