import React, { useState, useEffect } from 'react';
import { TONES } from '../utils/constants';
import CustomInstructions from './CustomInstructions';
import { getSettings, saveSettings } from '../services/api';

const Settings = () => {
  const [tone, setTone] = useState(null);
  const [length, setLength] = useState("MEDIUM");
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings();
      setTone(settings.tone);
      setLength(settings.responseLength);
    };
    loadSettings();
  }, []);

  const handleToneChange = async (newTone) => {
    setTone(newTone);
    await saveSettings(newTone, length);
  };

  const handleLengthChange = async (newLength) => {
    setLength(newLength);
    await saveSettings(tone, newLength);
  };

  if (!tone) return null;

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      
      <div className="settings-group">
        <h3>Basic</h3>
        
        <div className="setting-item">
          <label>Default email writing tone:</label>
          <select 
            value={tone} 
            onChange={(e) => handleToneChange(e.target.value)}
          >
            {TONES.map(t => (
              <option key={t.value} value={t.value}>{t.value}</option>
            ))}
          </select>
        </div>

        <div className="setting-item">
          <label>Response length:</label>
          <div className="length-slider">
            <input 
              type="range" 
              min="0" 
              max="2" 
              value={length === "SHORT" ? 0 : length === "MEDIUM" ? 1 : 2}
              onChange={(e) => {
                const value = e.target.value;
                const newLength = value === "0" ? "SHORT" : value === "1" ? "MEDIUM" : "LONG";
                handleLengthChange(newLength);
              }}
            />
            <div className="length-labels">
              <span>Short</span>
              <span>Medium</span>
              <span>Long</span>
            </div>
          </div>
        </div>

        <div className="setting-item">
          <button 
            className="custom-instructions-btn"
            onClick={() => setShowInstructions(true)}
          >
            Open custom instructions
          </button>
        </div>
      </div>

      {showInstructions && (
        <div className="modal-overlay">
        <CustomInstructions onClose={() => setShowInstructions(false)} />
            </div>
      )}
    </div>
  );
};

export default Settings;