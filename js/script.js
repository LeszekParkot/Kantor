$(() => {
   // var urlApi = "http://api.nbp.pl/api/exchangerates/tables/a/today/";

   var urlApi = "http://api.nbp.pl/api/exchangerates/tables/a/";

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
   // var arrowIcon = document.querySelector(".calcHeader i");


   $.ajax({
      url: urlApi
   }).done(function(response) {
      console.log(response);

      for (var i = 0; i < cashSymbol.length; i++) {
         cashSymbol[i].innerText = response[0].rates[i].code;
         cashValue[i].innerText = response[0].rates[i].mid;
      }

   }).fail(function(error) {
      console.log("błąd połączenia");
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

      // console.log(giveValueAsNum);
      // console.log(getValueAsNum);
      // console.log(cashInputValue);
      //
      // console.log(cashInputValue);
      // console.log(cashOutput.innerText);



   })




})






























// $('.give').change(function(event) {
//    if ($(this).val() === 'usd') {
//      console.log("elo");
//      console.log(event.target);
//    }
// })



// give.addEventListener("change", function(event){
//    event.preventDefault();
//
//    for (var i = 0; i < give.length; i++) {
//       if (give[i].selected) {
//          // console.log(give[i]);
//          var x = give[i].getAttribute("value");
//          console.log(x);
//
//          var y = document.querySelector("."+x).innerText;
//          console.log(y);
//
//       }
//    }
// })
