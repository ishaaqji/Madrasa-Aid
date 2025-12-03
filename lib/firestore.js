
import admin from "firebase-admin";

export async function initializeFirestore() {
  if(!admin.apps.length){
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  }
  return admin.firestore();
}

export function db(){
  return admin.firestore();
}
