# Backend Setup & Configuration

## Installation

1. **Install MongoDB**
   - Local installation: https://docs.mongodb.com/manual/installation/
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

2. **Navigate to backend directory**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/student-companion
   JWT_SECRET=your_secure_secret_key_here
   NODE_ENV=development
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Database Structure

### Collections

#### users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  studentId: String,
  university: String,
  department: String,
  avatar: String,
  stressLevel: Number (0-100),
  mentalHealthScore: Number (0-100),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### courses
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  code: String,
  instructor: String,
  credits: Number,
  grade: String,
  completionPercentage: Number (0-100),
  assessments: [{
    name: String,
    type: String,
    dueDate: Date,
    marks: Number,
    totalMarks: Number,
    completed: Boolean
  }],
  startDate: Date,
  endDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### attendance
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  courseId: ObjectId (ref: Course),
  date: Date,
  status: String (present/absent/late/excused),
  remarks: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### timetables
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  courseId: ObjectId (ref: Course),
  dayOfWeek: String,
  startTime: String (HH:MM),
  endTime: String (HH:MM),
  location: String,
  instructor: String,
  classType: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### mentalhealthcheckins
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  mood: String,
  stressLevel: Number (1-10),
  sleepHours: Number,
  activities: [String],
  notes: String,
  sentimentScore: Number (-1 to 1),
  aiResponse: String,
  responseGiven: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### reminders
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  description: String,
  type: String,
  reminderDate: Date,
  reminderTime: String,
  isCompleted: Boolean,
  notificationSent: Boolean,
  frequency: String,
  priority: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Testing

### Using Postman

1. **Create collection** for "Student Companion API"

2. **Environment variables**
   ```
   {{base_url}} = http://localhost:5000/api
   {{token}} = (set after login)
   ```

3. **Register User**
   ```
   POST {{base_url}}/auth/register
   Body: {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "studentId": "STU123456",
     "university": "XYZ University",
     "department": "Computer Science"
   }
   ```

4. **Login**
   ```
   POST {{base_url}}/auth/login
   Body: {
     "email": "john@example.com",
     "password": "password123"
   }
   Response: { token: "jwt_token_here" }
   ```

5. **Create Check-in**
   ```
   POST {{base_url}}/mental-health/checkin
   Headers: Authorization: Bearer {{token}}
   Body: {
     "mood": "good",
     "stressLevel": 5,
     "sleepHours": 7,
     "activities": ["exercise", "study"],
     "notes": "Had a productive day today"
   }
   ```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` (local) or check MongoDB Atlas
- Verify MONGODB_URI in .env is correct

### JWT Errors
- Check JWT_SECRET is set in .env
- Ensure token is sent in Authorization header as "Bearer token"

### Port Already in Use
- Change PORT in .env or kill process using port 5000
- Linux/Mac: `lsof -i :5000` then `kill -9 <PID>`
- Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

## Performance Tips

1. **Add database indexes** for frequently queried fields
2. **Implement pagination** for list endpoints
3. **Cache responses** for frequently accessed data
4. **Monitor database queries** with MongoDB Compass
5. **Use connection pooling** with MongoDB

## Security Best Practices

1. **Never commit .env** - add to .gitignore
2. **Use strong JWT secret** - minimum 32 characters
3. **Validate all inputs** on backend
4. **Rate limit API** endpoints
5. **Use HTTPS** in production
6. **Enable CORS** only for trusted origins
7. **Implement request size limits**

## Deployment

### Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add MongoDB Atlas URI
heroku config:set MONGODB_URI=your_atlas_uri

# Deploy
git push heroku main
```

### AWS/Azure Deployment
- Use EC2/App Service for Node.js
- Use RDS or CosmosDB for MongoDB
- Set environment variables in deployment console
