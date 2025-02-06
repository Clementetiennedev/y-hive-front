import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [InputTextModule, FormsModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    user = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    };

    constructor() { }
}
