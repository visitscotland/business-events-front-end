def MAIL_TO = "webops@visitscotland.net"
def thisAgent
thisAgent = "docker-02"

pipeline {
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        timestamps()
    }

    agent {label thisAgent}

    environment {
        GITHUB_PAT_JENKINS_CI = credentials('github-pat-jenkins-ci')
    }

    stages {
        stage ('SCM checkout') {
            agent {
                docker {
                image 'vs/vs-brxm15-builder:node18'
                label thisAgent
                }
            }
            steps {
                sh '''
                    echo; echo "running stage $STAGE_NAME on $HOSTNAME"
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
            agent {
                docker {
                image 'vs/vs-brxm15-builder:node18'
                label thisAgent
                }
            }
            steps {
                sh 'echo; echo "running stage $STAGE_NAME on $HOSTNAME"'
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
            agent {
                docker {
                image 'vs/vs-brxm15-builder:node18'
                label thisAgent
                }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'echo; echo "running stage $STAGE_NAME on $HOSTNAME"'
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
                sh 'echo; echo "running stage $STAGE_NAME on $HOSTNAME"'
                sh 'echo "Here we will define the scripted steps to deploy the application"'
            }
        } //end stage
    } //end stages
}