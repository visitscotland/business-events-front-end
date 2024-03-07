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
        GITHUB_PAT_JENKINS_CI = credentials('github-pat-jenkins-ci')
    }

    stages {
        stage ('SCM checkout') {
            steps {
                sh '''
                    echo; echo "running stage $STAGE_NAME"
                    echo; echo "==== PRINTENV $STAGE_NAME 1 ====="
                    printenv
                    echo "====/PRINTENV $STAGE_NAME 1 ====="; echo
                    ls -alh
                    export HOME=$WORKSPACE
                    export npm_config_cache=$HOME
                    echo; echo "==== PRINTENV $STAGE_NAME 2 ====="
                    printenv
                    echo "====/PRINTENV $STAGE_NAME 2 ====="; echo
                    echo; echo "==== TOOLS CHECK ====="
                '''
                sh 'node --version; exit 0'
                sh 'npm --version; exit 0'
                sh 'yarn --version; exit 0'
                sh 'echo "==== TOOLS CHECK ====="; echo'
                checkout scm
            }
        } //end stage

        stage ('Install Dependencies') {
            steps {
                sh 'echo; echo "running stage $STAGE_NAME"'
                sh '''
                    export HOME=$WORKSPACE
                    export npm_config_cache=$HOME/.npm
                    if [ ! -d $npm_config_cache ]; then mkdir -p $npm_config_cache; fi
                    echo; echo "==== PRINTENV $STAGE_NAME ====="
                    printenv
                    echo "====/PRINTENV $STAGE_NAME ====="; echo
                    npm install
                '''
            }
        } //end stage

        stage ('Run Tests') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'echo; echo "running stage $STAGE_NAME"'
                    sh '''
                        export HOME=$WORKSPACE
                        export npm_config_cache=$HOME/.npm
                        if [ ! -d $npm_config_cache ]; then mkdir -p $npm_config_cache; fi
                        echo; echo "==== PRINTENV $STAGE_NAME ====="
                        printenv
                        echo "====/PRINTENV $STAGE_NAME ====="; echo
                        npm test
                    '''
                }
            }
        } //end stage

        stage ('Deploy') {
            steps {
                sh 'echo; echo "running stage $STAGE_NAME"'
                sh 'echo "Here we will define the scripted steps to deploy the application"'
            }
        } //end stage
    } //end stages
}