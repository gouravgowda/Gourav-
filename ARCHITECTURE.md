# Architecture & System Design

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER (React)                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Components: Sidebar, Header, Card, WellbeingChat, etc.  │   │
│  │ Pages: Dashboard, Courses, Timetable, Wellbeing, etc.   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↕                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ State Management (Zustand)                               │   │
│  │ - Auth Store | Mental Health | Courses | Reminders     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↕                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ API Service Layer (Axios)                                │   │
│  │ - authService | mentalHealthService | courseService     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────────┐
│                     API LAYER (Express.js)                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Routes: auth, mental-health, courses, timetable, etc.   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Middleware: Authentication, Validation, Error Handling  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Controllers: authController, courseController, etc.     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Services: sentimentService, authService                 │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ MongoDB Driver
┌─────────────────────────────────────────────────────────────────┐
│                    DATA LAYER (MongoDB)                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Collections:                                             │   │
│  │ - users | courses | attendance | timetables            │   │
│  │ - mentalhealthcheckins | reminders                      │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow Diagram

### Mental Health Check-in Flow
```
User Input (Mood, Stress, Notes)
    ↓
React Component (WellbeingChat)
    ↓
Zustand Store (useMentalHealthStore)
    ↓
API Service (mentalHealthService.createCheckIn)
    ↓
Express Route (POST /api/mental-health/checkin)
    ↓
Middleware (authenticateToken)
    ↓
Controller (mentalHealthController.createCheckIn)
    ↓
Service (sentimentService.analyzeSentiment)
    ↓ AI Analysis + Response Generation
    ↓
MongoDB (Save MentalHealthCheckIn)
    ↓
Update User (Update stress level, health score)
    ↓
Response with AI Message
    ↓
Update Store + Toast Notification
    ↓
UI Update with Response
```

### Course Management Flow
```
User Creates Course
    ↓
Form Submission (Courses.js)
    ↓
API Call (courseService.createCourse)
    ↓
Backend Validation
    ↓
MongoDB Save
    ↓
Response + Success Toast
    ↓
Fetch Updated Courses
    ↓
Update Zustand Store
    ↓
Re-render Course List
```

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  1. User Registers                                       │
│     ↓                                                    │
│     - Form submission to /auth/register                  │
│     - Password hashed with bcryptjs (salt rounds: 10)   │
│     - User saved to MongoDB                             │
│     - JWT token generated                               │
│     - Token sent to frontend                            │
│     - Token stored in localStorage                      │
│                                                           │
│  2. User Login                                           │
│     ↓                                                    │
│     - Credentials sent to /auth/login                    │
│     - Password compared with hash                       │
│     - On success: JWT generated                         │
│     - Token stored in localStorage                      │
│                                                           │
│  3. Authenticated Requests                               │
│     ↓                                                    │
│     - Token added to Authorization header              │
│     - Format: "Bearer <token>"                          │
│     - Backend verifies token with JWT_SECRET            │
│     - User ID extracted from token payload              │
│     - Request proceeds if valid, 403 if invalid         │
│                                                           │
│  4. Token Expiry (7 days)                                │
│     ↓                                                    │
│     - Expired token rejected                            │
│     - User redirected to login                          │
│     - localStorage token cleared                        │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## 🤖 AI Sentiment Analysis Architecture

```
┌──────────────────────────────────────────────────────┐
│          SENTIMENT ANALYSIS PIPELINE                  │
├──────────────────────────────────────────────────────┤
│                                                       │
│  INPUT: User Text + Mood + Stress Level             │
│    ↓                                                 │
│  1. SENTIMENT ANALYSIS                              │
│     - Use 'sentiment' npm library                    │
│     - Analyzes text for emotional tone              │
│     - Returns score (-1 to 1)                       │
│     - Returns comparative score                     │
│                                                      │
│  2. STRESS DETECTION                                │
│     - Keyword matching for stress indicators        │
│     - Count occurrences of: stressed, anxious, etc. │
│     - Convert to 0-10 scale                         │
│     - Combine with user input stress level          │
│                                                      │
│  3. RESPONSE GENERATION                             │
│     - Select response based on mood                 │
│     - Add stress-specific recommendations           │
│     - Personalize with user data                    │
│     - Template-based approach                       │
│                                                      │
│  OUTPUT: AI Response + Mental Health Data           │
│    ↓                                                 │
│  STORAGE: Save to MongoDB for trend analysis        │
│    ↓                                                 │
│  DASHBOARD: Display in mental health chart          │
│                                                      │
└──────────────────────────────────────────────────────┘

Response Templates:
- Excellent: Positive reinforcement
- Good: Encouragement
- Neutral: Support
- Poor: Wellness tips
- Terrible: Professional help suggestion
```

## 📱 Component Hierarchy

```
App
├── Login/Register (unauthenticated)
└── MainLayout (authenticated)
    ├── Sidebar (navigation)
    ├── Header (title + user info)
    └── MainContent
        ├── Dashboard
        │   ├── MetricCards
        │   ├── Charts (Recharts)
        │   ├── RemindersList
        │   └── QuickStats
        │
        ├── Wellbeing
        │   ├── WellbeingChat
        │   │   ├── MoodSelector
        │   │   ├── StressSlider
        │   │   ├── ActivityBadges
        │   │   └── AIResponse
        │   └── HistoryList
        │
        ├── Courses
        │   ├── CourseForm
        │   └── CourseGrid
        │       └── CourseCard
        │           ├── ProgressBar
        │           └── Assessments
        │
        ├── Timetable
        │   ├── ClassForm
        │   └── WeekGrid
        │       └── DayCard
        │           └── ClassItem
        │
        └── Reminders
            ├── ReminderForm
            ├── ActiveRemindersList
            │   └── ReminderCard
            └── CompletedRemindersList
```

## 🔄 State Management Strategy

### Zustand Stores

```javascript
// Auth Store - User authentication state
useAuthStore:
  - user: User object or null
  - token: JWT token
  - isLoggedIn: Boolean
  - login(user, token)
  - logout()
  - setUser(user)

// Mental Health Store - Well-being data
useMentalHealthStore:
  - checkIns: Array of check-ins
  - stats: Mental health statistics
  - loading: Boolean
  - setCheckIns(checkIns)
  - setStats(stats)
  - addCheckIn(checkIn)

// Course Store - Academic data
useCourseStore:
  - courses: Array of courses
  - courseStats: Statistics
  - loading: Boolean
  - setCourses(courses)
  - setCourseStats(stats)
  - addCourse(course)

// Reminder Store - Task data
useReminderStore:
  - reminders: Array of reminders
  - upcomingReminders: Filtered reminders
  - loading: Boolean
  - setReminders(reminders)
  - addReminder(reminder)

// UI Store - UI state
useUIStore:
  - sidebarOpen: Boolean
  - currentPage: String
  - notificationCount: Number
  - toggleSidebar()
  - setCurrentPage(page)
```

## 🌐 API Request/Response Pattern

```javascript
// Request Format
{
  method: 'GET/POST/PUT/DELETE/PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <token>'
  },
  body: { /* data */ }
}

// Success Response (2xx)
{
  "message": "Operation successful",
  "data": { /* result */ },
  "token": "jwt_token (on login/register)"
}

// Error Response (4xx/5xx)
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 📈 Database Indexing Strategy

```javascript
// Recommended indexes for performance
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ studentId: 1 }, { sparse: true })

db.mentalhealthcheckins.createIndex({ userId: 1, createdAt: -1 })
db.mentalhealthcheckins.createIndex({ createdAt: -1 })

db.courses.createIndex({ userId: 1, createdAt: -1 })
db.attendance.createIndex({ userId: 1, courseId: 1, date: -1 })
db.timetable.createIndex({ userId: 1, dayOfWeek: 1 })
db.reminders.createIndex({ userId: 1, reminderDate: 1 })
db.reminders.createIndex({ userId: 1, isCompleted: 1 })
```

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│           PRODUCTION DEPLOYMENT                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Frontend (React)                                   │
│  ├─ Hosted on: Vercel / Netlify / AWS S3+CloudFront
│  └─ CDN for static assets                          │
│                                                      │
│  Backend (Node.js/Express)                          │
│  ├─ Hosted on: Heroku / AWS EC2 / DigitalOcean    │
│  ├─ PM2 for process management                     │
│  └─ Nginx as reverse proxy                         │
│                                                      │
│  Database (MongoDB)                                 │
│  ├─ MongoDB Atlas (Cloud)                          │
│  ├─ Automatic backups                              │
│  └─ Replica sets for redundancy                    │
│                                                      │
│  SSL/HTTPS                                          │
│  └─ Let's Encrypt certificates                     │
│                                                      │
│  Monitoring                                         │
│  ├─ Application logs                               │
│  ├─ Error tracking (Sentry)                        │
│  └─ Performance monitoring                         │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## 🔒 Security Architecture

```
┌─────────────────────────────────────────────────────┐
│          SECURITY LAYERS                             │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. FRONTEND                                        │
│     ├─ HTTPS only                                   │
│     ├─ XSS prevention                               │
│     ├─ CSRF tokens                                  │
│     └─ Secure cookie storage                        │
│                                                      │
│  2. NETWORK                                         │
│     ├─ CORS configuration                           │
│     ├─ Rate limiting                                │
│     └─ WAF (Web Application Firewall)              │
│                                                      │
│  3. API                                             │
│     ├─ JWT authentication                           │
│     ├─ Input validation                             │
│     ├─ SQL injection prevention                     │
│     └─ Password hashing (bcryptjs)                  │
│                                                      │
│  4. DATABASE                                        │
│     ├─ MongoDB user authentication                  │
│     ├─ Database encryption                          │
│     ├─ Backups                                      │
│     └─ Access control                               │
│                                                      │
│  5. DATA                                            │
│     ├─ PII encryption                               │
│     ├─ Audit logs                                   │
│     └─ GDPR compliance                              │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## 📊 Performance Optimization

```
Frontend Optimization:
├─ Code splitting with React.lazy()
├─ Image optimization & lazy loading
├─ Minification & compression
├─ Service workers for offline
├─ Caching strategies
└─ Performance monitoring

Backend Optimization:
├─ Database indexing
├─ Query optimization
├─ Caching (Redis)
├─ Connection pooling
├─ Gzip compression
└─ Load balancing

Database Optimization:
├─ Proper indexing
├─ Query analysis
├─ Data pagination
├─ Aggregation pipelines
└─ Regular maintenance
```

## 🔄 Scalability Considerations

```
Horizontal Scaling:
├─ Multiple backend servers
├─ Load balancer (Nginx/HAProxy)
├─ Database replication
├─ Cache distribution (Redis Cluster)
└─ CDN for static assets

Vertical Scaling:
├─ Increase server resources
├─ Database instance upgrades
├─ More RAM for caching
└─ Better CPU for computation

Monitoring & Alerting:
├─ Application monitoring
├─ Infrastructure monitoring
├─ Error tracking
├─ Performance metrics
└─ Alert thresholds
```
