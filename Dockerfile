# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install git (needed to clone)
RUN apk add --no-cache git

# Build argument for branch (default to main if not specified)
ARG BRANCH=docker

# Clone the repository and checkout the branch
RUN git clone --branch $BRANCH https://github.com/macxwhale/no-as-a-service.git . 

# Install dependencies
RUN npm install --production

# Expose the port (default 3000)
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Start the app
CMD ["npm", "start"]
