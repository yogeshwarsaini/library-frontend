import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const BookList = ({ onEdit, onAdd }) => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/books`);
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const deleteBook = async (id) => {
    if (window.confirm('Delete karna hai?')) {
      await axios.delete(`${API_BASE_URL}/api/books/${id}`);
      setMessage('Book delete ho gayi!');
      fetchBooks();
    }
  };

  return (
    <div style={styles.container}>
      {message && <div style={styles.alert}>{message}</div>}

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{books.length}</div>
          <div style={styles.statLabel}>Total Books</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>📚</div>
          <div style={styles.statLabel}>Library</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>✅</div>
          <div style={styles.statLabel}>Available</div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>All Books</h2>
          <button style={styles.btnPrimary} onClick={onAdd}>
            + Add Book
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              {['#','Title','Author','Genre','ISBN','Year','Qty','Status','Actions']
                .map(h => <th key={h} style={styles.th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="9" style={styles.empty}>
                  Koi book nahi hai — Add karo!
                </td>
              </tr>
            ) : (
              books.map(book => (
                <tr key={book.id} style={styles.tr}>
                  <td style={styles.td}>{book.id}</td>
                  <td style={styles.td}>{book.title}</td>
                  <td style={styles.td}>{book.author}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{book.genre}</span>
                  </td>
                  <td style={styles.td}>{book.isbn}</td>
                  <td style={styles.td}>{book.year}</td>
                  <td style={styles.td}>{book.quantity}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background: book.status === 'Available' ? '#d5f5e3' : '#fdebd0',
                      color: book.status === 'Available' ? '#1e8449' : '#d35400'
                    }}>
                      {book.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.btnWarning} onClick={() => onEdit(book)}>
                      Edit
                    </button>
                    <button style={styles.btnDanger} onClick={() => deleteBook(book.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1100px', margin: '30px auto', padding: '0 20px' },
  alert: { background: '#d5f5e3', color: '#1e8449', padding: '12px 20px', borderRadius: '6px', marginBottom: '20px' },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' },
  statCard: { background: 'white', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  statNumber: { fontSize: '36px', fontWeight: 'bold', color: '#8e44ad' },
  statLabel: { color: '#7f8c8d', marginTop: '5px' },
  card: { background: 'white', borderRadius: '10px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  cardTitle: { color: '#1a252f' },
  btnPrimary: { padding: '10px 20px', background: '#8e44ad', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  btnWarning: { padding: '6px 12px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' },
  btnDanger: { padding: '6px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { background: '#1a252f', color: 'white', padding: '12px 15px', textAlign: 'left' },
  td: { padding: '12px 15px', borderBottom: '1px solid #eee' },
  tr: { cursor: 'default' },
  badge: { padding: '4px 10px', borderRadius: '20px', fontSize: '12px', background: '#e8daef', color: '#6c3483' },
  empty: { textAlign: 'center', padding: '30px', color: '#7f8c8d' }
};

export default BookList;
