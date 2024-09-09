# Use the official Node.js image as the base image
FROM node:22.8.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Start the Node.js application
CMD ["yarn", "start"]