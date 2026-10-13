import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, LayoutDashboard, ClipboardList, UtensilsCrossed, Mail } from 'lucide-react';
import { search as searchApi } from '../../api/searchApi';
import { searchLocal } from '../../utils/searchLocal';

const ICONS = { page: LayoutDashboard, order: ClipboardList, dish: UtensilsCrossed, message: Mail };
const GROUPS = [['page', 'Pages'], ['order', 'Orders'], ['dish', 'Dishes'], ['message', 'Messages']];

// wraps the matching part of the text in <mark>
function Highlight({ text, term }) {
  const t = String(text);
  const i = t.toLowerCase().indexOf(term.trim().toLowerCase());
  if (i < 0 || !term.trim()) return t;
  return <>{t.slice(0, i)}<mark>{t.slice(i, i + term.trim().length)}</mark>{t.slice(i + term.trim().length)}</>;
}

export default function AdminSearch() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const box = useRef(null);
  const input = useRef(null);
  const useLocal = useRef(false); // true once the API search is found to be missing
  const ticket = useRef(0);
  const navigate = useNavigate();

  // run the search 250 ms after the person stops typing
  useEffect(() => {
    const q = term.trim();
    if (!q) { setResults([]); return; }
    const mine = ++ticket.current;
    const timer = setTimeout(async () => {
      let found;
      if (!useLocal.current) {
        try { found = await searchApi(q); } catch { useLocal.current = true; }
      }
      if (!found) found = searchLocal(q);
      if (mine === ticket.current) { setResults(found); setActive(0); }
    }, 250);
    return () => clearTimeout(timer);
  }, [term]);

  // close when clicking outside; press "/" anywhere to jump into the search box
  useEffect(() => {
    const onDown = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      const typing = /input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable;
      if (e.key === '/' && !typing) { e.preventDefault(); input.current?.focus(); }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, []);

  const go = (r) => {
    navigate(r.link);
    setOpen(false);
    setTerm('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { setOpen(false); input.current.blur(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter' && results[active]) { e.preventDefault(); go(results[active]); }
  };

  // keep the keyboard order the same as the order shown on screen
  const grouped = GROUPS.map(([type, label]) => ({ type, label, items: results.filter((r) => r.type === type) })).filter((g) => g.items.length);
  const flat = grouped.flatMap((g) => g.items);
  const showPanel = open && term.trim().length > 0;

  return (
    <div className="search-box" ref={box}>
      <label className="admin-search">
        <span aria-hidden="true"><Search size={16} /></span>
        <input
          ref={input} type="search" value={term} placeholder="Search orders, dishes, messages…" aria-label="Search"
          autoComplete="off" role="combobox" aria-expanded={showPanel} aria-controls="admin-search-results"
          onChange={(e) => { setTerm(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {term && <button type="button" className="search-clear" aria-label="Clear search" onClick={() => { setTerm(''); input.current.focus(); }}><X size={14} /></button>}
      </label>

      {showPanel && (
        <div className="search-panel" id="admin-search-results" role="listbox">
          {flat.length === 0 ? (
            <div className="search-empty">No results for “{term.trim()}”</div>
          ) : grouped.map((g) => (
            <div key={g.type}>
              <h6>{g.label}</h6>
              {g.items.map((r) => {
                const Icon = ICONS[r.type];
                const index = flat.indexOf(r);
                return (
                  <button type="button" role="option" aria-selected={index === active} key={`${r.type}-${r.id}`}
                    className={`search-item ${index === active ? 'active' : ''}`}
                    onMouseEnter={() => setActive(index)} onClick={() => go(r)}>
                    <span className={`search-ic ${r.type}`}><Icon size={16} /></span>
                    <span className="search-text"><b><Highlight text={r.title} term={term} /></b><span><Highlight text={r.subtitle} term={term} /></span></span>
                  </button>
                );
              })}
            </div>
          ))}
          <div className="search-foot">↑ ↓ to move · Enter to open · Esc to close</div>
        </div>
      )}
    </div>
  );
}
