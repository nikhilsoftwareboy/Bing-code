const input = document.getElementById('search-quan-intput');
const btn = document.getElementById('search-btn');
const hiddenMessage = document.getElementById('message-text');

btn.addEventListener('click', startSearching);

function startSearching(){
    let inputValue = input.value

    if(inputValue === ""){
        hiddenMessage.textContent = 'please enter number';
        hiddenMessage.style.visibility = 'visible';

    } else if(inputValue === 0){
        hiddenMessage.textContent = 'please enter number greater than 0';
        hiddenMessage.style.visibility = 'visible';

    } else if(inputValue >= 1 && inputValue <= 50 || inputValue > 50){
        if (inputValue > 50){
            input.value = 50;
            inputValue = 50;
            hiddenMessage.textContent = 'only 50 searches will be made';
            hiddenMessage.style.visibility = 'visible';
        }    

        const wordRequest = new XMLHttpRequest();

        wordRequest.addEventListener('readystatechange', function(event){
            if (event.target.readyState === 4 && event.target.status === 200){
                let words = JSON.parse(event.target.responseText);
                for (let i = 0; i < words.length; i++){
                    window.open(`https://www.bing.com/search?q=${words[i].replace(" ", "+")}`, "_blank");
                }
            }
        });

        wordRequest.open('GET', `https://random-word-api.vercel.app/api?words=${inputValue}`);
        wordRequest.send();
    }
    
    
}
