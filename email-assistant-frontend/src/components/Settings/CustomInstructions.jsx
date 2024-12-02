import React, { useState } from 'react';

const CustomInstructions = ({ onClose }) => {
  const [instructions, setInstructions] = useState([
    { id: 1, text: "Be concise and straight to the point", checked: false },
    { id: 2, text: "Do not add an email signature", checked: false },
    { id: 3, text: "Make my emails less formal", checked: false }
  ]);
  
  const [newInstruction, setNewInstruction] = useState('');

  const handleCheckboxChange = (id) => {
    setInstructions(instructions.map(instruction => 
      instruction.id === id 
        ? { ...instruction, checked: !instruction.checked }
        : instruction
    ));
  };

  const handleDelete = (id) => {
    setInstructions(instructions.filter(instruction => instruction.id !== id));
  };

  const handleAdd = () => {
    if (!newInstruction.trim()) return;
    
    setInstructions([
      ...instructions,
      {
        id: Date.now(),
        text: newInstruction,
        checked: true
      }
    ]);
    setNewInstruction('');
  };

  return (
    <div className="custom-instructions-popup">
      <div className="popup-header">
        <h3>Custom instructions</h3>
        <button onClick={onClose}>×</button>
      </div>
      
      <p>Personalize your generated emails by giving it custom instructions. Addy will try to remember these instructions when generating email content.</p>

      <div className="instructions-list">
        {instructions.map(instruction => (
          <div key={instruction.id} className="instruction-item">
            <input
              type="checkbox"
              checked={instruction.checked}
              onChange={() => handleCheckboxChange(instruction.id)}
            />
            <span>{instruction.text}</span>
            <button onClick={() => handleDelete(instruction.id)}>🗑️</button>
          </div>
        ))}
      </div>

      <div className="add-instruction">
        <input
          type="text"
          value={newInstruction}
          onChange={(e) => setNewInstruction(e.target.value)}
          placeholder="try 'make my emails less formal'"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <p className="note">To stop applying a custom instruction to specific emails, uncheck it</p>
    </div>
  );
};

export default CustomInstructions;