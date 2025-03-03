import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ToastModule, ButtonModule, RippleModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [MessageService]
})
export class RegisterComponent {
    registerForm: FormGroup;

    constructor(private readonly fb: FormBuilder, private readonly messageService: MessageService) {
        this.registerForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email, this.emailValidator]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
    }

    emailValidator(control: AbstractControl): ValidationErrors | null {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(control.value) ? null : { invalidEmail: true };
    }

    passwordMatchValidator(form: AbstractControl) {
        return form.get('password')?.value === form.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }

    onSubmit() {
        if (this.registerForm.valid) {
            console.log('Form Submitted', this.registerForm.value);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vous êtes bien inscrit', key: 'br', life: 3000 });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Veuillez remplir le formulaire correctement', key: 'br', life: 3000 });
        }
    }
}
