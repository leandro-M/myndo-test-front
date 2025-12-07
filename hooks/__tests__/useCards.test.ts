import { renderHook, act } from '@testing-library/react';
import { useCards } from '../useCards';
import { cardsApi } from '@/lib/api';

jest.mock('@/lib/api');

describe('useCards', () => {
  const mockCards = [
    {
      id: '1',
      title: 'Test Card',
      description: 'Test Description',
      fileKey: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load cards on mount', async () => {
    (cardsApi.getAll as jest.Mock).mockResolvedValue({ data: mockCards });

    const { result } = renderHook(() => useCards());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.cards).toEqual(mockCards);
  });

  it('should create a card', async () => {
    (cardsApi.getAll as jest.Mock).mockResolvedValue({ data: [] });
    (cardsApi.create as jest.Mock).mockResolvedValue({ data: mockCards[0] });

    const { result } = renderHook(() => useCards());

    await act(async () => {
      await result.current.createCard({ title: 'New Card', description: 'Description' });
    });

    expect(cardsApi.create).toHaveBeenCalledWith({ title: 'New Card', description: 'Description' });
  });

  it('should handle errors gracefully', async () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    (cardsApi.getAll as jest.Mock).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useCards());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe('Failed to load cards');
    
    consoleSpy.mockRestore();
  });
});
