// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/',
  cdnLink: 'https://toorso-bucket.s3.ap-south-1.amazonaws.com/'
};

export const firebaseConfig = {
  apiKey: "AIzaSyBnPvl7TiNSlN8bF-WnqllcTRDq6_W5Jjk",
  authDomain: "toorso.firebaseapp.com",
  projectId: "toorso",
  storageBucket: "toorso.appspot.com",
  messagingSenderId: "135427033677",
  appId: "1:135427033677:web:a89794a7800dce30b22a04",
  measurementId: "G-SER7LF0JZ0"
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
