import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateAdminService {
  private UpdatedAdmin: Subject<boolean> = new Subject<boolean>();
  isUpdated = this.UpdatedAdmin.asObservable();

  UpdateAdmin(isUpdated: boolean) {
    this.UpdatedAdmin.next(isUpdated);
  }

}
