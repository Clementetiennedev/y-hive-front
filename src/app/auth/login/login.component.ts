import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import "primeicons/primeicons.css";
import { AuthService } from '../../services/auth.service';

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

	constructor(private readonly fb: FormBuilder, private readonly messageService: MessageService, private readonly authService: AuthService) { }

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
		this.login();
	}

	login(): void {
		if (this.signInForm.valid) {
			this.authService.login(this.signInForm.value).subscribe({
				next: (response) => {
					localStorage.setItem('token', response.token);
					this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vous êtes désormais connecté !', key: 'br', life: 6000 });
					window.location.href = '/home';
				},
				error: (error) => {
					console.error(error);
					this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ou mot de passe incorrect', key: 'br', life: 6000 });
				}
			});
		} else {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Une erreur est survenue lors de la connexion', key: 'br', life: 6000 });
		}
	}
	togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}
}
