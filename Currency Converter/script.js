document.addEventListener('DOMContentLoaded',function(){
    
    var myHeaders = new Headers();
    myHeaders.append("apikey", "IDK if I can show the API key. Sorry :(");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${"USD"}&from=${"CAD"}&amount=${1}`, requestOptions)
    .then(response => response.json())
    .then(data =>{
        var conversion = data.result;
        document.querySelector("#result_text").innerHTML = `1 CAD is ${conversion.toFixed(3)} USD`;
    })
    .catch(error => console.log('error', error));
    


    document.querySelector("form").onsubmit = function(){

        //Variables are used in the api call to get the data the user requests
        var From = document.getElementById("currency_lists_from");
        var To = document.getElementById("currency_lists_to");
        var amount = document.getElementById("amount");
        
        if(amount.value<0){//ensures that no negative numbers are inputed
            document.querySelector("#result_text").innerHTML = "Invalid input. Use positive numbers.";
        }

        //can only use 250 requests per month
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${To.value}&from=${From.value}&amount=${amount.value}`, requestOptions)
        .then(response => response.json())
        .then(data =>{
            var conversion = data.result;
            document.querySelector('p').innerHTML = `${amount.value} ${From.value} is ${conversion.toFixed(3)} ${To.value}`;
        })
        .catch(error => console.log('error', error));
        return false;
    }
    document.querySelectorAll(".colourButtons").forEach(function(button){
        button.onclick = function(){
            document.querySelector("body").style.backgroundColor = button.dataset.color;
            document.querySelector("#convert").style.backgroundColor = button.dataset.color;
        }
    });
});
