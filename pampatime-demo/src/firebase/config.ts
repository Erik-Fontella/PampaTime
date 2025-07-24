// src/firebase/config.ts

// Importações de funções do Firebase SDK - TODAS NO TOPO
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Suas configurações do Firebase - LENDO DAS VARIÁVEIS DE AMBIENTE
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL, // Se você usa Realtime Database, adicione esta linha e a variável no .env
};

// Inicializa o aplicativo Firebase UMA VEZ
const app = initializeApp(firebaseConfig);

// Exporta as instâncias dos serviços do Firebase para serem usadas em outros arquivos
export const db = getFirestore(app); // Para Firestore
export const auth = getAuth(app);     // Para Authentication
export const storage = getStorage(app); // Para Storage

export default app; // Exporta o objeto 'app' principal