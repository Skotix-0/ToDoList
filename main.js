"use strict"

let main_inputs = document.querySelector('.main_inputs');

window.onload = function loading_strings (){
    
    if(localStorage.length == 0){
        main_inputs.innerHTML += `<div class="main_inputs__child" id="block_inputs_0" onchange="update_string(this)"><input type="checkbox" name="" id="to_do_check_0" class="checkboxIn"><input id="enterText_0" class="enterText" type="text" placeholder="Enter your text..."><button onclick="clear_string(0)" class="clear_string">X</button></div>`;
    }else{

        for(let i = 0; i < localStorage.length; i++){
            if(localStorage.getItem(`block_${i}`) !== null){
                main_inputs.innerHTML += `<div class="main_inputs__child" id="block_inputs_${i}"" onchange="update_string(this)"><input type="checkbox" name="" id="to_do_check_${i}" class="checkboxIn"><input id="enterText_${i}" class="enterText" type="text" placeholder="Enter your text..."><button onclick="clear_string(${i})" class="clear_string">X</button></div>`;
            }
        }
        
        for(let i = 0; i < localStorage.length; i++){
            if(localStorage.getItem(`block_${i}`) !== null){
                let obj = JSON.parse(localStorage.getItem(`block_${i}`));
                document.querySelector(`#to_do_check_${i}`).checked = obj.check;
                document.querySelector(`#enterText_${i}`).value = obj.text;
            }
        }
    }
}

function add_row (){
    let score_blocks = document.querySelectorAll('.main_inputs__child').length;
    score_blocks += 1;

    main_inputs.innerHTML += `<div class="main_inputs__child" id="block_inputs_${score_blocks-1}" onchange="update_string(this)"><input type="checkbox" name="" id="to_do_check_${score_blocks-1}" class="checkboxIn"><input id="enterText_${score_blocks-1}" class="enterText" type="text" placeholder="Enter your text..."><button onclick="clear_string(${score_blocks-1})"  class="clear_string">X</button></div>`;
    
    let object_datas = {
        check: false,
        text: '',
    };

    localStorage.setItem(`block_${score_blocks-1}`, JSON.stringify(object_datas));

    for(let i = 0; i < localStorage.length; i++){
        let obj = JSON.parse(localStorage.getItem(`block_${i}`));
        document.querySelector(`#to_do_check_${i}`).checked = obj.check;
        document.querySelector(`#enterText_${i}`).value = obj.text;
    }
}

function update_string (x){
    let index_block = x.id;
    let score = index_block.substr(13);

    let checkbox = document.querySelector(`#${index_block}`).children[0];
    let input = document.querySelector(`#${index_block}`).children[1].value;

    let object_datas = {
        check: false,
        text: '',
    };

    if(checkbox.checked){
        object_datas.check = true;
        object_datas.text = input;
        
        localStorage.setItem(`block_${score}`, JSON.stringify(object_datas));
    }else{
        object_datas.check = false;
        object_datas.text = input;
        
        localStorage.setItem(`block_${score}`, JSON.stringify(object_datas));
    }
}

function clear_all (){
    localStorage.clear();
    window.location.reload();
}

function clear_string (x){

    localStorage.removeItem(`block_${x}`);
    document.querySelector(`#block_inputs_${x}`).remove();

    for(let i = x; i < localStorage.length; i++){
        localStorage.setItem(`block_${i}`, localStorage.getItem(`block_${i+1}`));
    }

    for(let i = 0; i < localStorage.length; i++){
        let obj = JSON.parse(localStorage.getItem(`block_${i}`));
        document.querySelector(`#to_do_check_${i}`).checked = obj.check;
        document.querySelector(`#enterText_${i}`).value = obj.text;
    }
}