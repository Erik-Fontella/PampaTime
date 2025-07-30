import { useState } from 'react';
import { db } from '@/firebase/config';
import { doc, deleteDoc, updateDoc, collection, addDoc, DocumentData, setDoc, serverTimestamp, FieldValue } from 'firebase/firestore'; // <--- Importe serverTimestamp e FieldValue
import { ManagedItem } from '@/types/management';
import { SemesterItem } from '@/types/management'; 

const useFirestoreOperations = <T extends ManagedItem>(collectionPath: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const addDocument = async (data: Omit<T, 'id'>): Promise<string | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      let dataToSave: DocumentData = data;

      if (collectionPath === 'semestres') {
        dataToSave = { ...data, lastModified: serverTimestamp() };
      }
      
      const docRef = await addDoc(collection(db, collectionPath), dataToSave);
      setSuccess(true);
      return docRef.id;
    } catch (e: any) {
      console.error(`Erro ao adicionar documento à coleção ${collectionPath}:`, e);
      setError(e.message);
      setSuccess(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async (id: string, data: Partial<Omit<T, 'id'>>): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const docRef = doc(db, collectionPath, id);
      let dataToUpdate: DocumentData = data;
      if (collectionPath === 'semestres') {
        dataToUpdate = { ...data, lastModified: serverTimestamp() };
      }
      await updateDoc(docRef, dataToUpdate);
      setSuccess(true);
    } catch (e: any) {
      console.error(`Erro ao atualizar documento ${id} na coleção ${collectionPath}:`, e);
      setError(e.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const docRef = doc(db, collectionPath, id);
      await deleteDoc(docRef);
      setSuccess(true);
    } catch (e: any) {
      console.error(`Erro ao excluir documento ${id} da coleção ${collectionPath}:`, e);
      setError(e.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { addDocument, updateDocument, deleteDocument, loading, error, success };
};

export default useFirestoreOperations;