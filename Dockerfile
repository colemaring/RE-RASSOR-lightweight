# Use the official Node.js image as a base
FROM node:18

# Install PM2 globally
RUN npm install -g pm2

# Set the working directory inside the container
WORKDIR /app

# Install Git (required for cloning the repository)
RUN apt-get update && apt-get install -y git

# Clone the repository into the container
RUN git clone https://github.com/colemaring/RE-RASSOR-lightweight.git .

# Navigate to the client directory, install dependencies, and build with Vite
WORKDIR /app/client
RUN npm install
RUN npm run build

# Navigate to the server directory and install dependencies
WORKDIR /app/server
RUN npm install
RUN npm install ws

# Expose ports for HTTP (8080) and HTTPS (443)
EXPOSE 8080 443 80

# Start the server using pm2 to manage the process
CMD ["pm2-runtime", "server.js", "--", "dev"]
