
## Part 3 - Add Rekognition Label Detection



Now that your file has successfully been uploaded to S3, we will use Amazon Rekognition to detect the labels in the image.


1. #### Add the AWS SDK to your project.

  

We will use the AWS SDK which includes the Rekognition libraries.

(sidenote: you can choose to upload a file to S3 via the AWS SDK as well and you don't **have** to use AWS Amplify to do so. We just did so for the purpose of the workshop)

In your terminal enter `npm install aws-sdk`

2. #### In your `app.js` add the following line of code:

``` javascript
const AWS = require('aws-sdk');
```

We will instantiate the Rekognition class

```javascript
const rek = new  AWS.Rekognition();
```
3. #### Rekognition Permissions

A security best practice is [Granting Least Privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege). Currently your Cognito Identity Pool ARN does not have access to other AWS resources such as Rekognition. We will grant access now:

* Go to your AWS Console and look for Cognito. 
* Click on the "Manage Identity Pools' button
* Look for the Identity Pool with the name we created earlier. We called it 'labeldetect' in Step 2
* Click on 'Edit Identity Pool' on the top-right corner
* Note the name of the role next to 'Unauthenticated role' and 'Authenticated role'
* Now go to your AWS Console and look for IAM
* In the left menu click on Roles and look for the same name that we noted two steps earlier
* Click on that role and then 'Attach Policies'
* Look for `AmazonRekognitionFullAccess` and attach it. This essentially gives the Identity pool created by Cognito the permission to access Rekognition.

4. #### Let's write a function to call the Rekognition API 

```javascript
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
        var myDiv = document.getElementById("Labels");
        myDiv.innerHTML = labelArray;
        return resolve(data.Labels);
      });
    });
}
```
We create a new Image object with the filename. We also define the maximum number of labels and the confidence value for the label detection in Rekognition. 

Using the `.detectLabels` function, we point to the just-uploaded image. The results are pushed into the `labelArray` and the `myDiv` is updated with all the labels. 

4. #### Modify your `Storage.put` function to call the `identify` function we just wrote. This is what it would look like:

```javascript
Storage.put(this.files[0].name, this.files[0])
.then(result => {
    identify(this.files[0].name);
})
.catch(err  =>  console.log(err));
});
```
 

 5. #### Test the app
 
Run `npm start` in your console and your page should open up at http://localhost:8080. Upload an image from your local machine and see what labels are returned. You can play around with the values of MaxLabels and MinConfidence in app.js based on your requirement.


### Homework

* Host the code on a website using AWS Amplify Console
* Ensure the user uploads only images
* TBA
