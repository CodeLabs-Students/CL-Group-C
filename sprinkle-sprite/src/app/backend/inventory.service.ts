import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

export interface Flavor {
  name: string;
  description: string;
  price: number;
  rarity: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private firestore: Firestore = inject(Firestore);


  getFlavors(): Observable<Flavor[]> {
    const flavorsRef = collection(this.firestore, 'inventory'); // 'inventory' = your Firestore collection name
    return collectionData(flavorsRef, { idField: 'id' }) as Observable<Flavor[]>;
  }
}
