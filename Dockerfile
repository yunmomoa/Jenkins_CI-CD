
# 실행용 최종 이미지
FROM openjdk:17
WORKDIR /app

# 빌드된 백엔드 jar 파일
COPY backend/final-project/target/final-project-0.0.1-SNAPSHOT.jar /app/final-project.jar

# 빌드된 프론트엔드 정적 파일
COPY frontend/react-practice-ts/dist ./frontend

# Nginx 설치
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Nginx 설정 복사
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Docker 이미지 라벨
LABEL maintainer="yunseong<cysbunker1202@naver.com>" \
      title="final-project" \
      version="$VERSION" \
      description="그룹웨어 서비스"

# 포트 및 환경변수
ENV APP_HOME /app
EXPOSE 80 8080
VOLUME /app/upload

# 컨테이너 실행 시: Nginx + Spring Boot 실행
CMD service nginx start && java -jar final-project.jar
