export default class application{
    constructor(userName,userEmail,userContact,userResume){
        this.id = generateID();
        this.userName= userName;
        this.userContact = userContact;
        this.userResume = userResume;
        this.userEmail = userEmail;
        this.status = false;
        this.AppliedOn = new Date().toLocaleDateString();
    }

    static addApplication(app){
        allApplications.push(app);
    }

    static getbyID(id){
        return allApplications.find(p=>p.id == id);
    }
}

function generateID(){
    return Number(Date.now() + (Math.random()*10).toFixed());
}

const allApplications = []