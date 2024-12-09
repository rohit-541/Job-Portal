export default class jobModel{

    //Create a new job
    constructor(cat,des,loc,comp,sal,deadline,skils,opening,postedon,user){
        this.id = generateID();
        this.categeory = cat;
        this.designation = des;
        this.location = loc;
        this.company = comp;
        this.salary = sal;
        this.deadline = deadline;
        this.skills = skils;
        this.openings = opening;
        this.postedOn = postedon;
        this.applications = [];
        this.user = user;
    }   

    static getAll(){
        return jobs;
    }

    static addJobs(newJob){
        jobs.push(newJob);
    }

    static updateJob(id,cat,des,loc,comp,sal,deadline,opening){
        const job = jobs.find(p=>p.id == id);
        job.categeory = cat;
        job.designation = des;
        job.location = loc;
        job.company = comp;
        job.deadline = deadline;
        job.openings = opening;
        job.salary = sal;
    }

    static removeJob(id){
        const jobIndex = jobs.findIndex(p=>p.id == id);
        if(jobIndex!= -1){
            const user = jobs[jobIndex].user;
            const index = user.postedJob.findIndex(p=>p.id == id);
            if(index != -1){
                user.postedJob.splice(index,1);
            }
            jobs.splice(jobIndex,1);
            return user;
        }
    }

    JobApply(application){
        this.applications.push(application);
        this.openings-=1;
    }

    static getByID(id){
        return jobs.find(p=>p.id == id);
    }

    returnApplications(){
        return this.applications;
    }
}

const job1 = new jobModel("Tech","SDE","Delhi","Google","1200000","10/12/2024",['C++','Python','HTML'],5,'5/12/2024',['user1']);

let jobs = [];
jobs.push(job1);
function generateID(){
    return Number(Date.now()+(Math.random()*10).toFixed());
}

