describe('User Onboarding', () => {
    beforeEach(() => {
    cy.visit('http://localhost:3000')    
    })

    const usernameInput = () => cy.get('input[name=username]');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput = () => cy.get('input[name=password]');
    const tosBox = () => cy.get('[type=checkbox]');
    const submitBtn = () => cy.get('[id="submitBtn"]')
    const emailErr = () => cy.get('[id="emailErr"]')

    it('the desired elements are showing', () => {
        usernameInput().should('exist');
        emailInput().should('exist');
        passwordInput().should('exist');
        tosBox().should('exist');
    })

    describe('Fill out inputs', () => {
        it('can type in the inputs', () => {

            usernameInput()
                .should('have.value', '')
                .type('Username')
                .should('have.value', 'Username') 


            emailInput()
                .should('have.value', '')
                .type('email')
                .should('have.value', 'email')

            passwordInput()
                .should('have.value', '')
                .type('password')
                .should('have.value', 'password')
        })

        it('the submit button enables when all inputs are filled out', () => {
            usernameInput().type('Said no one ever');
            emailInput().type('home@bloom.com');
            passwordInput().type('bloom21');
            tosBox().check();
            submitBtn().should('not.be.disabled')
            submitBtn().click();
            })

        it ('can check the checkbox', () => {
            tosBox().check()
            .should('be.checked')
        })    


        it('Check for form validation', () => {
            emailInput()
                .type('invalid email')
                emailErr().should('have.value', 'Enter a valid email address')            
        })

    })
})