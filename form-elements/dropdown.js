/**
 * Test a required dropdown
 */
Cypress.Commands.add('testRequiredDropDown', (fieldName, invalidMassge) => {
    cy
        .get(fieldName)
        .trigger('mouseleave')
        .parent()
        .contains(invalidMassge)
        .get(fieldName)
        .click()
        .find('ul', 'bx--list-box__menu bx--multi-select')
        .find('li', '.bx--list-box__menu-item')
        .first()
        .click()
        .get(fieldName)
        .parent()
        .contains('This field is required!')
        .should('not.exist')

})

/**
 * Test a required combobox
 */
Cypress.Commands.add('testComboBox', (comboBoxContainerID, elementID) => {
    cy
        .get(comboBoxContainerID)
        .should('be.visible')
        .click()
        .find('ibm-dropdown-list')
        .should('be.visible')
        .find('ul>li')
        .eq(elementID)
        .click()
})

/** 
 * Test the validation of a required ibm-select
 */
Cypress.Commands.add('testRequiredSelect', (fieldName, triggerEvent, invalidMassage, option) => {
    cy
        /** Trigget and test the validation */
        .get(fieldName)
        .trigger(triggerEvent)
        .contains(invalidMassage)
        /** Select an option */
        .get(fieldName)
        .find('select')
        .select(option)
        /** Make sure the field is no longer invalid */
        .get(fieldName)
        .contains(invalidMassage)
        .should('not.exist')
})