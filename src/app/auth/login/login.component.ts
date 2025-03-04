import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import "primeicons/primeicons.css";
import { HttpClient } from '@angular/common/http';

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
    
    constructor(private fb: FormBuilder, private messageService: MessageService, private http: HttpClient) { }

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

    onSubmit(): void {
        if (this.signInForm.valid) {
            const apiUrl = 'https://yhive-back.saillardq.fr/api/login';
            this.http.post<{ token: string }>(apiUrl, this.signInForm.value).subscribe(
                (response) => {
                    console.log('Form Submitted', response);
                    localStorage.setItem('token', response.token);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vous êtes bien connecté', key: 'br', life: 3000 });
                    window.location.href = '/home';
                },
                (error) => {
                    console.error('Error:', error);
                    let errorMessage = 'Une erreur est survenue lors de la connexion';

                    if (error.status === 422) {
                        errorMessage = 'Email ou mot de passe incorrect';
                    } else if (error.status === 404) {
                        errorMessage = 'Utilisateur non trouvé';
                    } else if (error.status === 400) {
                        errorMessage = 'Informations de connexion invalides';
                    }

                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: errorMessage, key: 'br', life: 3000 });
                }
            );
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Veuillez remplir le formulaire correctement', key: 'br', life: 3000 });
        }
    }


    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
}
