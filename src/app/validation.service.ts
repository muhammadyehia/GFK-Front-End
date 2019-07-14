import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
@Injectable()
export class ValidationService {
  
   // Observable  sources
  private ValidationAnnounced = new Subject();
  private ValidationConfirmed = new Subject<boolean>();

   // Observable  streams
   ValidationAnnounced$ = this.ValidationAnnounced.asObservable();
   ValidationConfirmed$ = this.ValidationConfirmed.asObservable();
   
     // Service  commands
  announceValidation() {
    this.ValidationAnnounced.next();
  }
  confirmValidation(result: boolean) {
    this.ValidationConfirmed.next(result);
  }
  constructor() { }
}
