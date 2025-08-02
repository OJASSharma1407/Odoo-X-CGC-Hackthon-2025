import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Edit3, Save, Search, Tag, Calendar } from 'lucide-react';

const NotesWidget = () => {
  const API = 'http://localhost:5000/notes';
  const token = localStorage.getItem('token');
  console.log("Token:", token); // check this

  
  const headers = {
    'auth-token': token,
    'Content-Type': 'application/json',
  };

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [newNote, setNewNote] = useState({ title: '', content: '', category: 'General' });
  const [editingNote, setEditingNote] = useState(null);
  const [error, setError] = useState('');

  const reloadNotes = () => {
    fetch(`${API}/fetch-all-notes`, { headers })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        const formatted = data.map(n => ({
          id: n._id,
          title: n.title,
          content: n.description,
          category: n.tag || 'General',
          updatedAt: new Date(n.updatedAt || n.createdAt).toLocaleString(),
        }));
        setNotes(formatted);
      })
      .catch(err => setError(err.message));
  };

  useEffect(() => {
    reloadNotes();
  }, []);

  const handleAdd = () => {
    const { title, content, category } = newNote;
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }
    setError('');
    fetch(`${API}/add-notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ title, description: content, tag: category }),
    })
      .then(res => res.json())
      .then(n => {
        if (n.errors) throw new Error(n.errors.map(e => e.msg).join(', '));
        setNotes([{ id: n._id, title: n.title, content: n.description, category: n.tag || 'General', updatedAt: new Date(n.updatedAt).toLocaleString() }, ...notes]);
        setNewNote({ title: '', content: '', category: 'General' });
        setError('');
      })
      .catch(err => setError(err.message));
  };

  const handleDelete = id => {
    fetch(`${API}/delete-notes/${id}`, { method: 'DELETE', headers })
      .then(res => {
        if (!res.ok) throw new Error('Delete failed');
        setNotes(notes.filter(n => n.id !== id));
      })
      .catch(err => setError(err.message));
  };

  const handleSave = () => {
    const { id, title, content, category } = editingNote;
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }
    setError('');
    fetch(`${API}/update-notes/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ title, description: content, tag: category }),
    })
      .then(res => res.json())
      .then(updated => {
        if (updated.errors) throw new Error(updated.errors.map(e => e.msg).join(', '));
        setNotes(notes.map(n => n.id === updated._id
          ? {
              ...n,
              title: updated.title,
              content: updated.description,
              category: updated.tag || 'General',
              updatedAt: new Date(updated.updatedAt).toLocaleString(),
            }
          : n
        ));
        setEditingNote(null);
      })
      .catch(err => setError(err.message));
  };

  const filteredNotes = notes
    .filter(n => (filterCategory === 'all' || n.category === filterCategory))
    .filter(n =>
      (n.title + n.content + n.category).toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="px-6 pt-6 space-y-4">
        <div className="flex justify-between items-center">
          <button onClick={() => setNewNote(prev => ({ ...prev }))} className="flex items-center text-blue-600 font-medium">
            <Plus className="w-4 h-4" /><span>Add Note</span>
          </button>
          <div className="flex space-x-2 items-center">
            <Search className="w-4 h-4 text-gray-400" />
            <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-2 py-1 text-sm" />
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="border px-2 py-1 rounded text-sm">
              <option value="all">All</option>
              {[...new Set(notes.map(n => n.category))].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Add/Edit Form */}
        {!editingNote && (
          <div className="space-y-2">
            <input type="text" placeholder="Title" value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm" />
            <textarea placeholder="Content" value={newNote.content} onChange={e => setNewNote({ ...newNote, content: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm" />
            <input type="text" placeholder="Category" value={newNote.category} onChange={e => setNewNote({ ...newNote, category: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm" />
            <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">Add Note</button>
          </div>
        )}

        {editingNote && (
          <div className="space-y-2">
            <input type="text" value={editingNote.title} onChange={e => setEditingNote(n => ({ ...n, title: e.target.value }))} className="w-full px-3 py-2 border rounded-md text-sm" />
            <textarea value={editingNote.content} onChange={e => setEditingNote(n => ({ ...n, content: e.target.value }))} className="w-full px-3 py-2 border rounded-md text-sm" />
            <input type="text" value={editingNote.category} onChange={e => setEditingNote(n => ({ ...n, category: e.target.value }))} className="w-full px-3 py-2 border rounded-md text-sm" />
            <div className="flex space-x-2">
              <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">Save</button>
              <button onClick={() => setEditingNote(null)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md text-sm">Cancel</button>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
        {filteredNotes.length === 0
          ? <div className="text-center py-12 text-gray-400">No notes found 📭</div>
          : filteredNotes.map(note => (
            <div key={note.id} className="group bg-white p-4 rounded-xl border hover:shadow-md transition">
              <h3 className="font-bold text-lg mb-1">{note.title}</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">{note.content}</p>
              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <div className="flex gap-2">
                  <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{note.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{note.updatedAt}</span>
                </div>
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                  <button onClick={() => setEditingNote({ ...note })} className="text-blue-500 hover:text-blue-600"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(note.id)} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default NotesWidget;
