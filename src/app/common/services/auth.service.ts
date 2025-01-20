import { Injectable } from '@angular/core';
import { LocalStorage } from '../classes/local-storage.class';
import { LocalStorageKey } from '../models/local-storage-key.model';
import { IUserModel } from '../models/user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../classes/api-url.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  showLoader$: Subject<boolean> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  getAuthToken(): string {
    return LocalStorage.get(LocalStorageKey.TOKEN)
  }

  setAuthToken(token: string) {
    LocalStorage.set(LocalStorageKey.TOKEN, token);
  }

  deleteAuthToken() {
    LocalStorage.delete(LocalStorageKey.TOKEN);
  }

  isUserLoggedIn(): boolean {
    return !!this.getAuthToken()
  }
}
