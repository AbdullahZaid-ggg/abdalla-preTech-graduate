import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { getAllSets, addSet, deleteSet } from '../utils/db'

export default function QuestionSetsScreen() {
  const navigate = useNavigate()
  const { dispatch } = useQuiz()
  const [sets, setSets] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')

  const loadSets = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAllSets()
      setSets(data)
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { loadSets() }, [loadSets])

  async function handleCreate() {
    if (!newName.trim()) return
    try {
      const id = await addSet({ name: newName.trim(), questions: [] })
      setCreating(false)
      setNewName('')
      navigate(`/sets/${id}`)
    } catch { /* ignore */ }
  }

  async function handleDelete(id, e) {
    e.stopPropagation()
    if (!confirm('Delete this set permanently?')) return
    try {
      await deleteSet(id)
      loadSets()
    } catch { /* ignore */ }
  }

  function handlePlay(set) {
    if (!set.questions.length) return
    dispatch({
      type: 'LOAD_QUESTIONS',
      payload: {
        questions: set.questions.map(q => ({ ...q })),
        isApiMode: false,
        category: set.name,
        difficulty: 'all',
      },
    })
    dispatch({ type: 'SET_PRACTICE_MODE', payload: false })
    dispatch({ type: 'START_QUIZ', payload: set.questions.map(q => ({ ...q })) })
  }

  function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (ev) => {
      try {
        const data = JSON.parse(ev.target.result)
        if (!data.name || !Array.isArray(data.questions)) {
          alert('Invalid file format. Expected { name, questions[] }')
          return
        }
        const id = await addSet(data)
        loadSets()
        navigate(`/sets/${id}`)
      } catch {
        alert('Failed to parse JSON file')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <section className="screen-main">
      <div className="page-card">
        <div className="page-card-header">
          <h2>
            <svg viewBox="0 0 20 20" width="20" height="20" style={{ verticalAlign: -3 }}><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M8 8h4M8 11h4M8 14h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg>
            <span> My Question Sets</span>
          </h2>
          <p>Create, import, and manage your own question sets</p>
        </div>
        <div className="page-card-body">
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {creating ? (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flex: 1, minWidth: 200 }}>
                <input
                  type="text"
                  className="set-name-input"
                  placeholder="Set name..."
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') { setCreating(false); setNewName('') } }}
                  autoFocus
                  style={{
                    flex: 1, padding: '10px 14px', borderRadius: 'var(--shape-sm)',
                    border: '1px solid var(--md-outline-variant)', background: 'rgba(255,255,255,0.03)',
                    color: 'var(--md-on-surface)', fontSize: '0.9rem', outline: 'none',
                  }}
                />
                <button className="btn btn-sm btn-primary" onClick={handleCreate}>Create</button>
                <button className="btn btn-sm btn-text" onClick={() => { setCreating(false); setNewName('') }}>Cancel</button>
              </div>
            ) : (
              <>
                <button className="btn btn-sm btn-primary" onClick={() => setCreating(true)}>
                  <svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
                  <span>New Set</span>
                </button>
                <label className="btn btn-sm btn-secondary" style={{ cursor: 'pointer' }}>
                  <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 11v2a2 2 0 002 2h6a2 2 0 002-2v-2M8 1v10M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Import JSON</span>
                  <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
                </label>
              </>
            )}
          </div>

          {loading ? (
            <div className="loading-overlay" style={{ position: 'relative', minHeight: 120 }}>
              <div className="spinner" />
            </div>
          ) : sets.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', opacity: 0.5 }}>
              <svg viewBox="0 0 40 40" width="40" height="40" style={{ marginBottom: 12 }}><path d="M10 10a2 2 0 012-2h16a2 2 0 012 2v20a2 2 0 01-2 2H12a2 2 0 01-2-2V10z" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M16 16h8M16 21h8M16 26h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg>
              <p style={{ fontSize: '0.9rem' }}>No question sets yet.</p>
              <p style={{ fontSize: '0.8rem', marginTop: 4 }}>Create a new set or import one from a JSON file.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {sets.map(set => (
                <div key={set.id} className="set-card" onClick={() => navigate(`/sets/${set.id}`)} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', borderRadius: 'var(--shape-sm)',
                  background: 'rgba(255,255,255,0.02)', cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.04)',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)' }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 4 }}>{set.name}</div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.5 }}>
                      {set.questions.length} question{set.questions.length !== 1 ? 's' : ''}
                      {' \u00B7 '}Updated {new Date(set.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button className="btn btn-sm btn-primary" onClick={e => { e.stopPropagation(); handlePlay(set) }} disabled={!set.questions.length} title={set.questions.length ? 'Play this set' : 'No questions yet'}>
                    <svg viewBox="0 0 16 16" width="14" height="14"><path d="M5 3l8 5-8 5z" fill="currentColor"/></svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn-sm btn-text" onClick={e => handleDelete(set.id, e)} style={{ opacity: 0.4 }} title="Delete set">
                    <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 4h10M6 4V3a1 1 0 011-1h2a1 1 0 011 1v1M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
