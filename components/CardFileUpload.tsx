'use client';

import { memo, useRef } from 'react';
import { Card } from '@/lib/api';

interface CardFileUploadProps {
  card: Card;
  isUploading: boolean;
  onFileUpload: (id: string, file: File) => Promise<void>;
  onDownload: (id: string) => Promise<void>;
}

function CardFileUpload({ card, isUploading, onFileUpload, onDownload }: CardFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onFileUpload(card.id, file);
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  return (
    <div className="flex items-center gap-3 mb-4">
      {card.fileKey ? (
        <>
          <button
            onClick={() => onDownload(card.id)}
            className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm font-medium shadow-sm"
            aria-label={`Download file for ${card.title}`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download File
            </span>
          </button>
          <label 
            className="flex-1 bg-yellow-600 text-white py-2.5 px-4 rounded-lg hover:bg-yellow-700 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2 transition-all text-sm font-medium shadow-sm cursor-pointer text-center"
            aria-label={`Replace file for ${card.title}`}
          >
            <span className="flex items-center justify-center gap-2">
              {isUploading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                  </svg>
                  Replace File
                </>
              )}
            </span>
            <input
              ref={replaceFileInputRef}
              type="file"
              onChange={handleFileChange}
              className="sr-only"
              disabled={isUploading}
              aria-label="Upload replacement file"
            />
          </label>
        </>
      ) : (
        <label 
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 transition-all text-sm font-medium shadow-sm cursor-pointer text-center"
          aria-label={`Upload file for ${card.title}`}
        >
          <span className="flex items-center justify-center gap-2">
            {isUploading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Upload File
              </>
            )}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="sr-only"
            disabled={isUploading}
            aria-label="Upload file"
          />
        </label>
      )}
    </div>
  );
}

export default memo(CardFileUpload);
