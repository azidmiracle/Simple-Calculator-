# 1	Introduction
Requirement of CMSC 207 Assignment 1 is to develop a working calculator using HTML, JavaScript and CSS. Calculator is application software that does arithmetic calculation: multiplication, division, addition and subtraction. Scientific calculation is out of the scope. 

# 2	Planning
Given the time constraint which is two weeks, the scope of this application is limited only to simple calculation and not a scientific calculator. 
Below is the planning for this application development process to ensure that I am on the right track.
 
Figure 1 Schedule

# 3	Requirement Analysis
The following is the description of the system:
1.	The user will input numbers and operators in the screen
2.	Alphabets are disabled as they are not allowed as input.
3.	Separate numbers from operators and parentheses in infix format.
4.	Evaluate the pairs of parentheses. Unpaired parentheses are being rejected.
5.	Recognize signed numbers with positive or negative values.
6.	The input is being analyzed by the program by converting infix to postfix format.
7.	Evaluate postfix format.
8.	When hit enter or press equal sign, answer is being outputted in the screen.
9.	History of the calculation will be displayed as well

## 3.1	Data Flow Diagram
Diagram below illustrates Data Flow Diagram (DFD) for the calculator application.


Figure 2 DFD Level 0
The following is the detailed diagram of the 




Figure 3 DFD Level 1
## 3.2	Functional Requirements
### 3.2.1	Software Functions
#### 3.2.1.1	Interface requirements
1.	Interface should include the following buttons: 0-9,00, ., ^, * ,/, +,-, (,), and =.
2.	Text display should accept only the following characters: 0-9, ., ^, * ,/, +,-, (,), and =.
3.	Text display should be able to accept multiple numbers and operators. Example : 1+6/5-3
4.	Result should be displayed in the same text display.
5.	History of operation should be displayed in the right side of the calculator interface.
6.	History table should be scrollable.
7.	There should be additional button to delete characters individually. 
8.	There should be a button to clear the characters in text display
9.	It should include a button with a value of “00”. This is used to make the typing of multiple leading zeroes faster.
#### 3.2.1.2	Character Entry
1.	Button with corresponding numbers displayed in the screen should be used.
2.	Usage of PC keyboard or mobile phone keypad is optional.
3.	When using PC keyboard, alphabet keys are disabled.
4.	Copy and pasting of numbers is also allowed.
5.	Character is added to the right side of the current cursor position.
6.	Negative or positive signed numbers are also allowed.
7.	After any arithmetic operation, result will overwrite the previous value in the screen.
#### 3.2.1.3	Parenthesis
1.	When “(“ is clicked and previous character is “)“ or a number, it should automatically inserted “*” in between to signify that it is a multiplication operation.
2.	When “)“ is clicked and previous character is “(“, it should automatically inserted “0” in between to signify that there is no value inside the parentheses
3.	When the parentheses are not correctly structured, it should display SYNTAX ERROR.

#### 3.2.1.4	Space
Space is being rejected or skipped during parsing of data.
#### 3.2.1.5	Arithmetic Operations
Since the screen will accept multiple operators, it should follow the MDAS rule where the highest precedence will be calculated first. It will use the infix to postfix algorithm.
Table 1 Order of Precedence


#### 3.2.1.6	Equals
Clicking the “=” button will start of the operation. The value in the screen will be added in the history. 
#### 3.2.1.7	Clear 
Clicking the “C” button will clear and reset the value in the screen.
#### 3.2.1.8	Delete
Clicking the “X” button will delete the character located before the cursor. Deleting of character can be done also even in between characters.
#### 3.2.1.9	History
When “=” is clicked, history should be appended to the history table.
#### 3.2.1.10	Clear History
Clicking “Clear History” button will clear all the history that is being displayed. 
### 3.2.2	  Response to undesired events
1.	Extra character or undesired character will result to SYNTAX ERROR
2.	Number divided by 0 will display “CAN’T DIVIDE BY 0”

# 4 Software Design
## 4.1	Algorithm
A.	Input type restriction
1.	Check if the input character is numbers (0~9), operators (*,/,+,-,^), parentheses, decimal point, Enter or equal sign,
2.	Else, it will not be displayed in the screen
3.	If all characters are accepted, it will be converted to array by separating numbers from other characters

B.	Character Insertion 
1.	Get the current position of the cursor
2.	Get the string before the cursor position and saved it in beforetext variable
3.	Get the string after the cursor position and saved it in aftertext variable
4.	Concatenate beforetext, input text and aftertext and overwrite the previous value on screen.

C.	Separation of Numbers from other character
1.	Convert string (textbox value) to array.
2.	Create NewArray stack
3.	Scan through the array.
3.1	If the first element of an array is “-“ or “+” and the next element is “(“, push the following to the NewArray
(+1)*(  or (-1)*(  
3.2	 If the previous element is “(“ and scanned element is “-“ or “+” and the next element is “(“, push the following to the NewArray
(+1)*(  or (-1)*(  
4.	Scan through the NewArray.
5.	If the scanned element is not a space (“ “), do the following:
5.1	If the scanned element is not a number and not a decimal point, push to the stack
5.2	Else, do the following
5.2.1	While the scanned character is a decimal point or a number, concatenate the characters
5.2.2	Push it to the infix stack 

D.	Parentheses Extractor
1.	Scan through the infix stack
2.	If the value is parenthesis, push it the parentheses stack 

E.	Evaluate Parenthesis
1.	Scan through the parentheses stack 
2.	If the length of the array is zero, return true. Meaning, the parenthesis is correctly paired or no parenthesis at all
3.	If the scanned element is an open parenthesis (“(“), do the following
* 2.1	While the scanned values is open parenthesis, move to the next element
* 2.2	When the close parenthesis is encountered, pop out the current scanned value which is an close parenthesis and the parenthesis before it which is an open parenthesis;
* 2.3	If they are not paired, it will return false
3.	Else If the scanned element is an close parenthesis (“)“), return false since the parenthesis will not always start with close parenthesis. This is SYNTAX ERROR.

F.	Infix to Postfix Conversion
1.	Create two stacks : postfix stack and result stack
2.	Scan through the infix stack
* 2.1	If the first element is either “-“ or “+” and the next element is a number, then it is a signed number. Push the signed number  to the result stack
* 2.2	If the element is a number, push to the result stack;
* 2.3	If it is “(“, push it to the postfix stack
* 2.4	If the scanned element is a “)”, pop out the postfix stack until “)” is encountered
* 2.4.1	Push the popped out element to the result stack
* 2.4.2	Pop out the “(“ element
* 2.5	If the scanned element is an operator (*,/,+,-,^)
* 2.5.1	If the scanned element is either “-“ or “+” and the previous element is “(“ and the next element is a number, then it is a signed number. Push the signed number to the result stack
* 2.5.2	Else, evaluate the operator’s precedence,
* 2.5.2.1	While the scanned operator precedence is lesser than or equal to the top value of the postfix stack, pop out the top value of the postfix stack and push it to the result stack
* 2.5.2.2	Push the scanned element to the postfix stack
3.	After all the elements are scanned from infix stack, pop out all the remaining operators in the postfix stack and push it to the result stack

G.	Evaluate Postfix Stack
1.	Create Outputstack where the numbers are saved.
2.	Scan through the input array. Array is the result stack derived from step F. 
3.	If the scanned element is a number, push it to the Outputstack.
4.	If the scanned element is an operator, 
* 4.1	Calculate the top two numbers in the Outputstack using the arithmetic operation. Saved the result in the variable called result.
* 4.2	Pop out these top two numbers from the Outputstack.
* 4.3	Push the result to the Outputstack     
5.	Evaluate the Outputstack
* 5.1	If the length is greater than one, then it is error
* 5.2	Else, return the result as the final answer

H.	History
1.	Save the current value of the screen.
2.	Save the result of arithmetic operations
3.	Concatenate the previous screen value, “=” sign and the result and insert it to “li” node
4.	Append the “li” node to “ul” node.

I.	Clearing of History
For all children of “ul” node, delete it.

## 4.2	Interface Design
1.	I design first the interface using excel to have a picture on what it would be look like in actual.











2.	Covert the above image to table with 8 rows and 6 columns.
3.	Place the buttons inside the cell of the table.
4.	For the display, I used input tag.
5.	HTML DOM such as “ul” and “li” are used in order to dynamically populate the history. Every result will insert new “li” node as the new child of “ul”
6.	After it is converted in actual HTML and CSS, I somewhat change the layout and the result is shown below.











	
7.	When the arrow is pointed to the button, there will be a hover effect in the button color. I used CSS hover to add this effect.



























# 5	User Acceptance Test Cases

Table 2 UAT Test Results




The following are the test cases that were conducted:

# 6	Design Constraints
1.	The application should not be used in Internet Explorer. Since JavaScript ES6 is being used as the main programming language, some of the codes are not working in Internet Explorer. It is advisable to use the program in Google Chrome as the main web browsers since ES6 is compatible with it. Refer to appendix for details.
2.	Negative (-) or positive (+) number after an operator will result to SYNTAX ERROR. At is advisable that a signed number should be wrapped inside parentheses when there is a preceding operator.
Example 
* 5+(-1)  => Correct
* 5-1  => Wrong
3.	Since copy and pasting is allowed, copying of undesired characters like alphabet is not disabled in the screen. Thus, it will result to SYNTAX ERROR.

# 7	Potential Changes
1.	Scientific notation might also be integrated in the design.
2.	Button for copy and paste might also be added in the future.

# 8	Challenges
While other people think that developing a calculator application is an easy task, I experience that it requires extra effort especially in dealing with multiple arithmetic operations at the same time.
1.	Dealing with multiple operations
Two numbers can be calculated easily but for multiple operators, we need to evaluate the precedence of each operand. You need to follow the MDAS rule. I did a lot of research how to deal with it, and it suggests converting the infix format to postfix format.

2.	Dealing with parenthesis
Formulating an algorithm to check whether parentheses are correctly paired is quite challenging. If the first element is closing parenthesis, it should return an error. Extra parenthesis should also give an error.

3.	Dealing with signed numbers. 
Signed numbers can occur in the first element of an array, after the closing parenthesis but before and number. 

# 4.	Browser Compatibility
I was debugging all my codes why the application is not totally working in Internet Explorer. After thorough research, I found out that some of the ES6 features are not supported under Internet explorer. Most of my codes are using arrow (=>) function. This does not support in Internet Explorer. Another thing is the class feature. In my code, I used class for the arithmetic operation. I just realized that instead of redoing the codes, I can set the target of audiences I want. Chrome and Mozilla browser are most widely used nowadays.
 
Figure 6 ES6 Browser Compatibility

Careful planning like what would the interface look be like and what are the features I can incorporate into the system with a given short time should be done. Also, before diving into coding, correct algorithm should be constructed first to make it faster.







# 9	References:

ES6 Browser Compatibility Link:
https://kangax.github.io/compat-table/es6/
Infix to Postfix Tutorial:
https://www.youtube.com/watch?v=vq-nUF0G4fI
