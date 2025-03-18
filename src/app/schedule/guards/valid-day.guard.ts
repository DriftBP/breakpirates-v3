import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";

import { DayService } from "../services/day.service";

export function validDayGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => {
    const dayName = route.paramMap.get('day');

    const day = inject(DayService).dayByName(dayName);

    if (day) {
      return true;
    } else {
      inject(Router).navigate(['schedule']);

      return false;
    }
  };
};
