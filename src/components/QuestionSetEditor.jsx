import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSet, updateSet } from '../utils/db'

let qIdCounter = Date.now()
function makeQId() { return (qIdCounter++).toString(36) }

const emptyQuestion = { id: '', question: '', options: ['', '', '', ''], correct: 0, difficulty: 'easy' }

export default function QuestionSetEditor() {
  const { setId } = useParams()
  const navigate = useNavigate()
  const [set, setSet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editingIdx, setEditingIdx] = useState(-1)
  const [editQ, setEditQ] = useState({ ...emptyQuestion })
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    if (!setId) return
    getSet(Number(setId)).then(data => {
      if (data) setSet(data)
      setLoading(false)
    })
  }, [setId])

  async function saveSet(updated) {
    setSaving(true)
    try {
      await updateSet(updated)
      setSet(updated)
      setDirty(false)
    } catch { /* ignore */ }
    setSaving(false)
  }

  function startEdit(idx) {
    const q = set.questions[idx]
    setEditQ({ ...q, options: [...q.options] })
    setEditingIdx(idx)
  }

  function startAdd() {
    setEditQ({ ...emptyQuestion, id: makeQId() })
    setEditingIdx(-2)
  }

  function cancelEdit() {
    setEditingIdx(-1)
    setEditQ({ ...emptyQuestion })
  }

  function saveQuestion() {
    if (!editQ.question.trim() || editQ.options.some(o => !o.trim())) {
      alert('Fill in the question and all 4 options')
      return
    }
    const q = { ...editQ, options: editQ.options.map(o => o.trim()), question: editQ.question.trim() }
    let updated
    if (editingIdx === -2) {
      updated = { ...set, questions: [...set.questions, q] }
    } else {
      const qs = [...set.questions]
      qs[editingIdx] = q
      updated = { ...set, questions: qs }
    }
    saveSet(updated)
    setEditingIdx(-1)
    setEditQ({ ...emptyQuestion })
  }

  function deleteQuestion(idx) {
    if (!confirm('Delete this question?')) return
    const qs = set.questions.filter((_, i) => i !== idx)
    saveSet({ ...set, questions: qs })
    if (editingIdx === idx || editingIdx === -2) cancelEdit()
  }

  function moveQuestion(idx, dir) {
    const target = idx + dir
    if (target < 0 || target >= set.questions.length) return
    const qs = [...set.questions]
    const tmp = qs[idx]
    qs[idx] = qs[target]
    qs[target] = tmp
    saveSet({ ...set, questions: qs })
    if (editingIdx === idx) setEditingIdx(target)
    else if (editingIdx === target) setEditingIdx(idx)
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify({ name: set.name, questions: set.questions }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${set.name.replace(/\s+/g, '_')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function updateName(name) {
    const updated = { ...set, name }
    setSet(updated)
    setDirty(true)
  }

  function saveName() {
    if (dirty) saveSet(set)
  }

  if (loading) {
    return (
      <section className="screen-main">
        <div className="page-card">
          <div className="page-card-body" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div className="spinner" />
          </div>
        </div>
      </section>
    )
  }

  if (!set) {
    return (
      <section className="screen-main">
        <div className="page-card">
          <div className="page-card-body" style={{ textAlign: 'center', padding: '60px 20px', opacity: 0.5 }}>
            <p>Set not found</p>
            <button className="btn btn-sm btn-text" onClick={() => navigate('/sets')} style={{ marginTop: 12 }}>Back to Sets</button>
          </div>
        </div>
      </section>
    )
  }

  const isEditing = editingIdx !== -1 && editQ.id

  return (
    <section className="screen-main">
      <div className="page-card">
        <div className="page-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn btn-sm btn-text" onClick={() => navigate('/sets')} style={{ opacity: 0.5, padding: 0 }}>
              <svg viewBox="0 0 16 16" width="16" height="16"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <input
              type="text"
              className="set-name-input"
              value={set.name}
              onChange={e => updateName(e.target.value)}
              onBlur={saveName}
              onKeyDown={e => { if (e.key === 'Enter') saveName() }}
              style={{
                fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-display)',
                background: 'transparent', border: 'none', borderBottom: dirty ? '1px dashed var(--md-outline-variant)' : '1px solid transparent',
                color: 'var(--md-on-surface)', outline: 'none', padding: '2px 4px', flex: 1, minWidth: 120,
              }}
            />
            {dirty && <span style={{ fontSize: '0.7rem', opacity: 0.4 }}>unsaved</span>}
          </div>
          <p style={{ marginTop: 4 }}>
            {set.questions.length} question{set.questions.length !== 1 ? 's' : ''}
            {' \u00B7 '}Updated {new Date(set.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="page-card-body">
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            <button className="btn btn-sm btn-primary" onClick={startAdd}>
              <svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
              <span>Add Question</span>
            </button>
            <button className="btn btn-sm btn-secondary" onClick={exportJSON} disabled={!set.questions.length}>
              <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 11v2a2 2 0 002 2h6a2 2 0 002-2v-2M8 1v10M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Export JSON</span>
            </button>
          </div>

          {isEditing && (
            <div className="question-form" style={{
              padding: '16px', borderRadius: 'var(--shape-sm)',
              background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
              marginBottom: 20,
            }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 12, opacity: 0.6 }}>
                {editingIdx === -2 ? 'New Question' : `Edit Question #${editingIdx + 1}`}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                  type="text" placeholder="Question text"
                  value={editQ.question} onChange={e => setEditQ({ ...editQ, question: e.target.value })}
                  className="set-name-input"
                  style={{
                    padding: '10px 14px', borderRadius: 'var(--shape-sm)',
                    border: '1px solid var(--md-outline-variant)', background: 'rgba(255,255,255,0.03)',
                    color: 'var(--md-on-surface)', fontSize: '0.9rem', outline: 'none',
                  }}
                />
                {editQ.options.map((opt, oi) => (
                  <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => setEditQ({ ...editQ, correct: oi })}
                      style={{
                        width: 22, height: 22, borderRadius: '50%', border: '2px solid var(--md-outline-variant)',
                        background: editQ.correct === oi ? 'var(--md-primary)' : 'transparent',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'background 0.15s',
                      }}
                      title={editQ.correct === oi ? 'Correct answer' : 'Mark as correct'}
                    >
                      {editQ.correct === oi && (
                        <svg viewBox="0 0 12 12" width="10" height="10"><path d="M3 6l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      )}
                    </button>
                    <input
                      type="text" placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                      value={opt} onChange={e => {
                        const opts = [...editQ.options]
                        opts[oi] = e.target.value
                        setEditQ({ ...editQ, options: opts })
                      }}
                      style={{
                        flex: 1, padding: '8px 12px', borderRadius: 'var(--shape-sm)',
                        border: '1px solid var(--md-outline-variant)', background: 'rgba(255,255,255,0.03)',
                        color: 'var(--md-on-surface)', fontSize: '0.85rem', outline: 'none',
                      }}
                    />
                    <span style={{ fontSize: '0.75rem', opacity: 0.4, width: 14, textAlign: 'center' }}>
                      {String.fromCharCode(65 + oi)}
                    </span>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                  <label style={{ fontSize: '0.85rem', opacity: 0.6 }}>Difficulty:</label>
                  <select
                    value={editQ.difficulty}
                    onChange={e => setEditQ({ ...editQ, difficulty: e.target.value })}
                    style={{
                      padding: '6px 12px', borderRadius: 'var(--shape-sm)',
                      border: '1px solid var(--md-outline-variant)', background: 'rgba(255,255,255,0.03)',
                      color: 'var(--md-on-surface)', fontSize: '0.85rem', outline: 'none',
                    }}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button className="btn btn-sm btn-primary" onClick={saveQuestion}>
                  <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>{editingIdx === -2 ? 'Add' : 'Save'}</span>
                </button>
                <button className="btn btn-sm btn-text" onClick={cancelEdit}>Cancel</button>
              </div>
            </div>
          )}

          {set.questions.length === 0 && !isEditing ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', opacity: 0.5 }}>
              <p style={{ fontSize: '0.9rem' }}>No questions yet.</p>
              <p style={{ fontSize: '0.8rem', marginTop: 4 }}>Click "Add Question" to get started.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {set.questions.map((q, idx) => (
                <div key={q.id || idx} className="set-card" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 'var(--shape-sm)',
                  background: editingIdx === idx ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${editingIdx === idx ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)'}`,
                  transition: 'background 0.2s',
                }}>
                  <span style={{ fontSize: '0.75rem', opacity: 0.3, width: 24, flexShrink: 0 }}>#{idx + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {q.question}
                    </div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.4, marginTop: 2 }}>
                      {q.options[q.correct]} (correct) {' \u00B7 '} {q.difficulty}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    <button className="btn btn-sm btn-text" onClick={() => moveQuestion(idx, -1)} disabled={idx === 0} style={{ padding: '4px', opacity: 0.3 }} title="Move up">
                      <svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 12V4M5 7l3-3 3 3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <button className="btn btn-sm btn-text" onClick={() => moveQuestion(idx, 1)} disabled={idx === set.questions.length - 1} style={{ padding: '4px', opacity: 0.3 }} title="Move down">
                      <svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 4v8M5 9l3 3 3-3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <button className="btn btn-sm btn-text" onClick={() => startEdit(idx)} style={{ padding: '4px', opacity: 0.4 }} title="Edit">
                      <svg viewBox="0 0 16 16" width="14" height="14"><path d="M12 2l2 2-8 8H4v-2l8-8z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round"/></svg>
                    </button>
                    <button className="btn btn-sm btn-text" onClick={() => deleteQuestion(idx)} style={{ padding: '4px', opacity: 0.3 }} title="Delete">
                      <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 4h10M6 4V3a1 1 0 011-1h2a1 1 0 011 1v1M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {saving && (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <div className="spinner" style={{ width: 24, height: 24 }} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
