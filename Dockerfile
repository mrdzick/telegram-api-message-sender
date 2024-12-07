# Use the official Node.js image from Docker Hub
FROM node:20.18.1-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of your application files into the container
COPY . .

# Expose the port your app will run on (default is 3000 for Node.js apps)
EXPOSE 8080

# Set the entry point to your app.js file
CMD ["node", "src/index.js"]
