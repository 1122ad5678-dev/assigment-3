import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Paper, TextField, MenuItem, Button, Typography } from '@mui/material';
import { FiSave, FiX } from 'react-icons/fi';
import materialService from '../../services/materialService';

export default function AddMaterial() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Lecture');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    materialService.add({ 
      title: title.trim(), 
      type, 
      description: description.trim(), 
      url: url.trim() 
    });
    navigate('/materials');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
        Add Material
      </Typography>

      <Paper sx={{ p: 4, boxShadow: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            placeholder="E.g. Introduction to Algebra"
            variant="outlined"
          />

          <TextField
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            select
            fullWidth
            variant="outlined"
          >
            <MenuItem value="Lecture">Lecture</MenuItem>
            <MenuItem value="Home Material">Home Material</MenuItem>
            <MenuItem value="Assignment">Assignment</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            placeholder="Short description or notes..."
            variant="outlined"
          />

          <TextField
            label="File / Link (optional)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            placeholder="https://... or file link"
            variant="outlined"
          />

          <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<FiSave />}
              disabled={!title.trim()}
              fullWidth
            >
              Save
            </Button>
            <Link to="/materials" style={{ textDecoration: 'none', flex: 1 }}>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<FiX />}
                fullWidth
              >
                Cancel
              </Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
