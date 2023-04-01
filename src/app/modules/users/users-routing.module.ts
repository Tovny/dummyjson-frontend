import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dataResolver } from 'src/app/shared/resolvers/data.resolver';
import { UsersService } from './services/users.service';
import { UsersComponent } from './users.component';
import { UsersOverviewComponent } from './components/users-overview/users-overview.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UsersOverviewComponent,
        resolve: {
          users: dataResolver(UsersService),
        },
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
