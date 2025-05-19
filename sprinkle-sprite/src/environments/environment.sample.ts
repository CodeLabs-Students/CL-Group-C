//-----Environment Configuration-----//

// This file defines environment-specific settings for the Angular app.
// Used to configure Firebase and other external services during development.

// NOTE: Do not commit real API keys. Use this as a template only.
// 👉 Copy this file and rename it to: environment.ts
// 👉 Replace the placeholder values with your actual Firebase project settings.

export const environment = {
  production: false,  // Indicates development mode (set to true in prod build)

  firebase: {
    apiKey: "your-api-key-here",                         // Firebase API key
    authDomain: "your-project-id.firebaseapp.com",       // Firebase Auth domain
    projectId: "your-project-id",                        // Firebase project ID
    storageBucket: "your-project-id.appspot.com",        // Firebase storage bucket
    messagingSenderId: "your-messaging-sender-id",       // Firebase messaging sender ID
    appId: "your-app-id",                                // Firebase app ID
    measurementId: "your-measurement-id"                 // Firebase analytics ID (optional)
  }
};
