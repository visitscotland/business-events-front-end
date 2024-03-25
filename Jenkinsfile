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
                reuseNode true
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
                reuseNode true
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
                reuseNode true
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

        stage ('NPM Build') {
            agent {
                docker {
                image 'vs/vs-brxm15-builder:node18'
                label thisAgent
                reuseNode true
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
                        export BR_CMS_ORIGIN_LOCATION=http://localhost:8080
                        export BR_RESOURCE_API_ENDPOINT=https://feature-businessevents.visitscotland.com/resourceapi
                        export BR_X_FORWARDED_HOST=feature-businessevents.visitscotland.com
                        npm run build 
                    '''
                }
            }
        } //end stage

        stage ('Deploy') {
            steps {
                sh 'echo; echo "running stage $STAGE_NAME on $HOSTNAME"'
                sh 'echo "Here we will define the scripted steps to deploy the application"'
                sh '''
                    VS_CONTAINER_IMAGE=vs/vs-brxm15:node18
                    VS_CONTAINER_NAME=$(echo $JOB_NAME | sed -e "s/\\//_/g")
                    VS_CONTAINER_USR=$(id -u $USER)
                    VS_CONTAINER_GRP=$(id -g $USER)
                    VS_CONTAINER_WD=$PWD
                    VS_CONTAINER_WORKSPACE=$WORKSPACE
                    VS_CONTAINER_VOLUME_PERMISSIONS="rw,z"
                    VS_CONTAINER_PORTS="-p 3000:3000"
                    VS_CONTAINER_ENVIRONMENT=""
                    VS_CONTAINER_ENVIRONMENT_FILE="--env-file [FILE_NAME]"
                    VS_CONTAINER_INIT_EXEC="cat"
                    #VS_CONTAINER_EXEC="NODE_DEBUG=cluster,net,http,fs,tls,module,timers node .output/server/index.mjs"
                    #VS_CONTAINER_EXEC="/bin/bash -c \\"HOME=$PWD; set | tee ./nodeapp.log; NODE_DEBUG=http node $HOME/.output/server/index.mjs 2>&1 | tee -a ./nodeapp.log\\""
                    VS_CONTAINER_EXEC="/bin/bash -c \\"node .output/server/index.mjs\\""
                    docker container rm -f $VS_CONTAINER_NAME
                    docker run -t -d -u $VS_CONTAINER_USR:$VS_CONTAINER_GRP $VS_CONTAINER_PORTS --workdir $VS_CONTAINER_WD --volume $VS_CONTAINER_WORKSPACE:$VS_CONTAINER_WORKSPACE:$VS_CONTAINER_VOLUME_PERMISSIONS --volume $VS_CONTAINER_WORKSPACE@tmp:$VS_CONTAINER_WORKSPACE@tmp:$VS_CONTAINER_VOLUME_PERMISSIONS $VS_CONTAINER_ENVIRONMENT --name $VS_CONTAINER_NAME --hostname $VS_CONTAINER_NAME $VS_CONTAINER_IMAGE $VS_CONTAINER_INIT_EXEC
                    VS_CONTAINER_ID=$(docker ps -a | grep "$VS_CONTAINER_NAME" | awk '{print $1}')
                    docker exec -d -t $VS_CONTAINER_ID /bin/bash -c "NODE_DEBUG=http node .output/server/index.mjs"
                '''
            }
        } //end stage
    } //end stages
}