import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'personal-wiki-pages-v2';

interface Page {
  id: string;
  title: string;
  content: string;
}

const defaultPages: Page[] = [
  {
    id: 'home',
    title: 'Home',
    content: `Welcome to this personal wiki. It contains notes and summaries drawn from three source documents covering the following topics:

• Bollywood music — evolution, trends, cultural impact, economic significance, and global reach (based on an academic article).
• Meditation — stress reduction, emotional well-being, types and practices, and health considerations (based on a Mayo Clinic article).
• Tennis — health and fitness benefits, social and emotional benefits, and accessibility across ages and abilities (based on a USTA article).

Use the sidebar to browse pages. You can create new pages, edit existing ones, search by title, and delete pages you no longer need. All content is stored in your browser.`
  },
  {
    id: 'bollywood-music',
    title: 'Bollywood Music',
    content: `The Bollywood music source describes an industry that began alongside Indian cinema in Mumbai in the early 20th century and grew from regional roots into a global cultural phenomenon.

Key points from the source:

• Early Bollywood music drew from Indian classical music, theater, folk traditions, and Western influences.
• The first Bollywood sound film, Alam Ara (1931), is identified as an important beginning for Bollywood film music.
• Music directors such as Naushad, C. Ramchandra, S.D. Burman, R.D. Burman, and Shankar-Jaikishan are discussed as important figures in shaping the sound.
• Lyricists and singers helped create emotional and memorable songs, with the source highlighting poetic lyrics and iconic playback voices.
• The 1950s through 1970s are presented as a golden era marked by melodic richness, lyrical depth, and blends of classical, folk, and Western elements.
• Later decades brought modernization and experimentation, including disco, pop, electronic instruments, digital recording, and fusion with global genres.
• Contemporary Bollywood music includes hip-hop, EDM, reggae, rap, remixes, and international collaborations.
• Digital platforms and streaming have changed how people access and share Bollywood music, expanding its global reach.

The article emphasizes that Bollywood music is more than entertainment. It often reflects social change, identity, emotions, festivals, weddings, and public conversations. It also serves as a cultural ambassador for India and has economic significance through music sales, concerts, licensing, endorsements, streaming, and film promotion.

The source also notes challenges, including piracy, changing listening habits, global competition, and the need to preserve cultural authenticity while continuing to innovate.`
  },
  {
    id: 'meditation',
    title: 'Meditation',
    content: `The meditation source presents meditation as a simple, inexpensive, and accessible way to reduce stress and restore calm. It says meditation can be practiced for a few minutes almost anywhere, including while walking, waiting, traveling, or facing a stressful situation.

Key points from the source:

• Meditation has been practiced for thousands of years and was originally connected with sacred and mystical understanding.
• Today it is commonly used for relaxation and stress reduction.
• Meditation is described as a mind-body complementary medicine practice.
• During meditation, a person focuses attention and quiets jumbled thoughts that may contribute to stress.
• Potential benefits include calm, peace, balance, improved emotional well-being, and support for overall health.

The source lists emotional benefits such as gaining perspective on stressful situations, building stress-management skills, increasing self-awareness, focusing on the present, and reducing negative emotions.

It also says meditation may be useful alongside care for some stress-related medical conditions, while cautioning that evidence can vary and meditation is not a replacement for traditional medical treatment. People with health concerns are encouraged to discuss the pros and cons with a health care provider.

Types and related practices mentioned include guided meditation, mantra meditation, mindfulness meditation, qi gong, tai chi, transcendental meditation, and yoga.

Common elements include focused attention, relaxed breathing, a quiet setting, and a comfortable position. Everyday approaches include deep breathing, body scanning, repeating a mantra, walking meditation, prayer, reading and reflecting, and focusing on love and gratitude.

The article closes with a practical reminder: meditation takes practice, wandering attention is normal, and there is no single right way to meditate. What matters is finding an approach that helps with stress reduction and feeling better overall.`
  },
  {
    id: 'tennis',
    title: 'Tennis',
    content: `The tennis source presents tennis as a lifetime sport with physical, social, emotional, psychological, and community benefits. It emphasizes that tennis can be played long after some other sports and that it is relatively easy to begin through clubs, teaching professionals, other players, public courts, and inexpensive equipment.

Key points from the source:

• Tennis is described as a regular fitness activity that supports health, fitness, and longevity.
• The source connects tennis with cardiovascular health and cites reports associating racquet sports with lower risk of death from all causes.
• Playing singles or doubles can burn substantial calories.
• Regular play is connected with lower body fat, improved cholesterol levels, reduced diabetes risk, increased bone density, stronger and more flexible muscles, tendons, and ligaments, and better agility, balance, coordination, hand-eye coordination, and reaction time.
• Tennis is also presented as supporting emotional health because it often involves teams, friends, sportsmanship, teamwork, and lifelong friendships.
• Players practice coping with stress, thinking strategically, and solving problems quickly.

For children and adolescents, the source says tennis can support cardiovascular conditioning, endurance, strength, flexibility, balance, coordination, and agility. It also says young tennis players may develop responsibility, self-discipline, self-control, stress management, focus, sociability, and academic benefits.

For older adults, the source emphasizes the combination of regular exercise and social interaction. It describes benefits as dose-dependent, with more frequent play associated with remaining physically and mentally fit.

The source also stresses that tennis can be adapted for people with disabilities, including developmental, physical, emotional, and psychiatric needs. Its overall message is that tennis has a place for people across ages and abilities.`
  },
  {
    id: 'connections',
    title: 'Connections',
    content: `These three sources focus on different subjects, but several careful connections are supported by the documents.

• Well-being: The meditation article centers on stress reduction and emotional balance. The tennis source also discusses emotional health, stress management, and physical well-being. Bollywood music is described as expressing emotions and reflecting society, though its source focuses more on cultural and social impact than personal health practice.

• Practice and participation: Meditation can be practiced in many everyday settings. Tennis is presented as accessible through public courts, clubs, teachers, and other players. Bollywood music reaches audiences widely through films, celebrations, concerts, and digital platforms.

• Social connection: Bollywood music is described as crossing regional, linguistic, and cultural boundaries. Tennis can build friendships and community through teams and play. Meditation can be individual, but the source also mentions classes, teachers, prayer, reflection, and discussion.

• Adaptation over time: Bollywood music evolves through new genres, technologies, and global exchange. Meditation includes many forms and can be adapted to personal needs. Tennis is described as a lifetime sport that can fit children, older adults, and adaptive players.

• Stress and emotion: Meditation directly addresses stress and negative emotions. Tennis involves coping with stress, strategy, and problem-solving. Bollywood music often communicates love, resilience, identity, and human emotions.`
  },
  {
    id: 'questions',
    title: 'Questions',
    content: `Open questions and things worth exploring further from the sources:

• How can Bollywood music continue to innovate while preserving cultural authenticity?
• How have streaming and digital platforms changed the way audiences discover Bollywood music?
• Which forms of meditation are easiest for beginners to keep practicing over time?
• What kinds of stress-related situations are best suited to brief meditation practices?
• How can tennis programs make the sport more accessible for different ages and abilities?
• What role do social relationships play in keeping people engaged with tennis or other long-term wellness activities?
• Across music, meditation, and sport, how do regular habits shape emotional well-being?`
  }
];

function loadPages(): Page[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultPages;

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultPages;
  } catch {
    return defaultPages;
  }
}

function makeId(): string {
  return `page-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  const [pages, setPages] = useState<Page[]>(loadPages);
  const [selectedId, setSelectedId] = useState<string>(() => loadPages()[0]?.id ?? '');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftContent, setDraftContent] = useState('');

  const selectedPage: Page | null = pages.find((page) => page.id === selectedId) ?? pages[0] ?? null;

  const filteredPages = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return pages;
    return pages.filter((page) => page.title.toLowerCase().includes(query));
  }, [pages, searchTerm]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    if (!selectedPage) return;
    setDraftTitle(selectedPage.title);
    setDraftContent(selectedPage.content);
  }, [selectedPage]);

  function selectPage(id: string): void {
    setSelectedId(id);
    setIsEditing(false);
  }

  function createPage(): void {
    const newPage: Page = {
      id: makeId(),
      title: 'Untitled Page',
      content: 'Start writing your notes here.'
    };
    setPages((currentPages) => [...currentPages, newPage]);
    setSelectedId(newPage.id);
    setSearchTerm('');
    setIsEditing(true);
  }

  function savePage(): void {
    const title = draftTitle.trim() || 'Untitled Page';
    setPages((currentPages) =>
      currentPages.map((page) =>
        page.id === selectedId ? { ...page, title, content: draftContent } : page
      )
    );
    setIsEditing(false);
  }

  function deletePage(): void {
    if (!selectedPage) return;
    const confirmed = window.confirm(`Delete "${selectedPage.title}"? This cannot be undone.`);
    if (!confirmed) return;

    const remainingPages = pages.filter((page) => page.id !== selectedPage.id);
    setPages(remainingPages);
    setSelectedId(remainingPages[0]?.id ?? '');
    setIsEditing(false);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Personal Wiki</h1>
          <button onClick={createPage}>+ New Page</button>
        </div>

        <label className="search-label" htmlFor="search">
          Search pages
        </label>
        <input
          id="search"
          className="search-input"
          type="search"
          placeholder="Filter by title..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <nav className="page-list" aria-label="Wiki pages">
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => (
              <button
                key={page.id}
                className={page.id === selectedPage?.id ? 'page-link active' : 'page-link'}
                onClick={() => selectPage(page.id)}
              >
                {page.title}
              </button>
            ))
          ) : (
            <p className="empty-message">No pages match your search.</p>
          )}
        </nav>
      </aside>

      <main className="content-area">
        {selectedPage ? (
          <article className="wiki-card">
            <div className="page-actions">
              <button onClick={() => setIsEditing(true)} disabled={isEditing}>
                Edit
              </button>
              <button className="danger" onClick={deletePage}>
                Delete
              </button>
            </div>

            {isEditing ? (
              <div className="editor">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  value={draftTitle}
                  onChange={(event) => setDraftTitle(event.target.value)}
                />

                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  value={draftContent}
                  onChange={(event) => setDraftContent(event.target.value)}
                  rows={18}
                />

                <div className="editor-actions">
                  <button className="primary" onClick={savePage}>
                    Save
                  </button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h2>{selectedPage.title}</h2>
                <div className="page-content">{selectedPage.content}</div>
              </>
            )}
          </article>
        ) : (
          <section className="wiki-card empty-state">
            <h2>No pages yet</h2>
            <p>Create a new page to start your wiki.</p>
            <button onClick={createPage}>Create Page</button>
          </section>
        )}
      </main>
    </div>
  );
}