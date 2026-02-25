"use client";

import { cn } from "@/lib/cn";
import { Chip } from "@/components/ui/chip";
import { Plus } from "lucide-react";
import { useState } from "react";

interface Condition {
  key: string;
  label: string;
  value: string;
}

interface ConditionTagsProps {
  conditions: Condition[];
  onRemove: (key: string) => void;
  onAdd: (condition: Condition) => void;
  onUpdate: (key: string, value: string) => void;
}

export function ConditionTags({
  conditions,
  onRemove,
  onAdd,
  onUpdate,
}: ConditionTagsProps) {
  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  function handleAdd() {
    if (!newLabel.trim() || !newValue.trim()) return;
    const key = newLabel.trim().toLowerCase().replace(/\s+/g, "-");
    onAdd({ key, label: newLabel.trim(), value: newValue.trim() });
    setNewLabel("");
    setNewValue("");
    setAdding(false);
  }

  function handleAddKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
    if (e.key === "Escape") {
      setAdding(false);
      setNewLabel("");
      setNewValue("");
    }
  }

  function startEdit(key: string, currentValue: string) {
    setEditingKey(key);
    setEditValue(currentValue);
  }

  function commitEdit(key: string) {
    if (editValue.trim()) {
      onUpdate(key, editValue.trim());
    }
    setEditingKey(null);
    setEditValue("");
  }

  function handleEditKeyDown(e: React.KeyboardEvent, key: string) {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit(key);
    }
    if (e.key === "Escape") {
      setEditingKey(null);
      setEditValue("");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {conditions.map((condition) => (
        <span key={condition.key}>
          {editingKey === condition.key ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-hover px-3 py-1 text-xs font-medium text-foreground">
              <span className="text-text-secondary">{condition.label}:</span>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => handleEditKeyDown(e, condition.key)}
                onBlur={() => commitEdit(condition.key)}
                className="w-16 bg-transparent border-b border-primary text-xs text-foreground outline-none"
                autoFocus
              />
            </span>
          ) : (
            <Chip
              onRemove={() => onRemove(condition.key)}
              onClick={() => startEdit(condition.key, condition.value)}
            >
              {condition.label}: {condition.value}
            </Chip>
          )}
        </span>
      ))}

      {/* Add Button / Inline Input */}
      {adding ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-hover px-3 py-1 text-xs">
          <input
            type="text"
            placeholder="조건명"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={handleAddKeyDown}
            className="w-14 bg-transparent text-xs text-foreground placeholder:text-text-muted outline-none"
            autoFocus
          />
          <span className="text-text-muted">:</span>
          <input
            type="text"
            placeholder="값"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={handleAddKeyDown}
            className="w-14 bg-transparent text-xs text-foreground placeholder:text-text-muted outline-none"
          />
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className={cn(
            "inline-flex items-center justify-center h-6 w-6 rounded-full",
            "bg-surface-hover text-text-muted hover:text-foreground hover:bg-border transition-colors"
          )}
          aria-label="조건 추가"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
