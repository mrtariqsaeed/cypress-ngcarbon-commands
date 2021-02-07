/**
 * Test the validation of a required carbon input/textarea
 */
Cypress.Commands.add('testRequiredInput', (field, msg, properData) => {
    /** Test the invalid scinareo */
    cy
        .get(field)
        /** Trigger the validation */
        .focus()
        .blur()
        /** Look for the validation error message */
        .parent('div')
        .parent('ibm-label')
        .contains(msg)

    /** Test the vlaid scenareo "Optional" */
    if (properData && properData !== '') {
        cy
            .get(field)
            .type(properData)
            .should('have.value', properData)
            /** Make sure the validation error is gone */
            .parent('div')
            .find('ibm-icon-warning-filled')
            .should('not.exist')
    }

})

/**
 * Test input text with custom validation
 * and optionally test the reuired validation if exists
 */
Cypress.Commands.add('testCustomValidationInput', (field, wrongData, msg, properData, required) => {
    /** Test the invalid scinareo */
    cy
        .get(field)
        .type(wrongData)
        .blur()
        /** Look for the validation error message */
        .parent('div')
        .parent('ibm-label')
        .contains(msg)
        .get(field)
        .clear()

    /** Test the required validation "Optional" */
    if (required) {
        cy.testRequiredInput(field, msg, '')
    }
    /**
     * Test the valid scinareo
     */
    cy
        .get(field)
        .type(properData)
        .should('have.value', properData)
        /** Make sure the validation error is gone */
        .parent('div')
        .find('ibm-icon-warning-filled')
        .should('not.exist')
})
