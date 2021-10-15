describe('Test Inputs', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    const nameInput = () => cy.get('input[name=name]')
    const passwordInput = () => cy.get('input[name=password]')
    const emailInput = () => cy.get('input[name=email]')
    const termsInput = () => cy.get('input[name=terms]')
    const submitButton = () => cy.get('button')

    it('Submit button starts out disabled', function() {
        submitButton().should('be.disabled')
    })

    it('Tests name input', function() {
        nameInput().should('have.value', '').type('David').should('have.value','David')
    })

    it('Tests password input', function() {
        passwordInput().should('have.value', '').type('pass1234').should('have.value','pass1234')
    })

    it('Tests email input', function() {
        emailInput().should('have.value', '').type('david@gmail.com').should('have.value','david@gmail.com')
    })

    it('Tests terms input', function(){
        termsInput().should('not.be.checked').check().should('be.checked')
    })

    it('Submit button active', function() {
        nameInput().type('David')
        passwordInput().type('password')
        emailInput().type('email@gmail.com')
        termsInput().check()
        submitButton().should('not.be.disabled')
    })
})