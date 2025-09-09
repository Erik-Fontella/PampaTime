import { app, database } from '@/firebase/config';
import { ref, update, push, serverTimestamp, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export const updateTimetableEvent = async (eventId, updatedData, action) => {
  try {
    const eventRef = ref(database, `timetables/${eventId}`);
    await update(eventRef, updatedData);

    const auth = getAuth(app);
    const user = auth.currentUser;
    const author = user?.displayName || user?.email || "Usuário desconhecido";

    const logRef = ref(database, 'history-logs');
    await push(logRef, {
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR'),
      author,
      action,
      timestamp: serverTimestamp(),
      eventId,     
      updatedData,   
    });

    console.log(`Evento ${eventId} atualizado e log criado com sucesso por ${author}.`);
  } catch (error) {
    console.error("Erro ao atualizar evento e criar log:", error);
    throw error;
  }
};
export const restoreTimetableVersion = async (logId, author) => {
  try {
    const logRef = ref(database, `history-logs/${logId}`);
    const snapshot = await get(logRef);
    const logData = snapshot.val();

    if (!logData || !logData.eventId || !logData.updatedData) {
      console.error("Dados de log incompletos ou não encontrados.");
      return;
    }

    const eventRef = ref(database, `timetables/${logData.eventId}`);
    await update(eventRef, logData.updatedData);

    const newLogRef = ref(database, 'history-logs');
    await push(newLogRef, {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      author,
      action: "Restauração de versão",
      timestamp: serverTimestamp(),
      restoredFromLogId: logId,
    });

    console.log(`Versão restaurada com sucesso a partir do log ${logId}.`);
  } catch (error) {
    console.error("Erro ao restaurar a versão:", error);
    throw error;
  }
};