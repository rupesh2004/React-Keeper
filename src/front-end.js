import React, { useState } from 'react'; // Import React and useState
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import Font Awesome icons

// Sample notes
const initialNotes = [
  { id: 1, title: 'Complete React Tutorial', content: 'Finish the React JS tutorial by end of the day.' },
  { id: 2, title: 'Grocery Shopping', content: 'Buy vegetables, fruits, and other groceries for the week.' },
  { id: 3, title: 'Meeting with Project Team', content: 'Discuss project progress and next steps in the meeting at 3 PM.' },
  { id: 4, title: 'Workout Session', content: 'Complete a 30-minute cardio workout at the gym.' },
];

// Navbar Component
const Navbar = () => {
  return (
    <div>
      <div className="container">
        <p className="heading">Keeper</p>
      </div>
    </div>
  );
};

// UserInput Component
const UserInput = ({ addNote, currentNote, updateNote, isEditing }) => { 
  const [title, setTitle] = useState(currentNote ? currentNote.title : ''); // State for title
  const [content, setContent] = useState(currentNote ? currentNote.content : ''); // State for content

  const handleAddOrUpdate = (event) => {
    event.preventDefault();
    const note = {
      id: currentNote ? currentNote.id : Date.now(), // Use currentNote ID or generate a new one
      title,
      content,
    };

    if (isEditing) {
      updateNote(note); // Call the updateNote function passed from parent
    } else {
      addNote(note); // Call the addNote function passed from parent
    }

    setTitle(''); // Clear the input fields after submission
    setContent('');
  };

  React.useEffect(() => {
    if (isEditing && currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    }
  }, [isEditing, currentNote]);

  return (
    <div className="input-container"> 
      <h2>{isEditing ? 'Edit Note' : 'Add a New Note'}</h2>
      <div className="input-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter Content"
        ></textarea>
        <button className='edit-button' onClick={handleAddOrUpdate}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>
    </div>
  );  
};

// Footer Component
const Footer = () => {
  return (
    <div className="footer">
      <p className="footer-text">Copyright ⓒ 2024</p>
    </div>
  );
};

// MapDataToCard Component
const MapDataToCard = ({ notes, deleteNote, setCurrentNote, setIsEditing }) => { // Accept deleteNote, setCurrentNote, and setIsEditing as props
  return (
    <div className="cards-container">
      {notes.map(note => (
        <NoteCard 
          key={note.id} 
          title={note.title} 
          content={note.content} 
          deleteNote={deleteNote} 
          setCurrentNote={setCurrentNote} 
          setIsEditing={setIsEditing} 
          note={note} 
        />
      ))}
    </div>
  );
};

// NoteCard Component
const NoteCard = ({ title, content, deleteNote, setCurrentNote, setIsEditing, note }) => {
  return (
    <div className="cards">
      <p className="note-title">{title}</p>
      <p className="note-content">{content}</p>
      <div className="action-buttons">
        <button 
          className="edit-button" 
          onClick={() => { 
            setCurrentNote(note); 
            setIsEditing(true); 
          }}
        >
          <FaEdit />
        </button>
        <button className="delete-button" onClick={() => deleteNote(note.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [notes, setNotes] = useState(initialNotes); // State for notes, initialized with the sample data
  const [currentNote, setCurrentNote] = useState(null); // State for the current note being edited
  const [isEditing, setIsEditing] = useState(false); // State to check if we are in editing mode

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]); // Add the new note to the existing notes
  };

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) => 
      prevNotes.map(note => 
        note.id === updatedNote.id ? updatedNote : note
      )
    ); // Update the existing note
    setCurrentNote(null);
    setIsEditing(false);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== id)); // Remove the note with the given ID
  };

  return (
    <div>
      <Navbar />
      <UserInput 
        addNote={addNote} 
        currentNote={currentNote} 
        updateNote={updateNote} 
        isEditing={isEditing} 
      /> {/* Pass addNote, currentNote, updateNote, and isEditing to UserInput */}
      <MapDataToCard 
        notes={notes} 
        deleteNote={deleteNote} 
        setCurrentNote={setCurrentNote} 
        setIsEditing={setIsEditing} 
      /> {/* Pass notes, deleteNote, setCurrentNote, and setIsEditing to MapDataToCard */}
      <Footer />
    </div>
  );
};

export { App }; // Export the App component
