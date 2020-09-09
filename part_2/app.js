import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';

const AWS = require('aws-sdk');
const bucket = awsconfig.aws_user_files_s3_bucket;
const identity_pool_id = awsconfig.aws_cognito_identity_pool_id;
const region = awsconfig.aws_project_region; 

Amplify.configure(awsconfig);

AWS.config.update({region: region});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: identity_pool_id});


const fileTag = document.getElementById("myFile");
  fileTag.addEventListener('change', () => {
    Storage.put(this.files[0].name, this.files[0])
    .then (result => {
      let myDiv = document.getElementById("Labels");
      myDiv.innerHTML = 'Uploaded ' + result.key;
    }) 
    .catch(err => console.log(err));
  });
  