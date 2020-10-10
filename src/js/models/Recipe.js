import axios from 'axios';
import {key,proxy} from '../config'

export default class Recipes{
    constructor(qurey){
        this.query=qurey;
    }
    async getRecipe(){
        try{
            this.result=await axios(`${proxy}https://api.spoonacular.com/recipes/${this.query}/information?apiKey=${key}&includeNutrition=true.`);
            this.ingredients=this.result.data.extendedIngredients;
            this.servings=this.result.data.servings
        }
        catch(error){
            alert(error);
        }
    }

    ingobj(){
        let ing=[];
        if(this.result){
            this.ingredients.forEach(el=>{
                let obj={
                    name: el.aisle,
                    image: el.image,
                    amount: el.amount,
                    unit: el.unit,
                }
                ing.push(obj)
            })
        }
        this.result.data.extendedIngredients=ing;
    }

    updateServings(type){
        const count=this.result.data.extendedIngredients
        const newServings=type==='dec'?this.result.data.servings-1:this.result.data.servings+1;
        count.forEach(ing=>{
            ing.amount *=(newServings/this.result.data.servings);
        });
        this.result.data.servings=newServings;

    }
    
    // calcTime(){
    //     const numIng = this.extendedIngredients.length;
    //     const periods= Math.ceil(numIng/3);
    // }
}