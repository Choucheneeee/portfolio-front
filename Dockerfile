FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
# Install all dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npx next build

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership of app files
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

EXPOSE 3000

CMD ["npx", "next", "start"]