import { Component, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
	showNavbar = true;

	constructor(private router: Router) {
		this.router.events.pipe(
			filter((event): event is NavigationEnd => event instanceof NavigationEnd)
		).subscribe((event) => {
			this.showNavbar = !event.urlAfterRedirects.startsWith('/admin');
		});
	}

	ngAfterViewInit() {
		const navbar = document.querySelector('.navbar') as HTMLElement;
		if (navbar) {
			const navbarHeight = navbar.offsetHeight;
			document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
		}
	}
}