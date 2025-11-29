# 🚀 Quick Start Guide

## ⏱️ 5-Minute Setup

### Prerequisites
- Node.js v14+ installed
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone & Navigate
```bash
cd ai\ mental\ tracking
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env - set MongoDB URI and JWT Secret
# MONGODB_URI=mongodb://localhost:27017/student-companion
# JWT_SECRET=your-secret-key-123

# Start server
npm run dev
# Should show: ✓ Connected to MongoDB
#             🚀 Server is running on port 5000
```

### Step 3: Setup Frontend (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start React app
npm start
# Should open http://localhost:3000 automatically
```

### Step 4: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

### Step 5: Test Login

1. Click "Sign up here" on login page
2. Register with test credentials:
   - Name: Test Student
   - Email: test@example.com
   - Password: test123
   - Student ID: STU001
   - University: Test University
   - Department: Computer Science

3. Click "Sign Up"
4. You should be redirected to Dashboard

## 🎯 First Steps in App

1. **Dashboard**: View your overview
2. **Well-being**: Click "Send Check-in" to start mood tracking
3. **Courses**: Add a course to get started
4. **Timetable**: Add your weekly classes
5. **Reminders**: Create reminders for assignments

## 🐛 Common Issues

### "MongoDB connection failed"
```bash
# Make sure MongoDB is running
# For local: mongod
# For Atlas: check connection string in .env
```

### "Port 3000 already in use"
```bash
# Kill the process on port 3000
# Linux/Mac: lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
# Windows: netstat -ano | findstr :3000
```

### "API calls failing (CORS)"
```bash
# Restart backend with CORS enabled
# Already configured in server.js
```

### "Blank page on frontend"
```bash
# Check browser console for errors (F12)
# Verify backend is running: curl http://localhost:5000/api/health
# Clear browser cache: Ctrl+Shift+Del
```

## 📊 Test Features

### Mental Health Check-in
1. Go to Well-being page
2. Select mood (😊 good)
3. Set stress level (5/10)
4. Enter sleep hours (7)
5. Select activities
6. Add notes about your day
7. Get AI-generated response

### Add Course
1. Go to Courses page
2. Click "Add Course"
3. Enter course name: "Data Structures"
4. Enter code: "CS201"
5. Instructor: "Dr. Smith"
6. Credits: 4
7. Click "Add Course"

### Create Reminder
1. Go to Reminders page
2. Click "Add Reminder"
3. Title: "Complete Assignment"
4. Type: Assignment
5. Priority: High
6. Date & Time
7. Click "Create Reminder"

## 📈 Next Steps

1. **Explore Dashboard**: See analytics and metrics
2. **Track Mental Health**: Regular check-ins
3. **Manage Courses**: Add all your courses
4. **Create Timetable**: Add all classes
5. **Set Reminders**: Never miss important dates

## 💡 Tips

- **Daily Check-ins**: Best done morning or evening
- **Course Progress**: Update weekly
- **Backup Data**: Regular MongoDB backups
- **Browser**: Works best on Chrome/Firefox

## 🎓 Educational Notes

### AI Sentiment Analysis
- Detects mood from your text
- Identifies stress keywords
- Generates personalized responses
- Tracks sentiment trends

### Mental Health Metrics
- Stress level (1-10)
- Sleep hours
- Mood distribution
- Activity tracking

### Academic Tracking
- Attendance percentage
- Course completion
- Assessment grades
- Schedule overview

## 🆘 Need Help?

1. Check README.md for detailed info
2. Review BACKEND_SETUP.md for server issues
3. Review FRONTEND_SETUP.md for UI issues
4. Check console logs (Ctrl+Shift+J on frontend)
5. Test API with Postman at http://localhost:5000/api

## 📱 Demo User

After setup, you can use these credentials:
```
Email: demo@example.com
Password: demo123
```
(Create this user by signing up through the UI)

## 🎉 You're Ready!

The app is now running. Start by:
1. Creating your profile
2. Adding your courses
3. Setting up your timetable
4. Making your first well-being check-in

**Happy studying and remember to take care of your mental health! 💙**
