import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordValidatorComponent } from './password-validator/password-validator.component';



@NgModule({
  declarations: [PasswordValidatorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    PasswordValidatorComponent]
})
export class SharedModule { }
