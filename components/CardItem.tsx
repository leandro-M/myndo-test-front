'use client';

import { memo } from 'react';
import { Card, UpdateCardDto } from '@/lib/api';
import CardActions from './CardActions';
import CardFileUpload from './CardFileUpload';
import CardEditForm from './CardEditForm';

interface CardItemProps {
  card: Card;
  isEditing: boolean;
  onEdit: (card: Card) => void;
  onUpdate: (id: string, data: UpdateCardDto) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onCancelEdit: () => void;
  onFileUpload: (id: string, file: File) => Promise<void>;
  onDownload: (id: string) => Promise<void>;
  isUploading: boolean;
}

function CardItem({
  card,
  isEditing,
  onEdit,
  onUpdate,
  onDelete,
  onCancelEdit,
  onFileUpload,
  onDownload,
  isUploading,
}: CardItemProps) {
  if (isEditing) {
    return (
      <article className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Card</h3>
        <CardEditForm
          cardId={card.id}
          initialTitle={card.title}
          initialDescription={card.description}
          onUpdate={onUpdate}
          onCancel={onCancelEdit}
        />
      </article>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{card.title}</h3>
      <p className="text-gray-600 mb-5 whitespace-pre-wrap leading-relaxed">{card.description}</p>
      
      <CardFileUpload
        card={card}
        isUploading={isUploading}
        onFileUpload={onFileUpload}
        onDownload={onDownload}
      />

      <CardActions
        card={card}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <time className="text-xs text-gray-400 mt-5 block" dateTime={card.createdAt}>
        Created: {new Date(card.createdAt).toLocaleString()}
      </time>
    </article>
  );
}

export default memo(CardItem);
