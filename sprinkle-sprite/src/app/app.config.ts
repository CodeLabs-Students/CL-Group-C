//-----Angular Core Providers-----//

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

//-----App Routes-----//

import { routes } from './app.routes';

//-----Firebase Setup-----//

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

//-----App Configuration-----//

// This file defines the root configuration for the Angular application.
// It provides routing, zone optimization, and Firebase services.

export const appConfig: ApplicationConfig = {
  providers: [

    // Improves Angular performance by Stacking up zone events
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Provides route definitions from app.routes.ts
    provideRouter(routes),

    //----- Firebase Initialization -----//

    // Initializes the Firebase app using the config from environment.ts
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // Sets up Firestore as the database provider
    provideFirestore(() => getFirestore())
  ]
};
