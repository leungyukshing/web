/*store input in the str, and calculate the final result by using method eval()*/
var result; 
var str; 
var lastch;
var isresult;

function handleDecimal(nums) 
{
    nums = parseFloat(nums.toFixed(10))
    return nums;
}

function Stack() {

    var items = [];

    this.push = function(element){
        items.push(element);
    };

    this.pop = function(){
        return items.pop();
    };

    this.peek = function(){
        return items[items.length-1];
    };

    this.isEmpty = function(){
        return items.length == 0;
    };

    this.size = function(){
        return items.length;
    };
}

// add number or operator
function onclicknum(nums) { 
str = document.getElementById("nummessege");
//check number
var zhengze = /\b=\b/;
var test = zhengze.exec(str.value);

if((nums == '+' || nums == '-' || nums == '*' || nums == '/' || nums == '.') && nums == lastch)
{
	return;
}
if(lastch == '.' && (nums == '+' || nums == '-' || nums == '*' || nums == '/' || nums == '.' || nums == '(' || nums == ')'))
{
	return;
}
if(nums == '.' && (lastch == '.' || lastch == ')'))
{
	return;
}
if(lastch == '(' && (nums == '*' || nums == '/'))
{
    return;
}
if(nums == ')' && (lastch == '+' || lastch == '-' || lastch == '*' || lastch == '/' || lastch == '.'))
{
    return;
}
if((nums == '+' || nums == '-' || nums == '*' || nums == '/') && (lastch == '+' || lastch == '-' || lastch == '*' || lastch == '/'))
{
    return;
}
if(test == '=')
{
	test = "";
	str.value = "";
}
lastch = nums;
if (isresult == true)
{
    isresult = false;
    str.value = "";
}
str.value = str.value + nums; 
}

// clear all input
function onclickclear() { 
str = document.getElementById("nummessege"); 
str.value = "";
lastch = '';
}

// delete the latest output
function onclickbackspace() {
	str = document.getElementById("nummessege");
	str.value = str.value.substring(0, str.value.length-1);
}

// calculate the final result
function onclickresult() { 
str = document.getElementById("nummessege"); 
var flag = false;
//check operator
/*var zhengze2 = /\d\D\d/;
var zhengze3 = /^[\*|\/].+/;
var zhengze4 = /.+[\*|\/]$/;
var fuhao = zhengze2.exec(str.value);*/
if ((str.value.length == 1) && (str.value.charAt(0) < '0' || str.value.charAt(0) > '9'))
{
    flag = true;
}
if (str.value.charAt(str.value.length-1) == '+' || str.value.charAt(str.value.length-1) == '-' || str.value.charAt(str.value.length-1) == '*' || str.value.charAt(str.value.length-1) == '/' || str.value.charAt(str.value.length-1) == '(')
{
    flag = true;
}

var stack = Array();
for(var i = 0; i < str.value.length; i++)
{
    if (!((str.value.charAt(i) >= '0' && str.value.charAt(i) <= '9') || str.value.charAt(i) == '+' || str.value.charAt(i) == '-' || str.value.charAt(i) == '*' || str.value.charAt(i) == '/' || str.value.charAt(i) == '(' || str.value.charAt(i) == ')' || str.value.charAt(i) == '.'))
    {
        flag = true;
        break;
    }
    if ( i >= 1 && str.value.charAt(i) == ')' && str.value.charAt(i-1) == '(')
    {
        flag = true;
        break;
    }
    if ((i >= 1) && (str.value.charAt(i) == '(') && (str.value.charAt(i-1) >= '0' && str.value.charAt(i-1) <= '9'))
    {
        flag = true;
        break;
    }
    if ( i >= 1 && str.value.charAt(i) == '.')
    {
        var a;
        for (a = i - 1; a >= 0; a--)
        {
            //alert("aaa");
            if (str.value.charAt(j) != '0')
            {
                //alert("bbb");
                break;
            }
        }
        //alert(a);
        if ((a == -1) && (i != 1))
        {
           //alert("c");
            flag = true;
        }
        for (var j = i - 1; j >= 0; j--)
        {
            if (str.value.charAt(j) < '0' || str.value.charAt(j) > '9')
            {
                //alert("bbb");
                if (str.value.charAt(j) == '.')
                {
                    //alert("ccc");
                    flag = true;
                    break;
                }
                else
                {

                    var zero = false;

                    for (var k = i - 1; k > j; k--)
                    {
                        if (str.value.charAt(k) != '0')
                        {
                            zero = true;
                            break;
                        }
                    }
                    if (i-j == 2 || i-j == 1)
                    {
                        zero = true;
                    }
                    if (zero == false)
                    {
                        flag = true;
                        break;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
    }
	//alert("hello");
	if(str.value.charAt(i) == '(')
	{
		stack.push('(');
		//alert("push succeed");
	}
	else if(str.value.charAt(i) == ')' && stack.length != 0)
	{
		stack.pop();
		//alert("pop succeed");
	}
	else if(str.value.charAt(i) == ')' && stack.length == 0)
	{
		flag = true;
		//alert("false");
	}
}

if(stack.length != 0)
{
	flag = true;
}


if (flag == true)
{
	alert("error");
	str.value = "";
}
else
{
	result = eval(str.value); 
	if (result == "Infinity")
	{
		alert("zero can not be the divisor");
		str.value = "";
	}
	else
	{
        result  = handleDecimal(result);
		str.value = result;
        isresult = true;
	}
	
}
lastch = '';

} 




// Advanced functions
document.onkeydown=keyListener;

function keyListener(e){   
    // calculate the result when enter is pressed  
    if ((e.keyCode == 13) || (e.keyCode == 108))
    {
       	onclickresult();
    }
    else if (e.shiftKey == false && e.keyCode == 48)
    {
    	onclicknum(0);
    }
    else if (e.keyCode == 49)
    {
    	onclicknum(1);
    }
    else if (e.keyCode == 50)
    {
    	onclicknum(2);
    }
    else if (e.keyCode == 51)
    {
    	onclicknum(3);
    }
    else if (e.keyCode == 52)
    {
    	onclicknum(4);
    }
    else if (e.keyCode == 53)
    {
    	onclicknum(5);
    }
    else if (e.keyCode == 54)
    {
    	onclicknum(6);
    }
    else if (e.keyCode == 55)
    {
    	onclicknum(7);
    }
    else if (e.shiftKey == false && e.keyCode == 56)
    {
    	onclicknum(8);
    }
    else if (e.shiftKey == false && e.keyCode == 57)
    {
    	onclicknum(9);
    }
    else if (e.keyCode == 8)
    {
    	onclickbackspace();
    }
    else if ((e.shiftKey == true && e.keyCode == 187) || (e.keyCode == 107))
    {
    	onclicknum('+');
    }
    else if ((e.keyCode == 189) || (e.keyCode == 109))
    {
    	onclicknum('-');
    }
    else if ((e.shiftKey == true && e.keyCode == 56) || (e.keyCode == 106))
    {
    	onclicknum('*');
    }
    else if ((e.keyCode == 191) || (e.keyCode == 111))
    {
    	onclicknum('/');
    }
    else if ((e.keyCode == 190) || (e.keyCode == 190))
    {
    	onclicknum('.');
    }
    else if ((e.shiftKey == true) && e.keyCode == 57)
    {
    	onclicknum('(');
    }
    else if ((e.shiftKey == true) && e.keyCode == 48)
    {
    	onclicknum(')');
    }
}

