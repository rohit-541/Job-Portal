
export class recruiterModal{
    constructor(id,name,jobs,email,password){
        this.id = id;
        this.name = name;
        this.jobs = jobs;
        this.email = email;
        this.password = password;
    }

    static getAll(){
        return recruters;
    }


    //Generate random id
    static GenrateID(){
        return Number(Date.now()+ (Math.random()*10).toFixed());
    }

    //Add new recruter
    static addNew(name,jobs,email,password){
        const newRecruter = new recruiterModal(this.GenrateID(),name,jobs,email,password);
        recruters.push(newRecruter);
    }

    //remove a recruter
    static removeRecruter(id){
        const index = recruters.findIndex(p=>p.id == id);

        if(index != -1){
            recruters.splice(index,1);
        }
    }

    //Add a job to recruter
    addNewJob(job){
        this.jobs.push(job);
    }

    //Remove a job
    removejob(job){
        const index= this.jobs.findIndex(p=>p.id == job.id);

        if(index != -1){
            this.jobs.splice(index,1);
        }

    }

}

var recruters = [];