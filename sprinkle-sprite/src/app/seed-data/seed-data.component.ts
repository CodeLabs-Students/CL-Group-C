import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import flavorData from '../../assets/flavors.json'; // adjust if needed

@Component({
  selector: 'app-seed-data',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="seedData()">🌱 Seed Inventory</button>
    <p *ngIf="done">✅ Seeding complete!</p>
  `
})
export class SeedDataComponent {
  done = false;

  constructor(private firestore: Firestore) {}

  async seedData() {
    const inventoryRef = collection(this.firestore, 'inventory');

    for (const flavor of flavorData as any[]) {
      await addDoc(inventoryRef, flavor);
    }

    console.log('🔥 Inventory seeded!');
    this.done = true;
  }
}
