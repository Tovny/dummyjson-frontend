import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from 'src/app/shared/models/ApiEndpoints.model';
import { BaseApiService } from 'src/app/shared/services/base-api.service';
import { User } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseApiService<User> {
  constructor(protected override http: HttpClient) {
    super(http, ApiEndpoints.USERS);
  }
}
