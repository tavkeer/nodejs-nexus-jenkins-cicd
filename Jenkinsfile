pipeline {
    agent any

    environment {
        APP_NAME = "simple-node-app"

        NEXUS_REGISTRY = "15.207.14.23:8082"

        IMAGE_NAME = "${NEXUS_REGISTRY}/${APP_NAME}"

        IMAGE_TAG = "${BUILD_NUMBER}"

        PROD_SERVER = "ubuntu@13.235.86.51"
    }

    options {
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'

                sh """
                    docker build \
                    -t ${IMAGE_NAME}:${IMAGE_TAG} \
                    -t ${IMAGE_NAME}:latest \
                    .
                """
            }
        }

        stage('Login To Nexus') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'nexus-credentials',
                        usernameVariable: 'NEXUS_USER',
                        passwordVariable: 'NEXUS_PASS'
                    )
                ]) {

                    sh '''
                        echo "$NEXUS_PASS" | \
                        docker login $NEXUS_REGISTRY \
                        -u "$NEXUS_USER" \
                        --password-stdin
                    '''
                }
            }
        }

        stage('Push Image To Nexus') {
            steps {

                echo 'Pushing image to Nexus...'

                sh """
                    docker push ${IMAGE_NAME}:${IMAGE_TAG}
                    docker push ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Deploy To Production') {
            steps {

                sshagent(['prod-server-ssh']) {

                    sh """
                        ssh -o StrictHostKeyChecking=no ${PROD_SERVER} '
                            cd ~/apps/node-app &&
                            docker compose pull &&
                            docker compose up -d
                        '
                    """
                }
            }
        }


    post {

        success {
            echo 'Deployment Successful 🚀'
        }

        failure {
            echo 'Deployment Failed ❌'
        }

        always {

            sh '''
                docker image prune -f || true
            '''
        }
    }
}
