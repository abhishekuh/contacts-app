import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',component: HomeComponent
  },
  {
    path: 'home',component: HomeComponent
  },
  {
    path: 'contact/:id',component: ContactDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
