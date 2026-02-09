'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function PlaylistForm({ 
  playlist = null, 
  onSubmit, 
  onCancel, 
  loading = false 
}) {
  const [formData, setFormData] = useState({
    name: playlist?.name || '',
    description: playlist?.description || '',
    totalDuration: playlist?.totalDuration || 0
  });
  const [errors, setErrors] = useState({});
  const [isEditingDuration, setIsEditingDuration] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Playlist name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Playlist name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Playlist name must be less than 100 characters';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    // Validate duration if editing and playlist has items
    if (playlist && playlist.totalItems > 0 && isEditingDuration) {
      if (formData.totalDuration < playlist.totalItems) {
        newErrors.totalDuration = `Minimum ${playlist.totalItems}s (1s per item)`;
      } else if (formData.totalDuration > 3600) {
        newErrors.totalDuration = 'Maximum 3600s (1 hour)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      name: formData.name.trim(),
      description: formData.description.trim() || null
    };

    // If duration was edited and playlist has items, calculate proportional durations
    if (playlist && playlist.totalItems > 0 && isEditingDuration && formData.totalDuration !== playlist.totalDuration) {
      const currentTotal = playlist.totalDuration;
      const newTotal = formData.totalDuration;
      
      const items = playlist.items.map(item => {
        const proportion = item.duration / currentTotal;
        const newDuration = Math.max(1, Math.round(proportion * newTotal));
        return {
          media_id: item.media.id,
          duration: newDuration
        };
      });

      // Adjust for rounding errors to match exact total
      const calculatedTotal = items.reduce((sum, item) => sum + item.duration, 0);
      if (calculatedTotal !== newTotal) {
        const diff = newTotal - calculatedTotal;
        items[0].duration += diff;
      }

      submitData.items = items;
    }

    onSubmit(submitData);
  };

  const handleDurationChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setFormData(prev => ({
      ...prev,
      totalDuration: value
    }));
    
    // Clear error when user starts typing
    if (errors.totalDuration) {
      setErrors(prev => ({
        ...prev,
        totalDuration: ''
      }));
    }
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Playlist Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        placeholder="Enter playlist name (e.g., Morning Ads, Lobby Content)"
        disabled={loading}
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter playlist description (optional)"
          disabled={loading}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-neutral-700 dark:text-neutral-100 transition-colors ${
            errors.description 
              ? 'border-error-300 focus:ring-error-500 focus:border-error-500 dark:border-error-600' 
              : 'border-neutral-300 dark:border-neutral-600'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.description}</p>
        )}
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Optional: Describe what this playlist is for
        </p>
      </div>

      {playlist && (
        <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-md border border-neutral-200 dark:border-neutral-700">
          <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">Playlist Information</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Items:</span> 
              <span className="text-neutral-900 dark:text-neutral-100">{playlist.totalItems}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Total Duration:</span>
              {playlist.totalItems > 0 ? (
                <div className="flex items-center gap-2">
                  {isEditingDuration ? (
                    <>
                      <input
                        type="number"
                        min={playlist.totalItems}
                        max={3600}
                        value={formData.totalDuration}
                        onChange={handleDurationChange}
                        disabled={loading}
                        className="w-20 h-8 px-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-neutral-100 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setIsEditingDuration(false)}
                        disabled={loading}
                        className="p-1 text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Done editing"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditingDuration(true)}
                      disabled={loading}
                      className="flex items-center gap-1 text-neutral-900 dark:text-neutral-100 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors group"
                      title="Click to edit duration"
                    >
                      <span>{formatDuration(formData.totalDuration)}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-neutral-900 dark:text-neutral-100">{playlist.totalDurationFormatted}</span>
              )}
            </div>
            {errors.totalDuration && (
              <div className="text-xs text-error-600 dark:text-error-400">
                {errors.totalDuration}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Created:</span> 
              <span className="text-neutral-900 dark:text-neutral-100">
                {new Date(playlist.created_at).toLocaleDateString()}
              </span>
            </div>
            {playlist.updated_at !== playlist.created_at && (
              <div className="flex items-center justify-between">
                <span className="font-medium text-neutral-700 dark:text-neutral-300">Last Modified:</span> 
                <span className="text-neutral-900 dark:text-neutral-100">
                  {new Date(playlist.updated_at).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          {playlist ? 'Update Playlist' : 'Create Playlist'}
        </Button>
      </div>
    </form>
  );
}