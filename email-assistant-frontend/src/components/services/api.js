const API_BASE_URL = 'http://127.0.0.1:8000/';
import { LENGTHS } from '../utils/constants';

// Email Generation
export const generateEmail = async (prompt, tone, length) => {
    const tokenLimit = LENGTHS[length].tokens;
    
    try {
      const response = await fetch(`${API_BASE_URL}/generate-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          tone,
          response_length: length,
          max_tokens: tokenLimit
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate email');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Email generation failed: ${error.message}`);
    }
  };
  
  // Custom Instructions
  export const getCustomInstructions = async () => {
    try {
      const instructions = await chrome.storage.local.get('customInstructions');
      return instructions.customInstructions || [];
    } catch (error) {
      throw new Error(`Failed to get custom instructions: ${error.message}`);
    }
  };
  
  export const saveCustomInstruction = async (instruction) => {
    try {
      const instructions = await getCustomInstructions();
      instructions.push(instruction);
      await chrome.storage.local.set({ customInstructions: instructions });
      return instructions;
    } catch (error) {
      throw new Error(`Failed to save custom instruction: ${error.message}`);
    }
  };
  
  export const deleteCustomInstruction = async (instructionId) => {
    try {
      const instructions = await getCustomInstructions();
      const updatedInstructions = instructions.filter(i => i.id !== instructionId);
      await chrome.storage.local.set({ customInstructions: updatedInstructions });
      return updatedInstructions;
    } catch (error) {
      throw new Error(`Failed to delete custom instruction: ${error.message}`);
    }
  };

  // Settings Storage
export const getSettings = async () => {
    try {
      const settings = await chrome.storage.local.get(['tone', 'responseLength']);
      return {
        tone: settings.tone || "😊 Friendly",
        responseLength: settings.responseLength || "MEDIUM"
      };
    } catch (error) {
      throw new Error(`Failed to get settings: ${error.message}`);
    }
  };
  
  export const saveSettings = async (tone, responseLength) => {
    try {
      await chrome.storage.local.set({
        tone,
        responseLength
      });
    } catch (error) {
      throw new Error(`Failed to save settings: ${error.message}`);
    }
  };