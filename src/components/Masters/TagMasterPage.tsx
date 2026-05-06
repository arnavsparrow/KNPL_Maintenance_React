import React, { useState, useMemo } from 'react';
import { initialMqttTags } from '../../data';
import type { MqttTag } from '../../types';

const EMPTY_FORM: Omit<MqttTag, 'id'> = {
  tagId: '',
  topicName: '',
  description: '',
};

function nextId(tags: MqttTag[]): string {
  const nums = tags.map(t => parseInt(t.id.replace('T-', ''), 10)).filter(n => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return `T-${String(max + 1).padStart(3, '0')}`;
}

const TagMasterPage: React.FC = () => {
  const [tags, setTags] = useState<MqttTag[]>(initialMqttTags);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<MqttTag, 'id'>>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<MqttTag, 'id'>, string>>>({});
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return tags;
    return tags.filter(t =>
      t.tagId.toLowerCase().includes(q) ||
      t.topicName.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  }, [tags, search]);

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(t: MqttTag) {
    setEditingId(t.id);
    setForm({ tagId: t.tagId, topicName: t.topicName, description: t.description });
    setErrors({});
    setModalOpen(true);
  }

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.tagId.trim()) e.tagId = 'Tag ID is required';
    if (!form.topicName.trim()) e.topicName = 'Topic Name is required';
    const isDuplicate = tags.some(t => t.tagId === form.tagId.trim() && t.id !== editingId);
    if (isDuplicate) e.tagId = 'Tag ID already exists';
    const isDupTopic = tags.some(t => t.topicName === form.topicName.trim() && t.id !== editingId);
    if (isDupTopic) e.topicName = 'Topic Name already exists';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    if (editingId) {
      setTags(prev => prev.map(t => t.id === editingId ? { ...t, ...form } : t));
    } else {
      setTags(prev => [...prev, { id: nextId(prev), ...form }]);
    }
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    setTags(prev => prev.filter(t => t.id !== id));
    setDeleteConfirmId(null);
  }

  return (
    <div className="fullpage active">
      <div className="master-header">
        <div className="master-title-wrap">
          <div className="master-title">📡 MQTT Tag Master</div>
          <div className="master-sub">Manage MQTT tags — topic names used for real-time sensor data ingestion</div>
        </div>
        <div className="master-actions">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Search tags…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={openAdd}>+ Add Tag</button>
        </div>
      </div>

      <div className="master-body">
        <div className="master-count">
          Showing {filtered.length} of {tags.length} tags
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Tag ID</th>
                <th>MQTT Topic Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <div className="empty-state">No tags match your search.</div>
                  </td>
                </tr>
              )}
              {filtered.map((tag, idx) => (
                <tr key={tag.id}>
                  <td className="text-mono" style={{ color: '#94A3B8' }}>{idx + 1}</td>
                  <td>
                    <span className="master-tag-id">{tag.tagId}</span>
                  </td>
                  <td>
                    <span className="master-topic">{tag.topicName}</span>
                  </td>
                  <td style={{ color: '#475569' }}>{tag.description || <span style={{ color: '#CBD5E1' }}>—</span>}</td>
                  <td>
                    <div className="action-btns">
                      <button className="action-btn view-btn" onClick={() => openEdit(tag)}>✏ Edit</button>
                      <button className="action-btn" style={{ color: '#EF4444', borderColor: '#FECACA' }}
                        onClick={() => setDeleteConfirmId(tag.id)}>🗑 Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <div className={`modal-overlay${modalOpen ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
        <div className="modal" style={{ width: 560 }}>
          <div className="modal-header">
            <div>
              <div className="modal-title">{editingId ? '✏ Edit MQTT Tag' : '+ Add MQTT Tag'}</div>
              <div className="modal-subtitle">Fill in the tag details below</div>
            </div>
            <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
          </div>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Tag ID <span className="required">*</span></label>
                <input
                  className={`form-control${errors.tagId ? ' form-control-error' : ''}`}
                  placeholder="e.g. EXT01_CURR"
                  value={form.tagId}
                  onChange={e => setForm(f => ({ ...f, tagId: e.target.value }))}
                />
                {errors.tagId && <span className="form-error">{errors.tagId}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">MQTT Topic Name <span className="required">*</span></label>
                <input
                  className={`form-control${errors.topicName ? ' form-control-error' : ''}`}
                  placeholder="e.g. knpl/ext01/motor_current"
                  value={form.topicName}
                  onChange={e => setForm(f => ({ ...f, topicName: e.target.value }))}
                />
                {errors.topicName && <span className="form-error">{errors.topicName}</span>}
                <span className="form-hint">Use forward-slash path format, e.g. plant/equipment/sensor</span>
              </div>
              <div className="form-group">
                <label className="form-label">Description <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional)</span></label>
                <input
                  className="form-control"
                  placeholder="e.g. Extruder 1 – Motor Current (A)"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>
              {editingId ? 'Save Changes' : 'Add Tag'}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirm */}
      <div className={`modal-overlay${deleteConfirmId ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) setDeleteConfirmId(null); }}>
        <div className="modal" style={{ width: 420 }}>
          <div className="modal-header">
            <div className="modal-title">Delete MQTT Tag</div>
            <button className="modal-close" onClick={() => setDeleteConfirmId(null)}>×</button>
          </div>
          <div className="modal-body">
            <div className="escalation-alert" style={{ marginBottom: 0 }}>
              <span className="escalation-alert-icon">⚠️</span>
              <div className="escalation-alert-text">
                <strong>This cannot be undone</strong>
                <p>Deleting this tag will permanently remove it from the master list.</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline" onClick={() => setDeleteConfirmId(null)}>Cancel</button>
            <button className="btn btn-danger" onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}>Delete Tag</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagMasterPage;
