import { ɵresolveComponentResources } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { beforeEach, vi } from 'vitest';

TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
await ɵresolveComponentResources((url: string) => fetch(url).then((response) => response.text()));

beforeEach(() => {
	vi.clearAllMocks();
});
