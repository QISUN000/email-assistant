import React from 'react';
import { TONES } from '../utils/constants';
import { useEmailStates } from './hooks/useEmailStates';

const AIInput = () => {
  const {
    isHovering,
    setIsHovering,
    isLoading,
    emailResult,
    prompt,
    setPrompt,
    selectedTone,
    setSelectedTone,
    handleGenerateEmail,
    handleInsertEmail,
    handleRephrase
  } = useEmailStates();

  // State 1: Default - AI icon
  if (!isHovering && !isLoading && !emailResult) {
    return (
      <div 
        className="ai-icon"
        onMouseEnter={() => setIsHovering(true)}
      >
        <span>Write emails without a trace of AI</span>
      </div>
    );
  }

  // State 2: Hover - Show prompt input
  if (isHovering && !isLoading && !emailResult) {
    return (
      <div 
        className="prompt-container"
        onMouseLeave={() => setIsHovering(false)}
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Purpose, audience and context..."
          className="prompt-input"
        />
        <select
          value={selectedTone}
          onChange={(e) => setSelectedTone(e.target.value)}
          className="tone-select"
        >
          {TONES.map(tone => (
            <option key={tone.value} value={tone.value}>
              {tone.value}
            </option>
          ))}
        </select>
        <button 
          onClick={handleGenerateEmail}
          className="write-button"
        >
          Write
        </button>
      </div>
    );
  }

  // State 3: Loading
  if (isLoading) {
    return (
      <div className="loading-container">
        <span>Writing...</span>
      </div>
    );
  }

  // State 4: Result
  return (
    <div className="result-container">
      <div className="email-content">
        {emailResult}
      </div>
      <div className="action-buttons">
        <button 
          onClick={handleInsertEmail}
          className="insert-button"
        >
          Insert
        </button>
        <button 
          onClick={handleRephrase}
          className="rephrase-button"
        >
          Rephrase
        </button>
      </div>
    </div>
  );
};

export default AIInput;