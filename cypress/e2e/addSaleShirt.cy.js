describe('template spec', () => {
  
  it('naviagtes to men tees via navbar', () => {
    cy.visit('/');
    cy.intercept('GET', '**/block-loader.html').as('blockLoader');
    cy.wait('@blockLoader')
    cy.get('div[id="store.menu"]').contains('Men').trigger('mouseover');
    cy.get('a[id="ui-id-17"]').should('be.visible').trigger('mouseover');
    cy.get('a[id="ui-id-21"]').should('be.visible').click();
    cy.get('h1[id="page-title-heading"]').should('contain', 'Tees');
    cy.intercept('GET', '**/content.html').as('content')
    cy.wait('@content');
    cy.get('div[id="layered-filter-block"]').contains('Sale').click();
    cy.get('.active > .filter-options-content').contains('Yes').click();
    cy.get('.filter-current > .items > .item').should('contain', 'Sale');
    cy.get('.filter-current > .items > .item').should('contain', 'Yes');
    cy.get('.product-item-link').first().click();
  })
})