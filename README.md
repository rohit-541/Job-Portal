# Job-Portal
A job portal made on MVC Pattern
Features
1. Allow user to Register
2. Allow registered user to login
3. Check if user enters invalid data using express-validator middleware
4. creates session using express-session to make stateful connection between client and server.
5. lists available jobs on userHome.
6. Logout feature using session.destroy.
7. Job Listing on recruterHome
8. Allow user to upload their resume using multer.
9.Let user apply for job and application should be visible towards the recruter home.
10.Accept the job application on recruter portal.
11.Send confirmation mail on registration.
      
//Method to check
1. clone on your server using git clone 'repo link'
2. install all dependencies using npm i
3. run server node server command
4. type http://localhost:3000 on your browser
5. Test the project and tell me issues and features to add inside portal
6. Ensure you have nodemailer setup email to use emailing option
7. if you do not wish to use nodemailer remove sendmail middleware from post request on route /register/
   
