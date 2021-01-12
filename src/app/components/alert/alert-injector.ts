import { Injector, Type, InjectionToken, InjectFlags } from '@angular/core';


export class AlertInjector implements Injector {
    constructor(private parentInjector: Injector) {}
  
    get(token: any, notFoundValue?: any, flags?: any) {
      return this.parentInjector.get<any>(token, notFoundValue);
    }
  }