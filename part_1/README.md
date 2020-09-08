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

  
  
