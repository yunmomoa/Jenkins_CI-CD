FROM openjdk:8

ARG VERSION
# 빌드 완료한 jar파일
COPY target/final-project-0.0.1-SNAPSHOT.jar /app/final-project-0.0.1-SNAPSHOT.jar

LABEL maintainer="yunseong<cysbunker1202@naver.com>" \
      title="WorklyProject" \
      version="$VERSION" \
      description="WokrlyProject"

ENV APP_HOME /app
EXPOSE 8080
VOLUME /app/upload

WORKDIR $APP_HOME
ENTRYPOINT ["java"]
CMD ["-jar", "final-project-0.0.1-SNAPSHOT.jar"]
