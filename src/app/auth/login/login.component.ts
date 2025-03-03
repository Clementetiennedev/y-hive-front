import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import "primeicons/primeicons.css";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, ToastModule, ButtonModule, RippleModule],
    providers: [MessageService]
})
export class LoginComponent {
    signInForm!: FormGroup;
    showPassword: boolean = false;

    constructor(private readonly fb: FormBuilder, private readonly messageService: MessageService) { }

    ngOnInit(): void {
        this.signInForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, this.emailValidator]],
            password: ['', Validators.required],
        });
    }

    emailValidator(control: AbstractControl): ValidationErrors | null {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(control.value) ? null : { invalidEmail: true };
    }

    onSubmit() {
        if (this.signInForm.valid) {
            const formValues = this.signInForm.value;
            console.log('Form Values:', formValues);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vous êtes désormais connecté', key: 'br', life: 3000, styleClass: 'bg-green-400' });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill out the form correctly', key: 'br', life: 3000, styleClass: 'bg-red-400' });
        }
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
}
