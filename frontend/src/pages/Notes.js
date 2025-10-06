import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import GlassCard from "../component/GlassCard";


export default function Notes() {
    const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const res = await axios.get("/notes");
            setNotes(res.data);
        } catch (err) {
            console.error(err);
            alert("Error fetching notes. Please login again.");
            navigate("/");
        }
    }

    const addNote = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/notes", {title,content});
            setTitle("");
            setContent("");
            fetchNotes();

        } catch (err) {
            console.error(err);
            alert("Error adding note. Please try again.");
        }

    }
    
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center p-10 space-y-6">
      <h1 className="text-4xl font-bold text-white drop-shadow mb-4">
        Your Notes
      </h1>
      <GlassCard className="w-full max-w-xl">
        <form onSubmit={addNote} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 rounded-md bg-white/30 placeholder-white/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-3 rounded-md bg-white/30 placeholder-white/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
          >
            Add Note
          </button>
        </form>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full max-w-4xl">
        {notes.map((note) => (
          <GlassCard key={note._id}>
            <h3 className="text-xl font-semibold text-white mb-2">
              {note.title}
            </h3>
            <p className="text-white/90">{note.content}</p>
          </GlassCard>
        ))}
      </div>
    </div>
    )
}