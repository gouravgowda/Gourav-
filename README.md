# 🎨 AI Mental Health Student Companion

A premium, AI-powered mental health and productivity tracking application for students with stunning UI/UX and advanced sentiment analysis.

![Premium UI](https://img.shields.io/badge/UI-Premium-blueviolet) ![AI Powered](https://img.shields.io/badge/AI-Powered-success) ![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

## ✨ Features

### 🎨 **Ultra-Premium UI Design**
- **Glassmorphism Effects**: Frosted glass cards with backdrop blur
- **Vibrant Gradients**: Purple-pink-blue color schemes
- **3D Animations**: Floating icons, pulsing stats, hover lifts
- **Modern Design**: State-of-the-art web design patterns

### 🧠 **Advanced AI Capabilities**
- **5-Emotion Detection**: Joy, Sadness, Anger, Fear, Surprise
- **Weighted Stress Analysis**: Multi-tier keyword system
- **Wellness Score**: Multi-factor health calculation
- **Personalized Tips**: Context-aware recommendations

### 📊 **Core Features**
- Mental health check-ins with AI responses
- Course management and progress tracking
- Attendance monitoring
- Reminder system with priorities
- Mood distribution analytics
- Sleep and stress tracking

---

## 🚀 Quick Start

### **Option 1: One-Click Deploy to Railway**

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

1. Click the button above
2. Connect your GitHub account
3. Railway will auto-deploy both frontend and backend
4. Get your live URL in 2 minutes!

---

### **Option 2: Run Locally with Docker**

**Prerequisites:**
- Docker Desktop installed
- Nothing else needed!

**Run:**
```bash
# Clone repository
git clone <your-repo-url>
cd ai mental tracking

# Start everything
docker-compose up
```

**Access:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

### **Option 3: Manual Setup**

**Prerequisites:**
- Node.js 18+ installed
- MongoDB installed (or use MongoDB Atlas)

**Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URL
npm run dev
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm start
```

---

## 📦 Technology Stack

### **Frontend**
- React 18
- React Router DOM
- Recharts (Data visualization)
- Zustand (State management)
- React Hot Toast (Notifications)
- Axios (API calls)

### **Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Sentiment Analysis (NLP)
- Socket.io (Real-time features)

### **Design**
- Custom CSS with 400+ lines design system
- Google Fonts (Inter)
- Glassmorphism & Gradients
- 15+ Keyframe animations

---

## 🎯 Project Structure

```
ai mental tracking/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # AI & business logic
│   │   └── middleware/     # Auth & validation
│   ├── server.js           # Entry point
│   └── package.json
│
├── frontend/               # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # Global styles
│   │   ├── services/      # API services
│   │   └── store/         # Zustand store
│   └── package.json
│
├── docker-compose.yml     # Docker configuration
├── .env.example          # Environment template
└── README.md             # This file
```

---

## 🎨 Design Highlights

### **Glassmorphism Cards**
```css
- Backdrop blur: 20px
- Semi-transparent surfaces
- Elegant white borders
- Smooth shadows
```

### **Animations**
```css
- Rotating gradients (20s)
- Floating icons (3s bounce)
- 3D hover lifts (12px)
- Pulsing numbers (2s)
- Shine sweep effects
```

### **Color Palette**
```
Primary: #667eea → #764ba2 (Purple gradient)
Secondary: #10b981 → #059669 (Green gradient)
Accent: #f093fb (Pink)
Background: #f5f7fa → #c3cfe2 (Blue gradient)
```

---

## 🧠 AI Features

### **Emotion Detection**
- 42 keyword mappings
- 5 emotion categories
- Confidence scoring
- Primary emotion identification

### **Stress Analysis**
- 3-tier weighted system
- High/Medium/Low stress keywords
- 0-10 scale output

### **Wellness Algorithm**
```
Score = (Mood × 0.4) + (Stress × 0.3) + (Sleep × 0.2) + (Activities × 0.1)
```

### **Personalized Responses**
- 15 unique response templates
- Emotion-specific additions
- Stress-level advice
- Actionable tips

---

## 🔐 Environment Variables

Create a `.env` file in the backend directory:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/student-companion

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this

# Server
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

---

## 📸 Screenshots

### Dashboard
- Hero header with rotating gradients
- 4 metric cards with 3D effects
- Interactive charts
- Color-coded reminders

### Wellbeing Page
- AI chat interface
- Emotion tracking
- Activity selection
- Check-in history

---

## 🐳 Docker Deployment

**Build and run:**
```bash
docker-compose up --build
```

**Stop:**
```bash
docker-compose down
```

**Production build:**
```bash
docker-compose -f docker-compose.prod.yml up
```

---

## 🌐 Deployment Guides

### **Railway**
1. Push code to GitHub
2. Connect Railway to repo
3. Add environment variables
4. Auto-deploys on push

### **Vercel (Frontend) + Render (Backend)**
1. Frontend: Deploy to Vercel
2. Backend: Deploy to Render
3. Update API URLs

### **Heroku**
1. Install Heroku CLI
2. `heroku create`
3. `git push heroku main`

---

## 🛠️ Development

### **Backend Development**
```bash
cd backend
npm run dev    # Starts with nodemon
npm test       # Run tests
npm run lint   # Check code quality
```

### **Frontend Development**
```bash
cd frontend
npm start      # Development server
npm run build  # Production build
npm test       # Run tests
```

---

## 📝 API Documentation

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### **Mental Health**
- `POST /api/mental-health/checkin` - Create check-in
- `GET /api/mental-health/history` - Get check-in history
- `GET /api/mental-health/stats` - Get statistics

### **Courses**
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

---

## 🎨 Design Credits

- **Typography**: Inter (Google Fonts)
- **Icons**: React Icons (Ionicons 5)
- **Charts**: Recharts
- **Design System**: Custom CSS with modern patterns

---

## 📊 Performance

- ✅ **0 errors, 0 warnings** in compilation
- ✅ **Fast load times** with optimized bundles
- ✅ **Smooth animations** at 60fps
- ✅ **Responsive design** for all devices

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Modern web design inspiration
- AI/ML community for sentiment analysis techniques
- Student mental health advocacy groups

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for student mental well-being**

🎨 **Premium Design** | 🧠 **Smart AI** | 🚀 **Production Ready**
