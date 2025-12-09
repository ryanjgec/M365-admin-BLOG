import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const CACHE_PREFIX = 'm365_ai_summary_v1_';

export const useAiSummary = (content: string, id: string, initialFallback: string = '') => {
  const [summary, setSummary] = useState<string>(() => {
    // 1. Try to load from local storage first
    try {
        const cached = localStorage.getItem(CACHE_PREFIX + id);
        return cached || initialFallback;
    } catch (e) {
        return initialFallback;
    }
  });
  
  const [isAiGenerated, setIsAiGenerated] = useState(() => {
      return !!localStorage.getItem(CACHE_PREFIX + id);
  });

  useEffect(() => {
    // If we already have a cached version (and it's not just the initial fallback passed in state), skip
    if (localStorage.getItem(CACHE_PREFIX + id)) {
        setIsAiGenerated(true);
        return;
    }

    // If no API key is available, we cannot generate. Stick to fallback.
    if (!process.env.API_KEY) return;

    let isMounted = true;

    const generateSummary = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Use gemini-2.5-flash for speed and efficiency
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Task: Summarize the following technical text into 1 or 2 clear, concise sentences. 
            Constraints: Maximum 140 characters. Plain text only. No intro/outro.
            Text to summarize: ${content.substring(0, 2000)}`,
            config: {
                maxOutputTokens: 60,
                temperature: 0.3,
            }
        });

        const text = response.text;
        if (text && isMounted) {
            const cleanText = text.trim();
            setSummary(cleanText);
            setIsAiGenerated(true);
            try {
                localStorage.setItem(CACHE_PREFIX + id, cleanText);
            } catch (e) {
                // Ignore storage quota errors
            }
        }
      } catch (error) {
        // Silently fail and stick to fallback if API error occurs
        // console.debug('Summarizer skipped for', id);
      }
    };

    // Add a random delay between 500ms and 3000ms to avoid rate limiting when mounting a list
    const delay = Math.floor(Math.random() * 2500) + 500;
    const timeoutId = setTimeout(generateSummary, delay);

    return () => {
        isMounted = false;
        clearTimeout(timeoutId);
    };
  }, [content, id, process.env.API_KEY]);

  return { summary, isAiGenerated };
};