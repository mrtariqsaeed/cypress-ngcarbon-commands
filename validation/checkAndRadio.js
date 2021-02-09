/**
 * Test a required checkbox
 */
Cypress.Commands.add('testRequiredCheckBox', (checkBoxContainerID, checkBoxes, triggerEvent, invalidMessage) => {
    cy
        .get(checkBoxContainerID)
        .invoke('attr', 'style', 'position: relative; z-index: 100000;')
        .trigger(triggerEvent)
        .click()
        .contains(invalidMessage)
        .wrap(checkBoxes).each((item, i, array) => {
            cy.get(item)
                .click()
                .find('input')
                .invoke('attr', 'style', 'position: relative; z-index: 100000;')
                .click()
        })
        .get(checkBoxContainerID)
        .click()
        .contains(invalidMessage)
        .should('not.exist')
})

/**
 * Test a required radio button
 */
Cypress.Commands.add('testRequiredRadio', (radio, radioContainer, triggerEvent, invalidMassage) => {
    cy
        /** Trigget and test the validation */
        .get(radioContainer)
        .parent()
        .invoke('attr', 'style', 'position: relative; z-index: 100000;')
        .trigger(triggerEvent)
        .click()
        .contains(invalidMassage)
        /** Check the radio button */
        .get(radio)
        .then(($radio) => {
            if($radio.find('input').length)
                return $radio.find('input')
        })        
        .invoke('attr', 'style', 'position: relative; z-index: 100000;') //Handling the unexpected element is covered behavior/issue in cypress
        .click()
        /** Make sure the radio is no longer invalid */
        .get(radioContainer)
        .contains(invalidMassage)
        .should('not.exist')
})