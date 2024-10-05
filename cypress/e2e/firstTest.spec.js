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

  it('second test', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // Theory
    // get() - find elements on the page by locator globally (used in the first test ^^)
    // find() - find child elements by locator
    // contains() - find HTML text and by text and locator

    cy.contains('Sign in') // find HTML text by text

    cy.contains('[status="warning"]', 'Sign in') // find HTML text by attribute(locator) and text

    cy.contains('div', 'Horizontal form').find('button') // it you want to find child element use find or contains, not get bc it will globally find the element
    cy.contains('nb-card', 'Horizontal form').find('button')
    cy.contains('nb-card', 'Horizontal form').contains('Sign in')


    cy.get('#inputEmail3')
      .parents('form')
      .contains('nb-checkbox', 'Remember me') // look for the nb-checkbox element and HTML text, Remember me
      .click();

    cy.get('#inputEmail3')
      .parents('form')
      .find('nb-checkbox') // find for the child element that has nb-checkbox tag within in the form element
      .click(); // stop the chain after the action command
  })

  it('saving subject of commands', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid').find('#inputEmail1')
    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]')
    cy.contains('nb-card', 'Using the Grid').find('#inputPassword2')

    // 1. Cypress Alias
    cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
    cy.get('@usingTheGrid').find('#inputEmail1')
    cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')

    // 2. Cypress then() methods
    cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
      cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
    }) // you can't use usingTheGridForm outside of this box

  })

  it('Extracting text value', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // jQuery method
    cy.get('[for="exampleInputEmail1"]').then (element => { // element selected from [for="exampleInputEmail1"] attribute
      const labelText = element.text()
      expect(labelText).to.equal('Email address')
    })

    // Cypress method
    cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => { // The text() method in jQuery retrieves all the text inside the selected elemen
      expect(text).to.equal('Email address')
    })

    cy.get('[for="exampleInputEmail1"]').invoke('text').should('contain', 'Email address')

    cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').should('contain', 'label') // particial match

    cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then( classValue => { // exact match
      expect(classValue).to.equal('label')
    })

    cy.get('#exampleInputEmail1').type('a@a.com')
    cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'a@a.com') // particial match

    cy.get('#exampleInputEmail1').invoke('prop', 'value').then( emailVal => { // exact match
      expect(emailVal).to.equal('a@a.com')
    })

  })

  it('Radio', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // *** You can ignore Cypress' default behavior of checking that the element is visible, clickable and not disabled by setting force to true in the options.

    // cy.get('nb-radio-group').find('[type="radio"]').first().check({force: true}).should('be.checked')
    // cy.get('nb-radio-group').find('[type="radio"]').eq(1).should('not.be.checked')

    cy.get('nb-radio-group').find('[type="radio"]').as('radioList')
    cy.get('@radioList').first().check({force: true}).should('be.checked')
    cy.get('@radioList').eq(1).should('not.be.checked')
  })

  it('Check boxes', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

   // cy.get('[type="checkbox"]').eq(0).should('be.checked')
    cy.get('[type="checkbox"]').eq(0).check({force: true}).should('be.checked') // check() will only check the checkbox if it’s not already checked.
    cy.get('[type="checkbox"]').eq(0).click({force: true}).should('not.be.checked') // click doesn't care about the current status
  })

  it.only('Dropdown', () => {
    cy.visit('/')

    // 1
    cy.get('nav nb-select').click()
    cy.get('nb-option').contains('Dark').click()
    cy.get('nav nb-select').click().should('contain', 'Dark')

    //2
    cy.visit('/')
    cy.get('nav nb-select').then( dropDown => {
      cy.wrap(dropDown).click()
      
      cy.get('.options-list nb-option').each(listItem => {
        const itemText = listItem.text().trim()
        cy.wrap(listItem).click()
        cy.wrap(dropDown).should('contain', itemText)
        cy.wrap(dropDown).click()
      })
    })


    // 3
    // cy.get('nav nb-select').as('dropDown') // Create an alias for the dropdown

    // cy.get('@dropDown').click() // Use the alias to click the dropdown
    // cy.get('.options-list nb-option').each(listItem => {
    //   const itemText = listItem.text().trim()
    //   cy.wrap(listItem).click() // Click on the option

    //   cy.get('@dropDown').should('contain', itemText) // Check that the dropdown contains the selected item
    //   cy.get('@dropDown').click() // Reopen the dropdown for further selections
    // })

  })

})


// <button _ngcontent-oil-c19="" nbbutton="" status="primary" type="submit" _nghost-oil-c16="" ng-reflect-status="primary" class="appearance-filled size-medium status-primary shape-rectangle transitions" aria-disabled="false" tabindex="0">Sign in</button>
// <button _ngcontent-oil-c19="" nbbutton="" status="warning" type="submit" _nghost-oil-c16="" ng-reflect-status="warning" class="appearance-filled size-medium status-warning shape-rectangle transitions" aria-disabled="false" tabindex="0">Sign in</button>
