pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('devops_credential') 
        IMAGE_NAME_BACKEND = "subhanya/devops_backend_image"
        IMAGE_NAME_FRONTEND = "subhanya/devops_frontend_image"
        GIT_REPO = "https://github.com/subhahatharasingha/Devops_project.git"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: "${GIT_REPO}"
            }
        }

        stage('Build Backend Image') {
            steps {
                sh "docker build -t $IMAGE_NAME_BACKEND:latest ./backend"
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh "docker build -t $IMAGE_NAME_FRONTEND:latest ./frontend"
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh "echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin"
            }
        }

        stage('Push Images') {
            steps {
                sh "docker push $IMAGE_NAME_BACKEND:latest"
                sh "docker push $IMAGE_NAME_FRONTEND:latest"
            }
        }
    }
}
