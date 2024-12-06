export default class userModal{
    
    //Constructor for userModal
    constructor(id,name,email,password,resume){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
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
    static addNew(data){
        const index = users.findIndex(p=>p.email == data.email);
        if(index != -1){
            return null;
        }

        console.log(data);

        const newUser = new userModal(this.generateID(),data.name,data.email,data.password,data.linkedIn);
        users.push(newUser);
        console.log(users);
        return users;
    }

    //remove a user
    static removeUser(user){
        const index = users.findIndex(p=>p.id == user.id);

        if(index != -1){
            users.splice(index,1);
        }
    }
    static authUser(email,password){
        const user = users.find(p=>p.email == email && p.password == password);

        if(user == null){
            return false;
        }else{
            return true;
        }
    }
}

var users = []