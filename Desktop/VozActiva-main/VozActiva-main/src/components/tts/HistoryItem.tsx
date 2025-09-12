"use client";

import { useState } from "react";
import { Play, Pause, Trash2, Download, Loader2 } from "lucide-react";
import type { HistoryEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type HistoryItemProps = {
  item: HistoryEntry;
  onDelete: (id: string) => void;
};

export function HistoryItem({ item, onDelete }: HistoryItemProps) {
  const [audio] = useState(() => new Audio(item.audioSrc));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  audio.onplaying = () => {
    setIsPlaying(true);
    setIsLoading(false);
  }
  audio.onpause = () => setIsPlaying(false);
  audio.onended = () => setIsPlaying(false);
  audio.onwaiting = () => setIsLoading(true);
  audio.oncanplay = () => setIsLoading(false);


  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <li className="flex items-center justify-between gap-2 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
      <p className="flex-1 text-sm text-foreground truncate" title={item.text}>
        {item.text}
      </p>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handlePlayPause} className="w-8 h-8">
                <span className="sr-only">Play/Pause</span>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isPlaying ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? "Pausar" : "Reproducir"}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
                <Button asChild variant="ghost" size="icon" className="w-8 h-8">
                    <a href={item.audioSrc} download={`${item.text.substring(0, 20).replace(/\s/g, '_')}.wav`}>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Descargar</span>
                    </a>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Descargar</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(item.id)}
                className="w-8 h-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Eliminar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </li>
  );
}
