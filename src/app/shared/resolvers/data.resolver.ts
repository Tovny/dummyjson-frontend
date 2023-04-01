import { inject, ProviderToken } from '@angular/core';
import { map, of, switchMap } from 'rxjs';
import { Cart, Product, User } from 'src/app/types';
import { BaseApiService } from '../services/base-api.service';

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
        return apiService.fetchItems().pipe(switchMap(() => apiService.data$));
      })
    );
  };
};
