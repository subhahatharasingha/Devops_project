pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = 'devops_credential'  
        DOCKERHUB_USER  = 'subhanya'        

        BACKEND_IMAGE_NAME   = 'devops_backend'
        FRONTEND_IMAGE_NAME  = 'devops_frontend'

        BACKEND_IMAGE   = "${DOCKERHUB_USER}/${BACKEND_IMAGE_NAME}:latest"
        FRONTEND_IMAGE  = "${DOCKERHUB_USER}/${FRONTEND_IMAGE_NAME}:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building backend image...'
                sh 'docker build -t ${BACKEND_IMAGE_NAME} ./backend'

                echo 'Building frontend image...'
                sh 'docker build -t ${FRONTEND_IMAGE_NAME} ./frontend'
            }
        }

        stage('Tag Images for Docker Hub') {
            steps {
                echo 'Tagging images for Docker Hub...'
                sh 'docker tag ${BACKEND_IMAGE_NAME} ${BACKEND_IMAGE}'
                sh 'docker tag ${FRONTEND_IMAGE_NAME} ${FRONTEND_IMAGE}'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                echo 'Logging into Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKERHUB_CREDS}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                echo 'Pushing backend image...'
                sh 'docker push ${BACKEND_IMAGE}'

                echo 'Pushing frontend image...'
                sh 'docker push ${FRONTEND_IMAGE}'
            }
        }

        stage('Deploy Containers') {
            steps {
                echo 'Removing old containers (if exist)...'
                sh 'docker rm -f mongo backend frontend || true'

                echo 'Deploying new containers using Docker Compose...'
                sh 'docker compose down || true'
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up unused Docker images and containers...'
            sh 'docker system prune -af || true'
        }
        success {
            echo '✅ Deployment completed successfully!'
        }
        failure {
            echo '❌ Deployment failed. Check Jenkins logs for errors.'
        }
    }
}
