Part 2 - Allow your users to upload images to a S3 bucket

AWS Amplify comes with built-in support for Amazon S3 and its really easy.

To do so just run the following command:


amplify add storage

and select Content when provided with options:

? Please select from one of the below mentioned services (Use arrow keys)

❯ Content (Images, audio, video, etc.)

NoSQL Database

? You need to add auth (Amazon Cognito) to your project in order to add storage for user files. Do y

ou want to add auth now? (Y/n)

You can choose to enable auth but for this workshop we will disable auth.

You can update your backend by running this command:


amplify push

To check if your backend added a S3 bucket check the aws-exports.js is copied under your source directory, e.g. ‘/src’ and see if there is a bucket name

To give the users an option to upload a file using the browser we will use some simple JS and HTML. Edit your index.html file with the following code.

The code has some basic styling elements (not required) and a button to choose a local file.


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

Upon choosing a file from your local system, app.js will upload the image to a S3 bucket. Remember we have already configured our Amplify project to work with S3, so you don't have to worry about specifying the bucket name and region. We extract the bucket name from the aws-exports.js file.

Add the code from app.js and index.html in this repo to your code.
