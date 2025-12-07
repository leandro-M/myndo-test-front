import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import CardForm from '../CardForm';

describe('CardForm', () => {
  it('should render form fields', () => {
    const mockOnSubmit = jest.fn();
    render(<CardForm onSubmit={mockOnSubmit} />);

    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create card/i })).toBeInTheDocument();
  });

  it('should call onSubmit with form data', async () => {
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined);
    render(<CardForm onSubmit={mockOnSubmit} />);

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: /title/i }), { target: { value: 'Test Title' } });
      fireEvent.change(screen.getByRole('textbox', { name: /description/i }), { target: { value: 'Test Description' } });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /create card/i }));
      await Promise.resolve();
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Title',
      description: 'Test Description',
    });
  });

  it('should show validation error if fields are empty', async () => {
    const mockOnSubmit = jest.fn();
    const Swal = require('sweetalert2').default;
    
    render(<CardForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /create card/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
        icon: 'warning',
        title: 'Validation Error',
      }));
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should clear form after successful submission', async () => {
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined);
    render(<CardForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByRole('textbox', { name: /title/i }) as HTMLInputElement;
    const descriptionInput = screen.getByRole('textbox', { name: /description/i }) as HTMLTextAreaElement;

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: 'Test' } });
      fireEvent.change(descriptionInput, { target: { value: 'Test' } });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /create card/i }));
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(titleInput.value).toBe('');
      expect(descriptionInput.value).toBe('');
    });
  });
});
