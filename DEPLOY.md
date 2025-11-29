# 🚀 Deployment Guide

## Quick Deploy Options

### 1️⃣ **Railway (Recommended - All-in-One)**

**Why Railway?**
- ✅ FREE tier available
- ✅ Auto-deploys from GitHub
- ✅ Built-in MongoDB
- ✅ One-click setup
- ✅ Gets you a public URL instantly

**Steps:**
1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "Start a New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway auto-detects and deploys!
7. Get your URL: `https://your-app.up.railway.app`

**Time:** 5 minutes ⏱️

---

### 2️⃣ **Vercel + Render (Free Combo)**

**Frontend on Vercel:**
```bash
cd frontend
npx vercel
```
You'll get: `https://your-app.vercel.app`

**Backend on Render:**
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub
4. Add environment variables
5. Deploy!

You'll get: `https://your-api.onrender.com`

**Time:** 10 minutes ⏱️

---

### 3️⃣ **Docker (Any Platform)**

**Run locally:**
```bash
docker-compose up
```

**Deploy to any cloud:**
- AWS ECS
- Google Cloud Run
- DigitalOcean App Platform
- Azure Container Instances

**Time:** Varies by platform

---

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] MongoDB database ready (Atlas or local)
- [ ] Frontend API URL updated
- [ ] Backend CORS configured

---

## 🔗 Get Shareable Link

After deploying to Railway/Vercel/Render, you'll get a permanent URL like:

```
https://ai-mental-health.up.railway.app
```

Anyone can visit this URL and use your app!

---

## 🎯 Recommended: Railway

Railway is the fastest way to get a shareable link:

1. **Create GitHub repo** (if not done)
2. **Push code to GitHub**
3. **Connect Railway to GitHub**
4. **Click Deploy**
5. **Share the URL!**

**Your app will auto-update when you push to GitHub!** 🎉

---

## 💡 Tips

- Use MongoDB Atlas (free tier) for production database
- Add `.env` to `.gitignore` (already done)
- Never commit secrets to GitHub
- Enable HTTPS (automatic on Vercel/Railway)

---

**Need help? Check the main README.md for detailed instructions!**
