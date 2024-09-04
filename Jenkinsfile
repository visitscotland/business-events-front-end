def MAIL_TO = "webops@visitscotland.net"
def thisAgent
thisAgent = "docker-02"

// set any environment-specific environment variables here using the format: env.MY_VAR = "conditional_value" }
// please see ci/README_PIPELINE_VARIABLES.md or consult Web Operations for details on environment variables and their purposes
echo "== Setting conditional environment variables"
if (BRANCH_NAME == "develop" && (JOB_NAME ==~ "develop-brc-businessevents.visitscotland.com(-mb)?/develop")) {
  echo "=== Setting conditional environment variables for branch $BRANCH_NAME in job $JOB_NAME"
  env.VS_CONTAINER_BASE_PORT_OVERRIDE = "3003"
  env.VS_RELEASE_SNAPSHOT = "FALSE"
} else if (BRANCH_NAME ==~ "ops/feature-environment(s)?-enhancements" && (JOB_NAME ==~ "feature.visitscotland.(com|org)(-mb)?/ops%2Ffeature-environment(s)?-enhancements")) {
  echo "=== Setting conditional environment variables for branch $BRANCH_NAME in job $JOB_NAME"
  env.VS_CONTAINER_BASE_PORT_OVERRIDE = "3009"
} else {
  echo "=== No conditional environment variables found for branch $BRANCH_NAME in job $JOB_NAME, using dedaults"
  // thisAgent should always be set to "docker-02" unless you have been informed otherwise!
}
echo "==/Setting conditional environment variables"

// set or override any default environment variables here using the format: if (!env.MY_VAR) { env.MY_VAR = "default_value" }
// please see ci/README_PIPELINE_VARIABLES.md or consult Web Operations for details on environment variables and their purposes
// NOTE: these values will only be set if currently null, they may have been set by the "conditional environment variables" section above
echo "== Setting default environment variables"
if (!env.VS_SSR_PROXY_ON) { env.VS_SSR_PROXY_ON = "TRUE" }
if (!env.VS_CONTAINER_PRESERVE) { env.VS_CONTAINER_PRESERVE = "TRUE" }
if (!env.VS_SKIP_BUILD_FOR_BRANCH) { env.VS_SKIP_BUILD_FOR_BRANCH = "feature/VS-1865-feature-environments-enhancements-log4j" }
if (!env.VS_BRC_STACK_URI) { env.VS_BRC_STACK_URI = "visitscotland" }
if (!env.VS_BRC_ENV) { env.VS_BRC_ENV = "demo" }
if (!env.VS_BRC_STACK_URL) { env.VS_BRC_STACK_URL = "https://api.${VS_BRC_STACK_URI}.bloomreach.cloud" }
if (!env.VS_BRC_STACK_API_VERSION) { env.VS_BRC_STACK_API_VERSION = "v3" }
if (!env.VS_DOCKER_IMAGE_NAME) { env.VS_DOCKER_IMAGE_NAME = "vs/vs-brxm15:node18" }
if (!env.VS_DOCKER_BUILDER_IMAGE_NAME) { env.VS_DOCKER_BUILDER_IMAGE_NAME = "vs/vs-brxm15-builder:node18" }
if (!env.VS_USE_DOCKER_BUILDER) { env.VS_USE_DOCKER_BUILDER = "TRUE" }
if (!env.VS_RELEASE_SNAPSHOT) { env.VS_RELEASE_SNAPSHOT = "FALSE" }
if (!env.VS_CI_DIR) { env.VS_CI_DIR = "ci" }
if (!env.VS_BRANCH_PROPERTIES_DIR) { env.VS_BRANCH_PROPERTIES_DIR = env.VS_CI_DIR + "/properties" }
if (!env.VS_BRANCH_PROPERTIES_FILE) { env.VS_BRANCH_PROPERTIES_FILE = env.BRANCH_NAME.substring(env.BRANCH_NAME.lastIndexOf('/') + 1) + ".properties" }
echo "==/Setting default environment variables"

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
	stage ('Pre-build') {
	    steps {
                // Set any defined build property overrides for this work-in-progress branch
	        sh '''
	          set +x
	          echo; echo "running stage $STAGE_NAME on $HOSTNAME"
	          echo; echo "== printenv in $STAGE_NAME =="; printenv | sort; echo "==/printenv in $STAGE_NAME =="; echo
	          echo; echo "setting default properties using /infrastructure.sh setvars"
	          $VS_CI_DIR/infrastructure/scripts/infrastructure.sh setvars
	          echo
	          echo "== printenv after setvars in $STAGE_NAME =="; printenv | sort; echo "==/printenv after setvars in $STAGE_NAME =="
	          echo
	          echo; echo "looking for branch specific properties file at $WORKSPACE/$VS_BRANCH_PROPERTIES_DIR/$VS_BRANCH_PROPERTIES_FILE"
	          echo " - if the pipeline fails at this point please check the format of your properties file!"
	        '''
	        // make all branch-specific variables available to pipeline, load file must be in env.VARIABLE="VALUE" format
	        script {
	          if (fileExists("$WORKSPACE/$VS_BRANCH_PROPERTIES_DIR/$VS_BRANCH_PROPERTIES_FILE")) {
	            echo "loading environment variables from $WORKSPACE/$VS_BRANCH_PROPERTIES_DIR/$VS_BRANCH_PROPERTIES_FILE"
	            load "$WORKSPACE/$VS_BRANCH_PROPERTIES_DIR/$VS_BRANCH_PROPERTIES_FILE"
	            sh '''
	              set +x
	              echo
	              echo "== printenv after load of $WORKSPACE/$VS_BRANCH_PROPERTIES_DIR/$VS_BRANCH_PROPERTIES_FILE in $STAGE_NAME =="
	              printenv | sort
	              echo "==/printenv after load of $WORKSPACE/$VS_BRANCH_PROPERTIES_DIR/$VS_BRANCH_PROPERTIES_FILE in $STAGE_NAME =="
	              echo
	            '''
	          } else {
	            echo "branch specific properties won't be loaded, file $WORKSPACE/$VS_BRANCH_PROPERTIES_DIR/$VS_BRANCH_PROPERTIES_FILE does not exist"
	          }
	        }
		// run infrastructure.sh to set default variables and then import them into the pipeline
		script {
	          if (fileExists("$WORKSPACE/ci/infrastructure/scripts/infrastructure.sh")) {
	            sh '''
	              set +x
	              echo; echo "setting default properties using infrastructure.sh setvars"
	              $VS_CI_DIR/infrastructure/scripts/infrastructure.sh setvars
	              echo; echo "== printenv after setvars in $STAGE_NAME =="; printenv | sort; echo "==/printenv after setvars in $STAGE_NAME =="
	            '''
	          } else {
	              echo; echo "infrastructure.sh was not found - default environment variables will not be set"
	          }
		}
		script {
	          if (fileExists("$WORKSPACE/ci/vs-last-env.quoted")) {
	            echo "loading environment variables from $WORKSPACE/ci/vs-last-env.quoted"
	            load "$WORKSPACE/ci/vs-last-env.quoted"
	            echo "found ${env.VS_COMMIT_AUTHOR}"
	          }
		}
		script {
	            sh '''
			set +x
			echo; echo "== printenv after load of $WORKSPACE/ci/vs-last-env.quoted in $STAGE_NAME =="
			printenv | sort
			echo "==/printenv after load of $WORKSPACE/ci/vs-last-env.quoted in $STAGE_NAME =="
			echo
		    '''
		}
	    }
	} // end stage

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
                    set +x
                    echo; echo "running stage $STAGE_NAME on $HOSTNAME"
                    echo; echo "==== PRINTENV $STAGE_NAME 1 =====" > printenv.$STAGE_NAME
                    printenv >> printenv.$STAGE_NAME
                    echo "====/PRINTENV $STAGE_NAME 1 =====" >> printenv.$STAGE_NAME ; echo
                    #ls -alh
                    export HOME=$WORKSPACE
                    export npm_config_cache=$HOME
                    echo; echo "==== PRINTENV $STAGE_NAME 2 =====" > printenv2.$STAGE_NAME
                    printenv >> printenv2.$STAGE_NAME
                    echo "====/PRINTENV $STAGE_NAME 2 =====" >> printenv2.$STAGE_NAME; echo
                    echo; echo "==== TOOLS CHECK ====="
                '''
                sh 'set +x; node --version; exit 0'
                sh 'set +x; npm --version; exit 0'
                sh 'set +x; yarn --version; exit 0'
                sh 'set +x; echo "==== TOOLS CHECK ====="; echo'
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
                    set +x
                    export HOME=$WORKSPACE
                    export npm_config_cache=$HOME/.npm
                    if [ ! -d $npm_config_cache ]; then mkdir -p $npm_config_cache; fi
                    echo; echo "==== PRINTENV $STAGE_NAME =====" > printenv.$STAGE_NAME
                    printenv >> printenv.$STAGE_NAME
                    echo "====/PRINTENV $STAGE_NAME =====" >> printenv.$STAGE_NAME ; echo
                    yarn
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
                        set +x
                        export HOME=$WORKSPACE
                        export npm_config_cache=$HOME/.npm
                        if [ ! -d $npm_config_cache ]; then mkdir -p $npm_config_cache; fi
                        echo; echo "==== PRINTENV $STAGE_NAME =====" > printenv.$STAGE_NAME
                        printenv >> printenv.$STAGE_NAME
                        echo "====/PRINTENV $STAGE_NAME =====" >> printenv.$STAGE_NAME ; echo
                        yarn test
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
                    sh '''
                        set +x
                        echo; echo "running stage $STAGE_NAME on $HOSTNAME"
                        export HOME=$WORKSPACE
                        export npm_config_cache=$HOME/.npm
                        if [ ! -d $npm_config_cache ]; then mkdir -p $npm_config_cache; fi
                        echo; echo "==== PRINTENV $STAGE_NAME =====" > printenv.$STAGE_NAME
                        printenv >> printenv.$STAGE_NAME
                        echo "====/PRINTENV $STAGE_NAME =====" >> printenv.$STAGE_NAME ; echo
                        export BR_CMS_ORIGIN_LOCATION=https://feature.visitscotland.com
                        export BR_RESOURCE_API_ENDPOINT=https://feature-businessevents.visitscotland.com/resourceapi
                        export BR_X_FORWARDED_HOST=feature-businessevents.visitscotland.com
                        yarn build
                    '''
                }
            }
        } //end stage

        stage ('Deploy') {
            steps {
                sh '''
                    set +x
                    echo; echo "running stage $STAGE_NAME on $HOSTNAME"
                    $VS_CI_DIR/infrastructure/scripts/infrastructure.sh --container-min-port=3010 --container-max-port=3029 findports
                    #VS_CONTAINER_IMAGE=vs/vs-brxm15:node18
                    #VS_CONTAINER_NAME=$(echo $JOB_NAME | sed -e "s/\\//_/g")
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
                    VS_RUNNING_CONTAINER_ID=$(docker ps -aq --filter "name=^$VS_CONTAINER_NAME$")
                    echo; echo "==== PRINTENV $STAGE_NAME =====" > printenv.$STAGE_NAME
                    printenv >> printenv.$STAGE_NAME
                    echo "====/PRINTENV $STAGE_NAME =====" >> printenv.$STAGE_NAME ; echo
                    if [ ! -z "" $VS_RUNNING_CONTAINER_ID ]; then 
                        echo "found container with name: $VS_CONTAINER_NAME and id: $VS_RUNNING_CONTAINER_ID"
                        echo "removing any container with name: $VS_CONTAINER_NAME: $VS_RUNNING_CONTAINER_ID"
                        docker container rm -f $VS_RUNNING_CONTAINER_ID
                    else
                        echo "no container found with name: $VS_CONTAINER_NAME"
                    fi
                    docker run -t -d -u $VS_CONTAINER_USR:$VS_CONTAINER_GRP $VS_CONTAINER_PORTS --workdir $VS_CONTAINER_WD --volume $VS_CONTAINER_WORKSPACE:$VS_CONTAINER_WORKSPACE:$VS_CONTAINER_VOLUME_PERMISSIONS --volume $VS_CONTAINER_WORKSPACE@tmp:$VS_CONTAINER_WORKSPACE@tmp:$VS_CONTAINER_VOLUME_PERMISSIONS $VS_CONTAINER_ENVIRONMENT --name $VS_CONTAINER_NAME --hostname $VS_CONTAINER_NAME $VS_DOCKER_IMAGE_NAME $VS_CONTAINER_INIT_EXEC
                    VS_CONTAINER_ID=$(docker ps -aq --filter "name=^$VS_CONTAINER_NAME$")
                    docker exec -d -t $VS_CONTAINER_ID /bin/bash -c "NODE_DEBUG=cluster,net,http,fs,tls,module,timers node .output/server/index.mjs 2>&1 | tee -a ./nodeapp.log"
                '''
            }
        } //end stage
    } //end stages
}