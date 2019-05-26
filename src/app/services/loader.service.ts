import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loading = new Subject<boolean>();

  constructor() { }

  get loading() {
    return this._loading;
  }

  startLoader() {
    this._loading.next(true);
  }

  stopLoader() {
    this._loading.next(false);
  }
}
