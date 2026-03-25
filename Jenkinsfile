pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        AWS_REGION            = 'ap-south-1'
        S3_BUCKET             = 'library-frontend-yogesh'
        CF_DISTRIBUTION_ID    = 'E3MSSZS1M0NVSO'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Code checkout...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 npm install...'
                sh 'npm install'
            }
        }

        stage('Build React') {
            steps {
                echo '⚛️ React build...'
                sh 'npm run build'
            }
        }

        stage('Deploy to S3') {
            steps {
                echo '☁️ Uploading to S3...'
                sh """
                    aws s3 sync build/ s3://${S3_BUCKET} \
                        --delete \
                        --region ${AWS_REGION}
                """
            }
        }

        stage('Invalidate CloudFront') {
            steps {
                echo '🔄 CloudFront cache invalidate...'
                sh """
                    aws cloudfront create-invalidation \
                        --distribution-id ${CF_DISTRIBUTION_ID} \
                        --paths "/*"
                """
            }
        }
    }

    post {
        success { echo '✅ Frontend deployed!' }
        failure { echo '❌ Frontend pipeline failed!' }
    }
}
