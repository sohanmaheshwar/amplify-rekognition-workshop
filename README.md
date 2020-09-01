
 # Getting started with AWS Amplify, S3 and Rekognition

  

#### Welcome to this workshop. In this self-paced workshop you will learn:

  
  

* How to get started with AWS Amplify using Node JS

* Add Storage to your Amplify project with S3

* Authenticate a user via Amazon Cognito

* Analyze the labels for a user-uploaded file using Rekognition

  
  

## Part I - Getting Started with AWS Amplify

  

  

The open-source Amplify Framework provides the following products to build fullstack iOS, Android, Flutter, Web, and React Native apps:

  
  

**Amplify CLI** - Configure all the services needed to power your backend through a simple command line interface.

  

**Amplify Libraries** - Use case-centric client libraries to integrate your app code with a backend using declarative interfaces.

  

**Amplify UI Components** - UI libraries for React, React Native, Angular, Ionic and Vue.

  

### Pre Requisites:

  
  

* AWS Account

* Node.js v10.x or later

* npm v5.x or later

* git v2.14.1 or later

  

1. Lets get started by installing Amplify

~~~

npm install -g @aws-amplify/cli

~~~

2. Configure Amplify

~~~

amplify configure

~~~

This command will ask you to create a new user in IAM. Follow the steps to create a new IAM user with the necessary permissions. Once the user is created, the Amplify CLI will ask you to provide the `accessKeyId` and the `secretAccessKey` to connect Amplify CLI with your newly created IAM user. Once you do this you have setup Amplify

  

3. Lets setup our simple project

## Create a new JavaScript app

  

Create a new ‘plain’ JavaScript [ES2015](https://babeljs.io/docs/en/learn/) app with webpack. With the following commands, create the directory (`amplify-js-app`) and files for the app.

  

```bash

mkdir -p amplify-js-app/src && cd amplify-js-app

touch package.json index.html webpack.config.js src/app.js

```

  

The app directory structure should be:

  

```console

amplify-js-app

├── index.html

├── package.json

├── src

│ └── app.js

└── webpack.config.js

```

  

Add the following to the `package.json` file:

  

```json

{

"name": "amplify-js-app",

"version": "1.0.0",

"description": "Amplify JavaScript Example",

"dependencies": {

"aws-amplify": "latest"

},

"devDependencies": {

"webpack": "^4.17.1",

"webpack-cli": "^3.1.0",

"copy-webpack-plugin": "^4.5.2",

"webpack-dev-server": "^3.1.5"

},

"scripts": {

"start": "webpack && webpack-dev-server --mode development",

"build": "webpack"

}

}

```

  

### Install local development dependencies

  

```bash

npm install

```

Add the following to the `index.html` file:

~~~

<html>

<head>

<title> Label Detector </title>

</head>

<body>

<h1> This is a Label Detector </h1>

</body>

</html>

~~~

  

Add the following to the `webpack.config.js` file:

  

~~~

const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

const path = require('path');

  

module.exports = {

mode: 'development',

entry: './src/app.js',

output: {

filename: '[name].bundle.js',

path: path.resolve(__dirname, 'dist')

},

module: {

rules: [

{

test: /\.js$/,

exclude: /node_modules/

}

]

},

devServer: {

contentBase: './dist',

overlay: true,

hot: true

},

plugins: [

new CopyWebpackPlugin(['index.html']),

new webpack.HotModuleReplacementPlugin()

]

};

~~~

  

Run the app:

  

```bash

npm start

```

  

Open a browser and navigate to [http://localhost:8080](http://localhost:8080)

  

## Initialize a new backend

  

Now that we have a running app, it’s time to set up Amplify so that we can create the necessary backend services needed to support the app. From the root of the project, run:

  

```bash

amplify init

```

  

When you initialize Amplify you’ll be prompted for some information about the app:

  

```console

Enter a name for the project (amplifyjsapp)

  

# All AWS services you provision for your app are grouped into an "environment"

# A common naming convention is dev, staging, and production

Enter a name for the environment (dev)

  

# Sometimes the CLI will prompt you to edit a file, it will use this editor to open those files.

Choose your default editor

  

# Amplify supports JavaScript (Web & React Native), iOS, and Android apps

Choose the type of app that you're building (javascript)

  

What JavaScript framework are you using (none)

  

Source directory path (src)

  

Distribution directory path (dist)

  

Build command (npm run-script build)

  

Start command (npm run-script start)

  

# This is the profile you created with the `amplify configure` command in the introduction step.

Do you want to use an AWS profile

```

And that's it. You have created a simple Javascript web app using AWS Amplify. In the next steps you will learn how to let a user upload a file to a S3 bucket and then use Rekognition to detect labels on it.

  
  

## Part 2 - Allow your users to upload images to a S3 bucket

  

AWS Amplify comes with built-in support for Amazon S3 and its really easy.

To do so just run the following command:

~~~

amplify add storage

~~~

and select Content when provided with options:

```console

? Please select from one of the below mentioned services (Use arrow keys)

❯ Content (Images, audio, video, etc.)

NoSQL Database

? You need to add auth (Amazon Cognito) to your project in order to add storage for user files. Do y

ou want to add auth now? (Y/n)

```

You can choose to enable auth but for this workshop we will disable auth.

  

You can update your backend by running this command:

  

~~~

amplify push

~~~

  

**To check if your backend added a S3 bucket check the `aws-exports.js` is copied under your source directory, e.g. ‘/src’ and see if there is a bucket name**

  
To give the users an option to upload a file using the browser we will use some simple JS and HTML. Edit your `index.html` file with the following code. 

The code has some basic styling elements (not required) and a button to choose a local file. 
~~~

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

~~~

Upon choosing a file from your local system, `app.js` will upload the image to a S3 bucket. Remember we have already configured our Amplify project to work with S3, so you don't have to worry about specifying the bucket name and region. We extract the bucket name from the `aws-exports.js` file. 

~~~
<Add app.js code here>
~~~


