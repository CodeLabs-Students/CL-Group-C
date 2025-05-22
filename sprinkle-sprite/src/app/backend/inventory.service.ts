//----- Angular & Firebase Core Utilities -----//

import { Injectable, Signal } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

//----- Flavor Interface Definition -----//

// Represents a single ice cream flavor in the inventory.
// Used for cards, checkout, and stock tracking.
export interface Flavor {
  name: string;           // Flavor name (displayed on cards)
  description: string;    // Short flavor description
  price: number;          // Price of the flavor
  rarity: string;         // Rarity tag used for visuals + XP
  stock: number;          // Units available in stock
}

//----- Inventory Service -----//

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  //----- Firebase Firestore Setup -----//

  // Injects the Firebase Firestore connection
  private firestore: Firestore = inject(Firestore);

  // Observable stream of all flavor documents from the 'inventory' collection
  // - Uses 'idField' to map Firestore doc IDs if needed (currently unused in Flavor interface)
  private readonly flavors$ = collectionData(
    collection(this.firestore, 'inventory'),
    { idField: 'id' }
  ) as Observable<Flavor[]>;

  //----- Signal Conversion -----//

  // Reactive signal version of the flavor stream
  // - Starts with empty array
  // - Auto-updates when Firestore data changes
  readonly flavors: Signal<Flavor[]> = toSignal(this.flavors$, {
    initialValue: []
  });

  //----- Fetch Flavors as Observable (Legacy Compatibility) -----//

  // Returns raw Observable version of the flavors
  // - Useful for one-time subscriptions or async pipe
  getFlavors(): Observable<Flavor[]> {
    return this.flavors$;
  }
}

