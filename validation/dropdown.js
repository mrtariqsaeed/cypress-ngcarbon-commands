/**
 * Test a required dropdown
 */
Cypress.Commands.add('testRequiredDropDown', (fieldName, msg) => {
    cy
        .get(fieldName)
        .trigger('mouseleave')
        .parent()
        .contains(msg)
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