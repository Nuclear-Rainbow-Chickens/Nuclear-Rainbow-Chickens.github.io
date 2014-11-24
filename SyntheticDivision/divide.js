
var dividend = [];

var possible = [];
//must be larger than a quadratic
window.onload = function () {addTerm(); addTerm(); addTerm();};

//class to handle a term of a dividend
function dividendTerm() {
    this.pos = document.createElement("input");
    this.pos.type = "button";
    this.pos.value = "+";
    this.pos.className = ".top_sign";
    document.body.insertBefore(this.pos,document.getElementById("break"));
    
    this.neg = document.createElement("input");
    this.neg.type = "button";
    this.neg.value = "-";
    this.neg.className = ".top_sign";
    document.body.insertBefore(this.neg,document.getElementById("break"));
    
    this.val = document.createElement("input");
    this.val.type = "text";
    this.val.className = "num";
    document.body.insertBefore(this.val,document.getElementById("break"));
    
    this.x = document.createElement("div");
    this.x.className = "x";
    this.x.textContent = "x";
    document.body.insertBefore(this.x,document.getElementById("break"));
    
    this.pow = document.createElement("sup");
    this.pow.textContent = "";
    document.body.insertBefore(this.pow,document.getElementById("break"));
    
    this.positive = false;
    var tmp = this;
    this.pos.onclick = function(e) {setPositive(tmp);};
    this.neg.onclick = function(e) {setNegative(tmp);};
}

//set dividend term positive
function setPositive (i){
    i.positive = true;
    i.pos.style.backgroundColor = "#888888";
    i.neg.style.backgroundColor = "#D8D8D8";
    console.log("+");
}

//set dividend term negative
function setNegative (i) {
    i.positive = false;
    i.pos.style.backgroundColor = "#D8D8D8";
    i.neg.style.backgroundColor = "#888888";
    console.log("-");
};

//add a term
function addTerm() {
    var tmp = new dividendTerm();
    dividend.push(tmp);
    for(var i = 0; i < dividend.length; i++) {
        if(dividend.length - (i + 1) == 1) {
            dividend[i].pow.textContent = "";
            dividend[i].x.textContent = "x";
        }
        else if(dividend.length - (i + 1) == 0) {
            dividend[i].pow.textContent = "";
            dividend[i].x.textContent = "";
        }
        else {
            dividend[i].pow.textContent = dividend.length - i - 1;
            dividend[i].x.textContent = "x";
        }
    }
}

function getFactors(i){
    integer = Math.abs(i);
    var factors = [],
    quotient = 0;

    for(var i = 1; i <= integer; i++){
        quotient = integer/i;

        if(quotient === Math.floor(quotient)){
            factors.push(i); 
        }
  }
  return factors;
}

function parseTop() {
    var topnum = [];
    console.group("Top Numbers");
    for (var i = 0; i < dividend.length; i++) {
        var tmpnum = dividend[i];
        var tmpnumtxt = dividend[i].val.value;
        if(tmpnumtxt == "") {
            document.body.innerHTML += "<p>One of the boxes is not filled in, use 0 as a placeholder or add a value</p>";
        }
        var tmpf = Number(tmpnumtxt);
        if(dividend[i].positive == false) {
            tmpf *= -1;
        }
        console.log(Number(i+1)+" term is "+tmpf.toString());
        topnum[i] = tmpf;
    }
    console.log(topnum);
    console.groupEnd();
    
    return topnum;
}

function divide(a) {
    var roots = [];
    //parse the top numbers

    var possn = getFactors(a[a.length - 1]);
    var possd = getFactors(a[0]);
    document.body.innerHTML += "<p>Looking at:</p><p>"+possn+"</p><p>Over</p><p>"+possd+"</p>";
    console.group("Possible Real Zeros");
    for(var i = 0; i < possn.length; i++) {
        for(var j = 0; j < possd.length; j++) {
            if((possn[i]/possd[j]) == parseInt(possn[i]/possd[j])) {
                tmpf1 = possn[i]/possn[j];
                possible.push(tmpf1);
                console.log(tmpf1.toString());
            }
        }
    }
    console.groupEnd();
    console.group("Testing Positive Zeros");
    for(var i = 0; i < possible.length; i++) {
    console.log("workin");

        var answers = [];
        var ub = true;
        var currentcheck = possible[i];
        
        for(var j = 0; j < a.length; j++) {
            console.group("Testing "+currentcheck+" on the bottom against " +a[j]);
            if(j == 0) {
                answers[j] = a[j];
                console.log(a[j].toString());
                if(answers[j] < 0) {
                    ub = false;
                }
            }
            else {
                var tmpcheck = currentcheck * (answers[j-1]);
                console.log(tmpcheck.toString() + " Number To Add");
                var tmptopnum = tmpcheck + (a[j]);
                console.log(tmptopnum.toString() + " After Addition");
                answers.push(tmptopnum);
                if(tmptopnum < 0) {
                    ub = false;
                }
            }
            console.log(answers.toString());
            console.groupEnd();
        }
        if(answers[answers.length - 1] == 0) {
            roots.push(possible[i]);
        }
        if(ub == true) {
            document.body.innerHTML += "<h2>Upper Bound Reached At: "+possible[i]+"</h2>";
            console.log("at upper bound");
            break;
        }
        console.log(answers.toString());
    }
    console.groupEnd();
    /*|||||||||||||||||||||||||||
     * GOING NEGATIVE
     ||||||||||||||||||||||||||*/   
        
    console.group("Testing Negative Zeros");
    var negpossible = [];
    for (var i = 0; i < possible.length; i++) {
        negpossible[i] = possible[i] * -1;
    }
    for(var i = 0; i < negpossible.length; i++) {
    console.log("workin");

        var answers = [];
        var lbcheck = [];
        var lb = true;
        var currentcheck = negpossible[i];
        
        for(var j = 0; j < a.length; j++) {
            console.group("Testing "+currentcheck+" on the bottom against " +a[j]);
            if(j == 0) {
                answers[j] = a[j];
                console.log(a[j].toString());
                lbcheck[j] = answers[j] / Math.abs(answers[j]);
            }
            else {
                var tmpcheck = currentcheck * (answers[j-1]);
                console.log(tmpcheck.toString() + " Number To Add");
                var tmptopnum = tmpcheck + (a[j]);
                console.log(tmptopnum.toString() + " After Addition");
                answers.push(tmptopnum);
                if(answers[j] != 0) {
                    lbcheck[j] = answers[j] / Math.abs(answers[j]);
                }
                else {
                    lbcheck[j] = 0;
                }
            }            
            console.log(lbcheck.toString());
            console.groupEnd();
        }
        
        //check lower bound
        for (var j = 1; j < lbcheck.length; j++) {
                if(lbcheck[j] != 0) {
                    if(lbcheck[j - 1] * -1 == lbcheck[j]) {
                        lb = true;
                    }
                    else {
                        lb = false;
                        break;
                    }
                }
                else {
                    if(lbcheck[j-1] == lbcheck[j+1]) {
                        lb = true;
                    }
                    else {
                        lb = false;
                        break;
                    }
                }
        }
        if(answers[answers.length - 1] == 0) {
            roots.push(possible[i]);
        }
        if(lb == true) {
            document.body.innerHTML += "<h2>Lower Bound Reached At: "+negpossible[i]+"</h2>";
            break;
        }
        console.log(answers.toString());
    }
    console.groupEnd();
    document.body.innerHTML += "<h1>"+roots.toString()+"</roots>";
}
