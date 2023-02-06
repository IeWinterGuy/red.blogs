
import config from '@lib/services/core/auth_config.json';

const { domain, clientId, audience, apiUri, errorPath } = config as {
  domain: string;
  clientId: string;
  audience?: string;
  apiUri: string;
  errorPath: string;
};


export const environment = {
  production: true,
  apiUri: 'http://localhost:3000/api/v1',
  auth: {
    domain,
    clientId,
    ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? { audience } : null),
    redirectUri: window.location.origin,
    errorPath,
  },
  firebaseConfig: {
    apiKey: "AIzaSyAOGQ_O3TRIh9zDtOvEIWn8_2IRX-ys1Bo",
    authDomain: "brewingmachine.firebaseapp.com",
    databaseURL: "https://brewingmachine-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "brewingmachine",
    storageBucket: "brewingmachine.appspot.com",
    messagingSenderId: "888770878522",
    appId: "1:888770878522:web:1d39b52125e973ceb3e903",
    measurementId: "G-WK42FE1NTQ"
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  }
};
