import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase-config';
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  onSnapshot, query, orderBy, serverTimestamp
} from 'firebase/firestore';

// Recursively strip undefined values (Firestore rejects them)
const sanitizeForFirestore = (obj) => {
  if (obj === null || obj === undefined) return null;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeForFirestore);
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      cleaned[key] = sanitizeForFirestore(value);
    }
  }
  return cleaned;
};

export function useCollection(collectionName, sortField = 'createdAt') {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy(sortField, 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, (err) => {
      console.error(`Error loading ${collectionName}:`, err);
      // Fallback: load without ordering
      const unsub2 = onSnapshot(collection(db, collectionName), (snap) => {
        setData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      });
      return unsub2;
    });
    return unsub;
  }, [collectionName, sortField]);

  const add = useCallback(async (item) => {
    const cleaned = sanitizeForFirestore({ ...item, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    return addDoc(collection(db, collectionName), cleaned);
  }, [collectionName]);

  const update = useCallback(async (id, updates) => {
    const cleaned = sanitizeForFirestore({ ...updates, updatedAt: serverTimestamp() });
    return updateDoc(doc(db, collectionName, id), cleaned);
  }, [collectionName]);

  const remove = useCallback(async (id) => {
    return deleteDoc(doc(db, collectionName, id));
  }, [collectionName]);

  return { data, loading, add, update, remove };
}
