# Gunakan image Node.js LTS
FROM node:18

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package.json ./

# Install dependencies 
RUN npm install --production
RUN npm install -g nodemon  # Install nodemon secara global
RUN npm install -g prisma

# Salin kode aplikasi
COPY . .

# Expose port
EXPOSE 3000

# Start aplikasi
CMD ["nodemon", "index.js"]
