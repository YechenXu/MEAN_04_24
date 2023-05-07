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
        let output_word = word.join(' ');
        let template = '';
        template += `
        <p class="guess_time">${guess}/10</p>
        <p class="random_letter">${output_word}</p>`;
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
            this._w = [];
            this._g = 0;  //current guess
            this._hiddeIndexes = [];
            this._origin = [];
        }

        set generateWord(word){
            word = word[0];
            console.log(word);
            let hideCount = Math.floor(Math.random() * word.length);

            const charArray = word.split('');
            const hiddenIndexes = new Set();
          
            while (hiddenIndexes.size < hideCount && hiddenIndexes.size < word.length) {
                const randomIndex = Math.floor(Math.random() * word.length);
                hiddenIndexes.add(randomIndex);
            }

            this._hiddeIndexes = [];
            this._origin = [];
            for (const index of hiddenIndexes) {
                this._origin.push(charArray[index]);
                this._hiddeIndexes.push(index);
                charArray[index] = '_';
            }

            this._w = charArray;
            this._g = 0;  //current guess
            let tmp = creatTmp(this._w, this._g);
            let todoContainer = document.querySelector(domSelector.container);
            console.log(this._origin);
            render(todoContainer, tmp);
        }

        set updateWord(input){
            if (input.length != 0){
                if (this._origin.includes(input)) {
                    let hidIndex = this._origin.indexOf(input);
                    let wordIndex = this._hiddeIndexes[hidIndex];
                    this._w[wordIndex] = input;
                    console.log(this._w);
                    this._origin[hidIndex] = '_';
                    console.log(this._origin);
                    console.log(this._hiddeIndexes);
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

    const update = (char) => {
        state.updateWord = char;
        
        setTimeout(() => {
            if(!state._w.includes('_')) {
                alert(`Congrats! You found the word`);
                getData.then((data) => {
                    state.generateWord = data;
                });
            } else if(state._g == 10) {
                let correct = 0;
                state._origin.forEach(e => {if(e != '_'){correct += 1}})
                alert(`Game over! You have guessed ${correct} words!`);
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
        userInput.addEventListener("keypress", (event) => { //when press enter get the input char
            if (event.key === "Enter") {
                update(userInput.value);
            }
        });
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