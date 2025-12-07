import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Card {
  id: string;
  title: string;
  description: string;
  fileKey: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCardDto {
  title: string;
  description: string;
}

export interface UpdateCardDto {
  title?: string;
  description?: string;
}

export const cardsApi = {
  getAll: () => api.get<Card[]>('/cards'),
  getOne: (id: string) => api.get<Card>(`/cards/${id}`),
  create: (data: CreateCardDto) => api.post<Card>('/cards', data),
  update: (id: string, data: UpdateCardDto) => api.patch<Card>(`/cards/${id}`, data),
  delete: (id: string) => api.delete(`/cards/${id}`),
  uploadFile: (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<Card>(`/cards/${id}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getFileUrl: (id: string) => api.get<{ url: string }>(`/cards/${id}/file-url`),
};
