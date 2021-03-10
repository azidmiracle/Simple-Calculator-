
//Initialize the ul tag and clear history button
var ulHistory=document.getElementById("ul-hist");//
var clrHistory=document.getElementById("clrHistory");

//function to create history
function createHistory(input,answer){
    let li = document.createElement('li');//create li tag
    let input_span=document.createElement('span');//create span tag

    input_span.textContent=input + "=" + answer;//concatenate the textbox value, = and the answer 
    input_span.contentEditable=true;//set the span tag editable
    
    input_span.className="result";//set the classname for span for CSS styling

    li.appendChild(input_span);//append the span tag to li tag
    
    ulHistory.appendChild(li);//append the li tag to ul tag
}

//function in deleting the history
function deleteLI(parentNode){

    let allChildren=parentNode.children;//get all the ul tag children
    Array.from(allChildren).forEach((child)=>{//loop through it and remove the child
        parentNode.removeChild(child);
    })
}

clrHistory.addEventListener("click",function(e){
    deleteLI(ulHistory);
})



