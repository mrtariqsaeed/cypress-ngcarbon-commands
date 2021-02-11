/**
 * Select from ibm-select element
 */
Cypress.Commands.add('selectFromIBMSelect', (selector, option) => {
    cy
        .get(selector)
        .find('select')
        .select(option)
        .should('have.value', option)
})
/**
 * Test a required dropdown
 */
Cypress.Commands.add('testRequiredDropDown', (selector, invalidMassge) => {
    cy
        .get(selector)
        .trigger('mouseleave')
        .parent()
        .contains(invalidMassge)
        .get(selector)
        .click()
        .find('ul', 'bx--list-box__menu bx--multi-select')
        .find('li', '.bx--list-box__menu-item')
        .first()
        .click()
        .get(selector)
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
Cypress.Commands.add('testRequiredSelect', (selector, triggerEvent, invalidMassage, option) => {
    cy
        /** Trigget and test the validation */
        .get(selector)
        .trigger(triggerEvent)
        .contains(invalidMassage)
        /** Select an option */
        .selectFromIBMSelect(selector, option)
        /** Make sure the field is no longer invalid */
        .get(selector)
        .contains(invalidMassage)
        .should('not.exist')
})