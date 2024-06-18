
class Calculator {
  constructor(previousoperandTextElement, currentoperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = ''
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.'))return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }

    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''

  }


  compute() {
    let computation
    const previous = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)

    if (isNaN (previous) || isNaN (current)) return
    
    switch(this.operation) {
        case '/':
            computation = previous / current
            break
        case '*':
            computation = previous * current
            break
        case '+':
            computation = previous + current
            break
        case '-':
            computation = previous - current
            break
        default:
            return
    }

    this.currentOperand = computation
    this.operation = ''
    this.previousOperand = ''

  }

  updateDisplay(){
    this.currentOperandTextElement.innerText = this.currentOperand
    if(this.operation != null) {
        this.previousOperandTextElement.innerText = 
        `${this.previousOperand} ${this.operation}`
    }
  }

}


 const numberButtons = document.querySelectorAll('[data-number]')
 const operationButtons = document.querySelectorAll('[data-operation]')
 const equalsButtons = document.querySelector('[data-equals]')
 const deleteButtons = document.querySelector('[data-delete]')
 const allclearButtons = document.querySelector('[data-all-clear]')


 const previousOperandTextElement = document.querySelector('[data-previous-operand]')
 const currentOperandTextElement = document.querySelector('[data-current-operand]')

 const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)




 numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    console.log('numberButton');
  })
 })


 operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
 })


 deleteButtons.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
 
 })


 allclearButtons.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()

 })


equalsButtons.addEventListener('click', buttton => {
  calculator.compute();
  calculator.updateDisplay();

});
 


