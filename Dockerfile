# Stage 1: Frontend Build
FROM node:22 as frontend-build
WORKDIR /app
COPY frontend/react-practice-ts ./
RUN npm install
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Stage 2: Backend Build
FROM maven:3.8.5-openjdk-17 as backend-build
WORKDIR /app
COPY backend/final-project ./
RUN mvn clean package -DskipTests

# Stage 3: Final Image
FROM openjdk:17-slim
WORKDIR /app

COPY --from=backend-build /app/target/*.jar ./final-project.jar
COPY --from=frontend-build /app/dist ./frontend

RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 8080
CMD service nginx start && java -jar final-project.jar
