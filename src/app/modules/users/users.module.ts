import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewListComponent } from '../common/overview-list/overview-list.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [SharedModule, UsersRoutingModule, OverviewListComponent],
})
export class UsersModule {}
