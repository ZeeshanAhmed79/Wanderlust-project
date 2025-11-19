# # # # ------------------- Stage 1: Build Stage ------------------------------
# # # FROM node:21 AS frontend-builder

# # # # Set the working directory to /app
# # # WORKDIR /app

# # # # Copy the package.json and package-lock.json for dependency installation
# # # COPY package*.json ./

# # # # Install dependencies
# # # RUN npm install

# # # # Copy the rest of the application code
# # # COPY . .

# # # # ------------------- Stage 2: Final Stage ------------------------------
# # # FROM node:21-slim

# # # # Set the working directory to /app
# # # WORKDIR /app

# # # # Copy built assets and dependencies from frontend-builder stage
# # # COPY --from=frontend-builder /app .

# # # # Copy the .env.sample file to .env.local
# # # COPY .env.docker .env.local

# # # # Expose port 5173 for the Node.js application
# # # EXPOSE 5173

# # # # Define the default command to run the application in development mode
# # # CMD ["npm", "run", "dev", "--", "--host"]


# # # ------------------- Stage 1: Build Stage ------------------------------
# # # ------------------- Stage 1: Build Stage ------------------------------
# #     FROM node:21 AS frontend-builder

# #     WORKDIR /app
    
# #     COPY package*.json ./
# #     RUN npm install
    
# #     # Copy source code
# #     COPY . .
    
# #     # Copy env file BEFORE build
# #     COPY .env.docker .env.production
    
# #     # Build the production frontend
# #     RUN npm run build
    
# #     # ------------------- Stage 2: Final Stage ------------------------------
# #     FROM nginx:alpine
    
# #     # Copy build output to Nginx
# #     COPY --from=frontend-builder /app/dist /usr/share/nginx/html
    
# #     # Expose port 80
# #     EXPOSE 80
    
# #     CMD ["nginx", "-g", "daemon off;"]


# # ------------------- Stage 1: Build Stage ------------------------------
#     FROM node:21 AS frontend-builder

#     WORKDIR /app
    
#     COPY package*.json ./
#     RUN npm install
    
#     COPY . .
    
#     # Copy env file that contains VITE_API_PATH BEFORE BUILD
#     COPY .env.docker .env.production
    
#     # Build the frontend
#     RUN npm run build
    
#     # ------------------- Stage 2: Final Stage ------------------------------
#     FROM nginx:alpine
    
#     WORKDIR /usr/share/nginx/html
    
#     COPY --from=frontend-builder /app/dist .
    
#     EXPOSE 80
#     CMD ["nginx", "-g", "daemon off;"]
    
    

# ------------ Build Stage ------------
    FROM node:21 AS frontend-builder

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    
    # Vite will read env from process.env injected at build time
    RUN npm run build
    
    # ------------ Nginx Stage ------------
    FROM nginx:alpine
    
    RUN rm -rf /usr/share/nginx/html/*
    
    COPY --from=frontend-builder /app/dist /usr/share/nginx/html
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    