# Use an official Node.js runtime as a parent image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . /app

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["node", "index.mjs"]
