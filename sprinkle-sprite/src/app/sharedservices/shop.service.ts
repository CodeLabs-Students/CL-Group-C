import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';


export interface LoyaltyLevel {
  level_name: string;
  points_required: number;
  reward_description: string;
}
@Injectable({ providedIn: 'root' })
export class ShopService {
  // inject firestore
  private firestore = inject(Firestore);

  // Local storage
  setLocal(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getLocal(key: string): string | null {
    return localStorage.getItem(key);
  }

  clearLocal(key: string): void {
    localStorage.removeItem(key);
  }
  // Loyalty levels from firestore
  readonly loyaltyLevels = toSignal(
    collectionData(collection(this.firestore, 'loyalty_levels'), {
      idField: 'id' // Optional: remove if you don’t need Firestore doc IDs
    }) as Observable<LoyaltyLevel[]>
  );
}
