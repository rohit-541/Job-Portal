export class jobModel{

    //Create a new job
    constructor(cat,des,loc,comp,sal,deadline,skils,opening,postedon,applicants){
        this.id = this.generateID();
        this.categeory = cat;
        this.designation = des;
        this.location = loc;
        this.company = comp;
        this.salary = sal;
        this.deadline = deadline;
        this.skills = skils;
        this.openings = opening;
        this.postedOn = postedon;
        this.applicants = applicants;
    }   

    static generateID(){
        return Number(Date.now()+(Math.random()*10).toFixed());
    }
}

const newJob = new jobModel();
