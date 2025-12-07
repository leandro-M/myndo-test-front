'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/lib/api';

interface EditData {
  title: string;
  description: string;
}

export function useCardEditor() {
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editData, setEditData] = useState<EditData | null>(null);

  const startEdit = useCallback((card: Card) => {
    setEditingCardId(card.id);
    setEditData({ title: card.title, description: card.description });
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingCardId(null);
    setEditData(null);
  }, []);

  const updateEditData = useCallback((field: keyof EditData, value: string) => {
    setEditData((prev) => prev ? { ...prev, [field]: value } : null);
  }, []);

  return {
    editingCardId,
    editData,
    startEdit,
    cancelEdit,
    updateEditData,
  };
}
