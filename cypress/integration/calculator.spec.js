describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000", {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError')
      }
    });
  })

  it('should have working number buttons', () => {
    cy.get('#number2').click();
    cy.get('.display').should('contain', '2')
  })

  it('should update display on arithmetical operation', () => {
    cy.get('#number1').click();
    cy.get('#operator_add').click();
    cy.get('#number4').click();
    cy.get('#operator-multiply').click();
    cy.get('.display').should('contain', '5')
  })
 
  it('should be able to chain together multiple operations', () => {
    cy.get('#number1').click();
    cy.get('#operator_add').click();
    cy.get('#number4').click();
    cy.get('#operator-multiply').click();
    cy.get('#number3').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '15')
  })
  
  it('should be able to add decimals', () => {
    cy.get('#number0').click();
    cy.get('#decimal').click();
    cy.get('#number1').click();
    cy.get('#operator_add').click();
    cy.get('#number0').click();
    cy.get('#decimal').click();
    cy.get('#number2').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '0.3')
  })

  it('should handle negative numbers', () => {
    cy.get('#operator-subtract').click();
    cy.get('#number1').click();
    cy.get('#operator-subtract').click();
    cy.get('#operator-subtract').click();
    cy.get('#number4').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '3')
  })

  it('should handle large numbers', () => {
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#number9').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '9999999999999999')
  })

  it('should log an error message and set running total to 0 if the user divides by 0', () => {
    cy.get('#number1').click();
    cy.get('#operator-divide').click();
    cy.get('#number0').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', 0)
    cy.get('@consoleError').should('be.calledWith', 'division by zero')
  })
  
})