import{Response} from "express";
const sendReponse =(res: Response,data:any={message:"invalid reqeust"},stauts=400)=>{
    res.status(stauts).json({data});
}
    export default sendReponse;