let topVal="";//this the the top value of the stack
//convert infex to postfix.... example 1+1 (infex)=> 1,1,+ (postfix)
function calculateAll (arr){
    let postFixStack=[];//create stack for the operators
    let result=[];//array for the output
    
    //evaluate if the first number is negative
    let x=0;
    if((arr[0]=="-" || arr[0]=="+")&& !isNaN(Number(arr[1]))){//if the first value in the array is "-", meaning it is signed value. Combine the two (-number)
        result.push(arr[0]+ arr[1])
        x=2//increment the x value
    }       
     for (x;x<arr.length;x++){
            let el=arr[x];
                if(!isNaN(Number(el))){//if it is a number, push to the result array
                    result.push(el)                
                }else if (el=="("){ //if it is (, push to the stack                  
                    postFixStack.push(el)
                }else if (el==")"){ //if ), evaluate it by popping from stack array until ( is encountered
                    while(postFixStack.length>0  &&  postFixStack[postFixStack.length-1]!="("){//pop value from stack while it is not (. 
                        topVal=postFixStack[postFixStack.length-1];
                        postFixStack.pop();
                        result.push(topVal);
                    }
                     if(postFixStack.length>0  &&  postFixStack[postFixStack.length-1]!="("){//if the element is not (, meaning it is invalid
                        return "Invalid Expression"
                     }
                     else{
                        postFixStack.pop();//else, pop it out from the stack
                     }
        
                }else if (el=="^"|el=="*"|el=="/"|el=="+"|el=="-"){//if it is an operator

                    //evaluate if the previous value is parenthesis, then it is - sign
                    if((el=="-" || el=="+" )&& arr[x-1]=="(" && !isNaN(Number(arr[x+1]))){
                        result.push(el + arr[x+1])//push the -signed number to the result
                        x=x+1;//increment x
                    }
                    else{//if it is not - sign
                    //get the key of the given value
                    const key = Object.keys(operator).find(key => operator[key] === el);//operator is in map_op.js file. Map the element value that matches the operator                    
                    const scnedValPrec=precidence[key];  //match the precidence. precidence is in map_op.js file  

                    //top value of stack            
                    topVal=postFixStack[postFixStack.length-1];//get the top value of stack
                    topValKey=Object.keys(operator).find(key => operator[key] === topVal);//operator is in map_op.js file. Map the top value that matches the operator
                    topValPrec=precidence[topValKey];//match the precidence. precidence is in map_op.js file
        
        
                    while(postFixStack.length>0 && scnedValPrec<=topValPrec){//loop through the stack. Loop while the stack is not empty and the scanned value precidene is less 
                                                                            // than or equal to the value on top of the stack      
                        postFixStack.pop();//remove the top value from stack
                        result.push(topVal);//push the previous value store to the result array

                        //get again the top value
                        topVal=postFixStack[postFixStack.length-1];
                        topValKey=Object.keys(operator).find(key => operator[key] === topVal);
                        topValPrec=precidence[topValKey];
                    }       
                    postFixStack.push(el)//if the above statement is fasle, push the value to the operator stack
                    }         
                }            
        }
    
    //pop all the value in stack until empty
    while(postFixStack.length>0){
        topVal=postFixStack[postFixStack.length-1];
        postFixStack.pop();
        result.push(topVal);
    } 
 
    //call the evaluatePostFix function
    let finalResult=evaluatePostFix(result);

    //this is to handle error
    if (isNaN(finalResult)){//if the result is NAN, it will display to the screen SYNTAX ERROR
        return "SYNTAX ERROR";
    }
    else if (finalResult=="Infinity"){
        return "Can't divide by 0"
    }
    else{
        return Number(finalResult)//else, just display the result
    }
           
}

//evaluate postfix.... array parameter sample [2,10,2,10,+,/,-]
function evaluatePostFix(Arr){ 

    //create stack for outputs
    let outPutStack=[];//these is where the numbers are saved
    let result="";
    //loop through the array
    Arr.forEach(el=>{
        if(!isNaN(Number(el))){
            outPutStack.push(el)//if the element evaluated is a numner, push it to outPutStack
        }else if (el=="^"|el=="*"|el=="/"|el=="+"|el=="-"){//if operator, pop the two stacks and do operation

            //create new instance of class ArithmeticOperation
            //do the operation of the top two value in the outpurstack
            let firstTop=outPutStack[outPutStack.length-1];
            let secTop=outPutStack[outPutStack.length-2]

            let operation=new ArithmeticOperation(el,Number(firstTop),Number(secTop)); 
            result=operation.calculate();//save the result to the variable result 
                //pop the two number
            outPutStack.pop();
            outPutStack.pop();   
            outPutStack.push(result);//push the result to the outPutStack
    
            //}
            //clear the instance from the memory
             operation="";
        }
    })
    
    //console.log(outPutStack)

    if(outPutStack.length>1){
        return "SYNTAX ERROR"
    }

    else{
        return outPutStack[0];//return the last number is the stack. this is the result
    }

}


//class for arithmetic operations
class ArithmeticOperation{
    constructor(operator,num2,num1)//accepts the parameters : operator and the two numbers
    {
        this.operator=operator;
        this.num1=num1;
        this.num2=num2;
    }

    // Adding a method to the constructor
     calculate(){
              
         switch(this.operator){//evaluate the operator  
            case "^"://if the operator is ^, then use the power formula
                return Math.pow(this.num1,this.num2);            
            case "*"://if the operator is *, multiple the two numbers
                return this.num1*this.num2;
            case "/"://if the operator is ^,divide the two numbers
                return this.num1/this.num2;   
            case "+"://if the operator is ^, add the two numbers
                return this.num1+this.num2;
            case "-"://if the operator is ^, subtract the two numbers
                return this.num1-this.num2;   
            default://else error
                return "ERROR"                          
         }
     }

}