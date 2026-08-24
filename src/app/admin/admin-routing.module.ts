import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PostsComponent },
            { path: 'new', component: CreatePostComponent },
            { path: 'edit/:slug', component: CreatePostComponent },
            { path: 'categories', component: CategoriesComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
