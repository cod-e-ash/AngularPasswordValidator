import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-password-validator',
  templateUrl: './password-validator.component.html',
  styleUrls: ['./password-validator.component.scss']
})
export class PasswordValidatorComponent implements OnInit, OnChanges {
  @Input() showDetails = false;
  @Input() pvMinLength: number;
  @Input() pvDigit: boolean;
  @Input() pvSpecialChar: boolean;
  @Input() password: string;
  checkDigitRE = new RegExp('.*[0-9].*');
  checkSpecialCharRE = new RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/);

  constructor() {}

  ngOnInit() {
    this.showDetails = true;
    
    if(!this.password) this.password = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.externalError && changes.externalError.firstChange) ||
      changes.password.isFirstChange()
    ) {
      return;
    } else {
      console.log(this.password);
      // this.validate();
    }
  }

  test() {
    console.log(this.showDetails);
  }

  get validateMinLength(): boolean
  {
    if(this.pvMinLength && this.pvMinLength > 0)
    {
      if(this.password.length < this.pvMinLength) return false;

    }
    return true;
  }

  get validateDigit(): boolean
  {
    if(this.pvDigit)
    {
      if(!this.checkDigitRE.test(this.password)) return false;
    }
    return true;
  }

  get validateSpecialChar(): boolean
  {
    if(this.pvSpecialChar)
    {
      if(!this.checkSpecialCharRE.test(this.password)) return false;
    }
    return true;
  }

  public validate = (): boolean => {
    let allOk = true;
    if(allOk) allOk = this.validateMinLength;
    return allOk;
  }
}
