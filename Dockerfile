# Use the official Node.js image as a base
FROM node:18

RUN npm install -g pm2
RUN apt-get update && apt-get install -y git

WORKDIR /app

RUN git clone https://github.com/colemaring/RE-RASSOR-lightweight.git .

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app/server
RUN npm install

EXPOSE 8080 443 80

# If -e NODE_ENV=dev isnt specified
ENV NODE_ENV=production

# Start the server using pm2 to manage the process
CMD ["pm2-runtime", "server.js"]
