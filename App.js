import React, { useState } from 'react';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';

function App() {
  const [view, setView] = useState('list');
  const [selectedBook, setSelectedBook] = useState(null);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setView('form');
  };

  const handleAdd = () => {
    setSelectedBook(null);
    setView('form');
  };

  const handleSave = () => {
    setSelectedBook(null);
    setView('list');
  };

  const handleCancel = () => {
    setSelectedBook(null);
    setView('list');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{
        background: '#1a252f',
        color: 'white',
        padding: '15px 30px',
        fontSize: '22px',
        fontWeight: 'bold'
      }}>
        📚 Library Management Systems 
      </div>

      {view === 'list' ? (
        <BookList onEdit={handleEdit} onAdd={handleAdd} />
      ) : (
        <BookForm book={selectedBook} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default App;
