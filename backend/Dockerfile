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
# ---------------------------
# STAGE 1 — Builder
# ---------------------------
    FROM node:21 AS builder
    WORKDIR /app
    
    # Copy only package files
    COPY package*.json ./
    
    # Install ALL dependencies (ignore lockfile mismatches)
    RUN npm install --legacy-peer-deps
    
    # Copy full source code
    COPY . .
    
    # ---------------------------
    # STAGE 2 — Production Image
    # ---------------------------
    FROM node:21-slim
    WORKDIR /app
    
    ENV NODE_ENV=production
    
    # Copy only required files from builder
    COPY --from=builder /app ./
    
    # Install only production deps
    RUN npm prune --production
    
    EXPOSE 8080
    
    CMD ["npm", "start"]
    
    

