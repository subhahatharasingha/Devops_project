# Use Node.js for backend
FROM node:22

WORKDIR /app

# Copy backend dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of backend code
COPY . .

# Expose API port
EXPOSE 4000

# Start backend server
CMD ["npm", "start"]
