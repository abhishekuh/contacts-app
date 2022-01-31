import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',component: HomeComponent
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
