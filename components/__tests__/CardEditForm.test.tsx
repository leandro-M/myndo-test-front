import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import CardEditForm from '../CardEditForm';

describe('CardEditForm', () => {
  const mockOnUpdate = jest.fn().mockResolvedValue(undefined);
  const mockOnCancel = jest.fn();
  const defaultProps = {
    cardId: '123',
    initialTitle: 'Test Card',
    initialDescription: 'Test Description',
    onUpdate: mockOnUpdate,
    onCancel: mockOnCancel,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form with initial values', () => {
    render(<CardEditForm {...defaultProps} />);

    const titleInput = screen.getByRole('textbox', { name: /title required/i }) as HTMLInputElement;
    const descriptionInput = screen.getByRole('textbox', { name: /description required/i }) as HTMLTextAreaElement;

    expect(titleInput.value).toBe('Test Card');
    expect(descriptionInput.value).toBe('Test Description');
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel editing/i })).toBeInTheDocument();
  });

  it('should call onUpdate with new data on submit', async () => {
    render(<CardEditForm {...defaultProps} />);

    const titleInput = screen.getByRole('textbox', { name: /title required/i });
    const descriptionInput = screen.getByRole('textbox', { name: /description required/i });

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
      fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
      await Promise.resolve();
    });

    expect(mockOnUpdate).toHaveBeenCalledWith('123', {
      title: 'Updated Title',
      description: 'Updated Description',
    });
  });

  it('should call onCancel when cancel button is clicked', () => {
    render(<CardEditForm {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /cancel editing/i }));

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should show error if fields are empty', async () => {
    const Swal = require('sweetalert2').default;
    render(<CardEditForm {...defaultProps} />);

    const titleInput = screen.getByRole('textbox', { name: /title required/i });
    const descriptionInput = screen.getByRole('textbox', { name: /description required/i });

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: '' } });
      fireEvent.change(descriptionInput, { target: { value: '' } });
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
        icon: 'error',
      }));
    });

    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  it('should disable buttons while submitting', async () => {
    // Make onUpdate take longer to resolve
    const slowUpdate = jest.fn(() => new Promise<void>(resolve => setTimeout(resolve, 100)));
    render(<CardEditForm {...defaultProps} onUpdate={slowUpdate} />);

    const saveButton = screen.getByRole('button', { name: /save changes/i });
    const cancelButton = screen.getByRole('button', { name: /cancel editing/i });

    // Click and immediately check disabled state
    fireEvent.submit(saveButton.closest('form')!);

    // Should be disabled during submission
    await waitFor(() => {
      expect(saveButton).toBeDisabled();
      expect(cancelButton).toBeDisabled();
    });
  });
});
