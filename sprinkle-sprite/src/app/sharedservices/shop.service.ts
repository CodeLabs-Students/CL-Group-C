import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShopService {
  setLocal(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getLocal(key: string): string | null {
    return localStorage.getItem(key);
  }

  clearLocal(key: string): void {
    localStorage.removeItem(key);
  }
}
