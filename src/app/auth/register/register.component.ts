import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { HttpClient } from '@angular/common/http';

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

    constructor(private fb: FormBuilder, private messageService: MessageService, private http: HttpClient) {
        this.registerForm = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email, this.emailValidator]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            password_confirmation: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
    }

    ngOnInit() { }

    emailValidator(control: AbstractControl): ValidationErrors | null {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(control.value) ? null : { invalidEmail: true };
    }

    passwordMatchValidator(form: AbstractControl) {
        return form.get('password')?.value === form.get('password_confirmation')?.value
            ? null : { mismatch: true };
    }

    onSubmit() {
        if (this.registerForm.valid) {
            const apiUrl = 'http://localhost/api/register';
            this.http.post(apiUrl, this.registerForm.value).subscribe(
                response => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vous êtes bien inscrit', key: 'br', life: 3000 });
                    window.location.href = '/login';
                },
                error => {
                    console.error('Error:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Une erreur est survenue lors de l\'inscription', key: 'br', life: 3000 });
                }
            );
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Veuillez remplir le formulaire correctement', key: 'br', life: 3000 });
        }
    }
}
