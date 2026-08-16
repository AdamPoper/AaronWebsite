import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	username = '';
	password = '';
	errorMessage = '';
	isLoading = false;

	constructor(private authService: AuthService, private router: Router) { }

	onSubmit(): void {
		this.errorMessage = '';
		this.isLoading = true;

		this.authService.login(this.username, this.password).subscribe({
			next: (authenticated) => {
				this.isLoading = false;
				if (authenticated) {
				this.router.navigate(['/admin']);
				} else {
				this.errorMessage = 'Invalid username or password.';
				}
			},
			error: () => {
				this.isLoading = false;
				this.errorMessage = 'Invalid username or password.';
			}
		});
	}
}
