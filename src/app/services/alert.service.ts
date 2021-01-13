import { ComponentType } from '@angular/cdk/portal';
import { ApplicationRef, Component, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Renderer2, RendererFactory2, Type } from '@angular/core';
import { AlertInjector } from '../components/alert/alert-injector';
import { ErrorAlertComponent } from '../components/alert/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(

    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private rendererFactory: RendererFactory2

  ) { }

  error(title: string, message:string, options?: Object){
    const dialogRef = this.appendDialogComponentToBody(ErrorAlertComponent);


    return dialogRef;
  }

  succes(title: string, message:string, options?: Object){

  }

  warning(title: string, message, options?){

  }


  private appendDialogComponentToBody(component: ComponentType<any>) {


    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component)
    const componentRef = componentFactory.create(new AlertInjector(this.injector))

    this.appRef.attachView(componentRef.hostView)
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    return componentRef;

  }
  

}
