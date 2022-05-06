export default interface iuser{
    name: string;
    age:number;
    process:string;
    email:string;
    password:string;
    

}

export default interface irequest{
    user : iuser;
    type: string;
}

