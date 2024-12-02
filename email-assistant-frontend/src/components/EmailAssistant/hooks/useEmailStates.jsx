import { useState } from 'react';
import { generateEmail } from '../../services/api';

export const useEmailStates = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailResult, setEmailResult] = useState('');
  const [prompt, setPrompt] = useState('');
  const [selectedTone, setSelectedTone] = useState('😊 Friendly');
  const [responseLength, setResponseLength] = useState('MEDIUM');

  const handleGenerateEmail = async () => {
    setIsLoading(true);
    try {
      const response = await generateEmail(prompt, selectedTone, responseLength);
      if (response.success) {
        setEmailResult(response.email);
      }
    } catch (error) {
      console.error('Email generation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInsertEmail = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.tabs.sendMessage(tab.id, {
        action: "insertEmail",
        email: emailResult
      });
    } catch (error) {
      console.error('Failed to insert email:', error);
    }
  };

  const handleRephrase = () => {
    setEmailResult('');
    handleGenerateEmail();
  };

  return {
    isHovering,
    setIsHovering,
    isLoading,
    emailResult,
    prompt,
    setPrompt,
    selectedTone,
    setSelectedTone,
    responseLength,
    setResponseLength,
    handleGenerateEmail,
    handleInsertEmail,
    handleRephrase
  };
};