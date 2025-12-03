Madrasa Master Backend - Complete Package

Quick start (local):
1. npm install
2. export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
3. create .env from .env.example
4. npm run dev

Deploy to Firebase App Hosting:
1. Push repo to GitHub main
2. Connect repo in Firebase App Hosting -> Backend
3. Add secrets in Secret Manager: JWT_SECRET, AGENT_COMMISSION_PERCENT
4. Map secrets in App Hosting -> Environment
5. Create Rollout
