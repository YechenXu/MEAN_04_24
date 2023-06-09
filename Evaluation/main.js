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
        btn:"#resetBtn",
        guess: ".guess_history",
        myTimer: ".my_timer",
    }
    
    const creatTmp = (word, guess)=>{
        let output_word = word.join(' ');
        let template = '';
        template += `
        <p class="guess_time">${guess}/10</p>
        <p class="random_letter">${output_word}</p>`;
        return template;
    }

    const guessHistory = (history)=> {
        let template = `<span>Guessed letters:</span>`;
        for (const [key, value] of Object.entries(history)) {
            if (value === true) {
                template += `<span class='t'> ${key}</span>`;
            } else {
                template += `<span class='f'> ${key}</span>`;
            }
          }
        return template;
    }

    const myTimer =(time)=> {
        let template = `<span>Time Left: ${time}s</span>`;
        return template;
    }
    
    const render = (ele, template)=>{
        ele.innerHTML = template;
    }

    return {
        domSelector,
        creatTmp,
        guessHistory,
        myTimer,
        render
    }
})();



// Model => retrieve data, store data, modify data & update the View
const Model = ((api, view)=>{
    const { domSelector, creatTmp, guessHistory, myTimer, render } = view;
    const { getData } = api;

    class State{
        constructor(){
            this._w = [];
            this._g = 0;  //current guess
            this._origin = []; // record all hidden characters
            this._history = new Object; // record all input characters and correct or not
        }

        renderView() {
            let tmp = creatTmp(this._w, this._g);
            let wordContainer = document.querySelector(domSelector.container);
            render(wordContainer, tmp);
            let guessTmp = guessHistory(this._history);
            let guessContainer = document.querySelector(domSelector.guess);
            render(guessContainer, guessTmp);
        }

        set renderTimer(time) {
            let timeContainer = document.querySelector(domSelector.myTimer);
            let timeTmp = myTimer(time)
            render(timeContainer, timeTmp);
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

            this._origin = Array(word.length); 
            for (const index of hiddenIndexes) {
                this._origin[index] = charArray[index];
                charArray[index] = '_';
            }

            this._w = charArray;
            this._g = 0;  //current guess
            this._history = new Object;
            this.renderView();
            console.log(this._origin);
        }

        set updateWord(input){
            if (Object.keys(this._history).includes(input)) {
                alert('Letter already in the history list');
            } else if (input.length != 0){
                let flag = 0;
                this._origin.forEach((element, index) => {
                    if (element === input) {
                        this._w[index] = input;
                        console.log(this._w);
                        this._origin[index] = '*';
                        console.log(this._origin);
                        console.log(this._hiddeIndexes);
                        flag ++;
                    }
                })

                if (flag === 0 ) {
                    this._g ++;
                    this._history[input] = false;
                } else {
                    this._history[input] = true;
                }

                this.renderView();
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
                state._origin.forEach(e => {if(e === '*'){correct += 1}})
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

    // set timer for every 60 secs
    const myTimer = () => {
        var current_time = 60;
        setInterval(function() {
            current_time --;
            state.renderTimer = current_time;
            if (current_time === 0) {
                alert("Time Limit Exceed");
                getData.then((data) => {
                    state.generateWord = data;
                });
                current_time = 60;
            }
        }, 1000)
    }
    
    // wrap all function
    const bootstrap = ()=>{
        init();
        addTodo();
        myTimer();
    }

    return {
        bootstrap,
    }
    
})(View, Model);

Controller.bootstrap();