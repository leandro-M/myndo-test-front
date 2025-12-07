'use client';

import { useState } from 'react';
import { CreateCardDto } from '@/lib/api';
import { showValidationError, showSuccess, showError } from '@/lib/alerts';
import FormFields from './FormFields';

interface CardFormProps {
  onSubmit: (card: CreateCardDto) => Promise<void>;
}

export default function CardForm({ onSubmit }: CardFormProps) {
  const [formData, setFormData] = useState<CreateCardDto>({ title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      showValidationError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ title: '', description: '' });
      showSuccess('Card created successfully!');
    } catch (error) {
      console.error('Error creating card:', error);
      showError('Failed to create card. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Create New Card</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormFields
          title={formData.title}
          description={formData.description}
          onTitleChange={(value) => setFormData({ ...formData, title: value })}
          onDescriptionChange={(value) => setFormData({ ...formData, description: value })}
          disabled={isSubmitting}
          idPrefix="create"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed font-medium shadow-sm"
          aria-label={isSubmitting ? 'Creating card' : 'Create card'}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          ) : (
            'Create Card'
          )}
        </button>
      </form>
    </div>
  );
}
