let countquestion=document.querySelector('.quiz-info .count span');
let spans=document.querySelector('.bullets .spans');
let answerArea=document.querySelector('.answer-area');
let quizArea=document.querySelector('.quiz-area');
let end=document.querySelector('.Result .theend');
let h2=document.querySelector('.quiz-area h2');
let answer=document.querySelector('.answer-area .answer');
let result=document.querySelector('.Result');
let buttonSubmit=document.querySelector('.submit-answer');

var x=0;
let korrekt=0;


function getquestion()
{
    let myrequest=new XMLHttpRequest();

    myrequest.onreadystatechange=function(){

   if(this.readyState === 4 && this.status === 200)
   {
       let questionobject=JSON.parse(this.responseText);

       createBullets(questionobject.length);
       createquestion(questionobject[x],questionobject.length);
      


    



buttonSubmit.onclick=()=>
{
    if(x <8)
    {
   
    let answerRight=questionobject[x].right_answer;
    checkanswer(answerRight,questionobject[x].length);
    quizArea.innerHTML=" ";
    answerArea.innerHTML=" ";
    
   x=x+1;
   createquestion(questionobject[x],questionobject.length);
   buttelshandel();
    }

    else
    {
        end.innerHTML=korrekt;
        quizArea.innerHTML=" ";
        answerArea.innerHTML=" ";
        checkKorrek(korrekt);
    }}}
};

myrequest.open('GET',"html-question.json",true);
myrequest.send();
}
getquestion();

function checkKorrek(num)
{
    let span=document.createElement('span');
    if(num<5)
    {
       span.className="bad";
       let textspan=document.createTextNode('bad');
       span.appendChild(textspan);
       result.appendChild(span);
    }
    else if(num<8)
    {
        let textspan=document.createTextNode('good');
        span.appendChild(textspan);
        span.className="good";
        result.appendChild(span);  
    }
    else
    {
        let textspan=document.createTextNode('Perfect');
        span.appendChild(textspan);
        span.className="perfect";
        result.appendChild(span);     
    }
}

function createBullets(num)
{
    countquestion.innerHTML= num;

    for(let i=0;i<num;i++)
    {

      
        let creatspan=document.createElement('span');
        spans.appendChild(creatspan);
        if(i===0)
        {
           
     creatspan.className="on";
        }

    }
}


function createquestion(obj,num)
{

let header=document.createElement('h2');
let headetext=document.createTextNode(obj["title"]);
header.appendChild(headetext);

quizArea.appendChild(header);

 for(let i=1;i<=4;i++)
 {
let div=document.createElement('div');
div.className="answer";


let input=document.createElement('input');
input.type="radio";
input.name="quiestion";
input.id=`answer_${i}`;
input.dataset.answer=obj[`answer_${i}`];


if(i==1)
{
    input.checked=true;
}
div.appendChild(input);
let label=document.createElement('label');
let labelText=document.createTextNode(obj[`answer_${i}`]);
label.htmlFor=`answer_${i}`;
label.appendChild(labelText);
div.appendChild(label);
answerArea.appendChild(div);
}}


function checkanswer(ranwser,count)
{
let answerall=document.getElementsByName('quiestion');
let anwserchoose;

for(let i=0;i<answerall.length;i++)
{

    if(answerall[i].checked)
    {
        anwserchoose=answerall[i].dataset.answer;
       
       
        if(anwserchoose == ranwser)
        {
            korrekt=korrekt+1;
           console.log("the koorekt");
           

        }
    }}}



    function buttelshandel()
    {
        let butt=document.querySelectorAll('.bullets .spans span');
        let arraybutt=Array.from(butt);
        

        arraybutt.forEach((items,index)=>
        {
          if(index==x)
          {
              items.className="on";
          }  
        }
        );
    }



    

