var transaction = function(spec) {
  var that = {};
 
  that.makeChange = function ( ) {
    if(checkPayment()) {
      logCoins(countCoins());
    }
  };
 
  function checkPayment( ) {  
    if(spec.payment < spec.cost) {
      console.log("Please enter an additional $" + (spec.cost - spec.payment).toFixed(2));
    } else if(isNaN(spec.cost) || isNaN(spec.payment) ||       spec.cost < 0 || spec.payment < 0) {
      console.log("Please enter positive numbers only.");
    } else {
      return true;
    }
  }
 
  function countCoins() {
    var changeRemaining = spec.payment * 100 - spec.cost * 100,
        coinCount = [0, 0, 0, 0],
        coinValue = [25, 10, 5, 1];
  
    for(var i = 0; i < coinCount.length; i++) {
      if(changeRemaining >= coinValue[i]) {
        coinCount[i] = Math.floor(changeRemaining /  coinValue[i]);
        changeRemaining = changeRemaining % coinValue[i];
      }
    }
    return coinCount;
  }
 
  function logCoins(coinCount) {
    var coinName = ["Quarters", "Dimes", "Nickels", "Pennies"],
        output = "\n";
    for(var i = 0; i < coinName.length; i++) {
      if(coinCount[i] > 0) {
        output += coinCount[i] + " " + coinName[i] + "\n";
      }
    } 
    console.log(output);
  }
  
  return that;
};
 
var transaction1 = transaction({cost: 0.43,  //logs correctly
                                payment: 1});
transaction1.makeChange();
 
var transaction2 = transaction({cost: -0.43,  //positives only
                                payment: 1});
transaction2.makeChange();
 
var transaction3 = transaction({cost: "a",     //numbers only
                                payment: 1});
transaction3.makeChange();
 
var transaction4 = transaction({cost: 1,        //need more money
                                payment: 0.43});
transaction4.makeChange();
