import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResearchComponent } from './research/research.component';
import { AccountComponent } from './account.component'
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
{ path: 'account', component: AccountComponent },
{ path: 'Recherche/:critere/:val_critere', component: ResearchComponent},
{ path:'upload', component: UploadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class AccountRoutingModule { }
