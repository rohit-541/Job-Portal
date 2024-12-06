export class userModal{
    
    //Constructor for userModal
    constructor(id,name,email,contact,resume){
        this.id = id;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resume = resume;
    }

    static getAll(){
        return users;
    }

    //static id
    static generateID(){
        return Number(Date.now() + (Math.random()*10).toFixed());
    }

    //AddApplicatant
    static addNew(name,email,contact,resume){
        const newUser = new userModal(generateID(),name,email,contact,resume);
        users.push(newUser);
        return users;
    }

    //remove a user
    static removeUser(user){
        const index = users.findIndex(p=>p.id == user.id);

        if(index != -1){
            users.splice(index,1);
        }
    }
}

var users = []