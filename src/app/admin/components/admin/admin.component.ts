import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

export type AdminView = 'posts' | 'create';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
	activeView: AdminView = 'posts';

	constructor(private authService: AuthService, private router: Router) { }

	setView(view: AdminView): void {
		this.activeView = view;
	}

	logout(): void {
		this.authService.logout();
		this.router.navigate(['/admin/login']);
	}
}
