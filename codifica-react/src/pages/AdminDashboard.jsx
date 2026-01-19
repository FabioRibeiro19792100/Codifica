import { useState, useEffect } from 'react'
import { Save, Trash2, Edit2, Plus, X } from 'lucide-react'
import { loadGamificationData, saveGamificationData, gamificationData as defaultData } from '../data/gamificationData'
import Footer from '../components/Footer'
import './AdminDashboard.css'

function AdminDashboard() {
  const [data, setData] = useState(null)
  const [editing, setEditing] = useState(null)
  const [editingType, setEditingType] = useState(null) // 'phase', 'badge', 'trophy', 'activity'
  const [formData, setFormData] = useState({})

  useEffect(() => {
    // Carrega dados salvos ou usa os padrão
    const loadedData = loadGamificationData()
    setData(loadedData)
  }, [])

  if (!data) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <div style={{ padding: '48px 0', textAlign: 'left' }}>Carregando...</div>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    saveGamificationData(data)
    alert('Dados salvos com sucesso! As outras páginas serão atualizadas automaticamente.')
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
    
    if (editingType === 'phase') {
      const index = newData.phases.findIndex(p => p.id === editing.id)
      if (index !== -1) {
        newData.phases[index] = { ...newData.phases[index], ...formData }
      }
    } else if (editingType === 'badge') {
      const phaseIndex = newData.phases.findIndex(p => p.id === editing.parentId)
      if (phaseIndex !== -1) {
        const badgeIndex = newData.phases[phaseIndex].badges.findIndex(b => b.id === editing.id)
        if (badgeIndex !== -1) {
          newData.phases[phaseIndex].badges[badgeIndex] = { ...newData.phases[phaseIndex].badges[badgeIndex], ...formData }
        }
      }
    } else if (editingType === 'trophy') {
      if (editing.parentId) {
        // Troféu dentro de uma fase
        const phaseIndex = newData.phases.findIndex(p => p.id === editing.parentId)
        if (phaseIndex !== -1) {
          const trophyIndex = newData.phases[phaseIndex].trophies.findIndex(t => t.name === editing.id)
          if (trophyIndex !== -1) {
            newData.phases[phaseIndex].trophies[trophyIndex] = { ...newData.phases[phaseIndex].trophies[trophyIndex], ...formData }
          }
        }
      } else {
        // Troféu global
        const trophyIndex = newData.allTrophies.findIndex(t => t.id === editing.id)
        if (trophyIndex !== -1) {
          newData.allTrophies[trophyIndex] = { ...newData.allTrophies[trophyIndex], ...formData }
        }
      }
    } else if (editingType === 'activity') {
      const phaseIndex = newData.phases.findIndex(p => p.id === editing.parentId)
      if (phaseIndex !== -1) {
        newData.phases[phaseIndex].activities[editing.id] = formData.text
      }
    }
    
    setData(newData)
    // Salva automaticamente após cada edição
    saveGamificationData(newData)
    handleCancel()
  }

  const handleDelete = (item, type, parentId = null) => {
    if (!confirm(`Tem certeza que deseja excluir este ${type}?`)) return
    
    const newData = { ...data }
    
    if (type === 'phase') {
      newData.phases = newData.phases.filter(p => p.id !== item.id)
    } else if (type === 'badge') {
      const phaseIndex = newData.phases.findIndex(p => p.id === parentId)
      if (phaseIndex !== -1) {
        newData.phases[phaseIndex].badges = newData.phases[phaseIndex].badges.filter(b => b.id !== item.id)
      }
    } else if (type === 'trophy') {
      if (parentId) {
        const phaseIndex = newData.phases.findIndex(p => p.id === parentId)
        if (phaseIndex !== -1) {
          newData.phases[phaseIndex].trophies = newData.phases[phaseIndex].trophies.filter(t => t.name !== item.name)
        }
      } else {
        newData.allTrophies = newData.allTrophies.filter(t => t.id !== item.id)
      }
    } else if (type === 'activity') {
      const phaseIndex = newData.phases.findIndex(p => p.id === parentId)
      if (phaseIndex !== -1) {
        // item pode ser um índice numérico
        const indexToDelete = typeof item === 'number' ? item : item.id
        newData.phases[phaseIndex].activities = newData.phases[phaseIndex].activities.filter((_, i) => i !== indexToDelete)
      }
    }
    
    setData(newData)
    // Salva automaticamente após cada exclusão
    saveGamificationData(newData)
  }

  const handleAdd = (type, parentId = null) => {
    if (type === 'badge') {
      const phaseIndex = data.phases.findIndex(p => p.id === parentId)
      if (phaseIndex !== -1) {
        const newBadge = {
          id: Date.now(),
          name: "Novo Badge",
          icon: "Award",
          description: "Descrição do badge"
        }
        const newData = { ...data }
        newData.phases[phaseIndex].badges.push(newBadge)
        setData(newData)
        saveGamificationData(newData)
        handleEdit(newBadge, 'badge', parentId)
      }
    } else if (type === 'activity') {
      const phaseIndex = data.phases.findIndex(p => p.id === parentId)
      if (phaseIndex !== -1) {
        const newData = { ...data }
        newData.phases[phaseIndex].activities.push("Nova atividade")
        setData(newData)
        saveGamificationData(newData)
        handleEdit({ id: newData.phases[phaseIndex].activities.length - 1, text: "Nova atividade" }, 'activity', parentId)
      }
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="admin-header">
          <h1>Painel de Administração</h1>
          <p>Gerencie fases, badges, troféus e atividades do sistema</p>
        </header>
        
        {/* Botão fixo de salvar */}
        <button className="btn-save-fixed" onClick={handleSave}>
          <Save size={18} /> Salvar Todas as Alterações
        </button>

        <div className="admin-content">
          {/* Fases */}
          <section className="admin-section">
            <h2>Fases do Programa</h2>
            {data.phases.map(phase => (
              <div key={phase.id} className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3>Fase {phase.number}: {phase.title}</h3>
                    <p>{phase.subtitle} • {phase.dateRange}</p>
                  </div>
                  <div className="admin-actions">
                    <button onClick={() => handleEdit(phase, 'phase')} className="btn-edit">
                      <Edit2 size={16} /> Editar
                    </button>
                  </div>
                </div>

                {editing && editing.id === phase.id && editingType === 'phase' ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Título da fase"
                    />
                    <input
                      type="text"
                      value={formData.subtitle || ''}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="Subtítulo"
                    />
                    <input
                      type="text"
                      value={formData.dateRange || ''}
                      onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
                      placeholder="Período"
                    />
                    <textarea
                      value={formData.rewards || ''}
                      onChange={(e) => setFormData({ ...formData, rewards: e.target.value })}
                      placeholder="Recompensas"
                    />
                    <div className="form-actions">
                      <button onClick={handleSaveEdit} className="btn-save-small">Salvar</button>
                      <button onClick={handleCancel} className="btn-cancel">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="admin-subsection">
                      <div className="subsection-header">
                        <h4>Atividades</h4>
                        <button onClick={() => handleAdd('activity', phase.id)} className="btn-add-small">
                          <Plus size={14} /> Adicionar
                        </button>
                      </div>
                      <ul>
                        {phase.activities.map((activity, idx) => (
                          <li key={idx}>
                            {editing && editing.id === idx && editingType === 'activity' && editing.parentId === phase.id ? (
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
                                  <button onClick={() => handleEdit({ id: idx, text: activity }, 'activity', phase.id)} className="btn-edit-small">
                                    <Edit2 size={12} />
                                  </button>
                                  <button onClick={() => handleDelete(idx, 'activity', phase.id)} className="btn-delete-small">
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
                        <button onClick={() => handleAdd('badge', phase.id)} className="btn-add-small">
                          <Plus size={14} /> Adicionar
                        </button>
                      </div>
                      <div className="badges-list">
                        {phase.badges.map(badge => (
                          <div key={badge.id} className="badge-item">
                            {editing && editing.id === badge.id && editingType === 'badge' && editing.parentId === phase.id ? (
                              <div className="edit-form">
                                <input
                                  type="text"
                                  value={formData.name || ''}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  placeholder="Nome do badge"
                                />
                                <input
                                  type="text"
                                  value={formData.icon || ''}
                                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                  placeholder="Ícone (nome do componente Lucide)"
                                />
                                <textarea
                                  value={formData.description || ''}
                                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                  placeholder="Descrição"
                                />
                                <div className="form-actions">
                                  <button onClick={handleSaveEdit} className="btn-save-small">Salvar</button>
                                  <button onClick={handleCancel} className="btn-cancel">Cancelar</button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <strong>{badge.name}</strong>
                                  <p>{badge.description}</p>
                                  <small>Ícone: {badge.icon}</small>
                                </div>
                                <div className="item-actions">
                                  <button onClick={() => handleEdit(badge, 'badge', phase.id)} className="btn-edit-small">
                                    <Edit2 size={12} />
                                  </button>
                                  <button onClick={() => handleDelete(badge, 'badge', phase.id)} className="btn-delete-small">
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
                      <h4>Troféus</h4>
                      <div className="trophies-list">
                        {phase.trophies.map((trophy, idx) => (
                          <div key={idx} className="trophy-item">
                            {editing && editing.id === trophy.name && editingType === 'trophy' && editing.parentId === phase.id ? (
                              <div className="edit-form">
                                <input
                                  type="text"
                                  value={formData.name || ''}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  placeholder="Nome do troféu"
                                />
                                <input
                                  type="text"
                                  value={formData.criteria || ''}
                                  onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                                  placeholder="Critérios"
                                />
                                <div className="form-actions">
                                  <button onClick={handleSaveEdit} className="btn-save-small">Salvar</button>
                                  <button onClick={handleCancel} className="btn-cancel">Cancelar</button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <strong>{trophy.name}</strong>
                                  <p>{trophy.criteria}</p>
                                </div>
                                <div className="item-actions">
                                  <button onClick={() => handleEdit(trophy, 'trophy', phase.id)} className="btn-edit-small">
                                    <Edit2 size={12} />
                                  </button>
                                  <button onClick={() => handleDelete(trophy, 'trophy', phase.id)} className="btn-delete-small">
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

          {/* Troféus Globais */}
          <section className="admin-section">
            <h2>Troféus Escolares (Globais)</h2>
            {data.allTrophies.map(trophy => (
              <div key={trophy.id} className="admin-card">
                {editing && editing.id === trophy.id && editingType === 'trophy' && !editing.parentId ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nome do troféu"
                    />
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descrição"
                    />
                    <input
                      type="text"
                      value={formData.criteria || ''}
                      onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                      placeholder="Critérios"
                    />
                    <div className="form-actions">
                      <button onClick={handleSaveEdit} className="btn-save-small">Salvar</button>
                      <button onClick={handleCancel} className="btn-cancel">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="admin-card-header">
                      <div>
                        <h3>{trophy.name}</h3>
                        <p>{trophy.description}</p>
                        <small>Critérios: {trophy.criteria}</small>
                      </div>
                      <div className="admin-actions">
                        <button onClick={() => handleEdit(trophy, 'trophy')} className="btn-edit">
                          <Edit2 size={16} /> Editar
                        </button>
                        <button onClick={() => handleDelete(trophy, 'trophy')} className="btn-delete">
                          <Trash2 size={16} /> Excluir
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
