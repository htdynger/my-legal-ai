pipeline {
    agent any

    parameters {
        string(name: 'ASCENDER_API_URL', defaultValue: 'https://dev-api.ascender-ai.com/api', description: 'Ascender API URL')
    }

    environment {
        IMAGE_NAME = 'legai-frontend'
        DOCKERFILE_PATH = 'Dockerfile'
        VITE_API_ASCENDER = "${params.ASCENDER_API_URL}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}", "--build-arg VITE_API_ASCENDER=${VITE_API_ASCENDER} -f ${DOCKERFILE_PATH} .")
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    docker.image("${IMAGE_NAME}").withRun("-p 80:80 -e VITE_API_ASCENDER=${VITE_API_ASCENDER}") { c ->
                        echo "Container is running with ID: ${c.id}"
                    }
                }
            }
        }
    }
}