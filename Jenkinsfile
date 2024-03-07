def MAIL_TO = "webops@visitscotland.net"

pipeline {
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    agent {
        docker {
            image 'vs/vs-brxm15-builder:node18'
        label 'docker-02'
        }
    }

    environment {
        GITHUB_KEY = credentials('')
    }

    stages {
        stage ('SCM checckout') {
            steps {
                checkoutscm
            }
        }

        stage ('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage ('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage ('Deploy') {
            steps {
                sh 'echo "Here we will define the scripted steps to deploy the application'
            }
        }
    }
}