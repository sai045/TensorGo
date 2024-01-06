# TensorGo

## Technologies
Frontend: ReactJS, Typescript, Tailwind CSS, axios
<br/>
Backend: NodeJS, Express, Passport
<br/>
Intergrated intercom.com for managing customer service requests

<br/>
## Instructions for setting up

For backend
```bash
npm install
npm start
```
For frontend
```bash
cd client
npm install
npm start
```

## Functions implemented and how

### Authentication
- Authentication is implemented using Passport.js and Google OAuth2
- Setup an webapp on Google console, get the app external and then get OAuth2 credentials
- Use the credentials in the NodeJS backend and initialize the passport session
- Passport takes care of how to use Google OAuth using the passport-google-oauth20 package

### Customer Service Request



- Setup an app on intercom developer hub
- Use contacts as users and conversations as complaints
- We can use intercom-client package to interact with intercom
- Complaints are registered as conversations
- Complaints can be viewed in different catagories
- Complaints can also be viewed singularly showing complaint details and also know the complaint status

### User experience


- User can login using his google account
- User can view all the complaints he has raised and also view them according to catagory
- User can also create new complaints
- User gets an email whenever there is an update regarding a complaint he raised

![Screenshot from 2024-01-06 18-47-25](https://github.com/sai045/TensorGo/assets/85741790/ea61c67a-968f-403d-82ff-abe4bf94ad01)
![Screenshot from 2024-01-06 18-48-13](https://github.com/sai045/TensorGo/assets/85741790/8d026a28-bb77-448f-9427-c1821e392dc8)
![Screenshot from 2024-01-06 18-50-18](https://github.com/sai045/TensorGo/assets/85741790/89949bfa-fdc2-4573-a27a-73ef9c70045c)
![Screenshot from 2024-01-06 18-51-05](https://github.com/sai045/TensorGo/assets/85741790/d55d536f-c8e8-45ad-905a-aadf0aafe814)
