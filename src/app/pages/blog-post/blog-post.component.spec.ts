import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent', () => {
	let component: BlogPostComponent;
	let fixture: ComponentFixture<BlogPostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
		declarations: [ BlogPostComponent ],
		imports: [ HttpClientTestingModule ],
		providers: [
			{
			provide: ActivatedRoute,
			useValue: {
				snapshot: { paramMap: convertToParamMap({ slug: 'test-post' }) }
			}
			}
		]
		})
		.compileComponents();

		fixture = TestBed.createComponent(BlogPostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
