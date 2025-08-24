import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Route, provideRouter, Router } from "@angular/router";
import { RouterTestingHarness } from "@angular/router/testing";

import { validDayGuard } from "./valid-day.guard";
import { DayService } from "../services/day.service";

@Component({})
class PageComponent {}

describe("validDayGuard", () => {
  let routes: Route[];

  beforeEach(() => {
    routes = [
      {
        path: "schedule",
        component: PageComponent,
      },
      {
        path: "schedule/:day",
        canActivate: [validDayGuard()],
        component: PageComponent,
      }
    ];

    TestBed.configureTestingModule({
      providers: [
        DayService,
        provideRouter(routes),
      ],
    });
  });

  it("should allow access to the day schedule page if the day name is valid", async () => {
    await RouterTestingHarness.create("/schedule/monday");
    expect(TestBed.inject(Router).url).toEqual("/schedule/monday");
  });

  it("shouldn't allow access to the day schedule page if the day name is valid", async () => {
    await RouterTestingHarness.create("/schedule/wrongday");
    expect(TestBed.inject(Router).url).toEqual("/schedule");
  });
});
