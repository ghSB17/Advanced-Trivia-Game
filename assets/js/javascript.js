$("document").ready( function(){


const objQuestionsBank = [{qtext:"Which of these locations is a huge protected wilderness area in Southern New Jersey?", anschoice1:"Pinelands", anschoice2:"HighPoint",anschoice3:"Union",anschoice4:"Manasquan",anschoice5:"None of the above", correctchoice:"anschoice1",urlStr:"https://media.giphy.com/media/HQjLc75JxfaBG/giphy.gif"},
{qtext:"Which animal is featured on New Jersey's state seal", anschoice1:"Buffalo", anschoice2:"Lion", anschoice3:"Horse", anschoice4:"Eagle", anschoice5:"Panther", correctchoice:"anschoice3",urlStr:"https://media.giphy.com/media/7NHM19prcKWic/giphy.gif"}, 
{qtext:"New Jersey is the third highest harvester of what produce?", anschoice1:"cranberries", anschoice2:"blueberries", anschoice3:"strawberries", anschoice4:"apples", anschoice5:"broccoli", correctchoice:"anschoice1",urlStr:"https://media.giphy.com/media/3ohs7SdYcUPVWQJcTC/giphy.gif"},
{qtext:"Which is the third largest city in the Garden State?",anschoice1:"Jersey City", anschoice2:"Princeton", anschoice3:"Ocean City", anschoice4:"Paterson", anschoice5:"Cherry Hill", correctchoice:"anschoice4",urlStr:"./assets/images/paterson.jpg" },
{qtext:"Which NJ town is home of the first drive-in movie theatre?", anschoice1:"Keansburg", anschoice2:"Camden", anschoice3:"Englishtown", anschoice4:"Hamilton", anschoice5:"Asbury Park", correctchoice:"anschoice2",urlStr:"https://media.giphy.com/media/l3vRaHsHwlN8JCiKQ/giphy.gif"} ]

var QuestionNumber=0;
var counterQuestion = 30;
var counterAnswer=6;
var ansChoice;
var timeoutQuestion;
var timeoutAnswer;
var correctAns=0;
var missedQuestions=0;
var incorrectAns=0;
var ansValueClicked="";
var ansClicked=false;
var QorA =true;
var urlString="";
var tempImg='';

function InitializeScreen() {
    urlString="";
    QuestionNumber=0;
    ansChoice="";
    clearInterval(timeoutQuestion);
    clearInterval(timeoutAnswer);
    QorA=true;
    ansClicked=false;
    correctAns=0;
    incorrectAns=0;
    missedQuestions=0;
    $(".bigbox").css({"height":"95vh"});

}

function displayTimer() {
    var counterC;    
    
    if(QorA===true)
        counterC=counterQuestion--;
    else 
        counterC=counterAnswer--;
    if( counterC > 0 ) {
        $("#idTimer").html("Time Remaining  -  "+ checkdisplay(counterC));
    } else if(counterC===0 && QorA===true) {
        clearInterval(timeoutQuestion);
        checkAnswers();
    } else if(counterC===0 && QorA===false) {
        clearInterval(timeoutAnswer);
        QorA=false;
        checkAnswers();
    }

};

function checkdisplay(timeValue) {
    if( timeValue<10 )
        return "0"+timeValue;
    else
        return timeValue;
};

function display(index) {
    
    if(index < objQuestionsBank.length) {
        $(".bigbox").css({"height":"100%"});
        counterAnswer=6;
        counterQuestion=30;
        QorA=true;
        var htmlText="";
        $("#idButton").hide();
        $("#idTimer").html("Time Remaining  -  30") ;
        $.each(objQuestionsBank[index], function(key,value){
            if(key==="qtext") {
                htmlText+="<br><br><p>Q"+(index+1)+".) "+value+"</p>";
            } else if( key==="correctchoice") {
                console.log(objQuestionsBank[index][value]);
                ansChoice=objQuestionsBank[index][value];
                urlString=objQuestionsBank[index]["urlStr"];
                //alert(ansChoice);
            } else if(key==='urlStr') {
                htmlText+="";
            } else {
                htmlText+="<button type='button' class='btn btn-lg ansButton'>"+value+"</button><br>";
            }
        });
        $("#idTrivia").html(htmlText);
        $("#idTrivia .ansButton").css({"background-color":"transparent"});
        timeoutQuestion=setInterval(displayTimer,1000);
    } else {
        displayResults();
    }
}

$("#idButton").on("click",function(){
    console.log("here");
    if( this.innerText==="Start") {
        display(QuestionNumber);   
    } 
});

$('#idTrivia').on("mouseover", ".ansButton", function() {
    $(this).css({"background":"#696969"});
});

$('#idTrivia').on("mouseleave", ".ansButton", function() {
    $("#idTrivia .ansButton").css({"background":"transparent"});
});

$('#idTrivia').on("click", ".ansButton", function() {
    $("#idTrivia .ansButton").css({"background":"#696969"});
    console.log("here");
    clearInterval(timeoutQuestion);
    ansClicked=true;
    console.log(this);
    ansValueClicked=$(this).text();
    checkAnswers();
});

function checkAnswers() {
    console.log("here");
    var htmlText="";
   
    if( QorA ===true ){
        if( ansClicked===false){
            missedQuestions++;
            incorrectAns++;
            htmlText="<p>You missed!!</p>" +
                "<p>Correct Answer: "+ansChoice;
            
        } else if( ansClicked===true) {
            ansClicked=false;
            if(ansChoice===ansValueClicked) {
                htmlText="<p>Correct!</p>" +
                "<p>"+ansChoice;
                correctAns++;
            }
            else {
                incorrectAns++;
                htmlText="<p>Incorrect Answer</p>"+"<p>Correct Answer: "+ansChoice;
            }
        }
        QuestionNumber++;
        QorA=false;
        tempImg=$("<img>");
        tempImg.attr("src",urlString);
        $("#idTrivia").html(htmlText);
        $("#idTrivia").append(tempImg);
        timeoutAnswer=setInterval(displayTimer,1000);
    } else {
        display(QuestionNumber);
    }
}
    
    
function displayResults() {
        $("#idTrivia").empty();
        
        $("div p").text("");
        var htmlResult="<span>All Done!!</span><br>"+
                        "<span>Correct Answers: "+correctAns+"</span><br>"+
                        "<span>Incorrect Answers: "+incorrectAns+"</span><br>"+
                        "<span>Unanswered: "+missedQuestions+"</span>";
        InitializeScreen();
        $(".bigbox").css({"height":"98vh"});
        $("#idButton").show();
        $("#idTrivia").append( $("<p>").html(htmlResult) );
        // $("#idButton").text("Start");       
        
}

});
