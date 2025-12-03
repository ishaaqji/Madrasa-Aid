import admin from "firebase-admin";

export async function initializeFirestore() {
  if(!admin.apps.length){
    try { admin.initializeApp(); } catch(e){ admin.initializeApp(); }
  }
  return admin.firestore();
}

export function db(){ return admin.firestore(); }
