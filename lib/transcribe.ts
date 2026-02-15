export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
    const formData = new FormData();
    const arrayBuffer = audioBuffer.buffer.slice(audioBuffer.byteOffset, audioBuffer.byteOffset + audioBuffer.byteLength) as ArrayBuffer;
    const blob = new Blob([arrayBuffer], { type: 'audio/ogg' });
    formData.append('file', blob, 'audio.ogg');
    formData.append('model', 'whisper-1');
    formData.append('language', 'ar'); // Helps Whisper understand Darija/Arabic better
  
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: formData,
    });
  
    const data = await response.json();
    return data.text || "";
  }