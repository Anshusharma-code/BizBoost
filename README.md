#  BizBoost AI

BizBoost AI is an AI-powered marketing assistant designed to help small businesses generate high-quality marketing content, analyze customer reviews, and create promotional campaigns with the power of Google Gemini AI.

The platform enables business owners to create social media posts, WhatsApp campaigns, website content, review insights, and festival marketing campaigns from a single dashboard.

---

##  Features

###  Authentication
- User Registration
- User Login
- JWT-Based Authentication
- Protected Routes

### Business Profile
- Store Business Information
- Business Type Management
- Contact Information
- Social Media Links

###  Content Studio
Generate:
- Social Media Posts
- WhatsApp Campaigns
- Website Content
- Marketing Content

### Review Insights
- Customer Review Analysis
- AI-Powered Sentiment Insights
- Strength Identification
- Improvement Suggestions

###  Poster Studio
- Festival Campaign Generation
- Promotional Campaign Ideas
- Marketing Poster Content

### History Management
- Save Generated Content
- View Previous Generations
- Content Tracking

---

##  Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React

### Backend
- FastAPI
- Python
- SQLAlchemy
- Pydantic

### Database
- PostgreSQL
- Neon Database

### Authentication
- JWT (JSON Web Tokens)
- Passlib
- Bcrypt

### AI Integration
- Google Gemini API

### Deployment
- Vercel (Frontend)
- Render (Backend)
- Neon (Database)

---

## Project Structure


bizboost-ai/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── db/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   └── requirements.txt
│
└── README.md

⚙️ Installation
1. Clone Repository
git clone https://github.com/Anshusharma-code/bizboost-ai.git
cd bizboost-ai
Backend Setup
Create Virtual Environment
python -m venv venv
Activate Environment

Windows:

venv\Scripts\activate

Linux/Mac:

source venv/bin/activate
Install Dependencies
pip install -r requirements.txt

Run Backend
uvicorn app.main:app --reload

Backend runs at:

http://localhost:8000

Frontend Setup

Navigate to frontend:

cd frontend

Install dependencies:

npm install



Run frontend:

npm run dev

Frontend runs at:

http://localhost:5173


Database Tables
Users

Stores:

Name
Email
Password
Business Profiles

Stores:

Business Name
Business Type
Contact Details
Social Media Links
Content History

Stores:

Generated Content
Prompts
Content Type
Review Analysis

Stores:

Customer Reviews
AI Insights
Poster History

Stores:

Festival Campaigns
Generated Posters
 Security
Password Hashing using Bcrypt
JWT Authentication
Protected Routes
Environment Variable Management
 
 Deployment
 
 Frontend
Deploy using:
Vercel

Backend
Deploy using:
Render

Database
Hosted on:
Neon PostgreSQL
 
 Future Enhancements
AI Image Generation
Social Media Auto Posting
Multi-Language Support
Analytics Dashboard
Mobile Application
Team Collaboration

 
 Author :Anshu (Full Stack Developer)

Built using React, FastAPI, PostgreSQL, and Google Gemini AI.