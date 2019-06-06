// APP
import { ComponentUtils } from './ComponentUtils';
import { ComponentFactoryResolver } from '@angular/core';
import { async } from '@angular/core/testing';

describe('Utils: ComponentUtils', () => {
  let service: ComponentUtils;

  beforeAll(async(() => {
    const resolve = { resolveComponentFactory: ({}) => {} };
    service = new ComponentUtils(resolve as ComponentFactoryResolver);
  }));

  it('function append() should call location.createComponent', () => {
    spyOn(service.componentFactoryResolver, 'resolveComponentFactory');
    const location = { createComponent: () => {} };
    service.append(ComponentUtils, location as any);
    expect(service.componentFactoryResolver.resolveComponentFactory).toHaveBeenCalled();
  });
});
