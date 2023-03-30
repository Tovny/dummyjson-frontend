FROM node:18-alpine

# Install GIT
RUN apk add --no-cache git

# Set environment to development
ENV NODE_ENV="development"

# Install global dependencies
RUN npm install -g @angular/cli
