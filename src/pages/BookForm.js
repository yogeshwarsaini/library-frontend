import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const BookForm = ({ book, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '', author: '', genre: '',
    isbn: '', year: '', quantity: '', status: 'Available'
  });

  useEffect(() => {
    if (book) setFormData(book);
  }, [book]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`${API_BASE_URL}/api/books/${formData.id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/books`, formData);
      }
      onSave();
    } catch (err) {
      console.error('Error saving book:', err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {formData.id ? 'Edit Book' : 'Add New Book'}
        </h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Title', name: 'title', type: 'text' },
            { label: 'Author', name: 'author', type: 'text' },
            { label: 'ISBN', name: 'isbn', type: 'text' },
            { label: 'Year', name: 'year', type: 'number' },
            { label: 'Quantity', name: 'quantity', type: 'number' },
          ].map(field => (
            <div key={field.name} style={styles.formGroup}>
              <label style={styles.label}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          ))}

          <div style={styles.formGroup}>
            <label style={styles.label}>Genre</label>
            <select name="genre" value={formData.genre} onChange={handleChange} style={styles.input}>
              <option value="">-- Select Genre --</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Technology">Technology</option>
              <option value="Biography">Biography</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} style={styles.input}>
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <button type="submit" style={styles.btnPrimary}>
            💾 Save Book
          </button>
          <button type="button" style={styles.btnSecondary} onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '600px', margin: '40px auto', padding: '0 20px' },
  card: { background: 'white', borderRadius: '10px', padding: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  title: { color: '#1a252f', marginBottom: '25px' },
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', color: '#555', fontWeight: 'bold' },
  input: { width: '100%', padding: '10px 15px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' },
  btnPrimary: { padding: '12px 25px', background: '#8e44ad', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px' },
  btnSecondary: { padding: '12px 25px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', marginLeft: '10px' },
};

export default BookForm;
