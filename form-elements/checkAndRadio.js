/**
 * Test Check Radio Button
 */
Cypress.Commands.add('checkRadio', (radioSelector) => {
    cy
        .get(radio)
        .then(($radio) => {
            if ($radio.find('input').length)
                return $radio.find('input')
        })
        .invoke('attr', 'style', 'position: relative; z-index: 100000;') //Handling the unexpected element is covered behavior/issue in cypress
        .click()
})

/**
 * Test the validation of a required checkbox
 */
Cypress.Commands.add('testRequiredCheckbox', (checkboxContainerSelector, checkboxSelector, triggerEvent, invalidMessage) => {
    cy
        .get(checkboxContainerSelector)
        .invoke('attr', 'style', 'position: relative; z-index: 100000;')
        .trigger(triggerEvent)
        .click()
        .contains(invalidMessage)
        .get(checkboxSelector)
        .click()
        .find('input')
        .invoke('attr', 'style', 'position: relative; z-index: 100000;')
        .click()
        .get(checkboxContainerSelector)
        .click()
        .contains(invalidMessage)
        .should('not.exist')
})

/**
 * Test the validation of a required radio button
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
        .checkRadio(radio)
        /** Make sure the radio is no longer invalid */
        .get(radioContainer)
        .contains(invalidMassage)
        .should('not.exist')
})