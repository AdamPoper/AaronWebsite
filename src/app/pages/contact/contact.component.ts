import { Component, OnInit } from '@angular/core';
import { services } from '../home/services';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	services = [...services];

	ngOnInit(): void {
		
	}
}
