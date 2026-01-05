# Use official Node.js 20 image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
