import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import {elements,renderLoader,clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

const state={};

const controlSearch=async ()=>{
    // 1> getting query
    const query = searchView.getInput(); //TODO
    if(query){
    // 2> new search object and add to state 
    state.search =new Search(query);
    // 3> prepare ui for result 
    // searchView.clearInput();

    searchView.clearResults();
    renderLoader(elements.serchres);
    // 4> search recipe
    await state.search.getResults();
    // 5>render result in ui 
    clearLoader();
    searchView.renderResults(state.search.result.data.results);

    }
}

    elements.serchForm.addEventListener('submit',e=>{
    e.preventDefault();
    controlSearch();
    
});

elements.searchResPages.addEventListener('click',e=>{
    const btn=e.target.closest('.btn-inline');
    if(btn){
        const goToPage=parseInt(btn.dataset.goto);

        searchView.clearResults();
        searchView.renderResults(state.search.result.data.results,goToPage);
    }
    
});


/**
 * recipe controller
 * 
 */

 const controlRecipe = async () =>{
     const id = window.location.hash.replace('#','');
     if(id){
         //prepare ui for changes
         recipeView.clearRecipe();
         renderLoader(elements.recipe);
         //highlight selected search item
         if(state.search)searchView.highlightSelected(id);
         //create new recipe object
         try{

             state.recipe=new Recipe(id);
    
             //get recipe data
             await state.recipe.getRecipe();
             state.recipe.ingobj();
    
             //calculate servings and time
    
             // render recipe
             clearLoader();
             const curntId=parseInt(id);
             recipeView.renderRecipe(state.recipe.result.data,state.likes.isLiked(curntId));
         }
         catch(error){
             alert(error);
             console.log(error);
         }

     }
 }



 ['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));
//handling recipe servigs
    elements.recipe.addEventListener('click',e=>{
        if(e.target.matches('.btn-decrease,.btn-decrease *')){
            //decrease button cliked
            if(state.recipe.result.data.servings>1)
            state.recipe.updateServings('dec');
            recipeView.upadateIngredients(state.recipe.result.data);
        }
        else if(e.target.matches('.btn-increase,.btn-increase *')){
            //increase button cliked
            state.recipe.updateServings('inc');
            recipeView.upadateIngredients(state.recipe.result.data);
        }
        else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
            controlList();
        }
        else if(e.target.matches('.recipe__love, .recipe__love *')){
            controlLike();
        }
    });


    /**
 * list controller
 * 
 */

const controlList=()=>{
    //create a new list if there in none yet
    if(!state.list) state.list=new List();
    // add each ingredient to the list
    state.recipe.result.data.extendedIngredients.forEach(el=>{
        const item=state.list.addItem(el.amount,el.unit,el.name);
        listView.renderItem(item);
    })
}

//handle delete list
elements.shoppingList.addEventListener('click',e=>{
    const id=e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //delete from state
        state.list.deleteItem(id);
        //delete from UI
        listView.deleteItem(id)
    }
    else if(e.target.matches('.shopping__count-value')){
        const value=parseInt(e.target.value,10);
        state.list.updateCount(id,value);
    }
})


/**
 * likes controller
 * 
 */

 const controlLike=()=>{
     const recipe=state.recipe.result.data;
     if(!state.likes) state.likes=new Likes();
     const curntId=recipe.id;


     if(!state.likes.isLiked(curntId)){
         //add likes to the state
         const newlike=state.likes.addLikes(
            curntId,
            recipe.title,
            recipe.sourceName,
            recipe.image
         );
         //Toggle the like button
         likesView.toggleLikeBtn(true);
                
         //add like to UI list
         likesView.renderLikes(newlike);

     }
     else{
         //remove likes from the state
         state.likes.deleteLike(curntId);
         //toggle the like button
         likesView.toggleLikeBtn(false);

         //remove Likes from the UI List
         likesView.deleteLike(curntId);

     }
     likesView.toggleLikeMenu(state.likes.getNumLikes());

 };

 window.addEventListener('load',()=>{
     state.likes=new Likes();

     //restore like
     state.likes.readStorage();

     //toggle like menu button
     likesView.toggleLikeMenu(state.likes.getNumLikes());
     
     //render the existing likes
     state.likes.likes.forEach(like=>{
         likesView.renderLikes(like);
     });
 });