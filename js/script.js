$(() => {
   var urlApi1 = "https://api.nbp.pl/api/exchangerates/tables/a/today/";

   var urlApi2 = "https://api.nbp.pl/api/exchangerates/tables/a/";

   var cashSymbol = document.querySelectorAll("tbody .col3");
   var cashValue = document.querySelectorAll("tbody .col4");

   var tbody = document.querySelectorAll("tbody");
   var btn = document.querySelector("button");
   var give = document.querySelector(".give");
   var get = document.querySelector(".get");
   var cashInput = document.querySelector("input");
   var warningOutput = document.querySelector(".warning");
   var cashOutput = document.querySelector(".sum");
   var calcHeader = document.querySelector(".calcHeader");
   var calcSetion = document.querySelector(".calcSetion");


   $.ajax({
      url: urlApi1
   }).done(function(response) {

      console.log(response);

      for (var i = 0; i < cashSymbol.length; i++) {
         cashSymbol[i].innerText = response[0].rates[i].code;
         cashValue[i].innerText = response[0].rates[i].mid;
      }

   }).fail(function() {

      $.ajax({
         url: urlApi2
      }).done(function(response) {

         for (var i = 0; i < cashSymbol.length; i++) {
            cashSymbol[i].innerText = response[0].rates[i].code;
            cashValue[i].innerText = response[0].rates[i].mid;
         }

      }).fail(function(error) {
         console.log("błąd połączenia");
      })
   })

   calcHeader.addEventListener("click", function(event){
      event.preventDefault();

      calcSetion.classList.toggle("show");

      // arrowIcon.classList.toggle("rotate");
      // arrowIcon.style.transform = "rotate(90deg)"
   })



   btn.addEventListener("click", function(event){
      event.preventDefault();

      for (var i = 0; i < give.length; i++) {

         if (give[i].selected) {

            var giveSelect = give[i].getAttribute("value");

            var giveValue = document.querySelector("."+giveSelect).innerText;
            var giveValueAsNum = parseFloat(giveValue);
         }

         if (get[i].selected) {

            var getSelect = get[i].getAttribute("value");

            var getValue = document.querySelector("."+getSelect).innerText;
            var getValueAsNum = parseFloat(getValue);
         }
      }



      if (!isNaN(cashInput.value) && cashInput.value !=="") {

         var cashInputValue = parseFloat(cashInput.value)
         cashOutput.innerText = ((giveValueAsNum / getValueAsNum) * cashInputValue).toFixed(2);
         warningOutput.innerText = ""
         console.log(typeof(cashInputValue));
      }else {
         warningOutput.innerText = "Wpisz sumę poprawne."
      }
   })
})
