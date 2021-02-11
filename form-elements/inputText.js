/**
 * Fill an input
 */
Cypress.Commands.add('fillInput', (field, text) => {
    cy
        .get(field)
        .type(text)
        .should('have.value', text)
})
/**
 * Test the validation of a required carbon input/textarea
 */
Cypress.Commands.add('testRequiredInput', (field, invalidMassge, properData) => {
    /** Test the invalid scinareo */
    cy
        .get(field)
        /** Trigger the validation */
        .focus()
        .blur()
        /** Look for the validation error message */
        .parent('div')
        .parent('ibm-label')
        .contains(invalidMassge)

    /** Test the vlaid scenareo "Optional" */
    if (properData && properData !== '') {
        cy.fillInput(field, properData)
    }
})
/**
 * Test input text with custom validation
 * and optionally test the reuired validation if exists
 */
Cypress.Commands.add('testCustomValidationInput', (field, wrongData, invalidMassge, properData, required) => {
    /** Test the invalid scinareo */
    cy
        .fillInput(field, wrongData)
        .blur()
        /** Look for the validation error message */
        .parent('div')
        .parent('ibm-label')
        .contains(invalidMassge)
        .get(field)
        .clear()

    /** Test the required validation "Optional" */
    if (required) {
        cy.testRequiredInput(field, invalidMassge, '')
    }
    
    /** Test the valid scinareo */
    cy
        .fillInput(field, properData)
        /** Make sure the validation error is gone */
        .parent('div')
        .find('ibm-icon-warning-filled')
        .should('not.exist')
})
