'use client';

import { useState } from 'react';
import { UpdateCardDto } from '@/lib/api';
import { showSuccess, showError } from '@/lib/alerts';
import FormFields from './FormFields';

interface CardEditFormProps {
  cardId: string;
  initialTitle: string;
  initialDescription: string;
  onUpdate: (id: string, data: UpdateCardDto) => Promise<void>;
  onCancel: () => void;
}

export default function CardEditForm({ 
  cardId, 
  initialTitle, 
  initialDescription, 
  onUpdate, 
  onCancel 
}: CardEditFormProps) {
  const [formData, setFormData] = useState({ title: initialTitle, description: initialDescription });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      showError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdate(cardId, formData);
      showSuccess('Card updated successfully!');
    } catch (error) {
      console.error('Error updating card:', error);
      showError('Failed to update card. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormFields
        title={formData.title}
        description={formData.description}
        onTitleChange={(value) => setFormData({ ...formData, title: value })}
        onDescriptionChange={(value) => setFormData({ ...formData, description: value })}
        disabled={isSubmitting}
        idPrefix={`edit-${cardId}`}
      />
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all font-medium shadow-sm disabled:bg-green-400 disabled:cursor-not-allowed"
          aria-label="Save changes"
        >
          <span className="flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Save
              </>
            )}
          </span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 bg-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Cancel editing"
        >
          <span className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Cancel
          </span>
        </button>
      </div>
    </form>
  );
}
