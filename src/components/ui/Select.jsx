'use client';

import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

/**
 * Modern Select Component
 * 
 * A custom select dropdown with keyboard navigation and accessibility features.
 * Built with Headless UI for proper ARIA attributes and focus management.
 * 
 * @param {Object} props
 * @param {string} props.label - Label text for the select
 * @param {Array} props.options - Array of option objects with { value, label }
 * @param {string|number} props.value - Currently selected value
 * @param {Function} props.onChange - Callback when selection changes
 * @param {string} props.placeholder - Placeholder text when no selection
 * @param {boolean} props.disabled - Whether the select is disabled
 * @param {string} props.error - Error message to display
 * @param {string} props.helperText - Helper text below the select
 * @param {boolean} props.required - Whether the field is required
 * @param {string} props.className - Additional CSS classes
 */
export default function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  helperText,
  required = false,
  className = '',
}) {
  const [query, setQuery] = useState('');

  // Find the selected option
  const selectedOption = options.find(option => option.value === value);

  // Filter options based on search query
  const filteredOptions = query === ''
    ? options
    : options.filter(option =>
        option.label.toLowerCase().includes(query.toLowerCase())
      );

  const hasError = Boolean(error);

  return (
    <div className={`w-full ${className}`}>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        {({ open }) => (
          <>
            {/* Label */}
            {label && (
              <Listbox.Label className="block text-sm font-medium text-neutral-700 mb-1.5">
                {label}
                {required && <span className="text-error-500 ml-1" aria-label="required">*</span>}
              </Listbox.Label>
            )}

            <div className="relative">
              {/* Select Button */}
              <Listbox.Button
                className={`
                  relative w-full h-10 pl-3 pr-10 text-left bg-white rounded-lg border
                  transition-all duration-150 min-h-[44px]
                  focus:outline-none focus:ring-2
                  ${hasError
                    ? 'border-error-500 focus:ring-error-500/20'
                    : 'border-neutral-300 focus:ring-primary-500/20 focus:border-primary-500'
                  }
                  ${disabled
                    ? 'bg-neutral-50 text-neutral-400 cursor-not-allowed'
                    : 'cursor-pointer hover:border-neutral-400'
                  }
                `}
                aria-invalid={hasError}
                aria-required={required}
                aria-describedby={
                  error ? `${label}-error` : helperText ? `${label}-helper` : undefined
                }
              >
                <span className={`block truncate ${!selectedOption ? 'text-neutral-400' : 'text-neutral-900'}`}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className={`h-5 w-5 ${hasError ? 'text-error-500' : 'text-neutral-400'}`}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              {/* Dropdown Menu */}
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                  role="listbox"
                >
                  {filteredOptions.length === 0 ? (
                    <div className="relative cursor-default select-none py-2 px-3 text-neutral-500">
                      No options found
                    </div>
                  ) : (
                    filteredOptions.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        value={option.value}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors duration-150 ${
                            active ? 'bg-primary-50 text-primary-900' : 'text-neutral-900'
                          }`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                              {option.label}
                            </span>
                            {selected && (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-primary-600' : 'text-primary-500'
                                }`}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))
                  )}
                </Listbox.Options>
              </Transition>
            </div>

            {/* Error Message */}
            {error && (
              <p
                id={`${label}-error`}
                className="mt-1.5 text-sm text-error-600 flex items-center gap-1"
                role="alert"
              >
                {error}
              </p>
            )}

            {/* Helper Text */}
            {helperText && !error && (
              <p
                id={`${label}-helper`}
                className="mt-1.5 text-sm text-neutral-500"
              >
                {helperText}
              </p>
            )}
          </>
        )}
      </Listbox>
    </div>
  );
}
