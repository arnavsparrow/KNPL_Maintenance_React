import React, { useState, useMemo } from 'react';
import { initialAssets } from '../../data';
import type { Asset } from '../../types';

const EMPTY_FORM: Omit<Asset, 'id'> = {
  sapCode: '',
  description: '',
  functionLocation: '',
  parentId: null,
};

function nextId(assets: Asset[]): string {
  const nums = assets.map(a => parseInt(a.id.replace('A-', ''), 10)).filter(n => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return `A-${String(max + 1).padStart(3, '0')}`;
}

const AssetMasterPage: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Asset, 'id'>>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Asset, 'id'>, string>>>({});
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const parentMap = useMemo(() => {
    const m: Record<string, Asset> = {};
    assets.forEach(a => { m[a.id] = a; });
    return m;
  }, [assets]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return assets;
    return assets.filter(a =>
      a.sapCode.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.functionLocation.toLowerCase().includes(q) ||
      (a.parentId && parentMap[a.parentId]?.description.toLowerCase().includes(q))
    );
  }, [assets, search, parentMap]);

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(a: Asset) {
    setEditingId(a.id);
    setForm({ sapCode: a.sapCode, description: a.description, functionLocation: a.functionLocation, parentId: a.parentId });
    setErrors({});
    setModalOpen(true);
  }

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.sapCode.trim()) e.sapCode = 'SAP Code is required';
    if (!form.description.trim()) e.description = 'Asset Description is required';
    if (!form.functionLocation.trim()) e.functionLocation = 'Function Location is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    if (editingId) {
      setAssets(prev => prev.map(a => a.id === editingId ? { ...a, ...form } : a));
    } else {
      setAssets(prev => [...prev, { id: nextId(prev), ...form }]);
    }
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    setAssets(prev => prev
      .filter(a => a.id !== id)
      .map(a => a.parentId === id ? { ...a, parentId: null } : a)
    );
    setDeleteConfirmId(null);
  }

  const parentOptions = assets.filter(a => a.id !== editingId);

  const depth = (id: string, map: Record<string, Asset>): number => {
    let d = 0;
    let cur: Asset | undefined = map[id];
    while (cur?.parentId) { d++; cur = map[cur.parentId]; if (d > 10) break; }
    return d;
  };

  return (
    <div className="fullpage active">
      <div className="master-header">
        <div className="master-title-wrap">
          <div className="master-title">🏗 Asset Master</div>
          <div className="master-sub">Manage plant assets with SAP codes and functional hierarchy</div>
        </div>
        <div className="master-actions">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Search assets…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={openAdd}>+ Add Asset</button>
        </div>
      </div>

      <div className="master-body">
        <div className="master-count">
          Showing {filtered.length} of {assets.length} assets
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>SAP Code</th>
                <th>Asset Description</th>
                <th>Function Location</th>
                <th>Parent Asset</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">No assets match your search.</div>
                  </td>
                </tr>
              )}
              {filtered.map((asset, idx) => {
                const parent = asset.parentId ? parentMap[asset.parentId] : null;
                const d = depth(asset.id, parentMap);
                return (
                  <tr key={asset.id}>
                    <td className="text-mono" style={{ color: '#94A3B8' }}>{idx + 1}</td>
                    <td>
                      <span className="master-sap-code">{asset.sapCode}</span>
                    </td>
                    <td>
                      <span style={{ paddingLeft: d * 14 }}>
                        {d > 0 && <span style={{ color: '#CBD5E1', marginRight: 4 }}>{'└'}</span>}
                        {asset.description}
                      </span>
                    </td>
                    <td>
                      <span className="master-fl-code">{asset.functionLocation}</span>
                    </td>
                    <td>
                      {parent
                        ? <span className="master-parent-chip">{parent.sapCode} · {parent.description}</span>
                        : <span style={{ color: '#94A3B8', fontSize: 11 }}>— Root</span>
                      }
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn view-btn" onClick={() => openEdit(asset)}>✏ Edit</button>
                        <button className="action-btn" style={{ color: '#EF4444', borderColor: '#FECACA' }}
                          onClick={() => setDeleteConfirmId(asset.id)}>🗑 Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <div className={`modal-overlay${modalOpen ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
        <div className="modal" style={{ width: 560 }}>
          <div className="modal-header">
            <div>
              <div className="modal-title">{editingId ? '✏ Edit Asset' : '+ Add Asset'}</div>
              <div className="modal-subtitle">Fill in the asset details below</div>
            </div>
            <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
          </div>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">SAP Code <span className="required">*</span></label>
                <input
                  className={`form-control${errors.sapCode ? ' form-control-error' : ''}`}
                  placeholder="e.g. 10010001-EXT-01"
                  value={form.sapCode}
                  onChange={e => setForm(f => ({ ...f, sapCode: e.target.value }))}
                />
                {errors.sapCode && <span className="form-error">{errors.sapCode}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Asset Description <span className="required">*</span></label>
                <input
                  className={`form-control${errors.description ? ' form-control-error' : ''}`}
                  placeholder="e.g. Extruder 1 – Main Drive"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
                {errors.description && <span className="form-error">{errors.description}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Function Location <span className="required">*</span></label>
                <input
                  className={`form-control${errors.functionLocation ? ' form-control-error' : ''}`}
                  placeholder="e.g. FL-KNPL-PL1-E1"
                  value={form.functionLocation}
                  onChange={e => setForm(f => ({ ...f, functionLocation: e.target.value }))}
                />
                {errors.functionLocation && <span className="form-error">{errors.functionLocation}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Parent Asset <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional)</span></label>
                <select
                  className="form-control"
                  value={form.parentId ?? ''}
                  onChange={e => setForm(f => ({ ...f, parentId: e.target.value || null }))}
                >
                  <option value="">— No parent (Root asset)</option>
                  {parentOptions.map(a => (
                    <option key={a.id} value={a.id}>{a.sapCode} · {a.description}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>
              {editingId ? 'Save Changes' : 'Add Asset'}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirm */}
      <div className={`modal-overlay${deleteConfirmId ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) setDeleteConfirmId(null); }}>
        <div className="modal" style={{ width: 420 }}>
          <div className="modal-header">
            <div className="modal-title">Delete Asset</div>
            <button className="modal-close" onClick={() => setDeleteConfirmId(null)}>×</button>
          </div>
          <div className="modal-body">
            <div className="escalation-alert" style={{ marginBottom: 0 }}>
              <span className="escalation-alert-icon">⚠️</span>
              <div className="escalation-alert-text">
                <strong>This cannot be undone</strong>
                <p>
                  Deleting this asset will remove it from the hierarchy. Any child assets will become root assets.
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline" onClick={() => setDeleteConfirmId(null)}>Cancel</button>
            <button className="btn btn-danger" onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}>Delete Asset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetMasterPage;
