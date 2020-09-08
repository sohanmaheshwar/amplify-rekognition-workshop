
## Part 2 - Allow your users to upload images to a S3 bucket

  


1. #### Add Storage via S3 to AWS Amplify

AWS Amplify comes with built-in support for Amazon S3 and its really easy. To do so just run the following command:

  

~~~
amplify add storage
~~~

  

and select Content when provided with options:

  

```console
? Please select from one of the below mentioned services (Use arrow keys)
❯ Content (Images, audio, video, etc.)
NoSQL Database
? You need to add auth (Amazon Cognito) to your project in order to add storage for user files. Do you want to add auth now? (Y)
Using service: Cognito, provided by: awscloudformation
 
 The current configured provider is Amazon Cognito. 
 
Do you want to use the default authentication and security configuration? (Default configuration)
How do you want users to be able to sign in? (Username)
Do you want to configure advanced settings? (No, I am done)
Successfully added auth resource
? Please provide a friendly name for your resource that will be used to label this category in the project: (labeldetect)
? Please provide bucket name: (imageStorage)
? Who should have access: (Auth and guest users)
? What kind of access do you want for Authenticated users? (create/update, read)
? What kind of access do you want for Guest users? (create/update, read)
? Do you want to add a Lambda Trigger for your S3 Bucket? (No)

Successfully updated auth resource locally.
Successfully added resource imageStorage locally
```

2. #### Push changes to backend

Now update your backend by running this command:
 
~~~
amplify push
~~~

**To check if your backend added a S3 bucket check the `aws-exports.js` is copied under your source directory, e.g. ‘/src’ and see if there is a bucket name. You will also see credentials for Cognito**


3. #### Uploading a file

To give the users an option to upload a file using the browser we will use some simple JS and HTML. Edit your `index.html` file with the following code.

  The code has some basic styling elements (not required) and a button to choose a local file.

```html
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8" />
      <title>Learn Amplify</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
         html, body { font-family: "Amazon Ember", "Helvetica", "sans-serif"; margin: 0; }
         a { color: #ff9900; }
         h1 { font-weight: 300; }
         hr { height: 1px; background: lightgray; border: none; }
         .app { width: 100%; }
         .app-header { color: white; text-align: center; background: linear-gradient(30deg, #34c0eb 55%, #d7d3c2); width: 100%; margin: 0 0 1em 0; padding: 3em 0 3em 0; box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3); }
         .app-body { width: 400px; margin: 0 auto; text-align: center; }
      </style>
   </head>
   <body>
      <div class="app">
      <div class="app-header">
         <h1>This is a simple image label detector</h1>
      </div>
      <div class="app-body">
         <h4>Upload an image</h4>
         <input type="File" accept="image/*" id="myFile" multiple size="50">
         <div id="Labels"></div>
         <hr />
      </div>
      <script src="main.bundle.js"></script>
   </body>
</html>
```
4. #### Upload image to S3

We will now modify our `app.js` file to upload the selected image to a S3 bucket. In your `app.js` file, upload this code snippet:

```javascript
import Amplify, {Storage} from 'aws-amplify';
import awsconfig from './aws-exports';

const bucket = awsconfig.aws_user_files_s3_bucket;
const identity_pool_id = awsconfig.aws_cognito_identity_pool_id;
const region = awsconfig.aws_project_region;

Amplify.configure(awsconfig);
AWS.config.update({region: region});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: identity_pool_id});

var fileTag = document.getElementById("myFile");
fileTag.addEventListener("change", function() {
    Storage.put(this.files[0].name, this.files[0]).then(result => {
        var myDiv = document.getElementById("Labels");
        myDiv.innerHTML = "Uploaded " + result.key;
    }).catch(err => console.log(err));
});
```
Run `npm start` in your terminal to start the webpage

You might wonder why Cognito is required even if the app works with unauthenticated users? This is by design. Earlier we specified that Cognito would enable access to authenticated and guest users. The details of the S3 bucket adding earlier as well as the Cognito credentials are stored in your `./aws-exports` file which we have imported. 

We have added an event listener to detect when a file is uploaded. Once the file is selected `Storage.put` will upload the image to the S3 bucket. Add the code from `app.js` and `index.html` in this repo to your code. Try uploading an image and if its successful you will see a 'Uploaded {imageName}' message on the webpage. Go to your S3 bucket in your AWS console to verify if the file has been uploaded. If there's an error, right click in your browser and click on `Inspect Element` to check what the error is. 

### [Go to Part 3 of the workshop](https://github.com/sohanmaheshwar/amplify-rekognition-workshop/tree/master/part_3)
