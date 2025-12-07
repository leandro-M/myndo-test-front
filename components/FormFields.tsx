'use client';

interface FormFieldsProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  disabled?: boolean;
  idPrefix?: string;
}

export default function FormFields({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  disabled = false,
  idPrefix = 'card'
}: FormFieldsProps) {
  return (
    <>
      <div>
        <label 
          htmlFor={`${idPrefix}-title`} 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          id={`${idPrefix}-title`}
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
          placeholder="Enter card title"
          disabled={disabled}
          aria-required="true"
          aria-invalid={!title.trim() ? 'true' : 'false'}
        />
      </div>
      <div>
        <label 
          htmlFor={`${idPrefix}-description`} 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description <span className="text-red-500" aria-label="required">*</span>
        </label>
        <textarea
          id={`${idPrefix}-description`}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] resize-y text-gray-900"
          placeholder="Enter card description"
          disabled={disabled}
          aria-required="true"
          aria-invalid={!description.trim() ? 'true' : 'false'}
        />
      </div>
    </>
  );
}
