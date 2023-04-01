import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewListComponent } from '../common/overview-list/overview-list.component';

import { OverviewCardComponent } from '../common/overview-card/overview-card.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    SharedModule,
    UsersRoutingModule,
    OverviewListComponent,
    OverviewCardComponent,
  ],
})
export class UsersModule {}
