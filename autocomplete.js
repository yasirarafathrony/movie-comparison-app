const createAutocomplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) =>{
    //const root = document.querySelector('.autocomplete');
    root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        
        </div>
    
    </div>
    `;
    //fetchData();

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');


    //let timeoutId;
    const onInput = async event =>{
        // Debouncing logic

        // if(timeoutId){
        //     clearInterval(timeoutId);
        // }
    //timeoutId = setTimeout(() =>{
        const items = await fetchData(event.target.value);
        // console.log(movies);

            if (!items.length){
                dropdown.classList.remove('is-active');
                return;
            }


            resultsWrapper.innerHTML = '';

            dropdown.classList.add('is-active');

        for (let item of items){
            const option = document.createElement('a');

            //const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster;


            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);

            option.addEventListener('click', ()=>{
                dropdown.classList.remove('is-active');
                //Update
                input.value = inputValue(item);
                //Helper function
                onOptionSelect(item);
            })
            //document.querySelector('#target').appendChild(div);
            resultsWrapper.appendChild(option);

        }


    };
        

    input.addEventListener('input', debounce(onInput, 500 ));

    //Closing dropdown menu
    document.addEventListener('click', event => {
        //console.log(event.target);
        if(!root.contains(event.target)){
            dropdown.classList.remove('is-active');
        }
    })

}