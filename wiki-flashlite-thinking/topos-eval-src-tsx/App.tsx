import React, { useState, useEffect } from 'react';

const INITIAL_PAGES = [
  {
    title: 'Home',
    content: 'Welcome to your personal wiki! This is a collection of notes synthesized from three key areas: Bollywood music, meditation, and tennis.'
  },
  {
    title: 'Bollywood Music',
    content: 'Bollywood music, also known as Hindi film music, is a massive global industry. It features diverse genres, blending traditional Indian melodies with Western musical influences, and is integral to the storytelling and emotional impact of Indian cinema.'
  },
  {
    title: 'Meditation',
    content: 'Meditation is a practice to train attention and awareness, often used to improve mental well-being, reduce stress, and cultivate clarity. Various techniques exist, emphasizing mindfulness, breath, or focused concentration.'
  },
  {
    title: 'Tennis',
    content: 'Tennis is a sport played on a court with rackets and a ball. It is known for its health benefits, including cardiovascular exercise, agility training, and social engagement. Matches can be played as singles or doubles.'
  },
  {
    title: 'Connections',
    content: 'All three topics—Bollywood music, meditation, and tennis—emphasize discipline and practice. Bollywood music requires consistent training and creativity, meditation requires a dedicated mental practice, and tennis relies on physical and mental conditioning to improve performance.'
  },
  {
    title: 'Questions',
    content: '1. How do different regional influences specifically change Bollywood musical styles?\n2. What are the long-term neurological benefits of different meditation practices?\n3. How do tennis playing surfaces (clay, grass, hard) impact the physical demands on a player?'
  }
];

export default function App() {
  const [pages, setPages] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('Home');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('wiki-pages');
    if (saved) {
      setPages(JSON.parse(saved));
    } else {
      setPages(INITIAL_PAGES);
      localStorage.setItem('wiki-pages', JSON.stringify(INITIAL_PAGES));
    }
  }, []);

  const savePages = (newPages) => {
    setPages(newPages);
    localStorage.setItem('wiki-pages', JSON.stringify(newPages));
  };

  const selectedPage = pages.find(p => p.title === selectedTitle);

  const handleSave = () => {
    const updatedPages = pages.map(p => 
      p.title === selectedTitle ? { title: editTitle, content: editContent } : p
    );
    savePages(updatedPages);
    setSelectedTitle(editTitle);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this page?')) {
      const updatedPages = pages.filter(p => p.title !== selectedTitle);
      savePages(updatedPages);
      setSelectedTitle(updatedPages[0]?.title || '');
    }
  };

  const handleCreate = () => {
    const newPage = { title: 'New Page', content: '' };
    savePages([...pages, newPage]);
    setSelectedTitle('New Page');
    setEditTitle('New Page');
    setEditContent('');
    setIsEditing(true);
  };

  const filteredPages = pages.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="sidebar">
        <h3>Wiki</h3>
        <input placeholder="Search pages..." onChange={e => setSearchTerm(e.target.value)} />
        <button onClick={handleCreate}>+ New Page</button>
        <ul className="page-list">
          {filteredPages.map(p => (
            <li key={p.title} onClick={() => setSelectedTitle(p.title)}>{p.title}</li>
          ))}
        </ul>
      </div>
      <div className="main">
        {isEditing ? (
          <div>
            <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
            <textarea value={editContent} onChange={e => setEditContent(e.target.value)} />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : selectedPage ? (
          <div>
            <h1>{selectedPage.title}</h1>
            <p>{selectedPage.content}</p>
            <button onClick={() => { setIsEditing(true); setEditTitle(selectedPage.title); setEditContent(selectedPage.content); }}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          <p>Select a page or create a new one.</p>
        )}
      </div>
    </>
  );
}
