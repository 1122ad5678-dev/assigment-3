import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardActions, Button, Chip, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import { FiPlus, FiExternalLink, FiCopy, FiTrash2 } from 'react-icons/fi';
import materialService from '../../services/materialService';

function Truncate({ text, max = 120 }) {
  if (!text) return null;
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}

const typeColors = {
  'Lecture': 'primary',
  'Home Material': 'success',
  'Assignment': 'warning',
  'Other': 'default'
};

export default function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    setMaterials(materialService.getAll());
  }, []);

  const handleDelete = () => {
    if (deleteId) {
      materialService.remove(deleteId);
      setMaterials(materialService.getAll());
      setDeleteId(null);
    }
  };

  const handleCopyLink = (url) => {
    if (url) navigator.clipboard?.writeText(url);
  };

  return (
    <div className="container-lg py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Materials</h2>
        <Link to="/materials/add" className="btn btn-primary d-inline-flex align-items-center">
          <FiPlus className="me-2" /> Add Material
        </Link>
      </div>

      {materials.length === 0 ? (
        <p className="text-muted">No materials yet. Add lectures, home material, assignments, etc.</p>
      ) : (
        <div className="row g-3">
          {materials.map((m) => (
            <div className="col-12 col-sm-6 col-md-4" key={m.id}>
              <div className="card card-sb h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{m.title}</h5>
                    <span className={`badge bg-${m.type === 'Lecture' ? 'primary' : m.type === 'Home Material' ? 'success' : m.type === 'Assignment' ? 'warning text-dark' : 'secondary'}`}>{m.type}</span>
                  </div>
                  <p className="card-text text-muted mb-3">{m.description?.slice(0, 120)}{m.description && m.description.length > 120 ? '…' : ''}</p>

                  <div className="mt-auto d-flex gap-2">
                    {m.url && (
                      <a className="btn btn-sm btn-outline-primary d-inline-flex align-items-center" href={m.url} target="_blank" rel="noreferrer"><FiExternalLink className="me-1" /> Open</a>
                    )}
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleCopyLink(m.url)}><FiCopy className="me-1" /> Copy</button>
                    <button type="button" className="btn btn-sm btn-danger ms-auto" onClick={() => setDeleteId(m.id)}><FiTrash2 className="me-1" /> Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation dialog - keep MUI Dialog for convenience */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Material?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this material? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="inherit">Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
