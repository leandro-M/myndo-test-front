'use client';

import { memo } from 'react';
import { Card } from '@/lib/api';
import { showConfirm } from '@/lib/alerts';

interface CardActionsProps {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (id: string) => Promise<void>;
}

function CardActions({ card, onEdit, onDelete }: CardActionsProps) {
  const handleDelete = async () => {
    const confirmed = await showConfirm(
      'Delete Card?',
      'This action cannot be undone. All associated files will also be deleted.',
      'Yes, delete it'
    );
    
    if (confirmed) {
      await onDelete(card.id);
    }
  };

  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={() => onEdit(card)}
        className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm font-medium shadow-sm"
        aria-label={`Edit ${card.title}`}
      >
        <span className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit
        </span>
      </button>
      <button
        onClick={handleDelete}
        className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm font-medium shadow-sm"
        aria-label={`Delete ${card.title}`}
      >
        <span className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Delete
        </span>
      </button>
    </div>
  );
}

export default memo(CardActions);
