let cakeArray = [];
let selectedPeople = "not selected";

// define a constructor to create player objects
var CakeObject = function (pOrder, pFlavor, pDay, pTime, pPeople) {
  this.Order = pOrder;
  this.Flavor = pFlavor;
  this.ID = cakeArray.length + 1;  
  this.Day = pDay;
  this.Time = pTime;
  this.People = pPeople;  // action  comedy  drama  horrow scifi  musical  western
}

//movieArray.push(new MovieObject("Moonstruck", 1981, "Drama", "Nicholas Cage", "Cher"));
//movieArray.push(new MovieObject("Wild At Heart", 1982, "Drama", "Nicholas Cage", "Laura VanDern"));
//movieArray.push(new MovieObject("Raising Arizona", 1983, "Comedy", "Nicholas Cage", "Holly Hunter"));

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("buttonAdd").addEventListener("click", function () {
    cakeArray.push(new CakeObject(document.getElementById("order").value, document.getElementById("flavor").value,
       document.getElementById("day").value, document.getElementById("time").value, selectedPeople));
});

  $(document).bind("change", "#select-people", function (event, ui) {
    selectedPeople = $('#select-people').val();
  });

  document.getElementById("buttonSortOrder").addEventListener("click", function () {
    cakeArray.sort(dynamicSort("Order"));
    createList();
    document.location.href = "index.html#ListAll";
  });

  document.getElementById("buttonSortPeople").addEventListener("click", function () {
    cakeArray.sort(dynamicSort("People"));
    createList();
    document.location.href = "index.html#ListAll";
  });

$(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
 // document.getElementById("IDparmHere").innerHTML = "";
  createList();
});
  
  document.getElementById("buttonClear").addEventListener("click", function () {
    document.getElementById("order").value = "";
    document.getElementById("flavor").value = "";
    document.getElementById("day").value = "";
    document.getElementById("time").value = "";
  });
  
$(document).on("pagebeforeshow", "#Load", function (event) {   // have to use jQuery 
  document.getElementById("order").value = "";
  document.getElementById("flavor").value = "";
  document.getElementById("day").value = "";
  document.getElementById("time").value = "";
  });

$(document).on("pagebeforeshow", "#page3", function (event) {   // have to use jQuery 
  let localID =  document.getElementById("IDparmHere").innerHTML;
  document.getElementById("oneOrder").innerHTML = "The order is: " + cakeArray[localID-1].Order;
  document.getElementById("oneFlavor").innerHTML = "Flavor is: " + cakeArray[localID - 1].Flavor;  
  document.getElementById("oneDay").innerHTML = "Delivery day: " + cakeArray[localID - 1].Day;
  document.getElementById("oneTime").innerHTML = "Delivery time " + cakeArray[localID - 1].Time;
  document.getElementById("onePeople").innerHTML = "Number of people " + cakeArray[localID - 1].People;
 });

});

function createList()
{
  // clear prior data
  var divUserlist = document.getElementById("divCakeList");
  while (divCakeList.firstChild) {    // remove any old data so don't get duplicates
  divCakeList.removeChild(divCakeList.firstChild);
  };

  var ul = document.createElement('ul');  
  console.log(cakeArray);
  cakeArray.forEach(function (element,) {   // use handy array forEach method
    var li = document.createElement('li');
    li.innerHTML = "<a data-transition='pop' class='oneCake' data-parm=" + element.ID + "  href='#page3'>Get Details </a> " + element.ID + ":  " + element.Order + "  " + element.People;
    ul.appendChild(li);
  });
  divCakeList.appendChild(ul)

    //set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
    var classname = document.getElementsByClassName("oneCake");
    Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            //do something here with parameter on  pickbet page
            document.getElementById("IDparmHere").innerHTML = parm;
            document.location.href = "index.html#page3";
        });
    });
   
};
  

/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  }
}