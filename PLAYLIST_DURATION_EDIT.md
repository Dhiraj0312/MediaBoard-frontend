# Playlist Total Duration Editing Feature

## Overview
Added the ability to edit the total duration of a playlist from two locations:
1. **PlaylistCard** - Directly on the playlist card in the list view
2. **PlaylistForm** - In the "Edit Playlist" modal

When the total duration is changed, the new duration is distributed proportionally across all playlist items.

## Changes Made

### 1. PlaylistCard Component (`frontend/src/components/playlists/PlaylistCard.jsx`)

#### New Props
- `onUpdateDuration`: Callback function to handle duration updates

#### New State Variables
- `isEditingDuration`: Boolean to track if duration is being edited
- `editedDuration`: Stores the edited duration value
- `durationError`: Stores validation error messages
- `updatingDuration`: Boolean to track if update is in progress

#### New Features
- **Editable Duration Display**: Click on the duration to edit it
  - Shows an input field with save/cancel buttons
  - Displays a pencil icon on hover to indicate editability
  - Disabled for empty playlists (0 items)
  
- **Validation**:
  - Minimum: 1 second per item (e.g., 5 items = minimum 5 seconds)
  - Maximum: 3600 seconds (1 hour)
  - Real-time validation with error messages
  
- **Keyboard Support**:
  - Enter: Save changes
  - Escape: Cancel editing
  
- **Visual Feedback**:
  - Loading state while updating
  - Error messages displayed below the input
  - Disabled state when playlist is empty

### 2. PlaylistForm Component (`frontend/src/components/playlists/PlaylistForm.jsx`)

#### New State Variables
- `totalDuration`: Stores the edited duration value
- `isEditingDuration`: Boolean to track if duration is being edited

#### New Features
- **Editable Duration in Modal**: Click on the duration in the "Playlist Information" section
  - Shows an input field with a checkmark button
  - Displays a pencil icon on hover to indicate editability
  - Only available when editing playlists with items
  
- **Validation**:
  - Same validation rules as PlaylistCard
  - Integrated with form validation
  - Error messages displayed below the input
  
- **Automatic Calculation**:
  - When form is submitted, proportional durations are calculated
  - Items array is automatically included in the update payload

#### Updated Logic
The form now:
1. Tracks duration changes separately from name/description
2. Validates duration on form submission
3. Calculates proportional item durations if duration was edited
4. Includes the items array in the submit payload when duration changes

### 3. PlaylistList Component (`frontend/src/components/playlists/PlaylistList.jsx`)

#### New Function: `handleUpdatePlaylistDuration`
Handles the logic for updating playlist duration:

1. **Validation**: Checks if playlist exists and has items
2. **Proportional Distribution**: Calculates new duration for each item based on their current proportion
3. **Rounding Adjustment**: Ensures the total matches exactly by adjusting the first item
4. **API Update**: Calls the existing `updatePlaylist` API with new item durations
5. **State Update**: Updates the local state with the response

#### Algorithm
```javascript
// For each item, calculate its proportion of the current total
proportion = item.duration / currentTotal

// Calculate new duration (minimum 1 second)
newDuration = max(1, round(proportion * newTotalDuration))

// Adjust first item to account for rounding errors
diff = newTotalDuration - calculatedTotal
items[0].duration += diff
```

## Usage

### Option 1: Edit from Playlist Card (List View)
1. Navigate to the Playlists page (`/playlists`)
2. Find a playlist with items
3. Click on the duration value (e.g., "10s")
4. Input field appears with current duration
5. Enter new duration (between totalItems and 3600)
6. Click the checkmark or press Enter to save
7. Duration is distributed proportionally across all items

### Option 2: Edit from Edit Playlist Modal
1. Navigate to the Playlists page (`/playlists`)
2. Click "Edit" button on a playlist card
3. In the modal, find the "Playlist Information" section
4. Click on the duration value (e.g., "10s")
5. Input field appears with current duration
6. Enter new duration (between totalItems and 3600)
7. Click the checkmark to confirm
8. Click "Update Playlist" to save all changes
9. Duration is distributed proportionally across all items

### Example
**Before:**
- Item 1: 5s
- Item 2: 3s
- Item 3: 2s
- Total: 10s

**User changes total to 20s:**
- Item 1: 10s (5/10 * 20 = 10)
- Item 2: 6s (3/10 * 20 = 6)
- Item 3: 4s (2/10 * 20 = 4)
- Total: 20s

## Technical Details

### API Integration
Uses the existing `updatePlaylist` endpoint:
```javascript
PUT /api/playlists/:id
{
  "items": [
    { "media_id": "...", "duration": 10 },
    { "media_id": "...", "duration": 6 },
    { "media_id": "...", "duration": 4 }
  ]
}
```

### Error Handling
- Empty playlist: Shows error message, disables edit button
- Invalid duration: Shows validation error, disables save button
- API error: Displays error message, reverts to original value
- Network error: Caught and displayed to user

### Accessibility
- Keyboard navigation (Tab, Enter, Escape)
- ARIA labels for screen readers
- Focus management (auto-focus on input)
- Clear visual feedback for all states
- Touch-friendly targets (44x44px minimum)

## Design System Compliance
- Uses `neutral-*` colors for text and borders
- Uses `primary-*` colors for interactive elements
- Uses `error-*` colors for validation errors
- Full dark mode support with `dark:` variants
- Smooth transitions (150-300ms)
- WCAG 2.1 AA contrast compliance

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (320px+)
- Touch and mouse input supported
- Keyboard navigation supported

## Future Enhancements
- Bulk duration editing for multiple playlists
- Duration presets (15s, 30s, 60s)
- Custom distribution patterns (equal, weighted, custom)
- Undo/redo functionality
- Duration history tracking
