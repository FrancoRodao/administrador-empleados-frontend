import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
  
export class GlobalErrorHandler implements ErrorHandler {

//     constructor(
//         @Inject(Injector) private readonly injector: Injector,
//     ){

//     }

//     handleError(error: Error | HttpErrorResponse): void {

//         if (error instanceof HttpErrorResponse) {
            
//             switch (error.status) {
//                 case 0:
//                     this.alert.error('Error al conectar con el servidor', 'Contacte a los desarolladores', {onActivateTick: true})
//                     break;
//                 case 500:
//                     this.alert.error('Ocurrio un error inesperado', 'Contacte a los desarolladores', {onActivateTick: true})
//                     break;
//                 default:
//                     this.alert.warning('Error', error.error.message, {onActivateTick: true})
//                     break;
//             }

//         } else {
//             this.alert.error('Error inesperado', 'Contacte a los desarolladores', {onActivateTick: true})
//             return
//         }
//     }

//     private get alert(): AlertService {
//         return this.injector.get(AlertService);
//     }
// }
