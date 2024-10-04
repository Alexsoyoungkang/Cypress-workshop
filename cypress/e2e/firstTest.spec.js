/// <reference types="cypress" />

describe('First test suite', () => {

  it('first test', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //by Tag name
    cy.get('input')

    //by ID
    cy.get('#inputEmail1')

    //by Class value
    cy.get('.input-full-width')

    //by attribute name - attribute should be within in []
    cy.get('[fullwidth]')

    //by Attribute and value
    cy.get('[type="email"]')

    //by entire Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by two attributes
    cy.get('[fullwidth][placeholder="Email"]')

    //by tag, attribute id and class
    cy.get('input[type="email"]#inputEmail.input-full-width')

    //by cypress test ID
    cy.get('[data-cy="imputEmail1"]')
  })

})
