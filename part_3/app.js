import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';

const AWS = require('aws-sdk');
const bucket = awsconfig.aws_user_files_s3_bucket;
const identity_pool_id = awsconfig.aws_cognito_identity_pool_id;
const region = awsconfig.aws_project_region; 

Amplify.configure(awsconfig);

AWS.config.update({region: region});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: identity_pool_id});

const rek = new AWS.Rekognition();

var fileTag = document.getElementById("myFile");
fileTag.addEventListener("change", function() {
    Storage.put(this.files[0].name, this.files[0])
    .then (result => {
        console.log(result);
        identify (this.files[0].name);
    }) 
    .catch(err => console.log(err));
  });
  

function identify (filename) {
    const params = {
      Image: {
        S3Object: {
          Bucket: bucket,
          Name: `public/${filename}`,
        },
      },
      MaxLabels: 10,
      MinConfidence: 75,
    };

    Storage.list('/')
    .then(result => console.log(result))
    .catch(err => console.log(err));

    console.log(`Analyzing file: https://s3.amazonaws.com/${bucket}/${filename}`);

    return new Promise((resolve, reject) => {
      rek.detectLabels(params, (err, data) => {
        if (err) {
          console.log(err);
          return reject(new Error(err));
        }

        var labelArray = [];
        data.Labels.forEach(function(item) {
          labelArray.push("<br>" + item.Name);
        })

        console.log(labelArray);
        //ReactDOM.render(labelArray, document.getElementById('root'));
        var myDiv = document.getElementById("Labels");
        myDiv.innerHTML = labelArray;
        return resolve(data.Labels);
      });
    });
}
