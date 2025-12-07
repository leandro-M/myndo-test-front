'use client';

import { useState, useEffect, useCallback } from 'react';
import { cardsApi, Card, CreateCardDto, UpdateCardDto } from '@/lib/api';

export function useCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCards = useCallback(async () => {
    try {
      setError(null);
      const response = await cardsApi.getAll();
      setCards(response.data);
    } catch (err) {
      console.error('Error loading cards:', err);
      setError('Failed to load cards');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const createCard = useCallback(async (data: CreateCardDto) => {
    try {
      await cardsApi.create(data);
      await loadCards();
    } catch (err) {
      console.error('Error creating card:', err);
      throw new Error('Failed to create card');
    }
  }, [loadCards]);

  const updateCard = useCallback(async (id: string, data: UpdateCardDto) => {
    try {
      await cardsApi.update(id, data);
      await loadCards();
    } catch (err) {
      console.error('Error updating card:', err);
      throw new Error('Failed to update card');
    }
  }, [loadCards]);

  const deleteCard = useCallback(async (id: string) => {
    try {
      await cardsApi.delete(id);
      await loadCards();
    } catch (err) {
      console.error('Error deleting card:', err);
      throw new Error('Failed to delete card');
    }
  }, [loadCards]);

  const uploadFile = useCallback(async (id: string, file: File) => {
    try {
      await cardsApi.uploadFile(id, file);
      await loadCards();
    } catch (err) {
      console.error('Error uploading file:', err);
      throw new Error('Failed to upload file');
    }
  }, [loadCards]);

  const getFileUrl = useCallback(async (id: string) => {
    try {
      const response = await cardsApi.getFileUrl(id);
      return response.data.url;
    } catch (err) {
      console.error('Error getting file URL:', err);
      throw new Error('Failed to get file URL');
    }
  }, []);

  return {
    cards,
    loading,
    error,
    createCard,
    updateCard,
    deleteCard,
    uploadFile,
    getFileUrl,
    refetch: loadCards,
  };
}
