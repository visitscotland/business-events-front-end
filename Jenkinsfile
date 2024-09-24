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
} else if (BRANCH_NAME ==~ "ops/(feature-environment(s)?-enhancements|pipeline-updates)" && (JOB_NAME ==~ "feature(-(businessevents|support))?.visitscotland.(com|org)(-mb)?(-frontend)?/ops%(25)?2F(feature-environment(s)?-enhancements|pipeline-updates)")) {
    echo "=== Setting conditional environment variables for branch $BRANCH_NAME in job $JOB_NAME"
    env.VS_CONTAINER_BASE_PORT_OVERRIDE = "3009"
    env.VS_CONTAINER_PRESERVE = "FALSE"
} else {
    echo "=== No conditional environment variables found for branch $BRANCH_NAME in job $JOB_NAME, using dedaults"
}
echo "==/Setting conditional environment variables"

// set or override any default environment variables here using the format: if (!env.MY_VAR) { env.MY_VAR = "default_value" }
// please see ci/README_PIPELINE_VARIABLES.md or consult Web Operations for details on environment variables and their purposes
// NOTE: these values will only be set if currently null, they may have been set by the "conditional environment variables" section above
echo "== Setting default pipeline environment variables"
if (!env.VS_CI_DIR) { env.VS_CI_DIR = "ci" }
if (!env.VS_BRANCH_PROPERTIES_DIR) { env.VS_BRANCH_PROPERTIES_DIR = env.VS_CI_DIR + "/properties" }
if (!env.VS_BRANCH_PROPERTIES_FILE) { env.VS_BRANCH_PROPERTIES_FILE = env.BRANCH_NAME.substring(env.BRANCH_NAME.lastIndexOf('/') + 1) + ".properties" }
if (!env.VS_BRC_STACK_URI) { env.VS_BRC_STACK_URI = "visitscotland" }
if (!env.VS_BRC_ENV) { env.VS_BRC_ENV = "demo" }
if (!env.VS_BRC_STACK_URL) { env.VS_BRC_STACK_URL = "https://api.${VS_BRC_STACK_URI}.bloomreach.cloud" }
if (!env.VS_BRC_STACK_API_VERSION) { env.VS_BRC_STACK_API_VERSION = "v3" }
if (!env.VS_DOCKER_IMAGE_NAME) { env.VS_DOCKER_IMAGE_NAME = "vs/vs-brxm15:node18" }
if (!env.VS_DOCKER_BUILDER_IMAGE_NAME) { env.VS_DOCKER_BUILDER_IMAGE_NAME = "vs/vs-brxm15-builder:node18" }
if (!env.VS_SKIP_BUILD_FOR_BRANCH) { env.VS_SKIP_BUILD_FOR_BRANCH = "feature/VS-1865-feature-environments-enhancements-log4j" }
if (!env.VS_SSR_PROXY_ON) { env.VS_SSR_PROXY_ON = "TRUE" }
if (!env.VS_USE_DOCKER_BUILDER) { env.VS_USE_DOCKER_BUILDER = "TRUE" }
if (!env.VS_RELEASE_SNAPSHOT) { env.VS_RELEASE_SNAPSHOT = "FALSE" }
echo "==/Setting default environment variables"

echo "== Setting default application variables"
if (!env.BR_CMS_ORIGIN_LOCATION ) { env.BR_CMS_ORIGIN_LOCATION = "https://feature.visitscotland.com" }
if (!env.BR_RESOURCE_API_ENDPOINT ) { env.BR_RESOURCE_API_ENDPOINT = "https://feature-businessevents.visitscotland.com/resourceapi" }
if (!env.BR_X_FORWARDED_HOST ) { env.BR_X_FORWARDED_HOST = "feature-businessevents.visitscotland.com" }
echo "==/Setting default application variables"

echo "== Setting default container variables"
if (!env.VS_CONTAINER_BASE_PORT_MIN ) { env.VS_CONTAINER_BASE_PORT_MIN = 3010 }
if (!env.VS_CONTAINER_BASE_PORT_MAX ) { env.VS_CONTAINER_BASE_PORT_MAX = 3029 }
if (!env.VS_CONTAINER_EXEC ) { env.VS_CONTAINER_EXEC = "/bin/bash -c \"node .output/server/index.mjs\"" }
if (!env.VS_CONTAINER_PRESERVE) { env.VS_CONTAINER_PRESERVE = "TRUE" }
env.VS_CONTAINER_MAIN_APP_PORT = 3000
echo "==/Setting default container variables"

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
                    VS_STAGE_NAME=$(echo $STAGE_NAME | sed -e "s/ /-/g")
	                echo; echo "running stage $STAGE_NAME on $HOSTNAME"
                    if [[ "$VS_DEBUG"  =~ ^(TRUE|true)$ ]]; then
	                    echo; echo "== printenv in $STAGE_NAME =="; printenv | sort; echo "==/printenv in $STAGE_NAME =="; echo
                    else
                        printenv | sort > printenv.$VS_STAGE_NAME
                    fi
                    echo; echo "setting default properties using /infrastructure.sh setvars"
	                $VS_CI_DIR/infrastructure/scripts/infrastructure.sh setvars
                    if [[ "$VS_DEBUG"  =~ ^(TRUE|true)$ ]]; then
	                    echo; echo "== printenv after setvars in $STAGE_NAME =="
                        printenv | sort | tee printenv_2.$VS_STAGE_NAME
                        echo "==/printenv after setvars in $STAGE_NAME =="
                    else
                        printenv | sort > printenv_2.$VS_STAGE_NAME
                    fi
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
                        VS_STAGE_NAME=$(echo $STAGE_NAME | sed -e "s/ /-/g")
                        if [[ "$VS_DEBUG"  =~ ^(TRUE|true)$ ]]; then
	                        echo; echo "== printenv after load of $WORKSPACE/$VS_BRANCH_PROPERTIES_DIR/$VS_BRANCH_PROPERTIES_FILE in $STAGE_NAME =="
	                        printenv | sort | tee printenv_3.$VS_STAGE_NAME
                            echo "==/printenv after load of $WORKSPACE/$VS_BRANCH_PROPERTIES_DIR/$VS_BRANCH_PROPERTIES_FILE in $STAGE_NAME =="
                        else
                            printenv | sort > printenv_3.$VS_STAGE_NAME
                        fi
	            '''
	            } else {
	                echo "branch specific properties won't be loaded, file $WORKSPACE/$VS_BRANCH_PROPERTIES_DIR/$VS_BRANCH_PROPERTIES_FILE does not exist"
	            }
	        }
		    // the two script blocks below are necessary to allow infrastructure.sh to set variables and then import them back to the pipeline
            //  - if we determine that none of these variables are actually used until the Deploy stage, then this is not necessary
            //  - the printenv commands in every stage are useful for debugging but may not be required long-term
            // run infrastructure.sh to set default variables and then import them into the pipeline
		    script {
	            if (fileExists("$WORKSPACE/ci/infrastructure/scripts/infrastructure.sh")) {
	                sh '''
	                    set +x
                        VS_STAGE_NAME=$(echo $STAGE_NAME | sed -e "s/ /-/g")
	                    echo; echo "setting default properties using infrastructure.sh setvars"
	                    $VS_CI_DIR/infrastructure/scripts/infrastructure.sh setvars
                        if [[ "$VS_DEBUG"  =~ ^(TRUE|true)$ ]]; then
	                        echo; echo "== printenv after setvars in $STAGE_NAME =="
                            printenv | sort | tee printenv_4.$VS_STAGE_NAME
                            echo "==/printenv after setvars in $STAGE_NAME =="
                        else
                            printenv | sort > printenv_4.$VS_STAGE_NAME
                        fi
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
	            } else {
	                echo; echo "$WORKSPACE/ci/vs-last-env.quoted - default environment variables will not be loaded"
	            }
		    }
		    script {
                sh '''
			        set +x
                    VS_STAGE_NAME=$(echo $STAGE_NAME | sed -e "s/ /-/g")
                    if [[ "$VS_DEBUG"  =~ ^(TRUE|true)$ ]]; then
			            echo; echo "== printenv after load of $WORKSPACE/ci/vs-last-env.quoted in $STAGE_NAME =="
			            printenv | sort | tee printenv_5.$VS_STAGE_NAME
			            echo "==/printenv after load of $WORKSPACE/ci/vs-last-env.quoted in $STAGE_NAME ==";
                    else
                        printenv | sort > printenv_5.$VS_STAGE_NAME
                    fi
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
                    VS_STAGE_NAME=$(echo $STAGE_NAME | sed -e "s/ /-/g")
                    echo; echo "running stage $STAGE_NAME on $HOSTNAME"
                    if [[ "$VS_DEBUG"  =~ ^(TRUE|true)$ ]]; then
                        echo; echo "==== PRINTENV $STAGE_NAME 1 ====="
                        printenv | sort | tee printenv_1.$VS_STAGE_NAME
                        echo "====/PRINTENV $STAGE_NAME 1 ====="
                    else
                        printenv | sort > printenv_1.$VS_STAGE_NAME
                    fi
                    export HOME=$WORKSPACE
                    export npm_config_cache=$HOME
                    if [[ "$VS_DEBUG"  =~ ^(TRUE|true)$ ]]; then
                        echo; echo "==== PRINTENV $STAGE_NAME 2 ====="
                        printenv | sort | tee printenv_2.$VS_STAGE_NAME
                        echo "====/PRINTENV $STAGE_NAME 2 ====="
                    else
                        printenv > printenv_2.$VS_STAGE_NAME
                    fi
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
                sh '''
                    set +x
                    echo; echo "running stage $STAGE_NAME on $HOSTNAME"
                    VS_STAGE_NAME=$(echo $STAGE_NAME | sed -e "s/ /-/g")
                    export HOME=$WORKSPACE
                    export npm_config_cache=$HOME/.npm
                    if [ ! -d $npm_config_cache ]; then mkdir -p $npm_config_cache; fi
                    if [[ "$VS_DEBUG"  =~ ^(TRUE|true)$ ]]; then
                        echo; echo "==== PRINTENV $STAGE_NAME ====="
                        printenv | sort | tee printenv.$VS_STAGE_NAME
                        echo "====/PRINTENV $STAGE_NAME ====="
                    else
                        printenv | sort > printenv.$VS_STAGE_NAME
                    fi
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
                    sh '''
                        set +x
                        echo; echo "running stage $STAGE_NAME on $HOSTNAME"
                        VS_STAGE_NAME=$(echo $STAGE_NAME | sed -e "s/ /-/g")
                        export HOME=$WORKSPACE
                        export npm_config_cache=$HOME/.npm
                        if [ ! -d $npm_config_cache ]; then mkdir -p $npm_config_cache; fi
                        if [[ "$VS_DEBUG"  =~ ^(TRUE|true)$ ]]; then
                            echo; echo "==== PRINTENV $STAGE_NAME ====="
                            printenv | sort | tee printenv.$VS_STAGE_NAME
                            echo "====/PRINTENV $STAGE_NAME ====="
                        else
                            printenv | sort > printenv.$VS_STAGE_NAME
                        fi
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
                        VS_STAGE_NAME=$(echo $STAGE_NAME | sed -e "s/ /-/g")
                        export HOME=$WORKSPACE
                        export npm_config_cache=$HOME/.npm
                        if [ ! -d $npm_config_cache ]; then mkdir -p $npm_config_cache; fi
                        if [[ "$VS_DEBUG"  =~ ^(TRUE|true)$ ]]; then
                            echo; echo "==== PRINTENV $STAGE_NAME ====="
                            printenv | sort | tee printenv.$VS_STAGE_NAME
                            echo "====/PRINTENV $STAGE_NAME ====="
                        else
                            printenv | sort > printenv.$VS_STAGE_NAME
                        fi
                        yarn build
                    '''
                }
            }
        } //end stage

        stage ('Deploy') {
            steps {
                // the two script blocks below are necessary to allow infrastructure.sh to set variables and then import them back to the pipeline
                //  - in a future iteration, where the container is started by the shell script, these will no longer be required
                script {
                    if (fileExists("$WORKSPACE/ci/infrastructure/scripts/infrastructure.sh")) {
	                    sh '''
	                        set +x
                            VS_STAGE_NAME=$(echo $STAGE_NAME | sed -e "s/ /-/g")
	                        echo; echo "setting default properties using infrastructure.sh dssr-server --map-workspace=true --debug"
	                        $VS_CI_DIR/infrastructure/scripts/infrastructure.sh dssr-server --map-workspace=true --debug
                            if [[ "$VS_DEBUG"  =~ ^(TRUE|true)$ ]]; then
	                            echo; echo "== printenv after setvars in $STAGE_NAME =="
                                printenv | sort | tee printenv_4.$VS_STAGE_NAME
                                echo "==/printenv after setvars in $STAGE_NAME =="
                            else
                                printenv | sort > printenv_4.$VS_STAGE_NAME
                            fi
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
	                } else {
	                    echo; echo "$WORKSPACE/ci/vs-last-env.quoted - default environment variables will not be loaded"
	                }
		        }
                sh '''
                    set +x
                    echo; echo "running stage $STAGE_NAME on $HOSTNAME"
                    VS_STAGE_NAME=$(echo $STAGE_NAME | sed -e "s/ /-/g")
                    echo $VS_CONTAINER_EXEC
                    #VS_RUNNING_CONTAINER_ID=$(docker ps -aq --filter "name=^$VS_CONTAINER_NAME$")
                    if [[ "$VS_DEBUG"  =~ ^(TRUE|true)$ ]]; then
                        echo; echo "==== PRINTENV $STAGE_NAME ====="
                        printenv | sort | tee printenv.$VS_STAGE_NAME
                        echo "====/PRINTENV $STAGE_NAME ====="
                    else
                        printenv | sort > printenv.$VS_STAGE_NAME
                    fi
                    #if [ ! -z "$VS_RUNNING_CONTAINER_ID"  ]; then 
                    #    echo "found container with name: $VS_CONTAINER_NAME and id: $VS_RUNNING_CONTAINER_ID"
                    #    #echo "removing any container with name: $VS_CONTAINER_NAME: $VS_RUNNING_CONTAINER_ID"
                    #    #docker container rm -f $VS_RUNNING_CONTAINER_ID
                    #else
                    #    echo "no container found with name: $VS_CONTAINER_NAME"
                    #fi
                    #docker run -t -d -u $VS_CONTAINER_USR:$VS_CONTAINER_GRP $VS_CONTAINER_BASE_PORT $VS_CONTAINER_PORT_MAPPINGS --workdir $VS_CONTAINER_WD --volume $VS_CONTAINER_WORKSPACE:$VS_CONTAINER_WORKSPACE:$VS_CONTAINER_VOLUME_PERMISSIONS --volume $VS_CONTAINER_WORKSPACE@tmp:$VS_CONTAINER_WORKSPACE@tmp:$VS_CONTAINER_VOLUME_PERMISSIONS $VS_CONTAINER_ENVIRONMENT --name $VS_CONTAINER_NAME --hostname $VS_CONTAINER_NAME_SHORT $VS_DOCKER_IMAGE_NAME $VS_CONTAINER_INIT_EXEC
                    VS_CONTAINER_ID=$(docker ps -aq --filter "name=^$VS_CONTAINER_NAME$")
                    docker exec -d -t $VS_CONTAINER_ID /bin/bash -c "NODE_DEBUG=cluster,net,http,fs,tls,module,timers node .output/server/index.mjs 2>&1 | tee -a ./nodeapp.log"
                '''
            }
        } //end stage
    } //end stages
}