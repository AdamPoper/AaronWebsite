import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { AuthService } from '../../services/auth.service';

function isCreateUrl(url: string): boolean {
	return url.startsWith('/admin/new') || url.startsWith('/admin/edit');
}

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
	isCreateActive$ = this.router.events.pipe(
		filter((event): event is NavigationEnd => event instanceof NavigationEnd),
		map(event => isCreateUrl(event.urlAfterRedirects)),
		startWith(isCreateUrl(this.router.url))
	);

	constructor(private authService: AuthService, private router: Router) { }

	logout(): void {
		this.authService.logout();
		this.router.navigate(['/admin/login']);
	}
}
