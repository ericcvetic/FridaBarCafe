"use client";

import { useState, useEffect, useCallback } from "react";
import type { HistoryEntry } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { TextToSpeechForm } from "@/components/tts/TextToSpeechForm";
import { HistoryList } from "@/components/tts/HistoryList";

const LOCAL_STORAGE_KEY = "vozactiva_history";

export default function Home() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history to localStorage", error);
    }
  }, [history]);

  const handleGenerationComplete = useCallback(
    (data: { text: string; audioSrc: string }) => {
      const newEntry: HistoryEntry = {
        id: new Date().toISOString(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      setHistory((prevHistory) => [newEntry, ...prevHistory]);
    },
    []
  );

  const handleDeleteItem = useCallback((id: string) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <TextToSpeechForm onGenerationComplete={handleGenerationComplete} />
          </div>
          <div className="lg:col-span-2">
            <HistoryList
              history={history}
              onDeleteItem={handleDeleteItem}
              onClearHistory={handleClearHistory}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
