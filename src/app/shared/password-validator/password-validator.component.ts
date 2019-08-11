import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

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

  @Output() pvValid: EventEmitter<{valid: boolean, strength: number}> = new EventEmitter();

  numOfChecks = [];
  passedChecks = [];
  strength = 0;

  checkDigitRE = new RegExp('.*[0-9].*');
  checkSpecialCharRE = new RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/);

  constructor() {}

  ngOnInit() {
    this.showDetails = true;
    
    if(!this.password) this.password = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.numOfChecks = [];
    this.passedChecks = [];

    if (
      (changes.externalError && changes.externalError.firstChange) ||
      changes.password.isFirstChange()
    ) {
      return;
    } else {
      this.validate();
    }
  }

  test() {
    console.log(this.showDetails);
  }

  get validateMinLength(): boolean
  {
    if(this.pvMinLength && this.pvMinLength > 0)
    {
      this.numOfChecks.push(...Array.from(Array(8).keys()));
      if(this.password.length < this.pvMinLength) return false;
      this.passedChecks.push(...Array.from(Array(Math.round(this.password.length/2+1)).keys()));
    }
    return true;
  }

  get validateDigit(): boolean
  {
    if(this.pvDigit)
    {
      this.numOfChecks.push(3);
      if(!this.checkDigitRE.test(this.password)) return false;
      else this.passedChecks.push(3);
    }
    return true;
  }

  get validateSpecialChar(): boolean
  {
    if(this.pvSpecialChar)
    {
      this.numOfChecks.push(4);
      if(!this.checkSpecialCharRE.test(this.password)) return false;
      else this.passedChecks.push(4);
    }
    return true;
  }

  public validate = (): void => {
    let valid = true;
    valid = this.validateMinLength;
    valid = this.validateDigit && valid;
    valid = this.validateSpecialChar && valid;
    this.numOfChecks = [...new Set([...this.numOfChecks])];
    this.passedChecks = [...new Set([...this.passedChecks])];
    if(this.numOfChecks.length > 0) this.strength = Math.round((this.passedChecks.length/this.numOfChecks.length) * 100); 
    console.log(this.numOfChecks, this.passedChecks, this.strength);
    this.pvValid.emit({valid, strength: this.strength});
  }
}
