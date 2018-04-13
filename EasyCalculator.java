import java.awt.GridLayout;
import javax.swing.JTextField;
import javax.swing.JFrame;
import javax.swing.JButton;
import java.awt.event.*;

public class EasyCalculator extends JFrame {
  private JButton operator, equal, result, add, subtract, multiply, divide, ok;
  private JTextField op1, op2;

  public EasyCalculator() {
    // Create a layout
    setLayout(new GridLayout(2, 5));

    // Create the buttons and textfields
    operator = new JButton("");
    equal = new JButton("=");
    result = new JButton("");
    add = new JButton("+");
    subtract = new JButton("-");
    multiply = new JButton("*");
    divide = new JButton("/");
    ok = new JButton("OK");
    op1 = new JTextField(5);
    op2 = new JTextField(5);

    // Disable some buttons
    operator.setEnabled(false);
    equal.setEnabled(false);
    result.setEnabled(false);
    // add the controls to the layout
    add(op1);
    add(operator);
    add(op2);
    add(equal);
    add(result);
    add(add);
    add(subtract);
    add(multiply);
    add(divide);
    add(ok);

    // add Event Handler
    add.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        operator.setText("+");
      }
    });

    subtract.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        operator.setText("-");
      }
    });

    multiply.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        operator.setText("*");
      }
    });

    divide.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        operator.setText("/");
      }
    });

    ok.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        double _result;
        double num1 = Double.parseDouble(op1.getText());
        double num2 = Double.parseDouble(op2.getText());
        String sign = operator.getLabel();
        
        // Calculation
        if (sign == "+") 
          _result = num1 + num2;
        else if (sign == "-")
          _result = num1 - num2;
        else if (sign == "*")
          _result = num1 * num2;
        else
          _result = num1 / num2;

        System.out.print(_result);
        // Print result
        result.setLabel(_result + "");
      }
    });

    // Add KeyListeners
    // To prevent invalid input
    op1.addKeyListener(new KeyAdapter() {
      public void keyTyped(KeyEvent e) {
        int keyChar = e.getKeyChar();
        if (keyChar >= KeyEvent.VK_0 && keyChar <= KeyEvent.VK_9) {

        }
        else {
          e.consume();
        }
      }
    });
    op2.addKeyListener(new KeyAdapter() {
      public void keyTyped(KeyEvent e) {
        int keyChar = e.getKeyChar();
        if (keyChar >= KeyEvent.VK_0 && keyChar <= KeyEvent.VK_9) {

        }
        else {
          e.consume();
        }
      }
    });
  }

  public static void main(String[] args) {
    EasyCalculator calculator= new EasyCalculator();
    calculator.setTitle("EasyCalculator");
    calculator.setSize(400, 200);
    calculator.setLocationRelativeTo(null);
    calculator.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    calculator.setVisible(true);
  }
};