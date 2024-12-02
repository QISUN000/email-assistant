// Tone options shown in dropdown
export const TONES = [
    { value: "😊 Friendly" },
    { value: "📱 Formal" },
    { value: "😎 Informal" },
    { value: "😄 Funny" },
    { value: "🤔 Interested" },
    { value: "😒 Not Interested" },
    { value: "😃 Excited" },
    { value: "🙏 Thankful" },
    { value: "😠 Angry" },
    { value: "😮 Surprised" }
  ];
  
  // Token limits for different response lengths
  export const LENGTHS = {
    SHORT: {
      label: "Short",
      tokens: 300  
    },
    MEDIUM: {
      label: "Medium", 
      tokens:600
    },
    LONG: {
      label: "Long",
      tokens: 1000 
    }
  };