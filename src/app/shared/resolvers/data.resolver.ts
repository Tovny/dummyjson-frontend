import { inject, ProviderToken } from '@angular/core';
import { map, of, switchMap } from 'rxjs';
import { Cart, Product, User } from 'src/app/types';
import { BaseApiService } from '../services/baseApi.service';

export const dataResolver = <T extends User | Product | Cart>(
  service: ProviderToken<BaseApiService<T>>
) => {
  return () => {
    const apiService = inject(service);

    return apiService.data$.pipe(
      switchMap(data => {
        if (data.length) {
          return of(data);
        }
        return apiService.fetchData().pipe(switchMap(() => apiService.data$));
      })
    );
  };
};
