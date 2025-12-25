# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies only if package files change
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set ownership
COPY --from=builder --chown=nextjs:nodejs /app/.output ./dist
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Switch to non-root user
USER nextjs

# Install only production dependencies
RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund

EXPOSE 3000

# Start the app
CMD ["node", "dist/server/index.mjs"]
