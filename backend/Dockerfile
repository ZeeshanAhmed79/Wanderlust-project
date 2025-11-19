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
# -------- Stage 1: Build --------
    FROM node:21 AS builder

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install --production=false
    
    COPY . .
    
    # RUN npm run test   # optional
    
    # -------- Stage 2: Production --------
    FROM node:21-slim
    
    WORKDIR /app
    
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/src ./src
    
    EXPOSE 8080
    CMD ["npm", "start"]
    

    