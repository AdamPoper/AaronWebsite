import { Component, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
	ngAfterViewInit() {
		const navbar = document.querySelector('.navbar') as HTMLElement;
		if (navbar) {
			const navbarHeight = navbar.offsetHeight;
			document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
		}
	}
}