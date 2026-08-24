import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
    declarations: [
        AdminComponent,
        LoginComponent,
        PostsComponent,
        CreatePostComponent,
        PaginationComponent,
        CategoriesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule,
        QuillModule.forRoot()
    ]
})
export class AdminModule { }
