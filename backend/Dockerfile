# # Stage 1
# FROM node:21 AS backend-builder

# # setup the working dir
# WORKDIR /app

# # code
# COPY . .

# # packages install
# RUN npm i

# # tests
# RUN npm run test

# # Stage 2
# FROM node:21-slim

# # setup the working dir
# WORKDIR /app

# # copy the above stage as compressed
# COPY --from=backend-builder /app .

# COPY .env.docker .env

# # Port
# EXPOSE 8080

# # App
# CMD ["npm", "start"]

# ---------------- Stage 1: Builder ----------------
    FROM node:21 AS builder

    WORKDIR /app
    
    # Copy package files
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install
    
    # Copy source code
    COPY . .
    
    # Run tests (optional)
    # RUN npm run test
    
    # ---------------- Stage 2: Production Image ----------------
    FROM node:21-slim
    
    WORKDIR /app
    
    # Copy only necessary build artifacts
    COPY --from=builder /app ./
    
    # Copy production environment file
    COPY .env.production .env
    
    EXPOSE 8080
    
    CMD ["npm", "start"]    