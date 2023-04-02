import { inject, ProviderToken } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { Cart, Product, User } from 'src/app/types';
import { BaseApiService } from '../services/base-api.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApiEndpoints } from '../models/ApiEndpoints.model';

export const itemResolver = <T extends User | Product | Cart>(
  service: ProviderToken<BaseApiService<T>>,
  endpoint: ApiEndpoints
) => {
  return (route: ActivatedRouteSnapshot) => {
    const apiService = inject(service);
    const router = inject(Router);

    return apiService.data$.pipe(
      switchMap(data => {
        const id = route.params['id'];
        const item = data.find(item => item.id === Number(id));
        if (item) {
          return of(item);
        }

        return apiService.fetchItem(id).pipe(
          catchError(err => {
            router.navigate([endpoint]);

            return of(err);
          })
        );
      })
    );
  };
};
