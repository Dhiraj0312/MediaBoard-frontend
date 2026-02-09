# Playlist Duration Editing - Quick Guide

## Where Can I Edit Duration?

You can now edit the total duration of a playlist in **TWO** places:

### 1. On the Playlist Card (Main List View)
**Location:** `/playlists` page - directly on each playlist card

**How to use:**
1. Find the "Duration: 10s" line on any playlist card
2. Click on the duration value
3. An input field appears with save (✓) and cancel (✗) buttons
4. Enter new duration and click ✓ or press Enter
5. Changes save immediately

**Features:**
- Instant save (no need to open modal)
- Keyboard shortcuts (Enter/Escape)
- Real-time validation
- Hover shows pencil icon

### 2. In the Edit Playlist Modal
**Location:** `/playlists` page - click "Edit" button on any playlist card

**How to use:**
1. Click "Edit" button on a playlist card
2. Modal opens with "Playlist Information" section
3. Find "Total Duration: 10s" line
4. Click on the duration value
5. An input field appears with a checkmark (✓) button
6. Enter new duration and click ✓
7. Click "Update Playlist" button to save all changes

**Features:**
- Edit duration along with name/description
- All changes saved together
- Validation integrated with form
- Hover shows pencil icon

## Important Notes

### When Can I Edit Duration?
- ✅ Only when playlist has items (totalItems > 0)
- ❌ Cannot edit empty playlists (shows disabled state)

### Validation Rules
- **Minimum:** 1 second per item
  - Example: 5 items = minimum 5 seconds
- **Maximum:** 3600 seconds (1 hour)
- Error messages show if you enter invalid values

### How Duration is Distributed
When you change the total duration, each item's duration is adjusted **proportionally**:

**Example:**
- **Before:** Item 1: 5s, Item 2: 3s, Item 3: 2s → Total: 10s
- **Change to:** 20s
- **After:** Item 1: 10s, Item 2: 6s, Item 3: 4s → Total: 20s

Each item maintains its proportion of the total:
- Item 1: 50% of total (5/10 = 50%, so 20 * 50% = 10s)
- Item 2: 30% of total (3/10 = 30%, so 20 * 30% = 6s)
- Item 3: 20% of total (2/10 = 20%, so 20 * 20% = 4s)

## Visual Indicators

### Not Editing (Default State)
```
Duration: 10s [pencil icon appears on hover]
```

### Editing State
```
[input: 10] [✓] [✗]
```

### Empty Playlist (Disabled)
```
Duration: 0s [grayed out, no hover effect]
```

### With Error
```
[input: 2] [✓] [✗]
⚠️ Minimum 5s (1s per item)
```

## Keyboard Shortcuts

When editing duration:
- **Enter** - Save changes
- **Escape** - Cancel editing (only on playlist card)
- **Tab** - Navigate between fields

## Design Features

✨ **Modern Design:**
- Smooth transitions (150-300ms)
- Hover effects with pencil icon
- Touch-friendly buttons (44x44px)
- Full dark mode support

🎨 **Color System:**
- Neutral colors for text/borders
- Primary colors for interactive elements
- Error colors for validation messages

♿ **Accessibility:**
- Keyboard navigation
- ARIA labels
- Focus management
- Clear visual feedback
- WCAG 2.1 AA compliant

## Troubleshooting

**Q: I don't see the edit option**
- Make sure the playlist has items (not empty)
- Hover over the duration to see the pencil icon

**Q: Save button is disabled**
- Check if duration is within valid range
- Look for error message below the input

**Q: Changes didn't save**
- In the modal, make sure to click "Update Playlist"
- Check for error messages
- Verify network connection

**Q: Duration doesn't match what I entered**
- Small differences may occur due to rounding
- System ensures each item has minimum 1 second
- Total will always match exactly what you entered
