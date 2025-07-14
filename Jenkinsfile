pipeline {
    agent any

    parameters {
        string(name: 'ASCENDER_API_URL', defaultValue: 'https://dev-api.ascender-ai.com/api', description: 'Ascender API URL')
    }

    environment {
        IMAGE_NAME = 'legai-frontend'
        DOCKERFILE_PATH = 'Dockerfile'
        VITE_API_ASCENDER = "${params.ASCENDER_API_URL}"
        CONTAINER_NAME = 'legai-frontend-container'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                sh """
                    docker build --build-arg VITE_API_ASCENDER=${VITE_API_ASCENDER} -f ${DOCKERFILE_PATH} -t ${IMAGE_NAME} .
                """
            }
        }
        stage('Run Docker Container') {
            steps {
                sh """
                    docker run -d --name ${CONTAINER_NAME} -p 80:80 -e VITE_API_ASCENDER=${VITE_API_ASCENDER} ${IMAGE_NAME}
                    docker ps -a | grep ${CONTAINER_NAME}
                """
            }
        }
        stage('Cleanup Docker') {
            steps {
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker rmi ${IMAGE_NAME} || true
                """
            }
        }
    }
}