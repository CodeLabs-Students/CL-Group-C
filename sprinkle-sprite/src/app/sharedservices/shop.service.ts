import { Injectable, Signal, computed, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

//----- Interface Area -----//

// Represents a user reward tier based on points earned.
// Used in the shop to determine player rank and perks.
export interface LoyaltyLevel {
  level_name: string; // Name of the loyalty tier (e.g., “Gold”)
  points_required: number; // Points needed to reach this level
  reward_description: string; // Description of rewards earned
}

// Represents flavor rarity linked to XP and pricing visuals.
// Used across inventory, menu, and shop logic.
export interface Rarity {
  id: string; // Unique rarity identifier (e.g., 'rare-001')
  label: string; // Display label (e.g., "Epic", "Legendary")
  xp_value: number; // XP awarded when this rarity is selected
}

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  //-----State Section-----//

  // Injects the Firestore service from AngularFire.
  // Used to access collections stored in Firebase.
  private firestore = inject(Firestore);

  // Creates a reactive stream (observable) of loyalty levels
  // from the 'loyalty_levels' collection in Firestore.
  // Includes the document ID as the 'id' property on each item.
  private loyaltyLevels$ = collectionData(
    collection(this.firestore, 'loyalty_levels'),
    { idField: 'id' }
  ) as Observable<LoyaltyLevel[]>;

  // Creates a reactive stream (observable) of rarity definitions
  // from the 'rarities' collection in Firestore.
  // Each item includes its Firestore ID as 'id'.
  private rarities$ = collectionData(collection(this.firestore, 'rarities'), {
    idField: 'id',
  }) as Observable<Rarity[]>;

  // Converts observables into reactive Angular signals.
  // This allows the component or service to use .value() or () syntax
  // for automatically updating UI and logic without manual subscriptions.
  readonly loyaltyLevels = toSignal(this.loyaltyLevels$); // Signal for loyalty levels data
  readonly rarities = toSignal(this.rarities$); // Signal for rarity data

  //-----Data Sorting Logic-----//

  // Sorts the list of loyalty levels in ascending order of points required.
  // Used to ensure ranks are displayed from lowest to highest threshold.
  readonly sortedLoyaltyLevels = computed(() => {
    // Get the current loyalty level list from the signal.
    // If it's null or undefined, fallback to an empty array.
    const all = this.loyaltyLevels();

    // Use the spread operator to clone the array (to avoid mutating the original),
    // then sort it by comparing each level's 'points_required' value.
    return [...(all ?? [])].sort(
      (a, b) => a.points_required - b.points_required
    );
  });

  // Sorts the list of rarities in ascending order of XP value.
  // Used to display rarities from common to legendary in a logical XP tier.
  readonly sortedRarities = computed(() => {
    // Get the current rarity list from the signal.
    // Fallback to an empty array if the signal has no value yet.
    const all = this.rarities();

    // Clone the array and sort it by each rarity's XP value.
    return [...(all ?? [])].sort((a, b) => a.xp_value - b.xp_value);
  });

  //-----XP Logic Section-----//

  // Returns the XP value associated with a specific rarity ID.
  // Used to determine how much experience to award based on the item’s rarity.
  getXpForRarity(rarityId: string): number {
    // Get the current list of rarities from the signal.
    // If it's null or undefined (hasn't loaded yet), use an empty array instead.
    const rarityList = this.rarities() ?? [];

    // Search the list for a rarity object that matches the given ID.
    const rarity = rarityList.find((r) => r.id === rarityId);

    // If a match was found, return its xp_value.
    // If not found, return 0 as a fallback/default.
    return rarity?.xp_value ?? 0;
  }

  //-----Local Storage Logic-----//

  // Stores a key-value pair in the browser’s localStorage.
  // Used to persist user data (like selected filters or login info) across sessions.
  setLocal(key: string, value: string): void {
    // Saves the value under the provided key.
    // If the key already exists, it will be overwritten.
    localStorage.setItem(key, value);
  }

  // Retrieves a stored value from localStorage by key.
  // Returns the value as a string, or null if the key doesn't exist.
  getLocal(key: string): string | null {
    // Looks up the key in localStorage and returns its value.
    return localStorage.getItem(key);
  }

  // Deletes a key-value pair from localStorage.
  // Useful for clearing saved data (like on logout or reset).
  clearLocal(key: string): void {
    // Removes the key and its value from localStorage.
    localStorage.removeItem(key);
  }
}
