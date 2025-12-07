'use client';

import { useState } from 'react';
import { useCards } from '@/hooks/useCards';
import CardForm from '@/components/CardForm';
import CardList from '@/components/CardList';
import LoadingSpinner from '@/components/LoadingSpinner';
import { showSuccess, showError } from '@/lib/alerts';

export default function Home() {
  const {
    cards,
    loading,
    error,
    createCard,
    updateCard,
    deleteCard,
    uploadFile,
    getFileUrl,
  } = useCards();

  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [uploadingCardId, setUploadingCardId] = useState<string | null>(null);

  const handleUpdate = async (id: string, data: { title?: string; description?: string }) => {
    try {
      await updateCard(id, data);
      setEditingCardId(null);
    } catch (error) {
      showError('Failed to update card. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCard(id);
      showSuccess('Card deleted successfully!');
    } catch (error) {
      showError('Failed to delete card. Please try again.');
    }
  };

  const handleFileUpload = async (id: string, file: File) => {
    setUploadingCardId(id);
    try {
      await uploadFile(id, file);
      showSuccess('File uploaded successfully!');
    } catch (error) {
      showError('Failed to upload file. Please try again.');
    } finally {
      setUploadingCardId(null);
    }
  };

  const handleDownload = async (id: string) => {
    try {
      const url = await getFileUrl(id);
      window.open(url, '_blank');
    } catch (error) {
      showError('Failed to get download URL. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-600 text-lg font-semibold mb-2">Error Loading Data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cards Manager</h1>
          <p className="text-gray-600">Manage your cards with file attachments</p>
        </header>

        <main>
          <div className="mb-8">
            <CardForm onSubmit={createCard} />
          </div>

          <CardList
            cards={cards}
            editingCardId={editingCardId}
            uploadingCardId={uploadingCardId}
            onEdit={(card) => setEditingCardId(card.id)}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onCancelEdit={() => setEditingCardId(null)}
            onFileUpload={handleFileUpload}
            onDownload={handleDownload}
          />
        </main>
      </div>
    </div>
  );
}
