# ----------------------------
# Stage 1: Base - Common setup
# ----------------------------
FROM node:22-alpine3.20 AS base

WORKDIR /usr/src/app

# ----------------------------
# Stage 2: Builder - Build app
# ----------------------------
FROM base AS build

# Copy only dependency manifests first (better layer caching)
COPY package.json package-lock.json ./

# Install all deps (dev + prod)
RUN npm install --frozen-lockfile

# Copy rest of the source code
COPY . .

# Build the app
RUN npm run build


# ----------------------------
# Stage 3: Deploy - Production image
# ----------------------------
FROM base AS deploy

WORKDIR /usr/src/app

# Build-time metadata (via --build-arg)
ARG BUILD_DATE
ARG VERSION
ARG COMMIT_SHA
ARG ENVIRONMENT
ARG NODE_ENV

ARG GOOGLE_SPREADSHEET_ID
ARG GOOGLE_SERVICE_ACCOUNT_EMAIL
ARG GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY

# Export args as environment variables (runtime)
ENV BUILD_DATE=${BUILD_DATE} \
    VERSION=${VERSION} \
    COMMIT_SHA=${COMMIT_SHA} \
    ENVIRONMENT=${ENVIRONMENT} \
    NODE_ENV=${NODE_ENV:-production}\

    GOOGLE_SPREADSHEET_ID=${GOOGLE_SPREADSHEET_ID} \
    GOOGLE_SERVICE_ACCOUNT_EMAIL=${GOOGLE_SERVICE_ACCOUNT_EMAIL} \
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=${GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY}

# Copy dependency manifests and install only production deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && \
    npm cache clean --force

# Copy built assets from builder
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/assets ./assets

# Run as non-root for better security
# USER caserita-stg

# Expose application port
EXPOSE 4040

# Start the application
CMD ["node", "dist/index.js"]
