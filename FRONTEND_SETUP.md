# Frontend Setup & Development Guide

## Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   npm install
   ```

2. **Create environment file**
   ```bash
   # Create .env.local (note: .local for React)
   ```

   Add:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Running the Application

### Development Mode
```bash
npm start
```
Opens at `http://localhost:3000` with hot reload

### Production Build
```bash
npm run build
```
Creates optimized build in `build/` folder

### Testing
```bash
npm test
```

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Sidebar.js
│   │   ├── Sidebar.css
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── Card.js
│   │   ├── Card.css
│   │   ├── WellbeingChat.js
│   │   ├── WellbeingChat.css
│   │   └── ProtectedRoute.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── Wellbeing.js
│   │   ├── Courses.js
│   │   ├── Timetable.js
│   │   ├── Reminders.js
│   │   └── Auth.css
│   ├── services/
│   │   └── api.js
│   ├── store/
│   │   └── store.js
│   ├── hooks/
│   │   └── useAuth.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── .env.local
```

## Key Features & Usage

### 1. Authentication Flow
- Login/Register pages handle user authentication
- Token stored in localStorage
- Protected routes redirect to login if not authenticated
- Automatic token attachment to all API requests

### 2. State Management (Zustand)
```javascript
// Using auth store
const { user, token, login, logout } = useAuthStore()

// Using mental health store
const { checkIns, stats, addCheckIn } = useMentalHealthStore()
```

### 3. API Calls
```javascript
// In any component
import { courseService, mentalHealthService } from '../services/api'

// Make requests
const courses = await courseService.getCourses()
const checkIns = await mentalHealthService.getCheckInHistory()
```

### 4. Notifications
```javascript
import toast from 'react-hot-toast'

toast.success('Success message')
toast.error('Error message')
toast.loading('Loading...')
```

## Component Documentation

### Sidebar Component
- Navigation between main pages
- Active page highlighting
- User logout
- Responsive collapsing on mobile

### Header Component
- Page title display
- User profile info
- Mobile menu toggle

### Card Component
- Reusable container with shadow
- Consistent spacing and styling
- Used for all content containers

### WellbeingChat Component
- Mood selection interface
- Stress level slider
- Activity selection
- Notes textarea
- AI response display

### ProtectedRoute Component
- Wraps protected pages
- Redirects to login if not authenticated
- Checks localStorage token

## Styling System

### CSS Variables (in globals.css)
```css
--primary-color: #6366f1
--primary-dark: #4f46e5
--secondary-color: #10b981
--danger-color: #ef4444
--warning-color: #f59e0b
--text-primary: #2c3e50
--text-secondary: #718096
--border-color: #e2e8f0
```

### Responsive Breakpoints
- Mobile: < 768px
- Tablet/Desktop: ≥ 768px

### Common Classes
```css
.container /* max-width container */
.grid, .grid-2, .grid-3 /* grid layouts */
.card /* card styling */
.btn-primary, .btn-secondary /* buttons */
```

## Common Tasks

### Adding a New Page

1. Create page component in `src/pages/NewPage.js`
2. Create styling in `src/pages/NewPage.css`
3. Add route in `App.js`
4. Add navigation in `Sidebar.js`

Example:
```javascript
// NewPage.js
import React from 'react'
import Card from '../components/Card'
import './NewPage.css'

const NewPage = () => {
  return (
    <div className="new-page">
      <Card>
        <h1>New Page</h1>
      </Card>
    </div>
  )
}

export default NewPage
```

### Making API Calls

1. Use service from `src/services/api.js`
2. Handle loading and error states
3. Show toast notifications

```javascript
import { courseService } from '../services/api'
import toast from 'react-hot-toast'

const [loading, setLoading] = useState(true)
const [courses, setCourses] = useState([])

useEffect(() => {
  const fetchCourses = async () => {
    try {
      const response = await courseService.getCourses()
      setCourses(response.data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error')
    } finally {
      setLoading(false)
    }
  }
  fetchCourses()
}, [])
```

### Adding Form Validation

```javascript
const [formData, setFormData] = useState({ name: '', email: '' })
const [errors, setErrors] = useState({})

const validateForm = () => {
  const newErrors = {}
  if (!formData.name) newErrors.name = 'Name is required'
  if (!formData.email) newErrors.email = 'Email is required'
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = (e) => {
  e.preventDefault()
  if (validateForm()) {
    // Submit form
  }
}
```

## Troubleshooting

### API Connection Issues
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in .env.local
- Check browser console for CORS errors
- Ensure token is valid in localStorage

### State Management Issues
- Use React DevTools to inspect Zustand store
- Check component is wrapped with correct store
- Verify store selectors are correct

### Styling Issues
- Check CSS file is imported in component
- Verify CSS variable names match globals.css
- Use browser DevTools to inspect computed styles

### Performance Issues
- Use React DevTools Profiler
- Implement React.memo for expensive components
- Check for unnecessary re-renders
- Optimize images and assets

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Testing

### Unit Tests
Create `.test.js` files alongside components

```javascript
import { render, screen } from '@testing-library/react'
import Card from './Card'

test('renders card with children', () => {
  render(<Card>Test Content</Card>)
  expect(screen.getByText('Test Content')).toBeInTheDocument()
})
```

### E2E Tests
```bash
npm install --save-dev cypress
npx cypress open
```

## Deployment

### Vercel (Recommended for React)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy build/ folder to Netlify
```

### Traditional Hosting
```bash
npm run build
# Upload build/ folder to hosting provider
```

## Environment Variables

### Development (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Production (.env.production)
```
REACT_APP_API_URL=https://your-api-domain.com/api
```

## Performance Optimization

1. Code splitting with React.lazy()
2. Image optimization
3. CSS minification
4. Bundle analysis: `npm install -g webpack-bundle-analyzer`
5. Lazy load components
6. Memoize expensive computations

## Debugging Tips

1. **React DevTools**: Install browser extension
2. **Redux DevTools**: Monitor state changes
3. **Network Tab**: Check API calls
4. **Console**: Check for warnings/errors
5. **Lighthouse**: Performance audits
