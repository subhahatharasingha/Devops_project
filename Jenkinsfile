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
                sh 'docker build -t ${BACKEND_IMAGE} ./backend'
                sh 'docker build -t ${FRONTEND_IMAGE} ./frontend'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKERHUB_CREDS}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push ${BACKEND_IMAGE}'
                sh 'docker push ${FRONTEND_IMAGE}'
            }
        }

        stage('Deploy on EC2') {
            steps {
                echo 'Stopping old containers...'
                sh 'docker compose down || true'

                echo 'Pulling latest images...'
                sh 'docker compose pull'

                echo 'Starting containers...'
                sh 'docker compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Cleaning Docker space...'
            sh 'docker system prune -af || true'
        }
    }
}
