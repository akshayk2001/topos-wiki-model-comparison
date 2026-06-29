import React, { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "personal-wiki-pages";

const DEFAULT_PAGES = [
  {
    id: "home",
    title: "Home",
    content: `# Welcome to the Personal Wiki

This wiki collects notes and summaries based on three source documents covering the following topics:

- **Bollywood Music** – An academic paper exploring the evolution, trends, and cultural impact of the Bollywood music industry.
- **Meditation** – A Mayo Clinic article on meditation as a simple, fast way to reduce stress and improve well-being.
- **Tennis** – A promotional article by the USTA (Why Tennis?) presenting the health, fitness, and social benefits of playing tennis.

Use the sidebar to navigate between pages, or use the search bar to filter by title. You may create, edit, and delete pages as you like. All content is stored in your browser's local storage.`,
  },
  {
    id: "bollywood-music",
    title: "Bollywood Music",
    content: `# Bollywood Music Industry: Evolution, Trends, and Cultural Impact

The Bollywood music industry is a vibrant and integral aspect of India's cultural landscape, emerging alongside Indian cinema in Mumbai in the early 20th century. It has transformed from a regional musical expression into a global cultural phenomenon.

## Early History
The first Bollywood sound film, *Alam Ara* (1931), marked the beginning of Bollywood music. Early songs were heavily influenced by classical Indian music and theater. Music directors like Naushad and C. Ramchandra incorporated Indian classical ragas, creating timeless melodies. Playback singing became prominent with singers like Lata Mangeshkar and Mohammed Rafi.

## Golden Era (1950s–1970s)
Considered the golden era, composers like S.D. Burman, R.D. Burman, and Shankar-Jaikishan created evergreen hits blending classical, folk, and Western influences. Lyricists like Sahir Ludhianvi and Shailendra penned soulful poetry. Kishore Kumar, Mukesh, and Asha Bhosle emerged as iconic playback singers.

## Modernization (1980s–2000s)
The 1980s saw a shift with disco and pop elements; Bappi Lahiri popularized disco music. Electronic instruments and digital recording revolutionized production. A.R. Rahman emerged in the 1990s with an innovative fusion of Indian classical music and global genres, earning international acclaim.

## Contemporary Era (2000s–Present)
Bollywood music has become a global phenomenon with international collaborations. Songs blend hip-hop, EDM, and reggae. Digital platforms like YouTube and Spotify have changed music consumption. Remixing old classics has become a trend.

## Cultural & Economic Impact
Bollywood music reflects societal changes and shapes Indian identity. It plays a significant role in festivals, weddings, and celebrations. Economically, it generates substantial revenue through sales, concerts, endorsements, and licensing deals.

## Challenges
Piracy, changing consumption patterns, and competition from global music industries remain significant challenges.`,
  },
  {
    id: "meditation",
    title: "Meditation",
    content: `# Meditation: A Simple, Fast Way to Reduce Stress

By Mayo Clinic Staff

Meditation can restore calm and inner peace. Anyone can practice it — it is simple, inexpensive, and requires no special equipment. You can meditate anywhere: on a walk, on the bus, or even during a difficult meeting.

## Understanding Meditation
Meditation has been practiced for thousands of years. Originally meant to deepen understanding of sacred and mystical forces, it is now commonly used for relaxation and stress reduction. It is considered a type of mind-body complementary medicine. Meditation produces a deep state of relaxation and a tranquil mind by focusing attention and eliminating the stream of jumbled thoughts that cause stress.

## Benefits of Meditation

### Emotional Well-Being
- Gaining a new perspective on stressful situations
- Building skills to manage stress
- Increasing self-awareness
- Focusing on the present
- Reducing negative emotions

### Medical Conditions
Research suggests meditation may help with: allergies, anxiety disorders, asthma, binge eating, cancer, depression, fatigue, heart disease, high blood pressure, pain, sleep problems, and substance abuse. However, it is not a replacement for traditional medical treatment and should be discussed with a health care provider.

## Types of Meditation
- **Guided meditation** – Forming mental images of relaxing places (guided imagery or visualization).
- **Mantra meditation** – Silently repeating a calming word or phrase.
- **Mindfulness meditation** – Increased awareness and acceptance of the present moment.
- **Qi gong** – Combines meditation, relaxation, movement, and breathing exercises (part of traditional Chinese medicine).
- **Tai chi** – Gentle Chinese martial arts performed in slow, graceful movements with deep breathing.
- **Transcendental meditation** – Using a mantra to narrow conscious awareness and eliminate thoughts.
- **Yoga** – Postures and controlled breathing exercises to promote flexibility and a calm mind.

## Elements of Meditation
Key elements include focused attention, relaxed breathing, a quiet setting (especially for beginners), and a comfortable position.

## Everyday Practice
Meditation can be practiced through deep breathing, body scanning, repeating a mantra, walking meditation, prayer, reading and reflecting, or focusing love and gratitude. There is no right or wrong way to meditate.`,
  },
  {
    id: "tennis",
    title: "Tennis",
    content: `# Why Tennis? Health Benefits of Tennis

Tennis is promoted as a lifetime sport that offers lasting social, emotional, and physical benefits. Playing regularly is an excellent way to stay healthy, maintain fitness, and increase longevity.

## Cardiovascular Health & Longevity
- The Cleveland Clinic calls tennis "an ideal sport for a healthy heart."
- The risk of death from all causes was 47% lower for racquet sports players.
- Playing tennis two or more times a week for ten years can add up to 9.7 years to life expectancy — beating soccer, cycling, swimming, and jogging.

## Builds Overall Fitness
- An hour of singles burns 580–870 calories; doubles burns around 500.
- Regular play lowers body fat, improves cholesterol, and reduces diabetes risk.
- Tennis players have increased bone density and stronger, more flexible muscles and ligaments.
- Tennis improves agility, balance, coordination (including hand-eye coordination), and reduces reaction times.
- Conditioning strengthens the immune system.

## Emotional Health
- Tennis involves teams or networks of friends who enjoy being together.
- It teaches sportsmanship, teamwork, and builds lifetime friendships.
- Players learn to cope with stress, think strategically, and problem-solve on the fly.

## Benefits for Kids
Children and adolescents who play tennis realize the same health and fitness benefits as adults: better cardiovascular conditioning, greater endurance, more strength, and increased flexibility, balance, coordination, and agility. There is a "dose" relationship — the earlier and more often they play, the greater the fitness gains. Sports scientists recommend tennis as an ideal off-season sport that benefits overall athletic development.

### Social & Psychological Benefits for Kids
Youth tennis players build psychological strengths and life management skills. They rate high in responsibility, self-discipline, self-control, and stress management, and below average in anxiety. They tend to do better academically than non-players.

## Benefits for Seniors
Seniors who play tennis regularly are healthier and fitter, both physically and mentally, than sedentary adults of the same age. The combination of regular exercise and frequent social interaction is key. Health benefits are dose-dependent.

## Inclusive Sport
Tennis is available to everyone. The USTA offers programs for people with developmental disabilities (autism, Down syndrome, learning disabilities), physical disabilities (visual/hearing impairment, neuromuscular diseases, stroke rehab, wheelchair use), and emotional/psychiatric conditions (mental health issues, substance abuse).`,
  },
  {
    id: "connections",
    title: "Connections",
    content: `# Connections Across the Three Sources

Although the three source documents cover very different topics — Bollywood music, meditation, and tennis — several common threads emerge:

## Stress Reduction and Well-Being
- The **meditation** article centers on using meditation to reduce stress and improve emotional well-being.
- The **tennis** article highlights that playing tennis helps players cope with stress and builds emotional resilience.
- The **Bollywood music** article notes that music conveys universal themes of love, resilience, and human emotions, contributing to emotional expression and cultural identity.

## Physical and Mental Health
- **Tennis** explicitly links regular physical activity to better cardiovascular health, longevity, and stronger immune function.
- **Meditation** is presented as a mind-body practice that enhances both physical and emotional well-being and may help with various medical conditions.
- **Bollywood music** indirectly relates through its role in shaping emotions and collective identity, though the paper is more focused on cultural and economic impact.

## Social Connection
- **Tennis** emphasizes the social benefits: teams, friendships, and community.
- **Meditation** notes that while it can be practiced alone, it can also be done in group classes or with guidance.
- **Bollywood music** plays a central role in festivals, weddings, and celebrations, bringing people together across language and regional barriers.

## Lifelong Practice
- **Tennis** is described as a lifetime sport that benefits players of all ages.
- **Meditation** can be started at any age and adapted to individual needs.
- **Bollywood music** has evolved over a century and continues to adapt to new generations.

All three sources ultimately point to practices — musical, contemplative, or physical — that enrich human life when engaged in regularly.`,
  },
  {
    id: "questions",
    title: "Questions",
    content: `# Open Questions and Ideas for Further Exploration

Based on the three source documents, here are some questions worth exploring further:

## Bollywood Music
1. How do digital streaming platforms specifically affect revenue distribution among Bollywood composers, singers, and producers compared to the traditional album-sales model?
2. What is the measurable impact of Bollywood music on India's "soft power" and international cultural influence?
3. How does the trend of remixing old classics affect the originality and creativity of new Bollywood music?
4. To what extent has A.R. Rahman's international success influenced the global perception of Indian music?

## Meditation
1. For which specific medical conditions does the strongest scientific evidence support meditation as an effective complementary treatment?
2. How do the different types of meditation (mindfulness, mantra, transcendental, etc.) compare in terms of stress reduction outcomes?
3. How much meditation practice (frequency and duration) is needed to produce measurable health benefits?
4. Can meditation be effectively taught in workplace or school settings to reduce stress on a population level?

## Tennis
1. What specific mechanisms explain the 9.7-year increase in life expectancy for regular tennis players compared to other sports?
2. How do the social aspects of tennis (team play, club membership) contribute to its mental health benefits compared to individual sports like running or swimming?
3. What is the optimal frequency and duration of tennis play for maximizing health outcomes across different age groups?
4. How effective are community tennis programs (like those run by the USTA) at increasing physical activity levels in underserved populations?

## Cross-Topic Questions
1. Could combining regular tennis practice with meditation provide greater stress-reduction benefits than either activity alone?
2. Does listening to Bollywood music during physical activity like tennis enhance exercise performance or enjoyment?
3. How might the mindfulness cultivated through meditation improve focus and performance in sports like tennis?`,
  },
];

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function loadPages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

export default function App() {
  const [pages, setPages] = useState(() => {
    const saved = loadPages();
    return saved !== null ? saved : DEFAULT_PAGES;
  });
  const [selectedId, setSelectedId] = useState(() => {
    if (pages.length > 0) return pages[0].id;
    return null;
  });
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  }, [pages]);

  const selectedPage = pages.find((p) => p.id === selectedId) || null;

  const filteredPages = pages.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = useCallback((id) => {
    setEditingId(null);
    setConfirmDelete(null);
    setSelectedId(id);
  }, []);

  const handleCreate = useCallback(() => {
    const id = generateId();
    const newPage = { id, title: "New Page", content: "" };
    setPages((prev) => [...prev, newPage]);
    setSelectedId(id);
    setEditingId(id);
    setEditTitle("New Page");
    setEditContent("");
    setConfirmDelete(null);
  }, []);

  const handleEdit = useCallback(() => {
    if (!selectedPage) return;
    setEditingId(selectedPage.id);
    setEditTitle(selectedPage.title);
    setEditContent(selectedPage.content);
  }, [selectedPage]);

  const handleSave = useCallback(() => {
    if (!editingId) return;
    setPages((prev) =>
      prev.map((p) =>
        p.id === editingId
          ? { ...p, title: editTitle.trim() || p.title, content: editContent }
          : p
      )
    );
    setEditingId(null);
  }, [editingId, editTitle, editContent]);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
  }, []);

  const handleDeleteRequest = useCallback(() => {
    if (!selectedPage) return;
    setConfirmDelete(selectedPage.id);
  }, [selectedPage]);

  const handleDeleteConfirm = useCallback(() => {
    if (!confirmDelete) return;
    setPages((prev) => {
      const next = prev.filter((p) => p.id !== confirmDelete);
      if (next.length === 0) {
        const blank = { id: "blank", title: "New Page", content: "" };
        return [blank];
      }
      return next;
    });
    if (confirmDelete === selectedId) {
      setSelectedId((prev) => {
        if (prev === confirmDelete) {
          const idx = pages.findIndex((p) => p.id === confirmDelete);
          const remaining = pages.filter((p) => p.id !== confirmDelete);
          if (remaining.length > 0) {
            return remaining[Math.min(idx, remaining.length - 1)].id;
          }
          return "blank";
        }
        return prev;
      });
    }
    setConfirmDelete(null);
    setEditingId(null);
  }, [confirmDelete, selectedId, pages]);

  const handleDeleteCancel = useCallback(() => {
    setConfirmDelete(null);
  }, []);

  const renderContent = (text) => {
    const lines = text.split("\n");
    const elements = [];
    let inList = false;
    let inCheckList = false;
    let listItems = [];

    const flushList = () => {
      if (inList) {
        elements.push(
          <ul key={`ul-${elements.length}`}>{listItems}</ul>
        );
        listItems = [];
        inList = false;
      }
      if (inCheckList) {
        elements.push(
          <ul key={`cl-${elements.length}`} className="checklist">
            {listItems}
          </ul>
        );
        listItems = [];
        inCheckList = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed === "") {
        flushList();
        continue;
      }

      // Heading level 1
      if (trimmed.startsWith("# ") && !trimmed.startsWith("##")) {
        flushList();
        elements.push(
          <h1 key={`h1-${i}`}>{trimmed.slice(2)}</h1>
        );
        continue;
      }

      // Heading level 2
      if (trimmed.startsWith("## ") && !trimmed.startsWith("###")) {
        flushList();
        elements.push(
          <h2 key={`h2-${i}`}>{trimmed.slice(3)}</h2>
        );
        continue;
      }

      // Heading level 3
      if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={`h3-${i}`}>{trimmed.slice(4)}</h3>
        );
        continue;
      }

      // Bold line like **text**
      if (/^\*\*.*\*\*$/.test(trimmed)) {
        flushList();
        elements.push(
          <p key={`p-${i}`} className="bold-line">
            {trimmed.slice(2, -2)}
          </p>
        );
        continue;
      }

      // Bullet list item starting with "- "
      if (trimmed.startsWith("- ")) {
        flushList();
        inList = true;
        listItems.push(
          <li key={`li-${i}`}>{trimmed.slice(2)}</li>
        );
        continue;
      }

      // Check mark item starting with "✓"
      if (trimmed.startsWith("✓")) {
        flushList();
        inCheckList = true;
        listItems.push(
          <li key={`cli-${i}`} className="checked-item">
            {trimmed.slice(1)}
          </li>
        );
        continue;
      }

      // Arrow item starting with "➔"
      if (trimmed.startsWith("➔")) {
        flushList();
        inList = true;
        listItems.push(
          <li key={`li-${i}`}>{trimmed.slice(1)}</li>
        );
        continue;
      }

      flushList();
      elements.push(<p key={`p-${i}`}>{line}</p>);
    }
    flushList();

    return elements;
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Wiki Pages</h2>
          <button className="btn-create" onClick={handleCreate}>
            + New Page
          </button>
        </div>
        <input
          className="search-input"
          type="text"
          placeholder="Search pages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <nav className="page-list">
          {filteredPages.map((p) => (
            <button
              key={p.id}
              className={`page-link ${p.id === selectedId ? "active" : ""}`}
              onClick={() => handleSelect(p.id)}
            >
              {p.title}
            </button>
          ))}
          {filteredPages.length === 0 && (
            <p className="no-results">No pages found</p>
          )}
        </nav>
      </aside>

      <main className="main-content">
        {selectedPage && editingId === selectedPage.id ? (
          <div className="editor">
            <input
              className="edit-title"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Page title"
            />
            <textarea
              className="edit-content"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Write your content here... (supports # headings, - lists)"
            />
            <div className="editor-actions">
              <button className="btn-save" onClick={handleSave}>
                Save
              </button>
              <button className="btn-cancel" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        ) : selectedPage ? (
          <div className="viewer">
            <div className="viewer-header">
              <h1>{selectedPage.title}</h1>
              <div className="viewer-actions">
                <button className="btn-edit" onClick={handleEdit}>
                  Edit
                </button>
                <button className="btn-delete" onClick={handleDeleteRequest}>
                  Delete
                </button>
              </div>
            </div>
            <div className="viewer-content">
              {renderContent(selectedPage.content)}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <p>Select a page or create a new one.</p>
          </div>
        )}

        {confirmDelete && (
          <div className="confirm-overlay" onClick={handleDeleteCancel}>
            <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
              <p>Are you sure you want to delete this page?</p>
              <div className="confirm-actions">
                <button className="btn-delete" onClick={handleDeleteConfirm}>
                  Delete
                </button>
                <button className="btn-cancel" onClick={handleDeleteCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}