pipeline {
  agent any
  stages {
    stage ('frontend server'){
      steps{
      //  sh 'docker login -u _json_key -p "$(cat /key.json)" https://gcr.io'
        getVersion()
        echo PACKAGE_VERSION
        /*
        sh """
          cd servers/frontend-server/
          docker build -t gcr.io/stack-test-186501/frontend .
          docker push gcr.io/stack-test-186501/frontend
          docker rmi gcr.io/stack-test-186501/frontend
        """
            */
      }
    }

    stage ('backend server'){
      steps{
        echo "backend"
        /*
        sh 'docker login -u _json_key -p "$(cat /key.json)" https://gcr.io'
        sh """
          cd servers/backend-server/
          docker build -t gcr.io/stack-test-186501/backend .
          docker push gcr.io/stack-test-186501/backend
          docker rmi gcr.io/stack-test-186501/backend
        """
        */
      }
    }
  }
post {
        success{
          echo "success"
            //build 'kube-orchestration'
        }
}
}

import groovy.json.JsonSlurper
def getVersion(){
  def inputFile = new File("/var/jenkins_home/workspace/fullstack-pro/package.json")
  def InputJSON = new JsonSlurper().parse(inputFile)
  def version = InputJSON.version 
  def map = [PACKAGE_VERSION: InputJSON.version] 
return map
//  def pa = new ParametersAction([
//    new StringParameterValue("Version", version)
//  ])
}
