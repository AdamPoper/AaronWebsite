import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { services } from './services';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	tappedIndex: number | null = null;
  	hoverEnabled = window.innerWidth > 768;

  	services = services;

	constructor(private router: Router) { }

	navigateToContact() {
		this.router.navigate(['/contact']);
	}

	onServiceTap(index: number) {
		if (this.hoverEnabled) {
			return; // ignore taps on desktop
		}
		
		this.tappedIndex = this.tappedIndex === index ? null : index;
	}
}
