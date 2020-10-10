import axios from 'axios';
import {key,proxy} from '../config'

export default class Search{
    constructor(qurey){
        this.query=qurey;
    }
    async getResults(){
        try{
            this.result=await axios(`${proxy}https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&apiKey=${key}&number=10`);
            return this.result;
        }
        catch(error){
            alert(error);
        }
    }
}