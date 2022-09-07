document.addEventListener('DOMContentLoaded',function(){
    document.querySelector("form").onsubmit = function(){
        var myHeaders = new Headers();
        myHeaders.append("apikey", "mBWJT44G2F2BE0arhRrk2D99MDfu0vAZ");

        var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
        };

        //Variables are used in the api call to get the data the user requests
        var From = document.getElementById("currency_lists_from");
        var To = document.getElementById("currency_lists_to");
        var amount = document.getElementById("amount");
        
        if(amount.value<0){//ensures that no negative numbers are inputed
            document.querySelector('p').innerHTML = "Invalid input. Use positive numbers.";
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
});