import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { UsersService } from './services/users.service';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: {
      users: () => {
        const service = inject(UsersService);
        return service.users$.pipe(
          switchMap(users => {
            if (users.length) {
              return of(users);
            }
            return service.fetchusers().pipe(map(res => res.users));
          })
        );
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
