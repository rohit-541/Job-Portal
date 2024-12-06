export default class jobModel{

    //Create a new job
    constructor(cat,des,loc,comp,sal,deadline,skils,opening,postedon,applicants){
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
        this.applicants = applicants;
    }   

    static getAll(){
        return jobs;
    }
}

const job1 = new jobModel("Tech","SDE","Delhi","Google","1200000","10/12/2024",['C++','Python','HTML'],5,'5/12/2024',['user1']);

let jobs = [job1];
function generateID(){
    return Number(Date.now()+(Math.random()*10).toFixed());
}