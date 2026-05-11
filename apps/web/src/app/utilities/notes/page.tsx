"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";

interface Note {
  id: string;
  content: string;
  createdAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("gh-notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const save = (updated: Note[]) => {
    setNotes(updated);
    localStorage.setItem("gh-notes", JSON.stringify(updated));
  };

  const addNote = () => {
    if (!draft.trim()) return;
    save([{ id: Date.now().toString(), content: draft.trim(), createdAt: new Date().toLocaleString() }, ...notes]);
    setDraft("");
  };

  const deleteNote = (id: string) => save(notes.filter((n) => n.id !== id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
        <p className="text-muted mt-2">Quick notes stored locally on this device.</p>
      </div>

      {/* Compose */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col gap-3 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
        <textarea
          className="bg-transparent resize-none outline-none text-sm w-full min-h-[80px] placeholder:text-muted"
          placeholder="Write a note..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) addNote(); }}
        />
        <div className="flex justify-end">
          <button
            onClick={addNote}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <Plus className="w-4 h-4" /> Add Note
          </button>
        </div>
      </div>

      {/* Notes list */}
      <div className="space-y-3">
        {notes.length === 0 && (
          <div className="text-center text-muted py-12 glass-panel rounded-2xl">No notes yet. Add one above!</div>
        )}
        {notes.map((note) => (
          <div key={note.id} className="glass-panel rounded-2xl p-4 flex justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm whitespace-pre-wrap">{note.content}</p>
              <p className="text-xs text-muted mt-2">{note.createdAt}</p>
            </div>
            <button 
              onClick={() => deleteNote(note.id)} 
              className="p-2 text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex-shrink-0 self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
              aria-label="Delete note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
