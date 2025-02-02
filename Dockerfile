# Use the Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the application code
COPY . .

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["node", "src/index.js"]