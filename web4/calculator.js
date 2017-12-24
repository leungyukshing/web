(function () {
  var is_Initialed = true;
  var is_calculated = false;

  window.onload = function() {
    document.getElementById("nummessege").innerText = "0";
    var all_btn = document.getElementById("btn-wrapper").getElementsByTagName("div");
    //alert(all_btn.length);
    for (var i = 0; i < all_btn.length; i++) {
      all_btn[i].addEventListener("click", handleClick);
      if (all_btn[i].id == "add" || all_btn[i].id == "substract" || 
          all_btn[i].id == "mul" || all_btn[i].id == "division" || all_btn[i].id == "result") {
        all_btn[i].className = all_btn[i].id;
        continue;
      }
      all_btn[i].className = "btn";
    }
  }

  function handleClick(event) {
    var cmd = event.target.innerText;
    switch(cmd) {
      case '=':
        getResult();
        break;
      case 'CE':
        clearError();
        break;
      case '<--':
        backSpace();
        break;
      default:
        writeToExp(cmd);
        break;
    }
  }

  function getResult() {
    var exp = document.getElementById("nummessege").innerText;
    var result = calculate();
    document.getElementById("nummessege").innerText = result;
    is_calculated = true;
  }

  function clearError() {
    document.getElementById("nummessege").innerText = "0";
    is_Initialed = true;
    is_calculated = false;
  }

  function backSpace() {
    var present_Exp = document.getElementById("nummessege").innerText;
    var len = present_Exp.length;
    if (is_Initialed)
      return;
    else if (len == 1 || is_calculated) {
      document.getElementById("nummessege").innerText = "0";
      is_Initialed = true
    }  
    else {
      document.getElementById("nummessege").innerText = present_Exp.substring(0, len - 1);
      if (document.getElementById("nummessege").innerText == "0") {
        is_Initialed = true;
      }
    }
  }

  function writeToExp(cmd) {
    // 上次运算已完成
    if (is_calculated) {
      // 输入运算符
      if (isOpr(cmd)) {
        document.getElementById("nummessege").innerText += cmd;
        is_calculated = false;
      }
      // 得到结果后再次输入数字，重新开始计算
      else {
        clearError();
        append(cmd);
      }
    }
    // 上次运算未完成，正常输入数字或符号
    else
      append(cmd);
  }

  function isOpr(cmd) {
    var reg = /[+\-*\/]/;
    return reg.test(cmd);
  }

  function isNumber(num) {
    var reg = /^-?\d+\.?\d*$/;
    return reg.test(num);
  }

  function cmpWeight(op1, op2) {
    return auxi(op1) >= auxi(op2);
  }

  function auxi(opr) {
    switch(opr) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
    }
  }
  function append(cmd) {
    /*if ((cmd == '+' || cmd == '-' || cmd == '*' || cmd == '/' || cmd == '.') && cmd == lastch)
      return;
    if (lastch == '.' && (cmd == '+' || cmd == '-' || cmd == '*' || cmd == '/' || cmd == '.' || cmd == '(' || cmd == ')'))
      return;
    if (cmd == '.' && (lastch == '.' || lastch == ')'))
      return;
    if (lastch == '(' && (cmd == '*' || cmd == '/'))
      return;
    if (cmd == ')' && (lastch == '+' || lastch == '-' || lastch == '*' || lastch == '/' || lastch == '.'))
      return;
    if ((cmd == '+' || cmd == '-' || cmd == '*' || cmd == '/') && (lastch == '+' || lastch == '-' || lastch == '*' || lastch == '/'))
      return;*/

    // 初始状态下输入0，显示不变
    if (is_Initialed && cmd == '0')
      return;
    /*else if (document.getElementById("nummessege").innerText == "0" && cmd == '0')
      return;*/
    // 初始状态下输入不是0
    else if (is_Initialed && cmd != '0') {
      // 若输入为符号，则借用0为第一个操作数
      if (isOpr(cmd) || cmd == '.') {
        document.getElementById("nummessege").innerText = "0" + cmd;
      }
      else {
        document.getElementById("nummessege").innerText = cmd;
        //lastch = cmd;
      }

      is_Initialed = false;
    }
    // 不是初始状态
    else {
      document.getElementById("nummessege").innerText += cmd;
      //lastch = cmd;
    }
  }

  function toRPolishExp() {
    var temp = document.getElementById("nummessege").innerText;
    var exp = temp.split(/(\+|\-|\*|\/|\(|\))/);
    //alert(exp);
    var output = [];
    var stack = [];

    for (var i = 0; i < exp.length; i++) {
     // alert(output);
      // 读到数字，直接输出
      if (isNumber(exp[i]) || exp[i] == '.')
        output.push(exp[i]);
      // 读到左括号，压入栈
      else if (exp[i] == '(')
        stack.push(exp[i]);
      // 读到运算符，比较优先级，若栈顶元素优先级较高，则直接入栈；
      // 否则，栈中元素先出栈并输出，再入斩
      else if (isOpr(exp[i])) {
        if (stack.length == 0) {
          stack.push(exp[i]);
          continue;
        }
        var top_opr = stack[stack.length - 1];
        // 栈中优先级较高的元素都出栈并输出
        while (cmpWeight(top_opr, exp[i]) && stack.length != 0) {
          output.push(top_opr);
          stack.pop();
          if (stack.length == 0) {
            break;
          }
          top_opr = stack[stack.length - 1];
        }
        // 当前元素入栈
        stack.push(exp[i]);
      }
      // 读到右括号，栈中元素全部弹出并输出直到遇到左括号（左括号本身不输出）
      else if (exp[i] == ')') {
        while (stack[stack.length - 1] != '(') {
          if (stack.length == 0) {
            // 括号不匹配错误！！
            //alert("括号不匹配");
            break;
          }
          output.push(stack[stack.length - 1]);
          stack.pop();
        }
        stack.pop(stack[stack.length - 1]);
      }
    }
    while (stack.length != 0) {
      output.push(stack[stack.length - 1]);
      stack.pop();
    }
    //alert(exp);
    //alert(output);
    var RPE = output;
    return RPE;
    
  }
  function calculate() {
    var rpe = toRPolishExp();
    var stack = [];
    for (var i = 0; i < rpe.length; i++) {
      // 遇到数字就放入栈
      if (isNumber(rpe[i]))
        stack.push(Number(rpe[i]));
      // 遇到运算符就进行运算
      else {
        switch(rpe[i]) {
          case '+':
            var operand1 = stack[stack.length - 1];
            var operand2 = stack[stack.length - 2];
            //alert(operand1);
            //alert(operand2);
            stack.pop();
            stack.pop();
            var add_result = add(operand2, operand1);
            stack.push(add_result);
            break;
          case '-':
            var operand1 = stack[stack.length - 1];
            var operand2 = stack[stack.length - 2];
            stack.pop();
            stack.pop();
            var distract_result = subtract(operand2, operand1);
            stack.push(distract_result);
            break;
          case '*':
            var operand1 = stack[stack.length - 1];
            var operand2 = stack[stack.length - 2];
            stack.pop();
            stack.pop();
            var multiply_result = multiply(operand2, operand1);
            stack.push(multiply_result);
            break;
          case '/':
            var operand1 = stack[stack.length - 1];
            var operand2 = stack[stack.length - 2];
            stack.pop();
            stack.pop();
            var divide_result = divide(operand2, operand1);
            stack.push(divide_result);
            break;
          default:
            break;
        }
      }
    }
    return stack[0];
  }

  function handleDecimal(op1, op2) {
    // 得到小数点后的位数
    var decimal1;
    var decimal2;
    if (op1.toString().indexOf(".") == -1)
      decimal1 = 0;
    else
      decimal1 = op1.toString().split(".")[1].length;
    if (op2.toString().indexOf(".") == -1)
      decimal2 = 0;
    else
      decimal2 = op2.toString().split(".")[1].length;
    var diff = Math.abs(decimal1 - decimal2);
    //var denominator = Math.pow(10, Math.max(decimal1, decimal2));
    var move = Math.pow(10, diff);

    if (decimal1 > decimal2) {
      op1 = Number(op1.toString().replace(".", ""));
      op2 = Number(op2.toString().replace(".", "")) * move;
    }
    else {
      op1 = Number(op1.toString().replace(".", "")) * move;
      op2 = Number(op2.toString().replace(".", ""));
    }
    return [op1, op2, decimal1, decimal2];
  }
  function add(op1, op2) {
    var result = handleDecimal(op1, op2);
    op1 = result[0];
    op2 = result[1];
    var denominator = Math.pow(10, Math.max(result[2], result[3]));
    return (op1 + op2) / denominator;
  }

  function subtract(op1, op2) {
    var result = handleDecimal(op1, op2);
    op1 = result[0];
    op2 = result[1];
    var denominator = Math.pow(10, Math.max(result[2], result[3]));
    return (op1 - op2) / denominator;
  }

  function multiply(op1, op2) {
    var result = handleDecimal(op1, op2);
    op1 = result[0];
    op2 = result[1];
    var denominator = Math.pow(10, result[2] + result[3]);
    return (op1 * op2) / denominator;
  }

  function divide(op1, op2) {
    var result = handleDecimal(op1, op2);
    op1 = result[0];
    op2 = result[1];
    var denominator = Math.pow(10, -Math.abs(result[2] - result[3]));
    return (op1 / op2) * denominator;
  }


  // Advanced functions
  document.onkeydown=keyListener;

  function keyListener(e){   
    // calculate the result when enter is pressed  
    if ((e.keyCode == 13) || (e.keyCode == 108))
    {
        getResult();
    }
    else if (e.shiftKey == false && e.keyCode == 48)
    {
      writeToExp(0);
    }
    else if (e.keyCode == 49)
    {
      writeToExp(1);
    }
    else if (e.keyCode == 50)
    {
      writeToExp(2);
    }
    else if (e.keyCode == 51)
    {
      writeToExp(3);
    }
    else if (e.keyCode == 52)
    {
      writeToExp(4);
    }
    else if (e.keyCode == 53)
    {
      writeToExp(5);
    }
    else if (e.keyCode == 54)
    {
      writeToExp(6);
    }
    else if (e.keyCode == 55)
    {
      writeToExp(7);
    }
    else if (e.shiftKey == false && e.keyCode == 56)
    {
      writeToExp(8);
    }
    else if (e.shiftKey == false && e.keyCode == 57)
    {
      writeToExp(9);
    }
    else if (e.keyCode == 8)
    {
      backSpace();
    }
    else if ((e.shiftKey == true && e.keyCode == 187) || (e.keyCode == 107))
    {
      writeToExp('+');
    }
    else if ((e.keyCode == 189) || (e.keyCode == 109))
    {
      writeToExp('-');
    }
    else if ((e.shiftKey == true && e.keyCode == 56) || (e.keyCode == 106))
    {
      writeToExp('*');
    }
    else if ((e.keyCode == 191) || (e.keyCode == 111))
    {
      writeToExp('/');
    }
    else if ((e.keyCode == 190) || (e.keyCode == 190))
    {
      writeToExp('.');
    }
    else if ((e.shiftKey == true) && e.keyCode == 57)
    {
      writeToExp('(');
    }
    else if ((e.shiftKey == true) && e.keyCode == 48)
    {
      writeToExp(')');
    }
  }
})();