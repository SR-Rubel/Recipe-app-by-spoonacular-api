import {elements} from './base';
export const getInput = ()=> elements.serchInput.value;

/* an unimplemented feature of empty feild
 it should be implemented in later
*/

// export const clearInput=()=>{
//     elements.searchInput.value='';
// }
export const clearResults=()=>{
    elements.searchList.innerHTML=' ';
    elements.searchResPages.innerHTML=' ';
}
export const highlightSelected= id=>{
    const selectedLinks=Array.from(document.querySelectorAll('.results__link'));
    selectedLinks.forEach(el=>{
        el.classList.remove('results__link--active')
    })
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}


export const limitRecipeTitle=(title,limit=10)=>{
    const newTitle=[];
    if(title.length>limit){
        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length<=limit){
                newTitle.push(cur);
            }
            return acc+cur.length;
        },0);
        return `${newTitle.join(' ')}.....`;
    }
    return title;
}

const renderRecipe= recipe =>{
    const markup=`
        <li>
        <a class="results__link" href="#${recipe.id}">
        <figure class="results__fig">
        <img src="${recipe.image}" alt="Test">
        </figure>
        <div class="results__data">
        <h4 class="results__name">${limitRecipeTitle(recipe.title) }</h4>
        </div>
        </a>
        </li>   
    `;
    elements.searchList.insertAdjacentHTML('beforeend',markup);
}

const createButton=(page,type)=>
`
    <button class="btn-inline results__btn--${type}" data-goto=${type==='prev'?page-1:page+1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
        </svg>
        <span>Page ${type==='prev'?page-1:page+1}</span>
    </button>
`
;

const renderButtons=(page,numResults,resPerPage)=>{
    const pages = Math.ceil(numResults/resPerPage);

    let button;
    if(page === 1 && pages>1){
        button=createButton(page,'next');
    }else if(page<pages){
        button=`
        ${createButton(page,'prev')}
        ${createButton(page,'next')}
        `;
    }else if(page === pages && pages>1){
        button=createButton(page,'prev');
    }
    elements.searchResPages.insertAdjacentHTML('beforeend',button);
}

export const renderResults= (recipes,page=1,resPerPage=5)=>{
    const start=(page-1)*resPerPage;
    const end= page*resPerPage;

    recipes.slice(start,end).forEach(renderRecipe);
    renderButtons(page,recipes.length,resPerPage);
}