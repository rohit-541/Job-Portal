import nodemailer, { createTransport } from 'nodemailer'

export async function sendmail(req,res,next){
    const email = req.body.email;
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            //Not written for privacy reasons
            user:'----',
            pass:'---',
        }
    }); 
    console.log(email);
    const mailoptions = {
        form:'rohitkumar240iit@gmail.com',
        to:email,
        subject:'Confirmig Registration',
        text:'Successfully Registered for Job universe',
    }

    await transporter.sendMail(mailoptions);
    console.log("Email Sent successfully");
    next();
}

