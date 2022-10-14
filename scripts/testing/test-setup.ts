// NG
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

export const setupTestSuite: Function = () => {
  const testBedApi: any = getTestBed();
  const originReset: any = TestBed.resetTestingModule;

  TestBed.resetTestingModule();
  TestBed.resetTestingModule = () => TestBed;

  afterEach(() => {
    testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) => fixture.destroy());
    testBedApi._instantiated = false;
  });

  afterAll(() => {
    TestBed.resetTestingModule = originReset;
    TestBed.resetTestingModule();
  });
};
