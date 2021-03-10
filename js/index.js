//Initialize buttons
let TextInput=document.getElementById("inputVal");
let btnCalc=document.getElementById("calculate");


//numbers
let zero=document.getElementById("zero");
let d_zero=document.getElementById("dzero");
let one=document.getElementById("one");
let two=document.getElementById("two");
let three=document.getElementById("three");
let four=document.getElementById("four");
let five=document.getElementById("five");
let six=document.getElementById("six");
let seven=document.getElementById("seven");
let eight=document.getElementById("eight");
let nine=document.getElementById("nine");
let dot=document.getElementById("dot");

//operators
let btnPwr=document.getElementById("power");
let divide=document.getElementById("divide");
let mult=document.getElementById("mult");
let minus=document.getElementById("minus");
let plus=document.getElementById("plus");

//clear and delete
let deletebtn =document.getElementById("delete");
let clrbtn =document.getElementById("clear");

//create an array for the value inside the textbox
let txtVal=[];

TextInput.focus();//put the cursor to the textbox

//convert the string (textbox value) to array (example [1,.,+,(,5,)])
function stringToArray(string){   
    let Arr=[];
    let newArr=[];
    Arr=string.split("");
    
    let i=0;
    //evaluate the sign if positive or negative... if
    //check the first element
    if((Arr[i]=="-" || Arr[i]=="+") && Arr[i+1]=="(")//if true, add this "(+1)*" or (-1)*
    {
        newArr.push("(");
        newArr.push(Arr[0]);
        newArr.push("1");
        newArr.push(")");
        newArr.push("*");
        newArr.push("(");

        i=2;
    }      
    for (i;i<Arr.length;i++){
    //evaluate the sign if positive or negative
        if(Arr[i-1]=="(" && (Arr[i]=="-" || Arr[i]=="+") && Arr[i+1]=="("){//if true, add this "(+1)*" or (-1)*
            newArr.push("(");
            newArr.push(Arr[i]);
            newArr.push("1");
            newArr.push(")");
            newArr.push("*");
            newArr.push(Arr[i+1]);

            i=i+2;
        }
        newArr.push(Arr[i])
        }
    //console.log(newArr)

    return newArr
}

//convert array to new array
//this function is used to separate operands from operators example [12.5,+,10,(,)+,100]
function textToArray(string){
    let inputArr=stringToArray(string);
    let newArr=[]//array for separation of operands and operator  
    //loop though the array that are separated character by character
    for (let i=0;i<inputArr.length;i++){    

        if (inputArr[i]!=" "){

        //if the value is not a number and should not a dot     
        if(isNaN(Number(inputArr[i])) && inputArr[i]!="."){
            newArr.push(inputArr[i]);
        }
       
        //if it is space, move to the next character
        else{
            //get the first character and saved in the variable combVal
            let combVal=inputArr[i];
            //loop while the character being parsed is a number then combine the numbers to make as one number
            while((!isNaN(Number(inputArr[i+1])) || inputArr[i+1]==".") && i<inputArr.length){
                combVal= combVal + inputArr[i+1];
                i++;
            }
            //push to the new array
            newArr.push(combVal);
            }
        }      
    }
    
    return newArr;//returned the new array with separated operands and operator
}

//function to calculate the entire data inside the textbox
function getFinalOutput(){

    let output=calculateAll(textToArray(TextInput.value.trim()));//call the function calculateAll in operation.js file
    TextInput.value=output//output the vvalue to the txtbox
    txtVal=[];//clear the array to clear empty memory space
    //TextInput.focus();//place the cursor at the end of the textbox
}

//this is the function called when button is pressed
//sometimes, we want to insert number or operator in between. This is the function of this code
function insertText(text)
{
    
    TextInput.focus();//put the cursor to the textbox
    let prevTxt= "";
    let textStr  = TextInput.value//get the value inside the textbox
    let startPos = TextInput.selectionStart;//get the position of the current cursor
    let endPos   =TextInput.selectionEnd;//get the end position of the current cursor

    let beforeStr = textStr.substr(0, startPos);//get the substring from the first index to the the current cursor
    let afterStr  = textStr.substr(endPos, textStr.length);//get the substring from the current cursor to the end of the string

     //get the previous string

     if(startPos-1>0){
        prevTxt= textStr.substr(startPos-1)
     }
     else{
        prevTxt= textStr.substr(0) 
     }

     //check if the previous is text is a number
     let isNumber=false;

     if((prevTxt.search(/\d/i))==0){
        isNumber=true;
     }

    //if the input is ( and previous text is ) or a number, add * in between
    if ((text=="(" && prevTxt==")") || (text=="(" && isNumber==true)){
        text="*" + text;
    }

    //if the input is ( and previous text is ), add * in between
    if (text==")" && prevTxt=="("){
        text="0" + text;
    }
    textStr = beforeStr + text + afterStr;//concatenate the before string plu the newly added character plu the text after it
    TextInput.value=textStr//put the value to the textbox
    
  
    //if the clicked button is 00, move the cursor one more
    if (text=="00" || text=="*(" || text=="0)"){
        TextInput.setSelectionRange(startPos+2, startPos+2);
    }
    else{//else, just stay where it is
        TextInput.setSelectionRange(startPos+1, startPos+1);
    }
    
}

//function for deleting character
//this function also works when you want to delete character in between
function backSpace(){
    TextInput.focus();//put the cursor to the textbox
    let textStr  = TextInput.value//get the value inside the textbox
    let startPos = TextInput.selectionStart;//get the position of the current cursor
    let endPos   =TextInput.selectionEnd;//get the end position of the current cursor

    let beforeStr = textStr.substr(0, startPos-1);//get the substring from the first index to the the current cursor minus one space back
    let afterStr  = textStr.substr(endPos, textStr.length);//get the substring from the current cursor to the end of the string

    textStr = beforeStr + afterStr;//conatenate the before and after string excluding the character in between
    TextInput.value=textStr//put the value to the textbox

    TextInput.setSelectionRange(startPos-1, startPos-1);//move the cursor one before
}


///////

//add eventlistner to numbers
//when the button is clicked, its value will be added inside the textbox
zero.addEventListener("click",(e)=>  insertText(e.target.value))
d_zero.addEventListener("click",(e)=>  insertText(e.target.value))
one.addEventListener("click",(e)=> insertText(e.target.value))
two.addEventListener("click",(e)=>insertText(e.target.value))
three.addEventListener("click",(e)=>insertText(e.target.value))
four.addEventListener("click",(e)=>insertText(e.target.value))
five.addEventListener("click",(e)=>insertText(e.target.value))
six.addEventListener("click",(e)=>insertText(e.target.value))
seven.addEventListener("click",(e)=>insertText(e.target.value))
eight.addEventListener("click",(e)=>insertText(e.target.value))
nine.addEventListener("click",(e)=>insertText(e.target.value))
dot.addEventListener("click",(e)=>insertText(e.target.value))

//add eventlistner to operators
btnPwr.addEventListener("click",(e)=>insertText(e.target.value))
mult.addEventListener("click",(e)=>insertText(e.target.value))
divide.addEventListener("click",(e)=>insertText(e.target.value))
plus.addEventListener("click",(e)=>insertText(e.target.value))
minus.addEventListener("click",(e)=>insertText(e.target.value))

//parentheses

openPar.addEventListener("click",(e)=>{
    insertText(e.target.value)
})
closPar.addEventListener("click",(e)=>{
    insertText(e.target.value)
})

//scan through the array, and create array for all parenthesis
let parenthss=[];
function parenthArr(arr){
    parenthss=[];
    arr.forEach(function(el){
        if (el=="(" || el==")") {//if the scanned element is "(" or ")", push it to the stack
            parenthss.push(el)
        }
    })
}


let isPaired=true;//parenthesis is paired in the first condition

function evalParenth(parenthss){

    //push parentheses to the new array  
    if(parenthss.length==0){//this is the termination condition. Recursion will terminate, once all the parenthesis are paired
        isPaired=true       
    }
    //check the parentheses 
    let x=0;
    let scannedVal=parenthss[0];//scan the first element of the array

    if(scannedVal=="("){//if the first element is (, then evaluate it
        
        while(scannedVal=="("  && parenthss.length>0) {//scan while the current element is "(" and the array is not empty
            x++;
            scannedVal=parenthss[x];
            
        }

        if(parenthss[x]==")" && parenthss[x-1]=="("){//when the element is ), remove the current element and the previous element
            parenthss.splice(x-1,2)
            evalParenth(parenthss);//do recursion
        }     
        else{
            isPaired=false;
        }

    }else if (scannedVal==")"){//else, it is error
        isPaired=false;
    }

    
}


//clear and delete
deletebtn.addEventListener("click",function(e) {backSpace()})
clrbtn.addEventListener("click",function(e){
        TextInput.value="";
        txtVal=[];
        TextInput.focus();
        
})

//if keyboard is used instead of the interface keypad
TextInput.addEventListener("keydown",function(e){  
    //when enter is pressed, it will calculate  
    let textval=TextInput.value   
    parenthArr(textToArray(textval)); //create array for all parentheses
    evalParenth(parenthss);//evalute the parenthesis
    let keyValue=e.which//get the current key of the keyboard
    
    if(e.key=="Enter" ||e.key=="=" ){     //if press enter of =, do the following
        if(isPaired==true)  {//if the parenthes are correctly paired
            getFinalOutput() // call this function 
            createHistory(textval,TextInput.value)//put the history to the right side
            e.preventDefault();//prevent the browser on refreshing
        }   else{//if not paired
            TextInput.value="SYNTAX ERROR"   
        }  
          
    }
    //disable the following keybaord button
    /*a-z: 65-90
     "," ; 188
     ";" : 186
     "'": 222
     "[": 219
     "]": 221
     "`":192
     "\": 220
    */
    else if(((keyValue>64) && (keyValue<91))||keyValue==188||keyValue==186||keyValue==222||keyValue==219||keyValue==221||keyValue==192||keyValue==220){
        
        e.preventDefault();//do not refresh the browser
    }
    
})

//when button = is clicked, it will calculate
btnCalc.addEventListener("click",function(e){
    let textval=TextInput.value//create array for all parentheses
    parenthArr(textToArray(textval)); //evalute the parenthesis
    evalParenth(parenthss);

    if(isPaired==true)  {//if the parenthes are correctly paired
        getFinalOutput()   // call this function
        createHistory(textval,TextInput.value)//put the history to the right side
    }   else{//if not paired
        TextInput.value="SYNTAX ERROR"   
    }  

});

