import React from 'react';
import { ManagedItem, BookingItem, TeacherItem, CourseItem, SubjectItem, SemesterItem } from '@/types/management';
import { Timestamp } from 'firebase/firestore'; 

const handleEditAction = (item: ManagedItem) => {
  alert(`Editar: ${item.name || item.title || item.id}`);
};

const handleDeleteAction = (itemId: string) => {
  if (window.confirm("Tem certeza que deseja excluir?")) {
    alert(`Excluir item com ID: ${itemId}`);
  }
};

export interface ManagementRouteConfig<T extends ManagedItem> {
  path: string;
  title: string;
  collectionPath: string;
  searchPlaceholder: string;
  addBtnLabel: string;
  onAddClick: () => void;
  columns: { key: keyof T; header: string; render?: (item: T) => React.ReactNode; }[];
}

export const managementRoutes: { [key: string]: ManagementRouteConfig<any> } = {
  salas: {
    path: "/salas",
    title: "Gerenciar Salas",
    collectionPath: "salas",
    searchPlaceholder: "Buscar...",
    addBtnLabel: "Adicionar Sala",
    onAddClick: () => alert("Abrir formulário para adicionar sala!"),
    columns: [
      { key: "name", header: "Nome" },
      { key: "capacity", header: "Capacidade" },
      { key: "type", header: "Tipo" },
      {
        key: "id", header: "Ações", render: (item: BookingItem) => (
          <div className="flex gap-2">
            <button onClick={() => handleEditAction(item)} className="text-blue-600 hover:underline">Editar</button>
            <button onClick={() => handleDeleteAction(item.id)} className="text-red-600 hover:underline">Excluir</button>
          </div>
        )
      }
    ],
  },
  professores: {
    path: "/professores",
    title: "Gerenciar Professores",
    collectionPath: "professores",
    searchPlaceholder: "Buscar...",
    addBtnLabel: "Adicionar Professor",
    onAddClick: () => alert("Abrir formulário para adicionar professor!"),
    columns: [
      { key: "name", header: "Nome" },
      { key: "email", header: "Email" },
      {
        key: "id", header: "Ações", render: (item: TeacherItem) => (
          <div className="flex gap-2">
            <button onClick={() => handleEditAction(item)} className="text-blue-600 hover:underline">Editar</button>
            <button onClick={() => handleDeleteAction(item.id)} className="text-red-600 hover:underline">Excluir</button>
          </div>
        )
      }
    ],
  },
  cursos: {
    path: "/cursos",
    title: "Gerenciar Cursos",
    collectionPath: "cursos",
    searchPlaceholder: "Buscar...",
    addBtnLabel: "Adicionar Curso",
    onAddClick: () => alert("Abrir formulário para adicionar curso!"),
    columns: [
      { key: "code", header: "Código" },
      { key: "name", header: "Nome" },
      {
        key: "id", header: "Ações", render: (item: CourseItem) => (
          <div className="flex gap-2">
            <button onClick={() => handleEditAction(item)} className="text-blue-600 hover:underline">Editar</button>
            <button onClick={() => handleDeleteAction(item.id)} className="text-red-600 hover:underline">Excluir</button>
          </div>
        )
      }
    ],
  },
  disciplinas: {
    path: "/disciplinas",
    title: "Gerenciar Disciplinas",
    collectionPath: "disciplinas",
    searchPlaceholder: "Buscar...",
    addBtnLabel: "Adicionar Disciplina",
    onAddClick: () => alert("Abrir formulário para adicionar disciplina!"),
    columns: [
      { key: "code", header: "Código" },
      { key: "name", header: "Nome" },
      { key: "course", header: "Curso" },
      { key: "chTeorica", header: "CH Teórica" },
      { key: "chPratica", header: "CH Prática" },
      {
        key: "id", header: "Ações", render: (item: SubjectItem) => (
          <div className="flex gap-2">
            <button onClick={() => handleEditAction(item)} className="text-blue-600 hover:underline">Editar</button>
            <button onClick={() => handleDeleteAction(item.id)} className="text-red-600 hover:underline">Excluir</button>
          </div>
        )
      }
    ],
  },
  semestres: {
    path: "/semestres",
    title: 'Histórico de Semestres',
    collectionPath: "semestres",
    searchPlaceholder: "Buscar...",
    addBtnLabel: "Adicionar Novo Horário",
    onAddClick: () => alert("Abrir formulário para adicionar semestre!"),
    columns: [
      { key: "name", header: "NOME DO SEMESTRE" },
      {
        key: "lastModified",
        header: "ÚLTIMA MODIFICAÇÃO",
        render: (item: SemesterItem) => {
          const timestamp = item.lastModified as Timestamp;
          if (timestamp && timestamp.toDate) {
            const date = timestamp.toDate();
            const formattedDate = date.toLocaleDateString('pt-BR');
            const formattedTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            return `${formattedDate} ${formattedTime}`;
          }
          return 'N/A';
        },
      },
      { key: "id", header: "Ações", render: (item: SemesterItem) => (
        <div className="flex gap-2">
          <button onClick={() => handleEditAction(item)} className="text-blue-600 hover:underline">Editar</button>
          <button onClick={() => handleDeleteAction(item.id)} className="text-red-600 hover:underline">Excluir</button>
        </div>
      )},
    ]
  },
};