# --- Stage 1: Build Frontend ---
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# --- Stage 2: Build Backend & Serve ---
FROM node:18-alpine
WORKDIR /app

# Copy backend package files and install
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copy backend source
COPY backend/ ./backend/

# Copy built frontend assets to backend public directory
# (Assuming the backend is configured to serve static files from 'public')
COPY --from=frontend-builder /app/frontend/dist ./backend/public

# Set Environment Variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Start server
WORKDIR /app/backend
CMD ["npm", "start"]
