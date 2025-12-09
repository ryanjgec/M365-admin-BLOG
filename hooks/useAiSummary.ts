
import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const CACHE_PREFIX = 'm365_ai_summary_v1_';

const isValidSummary = (text: string | null | undefined): boolean => {
  if (!text) return false;
  if (text.length < 10) return false;
  const lower = text.toLowerCase();
  return !lower.includes('please provide') && !lower.includes('tbd') && !lower.includes('coming soon');
};

const getFallback = (content: string, excerpt: string): string => {
  if (isValidSummary(excerpt)) return excerpt;
  // Fallback to content: strip basic markdown headers and take first 140 chars
  const cleanContent = content.replace(/#{1,6}\s/g, '').replace(/\n/g, ' ').substring(0, 140).trim();
  return cleanContent + (cleanContent.length > 0 ? '...' : '');
};

export const useAiSummary = (content: string, id: string, initialExcerpt: string = '') => {
  // Determine initial state
  const getInitialState = () => {
    // 1. Try cache
    try {
      const cached = localStorage.getItem(CACHE_PREFIX + id);
      if (isValidSummary(cached)) {
        return { text: cached!, isAi: true };
      }
    } catch (e) {
      // ignore
    }

    // 2. Fallback
    return { 
      text: getFallback(content, initialExcerpt), 
      isAi: false 
    };
  };

  const [state, setState] = useState(getInitialState);

  useEffect(() => {
    // If we already have a valid AI summary, or if no API key, stop.
    if (state.isAi || !process.env.API_KEY) return;

    let isMounted = true;

    const generateSummary = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Summarize this technical text in 1-2 clear sentences (max 140 chars). No intro. Text: ${content.substring(0, 2000)}`,
            config: {
                maxOutputTokens: 60,
                temperature: 0.3,
                thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for short summaries when maxOutputTokens is constrained
            }
        });

        const text = response.text;
        if (text && isMounted) {
            const cleanText = text.trim();
            if (isValidSummary(cleanText)) {
                setState({ text: cleanText, isAi: true });
                try {
                    localStorage.setItem(CACHE_PREFIX + id, cleanText);
                } catch (e) {
                    // Ignore storage quota
                }
            }
        }
      } catch (error) {
        // Silently fail, sticking to the fallback already in state
      }
    };

    // Random delay to prevent rate limiting bursts
    const delay = Math.floor(Math.random() * 2500) + 500;
    const timeoutId = setTimeout(generateSummary, delay);

    return () => {
        isMounted = false;
        clearTimeout(timeoutId);
    };
  }, [content, id, state.isAi]);

  return { summary: state.text, isAiGenerated: state.isAi };
};
