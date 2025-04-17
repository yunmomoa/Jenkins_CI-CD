import java.text.SimpleDateFormat

def TODAY = (new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())

pipeline {
    agent any
    environment {
        strDockerTag = "${TODAY}_${BUILD_ID}"
        strDockerImage ="cysbunker/worklyproject:${strDockerTag}"
        //strGitUrl = "https://github.com/wombathero999/semi.git"
        strGitUrl = "https://github.com/yunmomoa/FinalWorkspace.git"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url:"${strGitUrl}"
            }
        }
        stage('Build') {
            steps {
                dir('backend/final-project') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package'
                }
            }
        }        // 추후 프론트 빌드 추가해야댐
        stage('Docker Image Build') {
            steps {
                script {
                    oDockImage = docker.build(strDockerImage, "--build-arg VERSION=${strDockerTag} -f Dockerfile .")
                }
            }
        }
        stage('Docker Image Push') {
            steps {
                script {
                    // 본인 도커허브 인증용 크리덴셜
                    docker.withRegistry('', 'DockerHub_Credential') {
                        oDockImage.push()
                    }
                }
            }
        }        
        // 오라클 접속시 필요한 환경변수가 더 있을 수 있음. 
        stage('Deploy') {
            steps {
                sh '''
                    docker container rm -f worklyproject || true
                    docker container run \
                        -d \
                        -p 8003:8003 \
                        --name=worklyproject \
                        -e ORACLE_IP=13.209.197.216 \
                        -e ORACLE_PORT=1521 \
                        -e ORACLE_SID=XE \
                        -e ORACLE_USER=C##WORKLY \
                        -e ORACLE_PASSWORD=WORKLY \
                        ${strDockerImage}
                '''
            }
        }        
    }
}