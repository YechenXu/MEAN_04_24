const Api =(()=>{
    const url = 'https://random-word-api.herokuapp.com/word';
    const getData = fetch(url).then((res) => res.json()).catch();
    return {
        getData     // Promise
    }
})();

// View => user interface
const View = (()=>{
    let domSelector = {
        container: ".content",
        inputBox: "#user-input",
        btn:"#resetBtn"
    }
    
    const creatTmp = (word, guess)=>{
        let template = '';
        template += `<div>
        <p class="guess_time">${guess}/10</p>
        <p class="random_letter">${word}</p>
        </div>`;
        return template;
    }
    
    const render = (ele, template)=>{
        ele.innerHTML = template;
    }

    return {
        domSelector,
        creatTmp,
        render
    }
})();



// Model => retrieve data, store data, modify data & update the View
const Model = ((api, view)=>{
    const { domSelector, creatTmp, render } = view;
    const { getData } = api;

    class State{
        constructor(){
            this._w = '';
            this._g = 0;  //current guess
            this._hiddeIndexes = [];
            this._origin = [];
        }

        set generateWord(word){
            word = word[0];
            let hideCount = Math.floor(Math.random() * word.length);

            const charArray = word.split('');
            const hiddenIndexes = new Set();
          
            while (hiddenIndexes.size < hideCount && hiddenIndexes.size < word.length) {
                const randomIndex = Math.floor(Math.random() * word.length);
                hiddenIndexes.add(randomIndex);
            }
          
            const originalWord = [];
            for (const index of hiddenIndexes) {
                originalWord.push(charArray[index]);
                charArray[index] = '_';
            }

            this._w = charArray.join(' ');

            this._g = 0;  //current guess
            this._hiddeIndexes = Array.from(hiddenIndexes);
            this._origin = originalWord;
            let tmp = creatTmp(this._w, this._g);
            let todoContainer = document.querySelector(domSelector.container);
            console.log(this._origin);
            render(todoContainer, tmp);
        }

        set updateWord(input){
            if (input.length != 0){
                if (this._origin.includes(input)) {
                    let hidIndex = this._origin.indexOf(input);
                    let wordIndex = this._hiddeIndexes.indexOf(hidIndex);
                    const charArray = this._w.split('');
                    charArray[wordIndex] = input;
                    this._w = charArray.join(' ');
                    this._origin.splice(hidIndex,1);
                    this._hiddeIndexes.splice(hidIndex,1);
                }else {
                    this._g ++;
                }
                let tmp = creatTmp(this._w, this._g);
                let todoContainer = document.querySelector(domSelector.container);
                render(todoContainer, tmp);
            }
        }
        
    
    }
    return {
        State,
        getData
    }
})(Api, View);


// Controller => manage data & handle users' actions

const Controller = ((view, model)=>{
    const { domSelector } = view;
    const { State, getData } = model;

    const state = new State();
    
    const init = () => {
        getData.then((data) => {
            state.generateWord = data;
        });
    }

    const update = () => {
        const userInput = document.querySelector(domSelector.inputBox)
        state.updateWord = userInput.value;
        
        setTimeout(() => {
            if(state._origin.length === 0) {
                alert(`Congrats! You found the word`);
                getData.then((data) => {
                    state.generateWord = data;
                });
            } else if(state._g == 10) {
                alert("Game over! You don't have remaining guesses");
                getData.then((data) => {
                    state.generateWord = data;
                });
            }
        }, 100);
    }

    // Add event listeners
    const addTodo = () => {
        const userInput = document.querySelector(domSelector.inputBox);
        const btn = document.querySelector(domSelector.btn);
        
        btn.addEventListener('click', init)
        userInput.addEventListener("input", update);
    }
    
    // wrap all function
    const bootstrap = ()=>{
        init();
        addTodo();
    }

    return {
        bootstrap,
    }
    
})(View, Model);

Controller.bootstrap();