'use client';

import { memo } from 'react';
import { Card, UpdateCardDto } from '@/lib/api';
import CardItem from './CardItem';

interface CardListProps {
  cards: Card[];
  editingCardId: string | null;
  uploadingCardId: string | null;
  onEdit: (card: Card) => void;
  onUpdate: (id: string, data: UpdateCardDto) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onCancelEdit: () => void;
  onFileUpload: (id: string, file: File) => Promise<void>;
  onDownload: (id: string) => Promise<void>;
}

function CardList({
  cards,
  editingCardId,
  uploadingCardId,
  onEdit,
  onUpdate,
  onDelete,
  onCancelEdit,
  onFileUpload,
  onDownload,
}: CardListProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-md border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-500 text-lg font-medium">No cards yet</p>
        <p className="text-gray-400 text-sm mt-2">Create your first card using the form above</p>
      </div>
    );
  }

  return (
    <section aria-label="Cards list">
      <h2 className="sr-only">Your Cards</h2>
      <div className="space-y-5">{cards.map((card) => (
        <CardItem
          key={card.id}
          card={card}
          isEditing={editingCardId === card.id}
          onEdit={onEdit}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onCancelEdit={onCancelEdit}
          onFileUpload={onFileUpload}
          onDownload={onDownload}
          isUploading={uploadingCardId === card.id}
        />
      ))}</div>
    </section>
  );
}

export default memo(CardList);
