import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dataResolver } from 'src/app/shared/resolvers/data.resolver';
import { UsersService } from './services/users.service';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: {
      users: dataResolver(UsersService),
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
