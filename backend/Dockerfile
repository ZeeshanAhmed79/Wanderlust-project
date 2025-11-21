# # # Stage 1
# # FROM node:21 AS backend-builder

# # # setup the working dir
# # WORKDIR /app

# # # code
# # COPY . .

# # # packages install
# # RUN npm i

# # # tests
# # RUN npm run test

# # # Stage 2
# # FROM node:21-slim

# # # setup the working dir
# # WORKDIR /app

# # # copy the above stage as compressed
# # COPY --from=backend-builder /app .

# # COPY .env.docker .env

# # # Port
# # EXPOSE 8080

# # # App
# # CMD ["npm", "start"]

# # ---------------- Stage 1: Builder ----------------
# # -------- Stage 1: Build --------
# # ------------ Stage 1: Build ------------
#     # FROM node:21 AS builder

#     # WORKDIR /app
    
#     # COPY package*.json ./
#     # RUN npm install --production=false
    
#     # COPY . .
    
#     # FROM node:21-slim
    
#     # WORKDIR /app
    
#     # COPY --from=builder /app ./
    
#     # EXPOSE 8080
#     # CMD ["npm", "start"]
    


# # Stage 1: Builder
# FROM node:21 AS builder
# WORKDIR /app

# COPY package*.json ./
# RUN npm install --production=false

# COPY . .

# # Stage 2: Production
# FROM node:21-slim
# WORKDIR /app

# COPY --from=builder /app ./

# EXPOSE 8080
# CMD ["npm", "start"]



# ---------------------------
# STAGE 1 — Builder
# ---------------------------
    FROM node:21 AS builder
    WORKDIR /app
    
    # Install dependencies
    COPY package*.json ./
    RUN npm ci --omit=dev
    
    # Copy app source
    COPY . .
    
    # ---------------------------
    # STAGE 2 — Production Image
    # ---------------------------
    FROM node:21-slim
    WORKDIR /app
    
    ENV NODE_ENV=production
    
    # Copy only production deps + source code
    COPY --from=builder /app ./
    
    # Expose backend port
    EXPOSE 8080
    
    # Start the server
    CMD ["npm", "start"]
    

