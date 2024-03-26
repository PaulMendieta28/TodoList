"use client";
import { getNotes, addNote, updateNote, deleteNote } from '@/utils/request';
import { useEffect, useState } from 'react'

export default function TodoList({ session }: { session: any }) {
  const [Notes, setNotes] = useState<any[]>([])
  const [newTaskText, setNewTaskText] = useState('')
  const [errorText, setErrorText] = useState('')
 const user = session;
  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getNotes(user.id)
      setNotes(notes)
    }

    fetchNotes()
  }, [])

  const addTodo = async (taskText: string) => {
    let note = taskText.trim()
    if (note.length) {
      const result = await addNote(user.id, note);

      if (!result.length) {
        setNotes([...Notes, result])
        setNewTaskText('')
      } 
    }
  }

  const deleteTodo = async (id: string) => {
    await deleteNote(id);
    setNotes(Notes.filter((x) => x.id != id))
  }

  return (
    <div className="flex-1 flex flex-col w-full max-w-2xl justify-center gap-2">
      <h1 className="mb-12 text-4xl">Mi Lista de Tareas</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTodo(newTaskText)
        }}
        className="flex gap-2 my-2"
      >
        <input
          className="rounded w-full p-2 bg-yellow-50 text-black"
          type="text"
          placeholder="Mi tarea"
          value={newTaskText}
          onChange={(e) => {
            setErrorText('')
            setNewTaskText(e.target.value)
          }}
        />
        <button className="cursor-pointer mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Agregar
        </button>
      </form>
      <div className="bg-gray shadow overflow-hidden rounded-md">
        <ul>
          {Notes.map((todo) => (
            <Todo key={todo.id} todo={todo} onDelete={() => deleteTodo(todo.id)} />
          ))}
        </ul>
      </div>
    </div>
  )
}

const Todo: React.FC<TodoProps> = ({ todo, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(todo.note);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveEdit = async () => {
    const upd = await updateNote(todo, editedNote);
  };

  return (
    <li className="w-full bg-yellow-500 block cursor-pointer hover:bg-yellow-200 focus:outline-none focus:bg-yellow-600 transition duration-150 mb-4">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          {isEditing ? (
            <input
              className="text-sm leading-5 font-medium text-black"
              value={editedNote}
              onChange={(e) => setEditedNote(e.target.value)}
            />
          ) : (
            <div className="text-sm leading-5 font-medium text-black">{todo.note}</div>
          )}
        </div>
        <div>
          {isEditing && (
            <>
              <button
                onClick={() => {saveEdit(); setIsEditing(false)}}
                className="cursor-pointer mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Guardar
              </button>
              <button
                onClick={toggleEdit}
                className="cursor-pointer mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </>
          )}
          {!isEditing && (
            <button
              onClick={toggleEdit}
              className="cursor-pointer mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Editar
            </button>
          )}
          <button
            onClick={onDelete}
            className="cursor-pointer mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );    
};

interface TodoProps {
  todo: {
    is_complete: boolean;
    note: string;
  };
  onDelete: () => void;
}