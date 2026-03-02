import { useState, useEffect } from 'react'
import { Save, Trash2, Edit2, Plus, X } from 'lucide-react'
import { loadGamificationData, saveGamificationData, gamificationData as defaultData } from '../data/gamificationData'
import Footer from '../components/Footer'
import './AdminDashboard.css'

function AdminDashboard() {
  const [data, setData] = useState(null)
  const [editing, setEditing] = useState(null)
  const [editingType, setEditingType] = useState(null) // 'stage', 'badge', 'distinction', 'activity'
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const loadedData = loadGamificationData()
    setData(loadedData)
  }, [])

  if (!data) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <div style={{ padding: '48px 0', textAlign: 'left' }}>Loading...</div>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    saveGamificationData(data)
    alert('Data saved successfully! Other pages will be updated automatically.')
  }

  const handleEdit = (item, type, parentId = null) => {
    setEditing({ id: item.id || item.name, parentId, type })
    setEditingType(type)
    setFormData({ ...item })
  }

  const handleCancel = () => {
    setEditing(null)
    setEditingType(null)
    setFormData({})
  }

  const handleSaveEdit = () => {
    const newData = { ...data }

    if (editingType === 'stage') {
      const index = newData.stages.findIndex(s => s.id === editing.id)
      if (index !== -1) {
        newData.stages[index] = { ...newData.stages[index], ...formData }
      }
    } else if (editingType === 'badge') {
      const stageIndex = newData.stages.findIndex(s => s.id === editing.parentId)
      if (stageIndex !== -1) {
        const badgeIndex = newData.stages[stageIndex].badges.findIndex(b => b.id === editing.id)
        if (badgeIndex !== -1) {
          newData.stages[stageIndex].badges[badgeIndex] = { ...newData.stages[stageIndex].badges[badgeIndex], ...formData }
        }
      }
    } else if (editingType === 'distinction') {
      if (editing.parentId) {
        const stageIndex = newData.stages.findIndex(s => s.id === editing.parentId)
        if (stageIndex !== -1) {
          const distinctionIndex = newData.stages[stageIndex].distinctions.findIndex(d => d.name === editing.id)
          if (distinctionIndex !== -1) {
            newData.stages[stageIndex].distinctions[distinctionIndex] = { ...newData.stages[stageIndex].distinctions[distinctionIndex], ...formData }
          }
        }
      } else {
        const distinctionIndex = newData.allDistinctions.findIndex(d => d.id === editing.id)
        if (distinctionIndex !== -1) {
          newData.allDistinctions[distinctionIndex] = { ...newData.allDistinctions[distinctionIndex], ...formData }
        }
      }
    } else if (editingType === 'activity') {
      const stageIndex = newData.stages.findIndex(s => s.id === editing.parentId)
      if (stageIndex !== -1) {
        newData.stages[stageIndex].activities[editing.id] = formData.text
      }
    }

    setData(newData)
    saveGamificationData(newData)
    handleCancel()
  }

  const handleDelete = (item, type, parentId = null) => {
    if (!confirm(`Are you sure you want to delete this ${type === 'stage' ? 'stage' : type === 'distinction' ? 'distinction' : type}?`)) return

    const newData = { ...data }

    if (type === 'stage') {
      newData.stages = newData.stages.filter(s => s.id !== item.id)
    } else if (type === 'badge') {
      const stageIndex = newData.stages.findIndex(s => s.id === parentId)
      if (stageIndex !== -1) {
        newData.stages[stageIndex].badges = newData.stages[stageIndex].badges.filter(b => b.id !== item.id)
      }
    } else if (type === 'distinction') {
      if (parentId) {
        const stageIndex = newData.stages.findIndex(s => s.id === parentId)
        if (stageIndex !== -1) {
          newData.stages[stageIndex].distinctions = newData.stages[stageIndex].distinctions.filter(d => d.name !== item.name)
        }
      } else {
        newData.allDistinctions = newData.allDistinctions.filter(d => d.id !== item.id)
      }
    } else if (type === 'activity') {
      const stageIndex = newData.stages.findIndex(s => s.id === parentId)
      if (stageIndex !== -1) {
        const indexToDelete = typeof item === 'number' ? item : item.id
        newData.stages[stageIndex].activities = newData.stages[stageIndex].activities.filter((_, i) => i !== indexToDelete)
      }
    }

    setData(newData)
    saveGamificationData(newData)
  }

  const handleAdd = (type, parentId = null) => {
    if (type === 'badge') {
      const stageIndex = data.stages.findIndex(s => s.id === parentId)
      if (stageIndex !== -1) {
        const newBadge = {
          id: Date.now(),
          name: "New Badge",
          icon: "Award",
          description: "Badge description",
          category: "participacao"
        }
        const newData = { ...data }
        newData.stages[stageIndex].badges.push(newBadge)
        setData(newData)
        saveGamificationData(newData)
        handleEdit(newBadge, 'badge', parentId)
      }
    } else if (type === 'activity') {
      const stageIndex = data.stages.findIndex(s => s.id === parentId)
      if (stageIndex !== -1) {
        const newData = { ...data }
        newData.stages[stageIndex].activities.push("New activity")
        setData(newData)
        saveGamificationData(newData)
        handleEdit({ id: newData.stages[stageIndex].activities.length - 1, text: "New activity" }, 'activity', parentId)
      }
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="admin-header">
          <h1>Administration Panel</h1>
          <p>Manage stages, badges, distinctions, and activities of the STEM + English program</p>
        </header>

        <button className="btn-save-fixed" onClick={handleSave}>
          <Save size={18} /> Save All Changes
        </button>

        <div className="admin-content">
          <section className="admin-section">
            <h2>Program Stages</h2>
            {data.stages.map(stage => (
              <div key={stage.id} className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3>Stage {stage.number}: {stage.title}</h3>
                    <p>{stage.subtitle} • {stage.dateRange}</p>
                  </div>
                  <div className="admin-actions">
                    <button onClick={() => handleEdit(stage, 'stage')} className="btn-edit">
                      <Edit2 size={16} /> Edit
                    </button>
                  </div>
                </div>

                {editing && editing.id === stage.id && editingType === 'stage' ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Stage title"
                    />
                    <input
                      type="text"
                      value={formData.subtitle || ''}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="Subtitle"
                    />
                    <input
                      type="text"
                      value={formData.dateRange || ''}
                      onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
                      placeholder="Date range"
                    />
                    <textarea
                      value={formData.rewards || ''}
                      onChange={(e) => setFormData({ ...formData, rewards: e.target.value })}
                      placeholder="Rewards"
                    />
                    <div className="form-actions">
                      <button onClick={handleSaveEdit} className="btn-save-small">Save</button>
                      <button onClick={handleCancel} className="btn-cancel">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="admin-subsection">
                      <div className="subsection-header">
                        <h4>Activities</h4>
                        <button onClick={() => handleAdd('activity', stage.id)} className="btn-add-small">
                          <Plus size={14} /> Add
                        </button>
                      </div>
                      <ul>
                        {stage.activities.map((activity, idx) => (
                          <li key={idx}>
                            {editing && editing.id === idx && editingType === 'activity' && editing.parentId === stage.id ? (
                              <div className="edit-form-inline">
                                <input
                                  type="text"
                                  value={formData.text || ''}
                                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                  style={{ flex: 1 }}
                                />
                                <button onClick={handleSaveEdit} className="btn-save-small">✓</button>
                                <button onClick={handleCancel} className="btn-cancel">✕</button>
                              </div>
                            ) : (
                              <>
                                {activity}
                                <div className="item-actions">
                                  <button onClick={() => handleEdit({ id: idx, text: activity }, 'activity', stage.id)} className="btn-edit-small">
                                    <Edit2 size={12} />
                                  </button>
                                  <button onClick={() => handleDelete(idx, 'activity', stage.id)} className="btn-delete-small">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="admin-subsection">
                      <div className="subsection-header">
                        <h4>Badges</h4>
                        <button onClick={() => handleAdd('badge', stage.id)} className="btn-add-small">
                          <Plus size={14} /> Add
                        </button>
                      </div>
                      <div className="badges-list">
                        {stage.badges.map(badge => (
                          <div key={badge.id} className="badge-item">
                            {editing && editing.id === badge.id && editingType === 'badge' && editing.parentId === stage.id ? (
                              <div className="edit-form">
                                <input
                                  type="text"
                                  value={formData.name || ''}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  placeholder="Badge name"
                                />
                                <input
                                  type="text"
                                  value={formData.icon || ''}
                                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                  placeholder="Icon (Lucide component name)"
                                />
                                <textarea
                                  value={formData.description || ''}
                                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                  placeholder="Description"
                                />
                                <textarea
                                  value={formData.criteria || ''}
                                  onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                                  placeholder="Criteria for achievement (shown in tooltip)"
                                />
                                <select
                                  value={formData.category || 'participacao'}
                                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                  <option value="participacao">Workshop & Event Participation</option>
                                  <option value="conclusao">Delivery Completion</option>
                                  <option value="conquista_especial">Special Achievements</option>
                                  <option value="pedagogica">Pedagogical Badges (STEM + SDG)</option>
                                </select>
                                <div className="form-actions">
                                  <button onClick={handleSaveEdit} className="btn-save-small">Save</button>
                                  <button onClick={handleCancel} className="btn-cancel">Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <strong>{badge.name}</strong>
                                  <p>{badge.description}</p>
                                  {badge.criteria && <p style={{fontSize: '0.85em', color: '#555'}}><em>Criteria: {badge.criteria}</em></p>}
                                  <small>Icon: {badge.icon} • Category: {badge.category || 'N/A'}</small>
                                </div>
                                <div className="item-actions">
                                  <button onClick={() => handleEdit(badge, 'badge', stage.id)} className="btn-edit-small">
                                    <Edit2 size={12} />
                                  </button>
                                  <button onClick={() => handleDelete(badge, 'badge', stage.id)} className="btn-delete-small">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="admin-subsection">
                      <h4>Distinctions</h4>
                      <div className="distinctions-list">
                        {stage.distinctions.map((distinction, idx) => (
                          <div key={idx} className="distinction-item">
                            {editing && editing.id === distinction.name && editingType === 'distinction' && editing.parentId === stage.id ? (
                              <div className="edit-form">
                                <input
                                  type="text"
                                  value={formData.name || ''}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  placeholder="Distinction name"
                                />
                                <input
                                  type="text"
                                  value={formData.criteria || ''}
                                  onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                                  placeholder="Criteria"
                                />
                                <div className="form-actions">
                                  <button onClick={handleSaveEdit} className="btn-save-small">Save</button>
                                  <button onClick={handleCancel} className="btn-cancel">Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <strong>{distinction.name}</strong>
                                  <p>{distinction.criteria}</p>
                                </div>
                                <div className="item-actions">
                                  <button onClick={() => handleEdit(distinction, 'distinction', stage.id)} className="btn-edit-small">
                                    <Edit2 size={12} />
                                  </button>
                                  <button onClick={() => handleDelete(distinction, 'distinction', stage.id)} className="btn-delete-small">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </section>

          <section className="admin-section">
            <h2>Institutional Distinctions</h2>
            {data.allDistinctions.map(distinction => (
              <div key={distinction.id} className="admin-card">
                {editing && editing.id === distinction.id && editingType === 'distinction' && !editing.parentId ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Distinction name"
                    />
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description"
                    />
                    <input
                      type="text"
                      value={formData.criteria || ''}
                      onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                      placeholder="Criteria"
                    />
                    <select
                      value={formData.type || 'certificado_digital'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="certificado_digital">Digital Certificate</option>
                      <option value="selo_reconhecimento">Recognition Seal</option>
                      <option value="mencao_honrosa">Honorable Mention</option>
                    </select>
                    <div className="form-actions">
                      <button onClick={handleSaveEdit} className="btn-save-small">Save</button>
                      <button onClick={handleCancel} className="btn-cancel">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="admin-card-header">
                      <div>
                        <h3>{distinction.name}</h3>
                        <p>{distinction.description}</p>
                        <small>Criteria: {distinction.criteria} • Type: {distinction.type || 'N/A'}</small>
                      </div>
                      <div className="admin-actions">
                        <button onClick={() => handleEdit(distinction, 'distinction')} className="btn-edit">
                          <Edit2 size={16} /> Edit
                        </button>
                        <button onClick={() => handleDelete(distinction, 'distinction')} className="btn-delete">
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminDashboard
