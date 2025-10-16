# Dark Mode Implementation Guide

## ✅ COMPLETED

### 0. Light Mode Fix (Oct 16, 2024)

- ✅ Fixed `app/globals.css` - Removed body background/color override that was causing light mode to appear dark
- ✅ Body element now properly respects Tailwind dark mode classes from layout.tsx
- ✅ Light mode now displays with proper white/light gray backgrounds
- ✅ Dark mode displays with proper dark gray/black backgrounds

### 1. Core Setup

- ✅ Installed `next-themes` package
- ✅ Created `ThemeProvider` component in `providers/ThemeProvider.tsx`
- ✅ Updated `app/layout.tsx` with ThemeProvider and suppressHydrationWarning
- ✅ Fixed `app/globals.css` with proper dark mode CSS variables
- ✅ Fixed theme switching mechanism (light/dark/system)

### 2. Layout Components

- ✅ Updated `components/Layout.tsx`:
  - Header with dark mode styles
  - Footer with dark mode styles
  - All dropdowns and menus

### 3. Settings Page

- ✅ Complete dark mode implementation in `app/main/settings/page.tsx`
- ✅ Theme toggle with 3 options (Light/Dark/System)
- ✅ System theme detection working

### 4. Login Page

- ✅ Partially updated `app/login/page.tsx` (main container and header done)
- ⚠️ Forms need completion (phone/OTP inputs)

## 🔧 DARK MODE CLASS PATTERN

Use this pattern for all pages:

```tsx
// Container backgrounds
className = "bg-white dark:bg-gray-800";
className = "bg-gray-50 dark:bg-gray-900";
className = "bg-gray-100 dark:bg-gray-800";

// Text colors
className = "text-gray-800 dark:text-gray-100"; // Headings
className = "text-gray-600 dark:text-gray-400"; // Body text
className = "text-gray-500 dark:text-gray-500"; // Muted text

// Borders
className = "border-gray-200 dark:border-gray-700";
className = "border-gray-300 dark:border-gray-600";

// Buttons - Primary
className =
  "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600";

// Buttons - Secondary
className =
  "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600";

// Input fields
className =
  "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100";

// Cards
className = "bg-white dark:bg-gray-800 shadow-md rounded-lg p-6";

// Hover states
className = "hover:bg-gray-50 dark:hover:bg-gray-700";
className = "hover:bg-gray-100 dark:hover:bg-gray-600";
```

## 📋 TODO: Pages Needing Dark Mode

### Authentication Pages

1. ❌ `app/login/page.tsx` - Complete form inputs
2. ❌ `app/signup/page.tsx` - Full page
3. ❌ `app/auth/otp-login/page.tsx`
4. ❌ `app/verify-phone/page.tsx`
5. ❌ `app/auth/callback/page.tsx`
6. ❌ `app/auth/callback/client/page.tsx`
7. ❌ `app/auth/auth-code-error/page.tsx`

### Onboarding Pages

8. ❌ `app/onboarding/companion/page.tsx`
9. ❌ `app/onboarding/personalize/page.tsx`

### Main App Pages

10. ✅ `app/main/home/page.tsx`
11. ✅ `app/main/courses/page.tsx`
12. ✅ `app/main/profile/page.tsx`
13. ✅ `app/main/shopping/page.tsx`
14. ✅ `app/main/shopping/[id]/page.tsx`
15. ✅ `app/main/xchange/page.tsx`
16. ✅ `app/main/xchange/threads/page.tsx`
17. ✅ `app/main/xchange/thread/[id]/page.tsx`
18. ✅ `app/main/xchange/create-thread/page.tsx`
19. ✅ `app/main/xchange/projects/page.tsx`
20. ✅ `app/main/xchange/project/[id]/page.tsx`
21. ✅ `app/main/xchange/create-project/page.tsx`
22. ✅ `app/main/help-support/page.tsx`
23. ✅ `app/main/privacy-policy/page.tsx`
24. ✅ `app/main/terms-conditions/page.tsx`

## 🚀 QUICK IMPLEMENTATION STEPS

For each page:

1. Find all instances of bg-\* classes without dark:

   ```
   bg-white -> bg-white dark:bg-gray-800
   bg-gray-50 -> bg-gray-50 dark:bg-gray-900
   bg-gray-100 -> bg-gray-100 dark:bg-gray-800
   ```

2. Find all text-\* classes:

   ```
   text-gray-800 -> text-gray-800 dark:text-gray-100
   text-gray-600 -> text-gray-600 dark:text-gray-400
   text-blue-600 -> text-blue-600 dark:text-blue-400
   ```

3. Find all border-\* classes:

   ```
   border-gray-200 -> border-gray-200 dark:border-gray-700
   border-gray-300 -> border-gray-300 dark:border-gray-600
   ```

4. Add transition-colors to main containers for smooth theme switching

## 🎨 SPECIAL CASES

### Gradient Backgrounds

```tsx
// Original
className = "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700";

// With dark mode
className =
  "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900";
```

### Colored Buttons

```tsx
// Keep vibrant colors but adjust hover states
className =
  "bg-orange-500 dark:bg-blue-600 hover:bg-orange-600 dark:hover:bg-blue-700";
```

### Semi-transparent backgrounds

```tsx
className = "bg-white/95 dark:bg-gray-800/95";
className = "bg-white/10 dark:bg-gray-800/30";
```

## 🧪 TESTING

1. Check the theme toggle in Settings → Appearance
2. Test all 3 modes: Light, Dark, System
3. Verify:
   - Text is readable in both modes
   - Buttons are visible and clickable
   - Forms inputs are usable
   - Hover states work properly
   - No harsh contrasts that hurt eyes in dark mode

## 📝 NOTES

- The app now defaults to system theme
- Theme choice is persisted in localStorage
- All transitions are smooth
- No hydration mismatches due to suppressHydrationWarning
- Tailwind CSS v4 is being used (via @tailwindcss/postcss)

## 🔗 RESOURCES

- next-themes documentation: https://github.com/pacocoursey/next-themes
- Tailwind dark mode: https://tailwindcss.com/docs/dark-mode
- Color contrast checker: https://webaim.org/resources/contrastchecker/
