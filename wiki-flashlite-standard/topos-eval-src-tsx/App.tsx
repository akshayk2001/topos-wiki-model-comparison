import React, { useState, useEffect } from 'react';

const DEFAULT_PAGES = [
  { id: 'home', title: 'Home', content: 'Welcome to your personal wiki, a collection of notes on Bollywood music, meditation, and tennis. These notes are derived from three specific source documents.' },
  { id: 'bollywood', title: 'Bollywood Music', content: 'Bollywood music is a central element of the Indian film industry. It is known for its wide variety of musical styles, grand dance sequences, and emotionally resonant storytelling, serving as a primary driver for both movie popularity and cultural impact.' },
  { id: 'meditation', title: 'Meditation', content: 'Meditation consists of various techniques designed to achieve mental clarity, emotional stability, and stress reduction. Common practices include focused breathing, mindfulness, and structured relaxation, all intended to enhance overall well-being.' },
  { id: 'tennis', title: 'Tennis', content: 'Tennis is a popular racket sport played on a court, either individually against one opponent (singles) or between two teams of two players (doubles). It emphasizes agility, strategic thinking, physical fitness, and precision in hitting the ball over the net within the court boundaries.' },
  { id: 'connections', title: 'Connections', content: 'Each of the three topics emphasizes a form of dedicated practice: Bollywood music requires rigorous artistic preparation, meditation demands consistent mental focus, and tennis relies on disciplined physical and tactical training. All three offer distinct pathways to personal enrichment and engagement.' },
  { id: 'questions', title: 'Questions', content: '1. How has the global influence of Bollywood music changed over the decades? 2. What are the long-term cognitive benefits of daily meditation compared to other relaxation techniques? 3. How have advancements in equipment technology influenced the strategic evolution of modern professional tennis?' }
];

export default function App() {
  const [pages, setPages] = useState(() => {
    const saved = localStorage.getItem('wiki-pages');
    return saved ? JSON.parse(saved) : DEFAULT_PAGES;
  });
  const [selectedId, setSelectedId] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('wiki-pages', JSON.stringify(pages));
  }, [pages]);

  const selectedPage = pages.find(p => p.id === selectedId);

  const startEdit = () => {
    setIsEditing(true);
    setEditTitle(selectedPage.title);
    setEditContent(selectedPage.content);
  };

  const savePage = () => {
    setPages(pages.map(p => p.id === selectedId ? { ...p, title: editTitle, content: editContent } : p));
    setIsEditing(false);
  };

  const deletePage = () => {
    if (confirm('Are you sure you want to delete this page?')) {
      const newPages = pages.filter(p => p.id !== selectedId);
      setPages(newPages);
      setSelectedId(newPages[0]?.id || null);
    }
  };

  const createPage = () => {
    const newPage = { id: Date.now().toString(), title: 'New Page', content: 'New content here.' };
    setPages([...pages, newPage]);
    setSelectedId(newPage.id);
    setIsEditing(true);
    setEditTitle(newPage.title);
    setEditContent(newPage.content);
  };

  const filteredPages = pages.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container">
      <aside className="sidebar">
        <input type="text" placeholder="Search pages..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={createPage}>+ New Page</button>
        <ul>
          {filteredPages.map(p => (
            <li key={p.id} className={selectedId === p.id ? 'active' : ''} onClick={() => { setSelectedId(p.id); setIsEditing(false); }}>{p.title}</li>
          ))}
        </ul>
      </aside>
      <main className="content">
        {selectedPage ? (
          isEditing ? (
            <div className="edit-form">
              <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
              <button onClick={savePage}>Save</button>
            </div>
          ) : (
            <div>
              <h1>{selectedPage.title}</h1>
              <p>{selectedPage.content}</p>
              <button onClick={startEdit}>Edit</button>
              <button onClick={deletePage}>Delete</button>
            </div>
          )
        ) : <p>Select a page or create one.</p>}
      </main>
    </div>
  );
}
