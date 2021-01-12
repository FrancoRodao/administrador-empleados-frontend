//MODULES
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";


//COMPONENTS
import { AppComponent } from './app.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
// import { GlobalErrorHandler } from './services/global-handler-error.service';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },

    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler
    // }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
