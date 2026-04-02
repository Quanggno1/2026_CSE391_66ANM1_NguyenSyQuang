// src/App.jsx
import React, { useState } from 'react';
import { initialClubs } from './data';
import './App.css';

const App = () => {
  // --- STATES ---
  const [clubs, setClubs] = useState(initialClubs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Form States
  const [formData, setFormData] = useState({
    name: '', president: '', email: '', phone: '', foundDate: '', type: 'Technology'
  });
  const [errorMsg, setErrorMsg] = useState('');

  // --- LOGIC LỌC DỮ LIỆU ---
  const filteredClubs = clubs.filter(club => {
    const matchType = filterType === 'All' || club.type === filterType;
    const matchSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddClub = (e) => {
    e.preventDefault();
    
    // Validate số điện thoại
    const phoneRegex = /^[\+0-9\s\-]+$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMsg("Invalid phone format (e.g., +1 555 000 000)");
      return;
    }

    const newClub = {
      id: Date.now(),
      ...formData
    };

    setClubs([newClub, ...clubs]); // Thêm lên đầu danh sách
    closeModal();
  };

  const openModal = () => setIsModalOpen(true);
  
  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMsg('');
    setFormData({ name: '', president: '', email: '', phone: '', foundDate: '', type: 'Technology' });
  };

  // --- RENDER ---
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <h1 className="logo">CLBPluse</h1>
        </div>
        <div className="nav-right">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Find a club..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#list">List</a></li>
            <li><a href="#add" onClick={(e) => { e.preventDefault(); openModal(); }}>Add club</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Banner */}
      <header className="hero-banner">
        <h2>Student clubs</h2>
      </header>

      {/* Toolbar */}
      <section className="toolbar">
        <div className="toolbar-left">
          <button className="btn-primary" onClick={openModal}>Add new</button>
        </div>
        <div className="toolbar-right">
          <span className="filter-label">Filter: </span>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="All">All types</option>
            <option value="Technology">Technology</option>
            <option value="Volunteering">Volunteering</option>
            <option value="Academic">Academic</option>
            <option value="Arts">Arts</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
      </section>

      {/* Club Grid */}
      <main className="club-grid">
        {filteredClubs.length === 0 ? (
          <p>No clubs found.</p>
        ) : (
          filteredClubs.map(club => (
            <div className="card" key={club.id}>
              <h3>{club.name}</h3>
              <p><strong>Type:</strong> {club.type || 'N/A'}</p>
              <p><strong>President:</strong> {club.president}</p>
              <p><strong>Email:</strong> {club.email}</p>
              <p><strong>Phone:</strong> {club.phone}</p>
              <p><strong>Found Date:</strong> {club.foundDate}</p>
            </div>
          ))
        )}
      </main>

      {/* Modal Add New */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>Register a new club</h2>
            
            <form onSubmit={handleAddClub}>
              <div className="form-group">
                <label>Club name <span className="required">*</span></label>
                <input type="text" name="name" placeholder="Office name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>President <span className="required">*</span></label>
                <input type="text" name="president" placeholder="Full name" value={formData.president} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Email <span className="required">*</span></label>
                <input type="email" name="email" placeholder="club@example.org" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Phone <span className="required">*</span></label>
                <input type="tel" name="phone" placeholder="+1 555 000 000" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Found date <span className="required">*</span></label>
                <input type="date" name="foundDate" value={formData.foundDate} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Club Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange}>
                  <option value="Technology">Technology</option>
                  <option value="Volunteering">Volunteering</option>
                  <option value="Academic">Academic</option>
                  <option value="Arts">Arts</option>
                  <option value="Sports">Sports</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              {errorMsg && <p className="error-msg">{errorMsg}</p>}
              
              <button type="submit" className="btn-save">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;