import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewListComponent } from '../common/overview-list/overview-list.component';

import { OverviewCardComponent } from '../common/overview-card/overview-card.component';
import { UsersOverviewComponent } from './components/users-overview/users-overview.component';
import { UserComponent } from './components/user/user.component';
import { MatCardModule } from '@angular/material/card';
import { DetailHeaderComponent } from '../common/detail-header/detail-header.component';

@NgModule({
  declarations: [UsersComponent, UsersOverviewComponent, UserComponent],
  imports: [
    SharedModule,
    UsersRoutingModule,
    OverviewListComponent,
    OverviewCardComponent,
    MatCardModule,
    DetailHeaderComponent,
  ],
})
export class UsersModule {}
