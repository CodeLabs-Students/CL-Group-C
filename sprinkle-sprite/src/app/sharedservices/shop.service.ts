import { Injectable, Signal, computed, inject} from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';

//loyalty level interface
export interface LoyaltyLevel {
  level_name: string;
  points_required: number;
  reward_description: string;
}

//rarity interface
export interface Rarity {
  id: string;
  label: string;
  xp_value: number;
}
@Injectable({ providedIn: 'root' })
export class ShopService {
  // inject firestore
  private firestore = inject(Firestore);

  // ✅ Pre-create the observables (no DI timing bug)
  private loyaltyLevels$ = collectionData(
    collection(this.firestore, 'loyalty_levels'),
    { idField: 'id' }
  ) as Observable<LoyaltyLevel[]>;

  //raw unsorted rarities from firebase collection
  private rarities$ = collectionData(
    collection(this.firestore, 'rarities'),
    { idField: 'id' }
  ) as Observable<Rarity[]>;

   // ✅ Signals (now safe to assign here)
  readonly loyaltyLevels = toSignal(this.loyaltyLevels$);
  readonly rarities = toSignal(this.rarities$);

  // This sorts the loyalty levels by xp
  readonly sortedLoyaltyLevels = computed(() => {
  const all = this.loyaltyLevels();
  return [...(all ?? [])].sort((a, b) => a.points_required - b.points_required);
});

//This sorts the rarities list
  readonly sortedRarities = computed(() => {
  const all = this.rarities();
  return [...(all ?? [])].sort((a, b) => a.xp_value - b.xp_value);
});

// retrieve the XP value for a given rarity ID
getXpForRarity(rarityId: string): number {
  const rarityList = this.rarities() ?? [];
  const rarity = rarityList.find(r => r.id === rarityId);
  return rarity?.xp_value ?? 0;
}

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
}
