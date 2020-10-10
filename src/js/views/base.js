export const elements={
    serchInput: document.querySelector('.search__field'),
    serchForm: document.querySelector('.search'),
    searchList: document.querySelector('.results__list'),
    serchres: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    ingrediantList: document.querySelector('.recipe__ingredient-list'),
    shoppingList:document.querySelector('.shopping__list'),
    likeField:document.querySelector('.likes__field'),
    likesList:document.querySelector('.likes__list'),

}

export const elementStrings={
    loader: 'loader',
}

export const renderLoader= parent=>{
    const loader=`
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
}

export const clearLoader=()=>{
    const loader=document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}