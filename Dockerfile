# # Stage 1: Build the React frontend
# FROM node:18-alpine as frontend-build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2: Build the Spring Boot backend
# FROM maven:3.9.9-eclipse-temurin-17-alpine as backend-build
# WORKDIR /app
# COPY ai-edu-be/pom.xml .
# COPY ai-edu-be/src ./src
# RUN mvn clean package -DskipTests

# # Stage 3: Final image
# FROM eclipse-temurin:17-jre-alpine
# WORKDIR /app

# # Copy the built frontend files to the static directory of the backend
# COPY --from=frontend-build /app/dist ./static
# # Copy the built backend jar
# COPY --from=backend-build /app/target/*.jar app.jar

# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "app.jar"] 

FROM node:20-alpine

WORKDIR /app

# Copy package.json và package-lock.json trước để tối ưu cache Docker
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose cổng 5173 (cổng mặc định của Vite)
EXPOSE 5173

# Chạy Vite trên 0.0.0.0 để truy cập từ bên ngoài
CMD ["npm", "run", "dev", "--", "--host"]

