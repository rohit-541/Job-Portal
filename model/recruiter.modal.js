export default class recruterModal{
    
    //Constructor for userModal
    constructor(id,name,email,password,linkedIn){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.linkedIn = linkedIn
        this.postedJob = [];
        this.applications = [];
        this.notifications = [];
    }

    //Returns all the users 
    static getAll(){
        return recruters;
    }

    //return a random ID for new users
    static generateID(){
        return Number(Date.now() + (Math.random()*10).toFixed());
    }

    //Register new Applicant
    static addNew(data){
        //Checks if it already exists 
        const index = recruters.findIndex(p=>p.email == data.email);
        if(index != -1){
            return null;
        }
        
        //Add user to userArray
        const newUser = new recruterModal(this.generateID(),data.name,data.email,data.password,data.linkedIn);
        recruters.push(newUser);
        return newUser;
    }

    //return null if user does not exist else returns the user
    static authUser(email,password){
        return recruters.find(p=>p.email == email & p.password == password);
    }

    //Add new job to user
    addJob(job){
        this.postedJob.push(job);
        this.notifications.push(`Successfully posted for ${job.designation} at ${job.company}`);
    }

    //Get applied jobs
    returnJobArray(){
        return this.postedJob;
    }

    //Get notifications
    returnNotifications(){
        return this.notifications;
    }

    static getUserbyId(id){
        return recruters.find(p=>p.id == id);
    }
}

var recruters = [];
