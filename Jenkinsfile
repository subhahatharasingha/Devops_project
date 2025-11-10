pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = 'devops_credential'  
        DOCKERHUB_USER  = 'subhanya'        
        BACKEND_IMAGE   = "${DOCKERHUB_USER}/devops_backend:latest"
        FRONTEND_IMAGE  = "${DOCKERHUB_USER}/devops_frontend:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                echo 'Building backend image...'
                sh 'docker build -t devops_backend_image ./backend'

                echo 'Building frontend image...'
                sh 'docker build -t devops_frontend_image ./frontend'
            }
        }

        stage('Tag Images') {
            steps {
                sh "docker tag devops_backend_image ${BACKEND_IMAGE}"
                sh "docker tag devops_frontend_image ${FRONTEND_IMAGE}"
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh "docker push ${BACKEND_IMAGE}"
                sh "docker push ${FRONTEND_IMAGE}"
            }
        }

        stage('Deploy (optional)') {
            steps {
                echo 'Stopping and removing old containers...'
                sh 'docker rm -f mongo || true'
                sh 'docker rm -f backend || true'
                sh 'docker rm -f frontend || true'

                echo 'Deploying with docker-compose...'
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up unused Docker images...'
            sh 'docker image prune -f'
        }
    }
}
