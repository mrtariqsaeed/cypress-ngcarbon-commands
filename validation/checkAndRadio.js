/**
 * Test a required checkbox
 */
Cypress.Commands.add('testRequiredCheckBox', (checkBoxContainerID, checkBoxIDS) => {
    cy
        .get(checkBoxContainerID)
        .parent()
        .invoke('attr', 'style', 'position: relative; z-index: 100000;')
        .trigger('mouseleave')
        .click()
        .contains('This field is required!')
        .wrap(checkBoxIDS).each((item, i, array) => {
            cy.get(item)
                .click()
                .find('input')
                .invoke('attr', 'style', 'position: relative; z-index: 100000;')
                .click()
        })
        .get(checkBoxContainerID)
        .click()
        .parent()
        .contains('This field is required!')
        .should('not.exist')
})

/**
 * Test a required radio button
 */
Cypress.Commands.add('testRequiredRadio', (radioID, radioContainerID) => {
    cy
        .get(radioContainerID)
        .parent()
        .invoke('attr', 'style', 'position: relative; z-index: 100000;')
        .trigger('mouseleave')
        .click()
        .contains('This field is required!')
        .get(radioID)
        .find('input')
        .invoke('attr', 'style', 'position: relative; z-index: 100000;')
        .click()
        .get(radioContainerID)
        .contains('This field is required!')
        .should('not.exist')
})
