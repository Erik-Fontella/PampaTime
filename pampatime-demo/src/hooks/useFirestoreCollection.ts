import { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, onSnapshot, query, DocumentData } from 'firebase/firestore';

interface UseFirestoreCollectionOptions {
  listenLive?: boolean;
}

const useFirestoreCollection = <T>(
  collectionPath: string,
  options?: UseFirestoreCollectionOptions
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const q = query(collection(db, collectionPath));

    let unsubscribe: () => void;

    unsubscribe = onSnapshot(q, (snapshot) => {
      const items: T[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as DocumentData
      })) as T[];
      setData(items);
      setLoading(false);
    }, (err) => {
      console.error("Erro ao escutar coleção Firestore:", err);
      setError("Erro ao carregar dados.");
      setLoading(false);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [collectionPath, options?.listenLive]);

  return { data, loading, error };
};

export default useFirestoreCollection;