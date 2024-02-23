let containerClicks = document.getElementById('container-clicks');
let btnIncrement = document.querySelector('.btn-primary');
let btnDecrement = document.querySelector('.btn-secondary');
let btnReset = document.querySelector('.btn-reset');

document.addEventListener('DOMContentLoaded', () => {
    containerClicks.innerText = count;

        btnIncrement.addEventListener("Click", function(){
        count ++;
        containerClicks.innerText = count;
    });

    btnDecrement.onClick = function(){
        if (count > 0){
            count --;
            containerClicks.innerText = count;
        } else{
            alert("El contador es 0");
        }
    };

    btnReset.addEventListener("click", () => {
        count = 0;
        containerClicks.innerText = count;
    });
});

