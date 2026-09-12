import { resolveComponentResources } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { beforeEach, vi } from 'vitest';

TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
await resolveComponentResources(url => fetch(url).then(response => response.text()));

beforeEach(() => {
	vi.clearAllMocks();
});
