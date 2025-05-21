import { Injectable, Signal } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Flavor {
  name: string;
  description: string;
  price: number;
  rarity: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private firestore: Firestore = inject(Firestore);


  private readonly flavors$ = collectionData(
    collection(this.firestore, 'inventory'),
    { idField: 'id' }
  ) as Observable<Flavor[]>;


  readonly flavors: Signal<Flavor[]> = toSignal(this.flavors$, {
  initialValue: []
});
  getFlavors(): Observable<Flavor[]> {
  return this.flavors$;
}
}
