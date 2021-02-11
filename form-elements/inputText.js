/**
 * Fill an input
 */
Cypress.Commands.add('fillInput', (selector, text) => {
    cy
        .get(selector)
        .type(text)
        .should('have.value', text)
})
/**
 * Test the validation of a required carbon input/textarea
 */
Cypress.Commands.add('testRequiredInput', (selector, invalidMassge, properData) => {
    /** Test the invalid scinareo */
    cy
        .get(selector)
        /** Trigger the validation */
        .focus()
        .blur()
        /** Look for the validation error message */
        .parent('div')
        .parent('ibm-label')
        .contains(invalidMassge)

    /** Test the vlaid scenareo "Optional" */
    if (properData && properData !== '') {
        cy.fillInput(selector, properData)
    }
})
/**
 * Test input text with custom validation
 * and optionally test the reuired validation if exists
 */
Cypress.Commands.add('testCustomValidationInput', (selector, wrongData, invalidMassge, properData, required) => {
    /** Test the invalid scinareo */
    cy
        .fillInput(selector, wrongData)
        .blur()
        /** Look for the validation error message */
        .parent('div')
        .parent('ibm-label')
        .contains(invalidMassge)
        .get(selector)
        .clear()

    /** Test the required validation "Optional" */
    if (required) {
        cy.testRequiredInput(selector, invalidMassge, '')
    }

    /** Test the valid scinareo */
    cy
        .fillInput(selector, properData)
        /** Make sure the validation error is gone */
        .parent('div')
        .find('ibm-icon-warning-filled')
        .should('not.exist')
})
