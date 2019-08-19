import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component(
{
    selector: 'app-password-validator',
    templateUrl: './password-validator.component.html',
    styleUrls: ['./password-validator.component.scss']
})
export class PasswordValidatorComponent implements OnInit, OnChanges
{
    @Input() showDetails = false;
    @Input() pvMinLength: string;
    @Input() pvMinValue: number;
    @Input() pvDigit: string;
    @Input() pvSpecialChar: string;
    @Input() pvCommon: string;
    @Input() pvRepeat: string;
    @Input() password: string;

    @Input() pvMinLengthMsg: string;
    @Input() pvDigitMsg: string;
    @Input() pvSpecialCharMsg: string;
    @Input() pvCommonMsg: string;
    @Input() pvRepeatMsg: string;
    @Input() pvMustMsg: string;
    @Input() pvShouldMsg: string;

    @Output() pvValid: EventEmitter < { valid: boolean, strength: number } > = new EventEmitter();

    numOfChecks = [];
    passedChecks = [];
    strength = 0;

    checkDigitRE = new RegExp('.*[0-9].*');
    checkSpecialCharRE = new RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/);
    commonPasswordList = [
        '!@#$%^&*','!@#$%^&amp;*','!£$%^&*','12341234','12345678','123456789','1qaz2wsx','87654321','987654321','aa123456',
        'aa123456w','admin123','asdfghjk','baseball','computer','corvette','football','iloveyou','jennifer','liverpool',
        'maverick','mercedes','pass1234','passw0rd','password1','password12','password123','princess','qwerty123','starwars','sunshine',
        'trustno1','whatever','zaq1zaq1','blahblah','password','qwertyui'
    ]

    constructor() {}

    ngOnInit()
    {
        if(!this.password) this.password = '';
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        this.numOfChecks = [];
        this.passedChecks = [];

        if(
            (changes.externalError && changes.externalError.firstChange) ||
            changes.password.isFirstChange()
        )
        {
            return;
        }
        else
        {
            this.validate();
        }
    }

    get validateMinLength(): boolean
    {
        if(this.pvMinLength && this.pvMinValue > 0)
        {
            this.numOfChecks.push(...Array.from(Array(8).keys()));
            if(this.password.length < this.pvMinValue) return false;
            let passLength = this.password && this.password.length > 0 ? this.password.length / 2 + 1 : 0;
            if(passLength > 11) passLength = 8
            else if(passLength >= 8) passLength = 6;
            if(passLength > 0) this.passedChecks.push(...Array.from(Array(Math.round(passLength)).keys()));
        }
        return true;
    }

    get validateDigit(): boolean
    {
        if(this.pvDigit)
        {
            this.numOfChecks.push(100);
            if(!this.checkDigitRE.test(this.password)) return false;
            else this.passedChecks.push(100);
        }
        return true;
    }

    get validateSpecialChar(): boolean
    {
        if(this.pvSpecialChar)
        {
            this.numOfChecks.push(101);
            if(!this.checkSpecialCharRE.test(this.password)) return false;
            else this.passedChecks.push(101);
        }
        return true;
    }

    get validateCommon(): boolean
    {
        if(this.pvCommon)
        {
            this.numOfChecks.push(102);
            if(this.commonPasswordList.indexOf(this.password.toLowerCase()) > -1) return false;
            else this.passedChecks.push(102);
        }
        return true && this.validateMinLength;
    }

    get validateRepeat(): boolean
    {
        if(this.pvRepeat)
        {
            if(this.password && this.password.length > 2)
            {
                this.numOfChecks.push(103);
                let count = 0;
                for(let i = 1, l = this.password.length; i < l; i++)
                {
                    this.password.charAt(i).toLowerCase() === this.password.charAt(i - 1).toLowerCase() ? count++ : count = 0;
                    if(count > 1) return false;
                }
            }
            else
            {
                return false;
            }
            this.passedChecks.push(103);
        }
        return true;
    }

    public validate = (): void =>
    {
        let valid = true;
        this.pvMinLength === 'c' ? valid = this.validateMinLength : this.validateMinLength;
        this.pvDigit === 'c' ? valid = this.validateDigit && valid : this.validateDigit;
        this.pvSpecialChar === 'c' ? valid = this.validateSpecialChar && valid : this.validateSpecialChar;
        this.pvCommon === 'c' ? valid = this.validateCommon && valid : this.validateCommon;
        this.pvRepeat === 'c' ? valid = this.validateRepeat && valid : this.validateRepeat;
        this.numOfChecks = [...Array.from(new Set([...this.numOfChecks]))];
        this.passedChecks = [...Array.from(new Set([...this.passedChecks]))];
        if(this.numOfChecks.length > 0) this.strength = Math.round((this.passedChecks.length / this.numOfChecks.length) * 100);
        if(!valid && this.strength > 50) this.strength = 50;
        if(this.strength > 100) this.strength = 100;
        this.pvValid.emit({ valid, strength: this.strength });
    }
}
