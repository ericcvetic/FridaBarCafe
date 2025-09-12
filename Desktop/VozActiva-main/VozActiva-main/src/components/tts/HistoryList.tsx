"use client";

import { History } from "lucide-react";
import type { HistoryEntry } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryItem } from "./HistoryItem";
import { Separator } from "../ui/separator";

type HistoryListProps = {
  history: HistoryEntry[];
  onDeleteItem: (id: string) => void;
  onClearHistory: () => void;
};

export function HistoryList({
  history,
  onDeleteItem,
  onClearHistory,
}: HistoryListProps) {
  return (
    <Card className="shadow-lg h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="text-primary" />
            <CardTitle>Historial</CardTitle>
          </div>
          {history.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearHistory}>
              Limpiar
            </Button>
          )}
        </div>
        <CardDescription>
          Tus conversiones recientes se guardan aquí.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 flex-1">
        <ScrollArea className="h-[400px] lg:h-[450px]">
          <div className="p-4 md:p-6">
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center pt-8">
                Aún no hay historial.
              </p>
            ) : (
              <ul className="space-y-3">
                {history.map((item) => (
                  <HistoryItem
                    key={item.id}
                    item={item}
                    onDelete={onDeleteItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
