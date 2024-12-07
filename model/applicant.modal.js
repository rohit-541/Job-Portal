export default class userModal{
    
    //Constructor for userModal
    constructor(id,name,email,password,resume){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.resume = resume;
        this.appliedJobs = [];
        this.notifications = [];
    }

    //Returns all the users 
    static getAll(){
        return users;
    }

    //return a random ID for new users
    static generateID(){
        return Number(Date.now() + (Math.random()*10).toFixed());
    }

    //Register new Applicant
    static addNew(data){
        //Checks if it already exists 
        const index = users.findIndex(p=>p.email == data.email);
        if(index != -1){
            return null;
        }
        
        //Add user to userArray
        const newUser = new userModal(this.generateID(),data.name,data.email,data.password,data.linkedIn);
        users.push(newUser);
        return newUser;
    }

    //return null if user does not exist else returns the user
    static authUser(email,password){
        return users.find(p=>p.email == email & p.password == password);
    }

    //Add new job to user
    addJob(job){
        this.appliedJobs.push(job);
        this.notifications.push(`Successfully applied for ${job.designation} at ${job.company}`);
    }

    //Get applied jobs
    returnJobArray(){
        return this.appliedJobs;
    }

    //Get notifications
    returnNotifications(){
        return this.notifications;
    }
}

var users = [];
