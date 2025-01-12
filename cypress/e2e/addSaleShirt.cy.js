describe('adds mens top to cart', () => {
  const navOption = "Climate"
  const navSubOption = "All-Weather"
  const addToCartMessage = /You added .* to your shopping cart/;
  
  before('visit url', ()=>{
    cy.visit('/')
  })

  it('adds mens tee to cart via navbar', () => {  
    // Select Mens Tees from store menu
    cy.get('div[id="store.menu"]') 
      .find('nav > ul > li > #ui-id-5')
      .should('have.attr', 'aria-haspopup').then(() =>{
        cy.get('a[id="ui-id-5"]')
          .trigger('mouseover');   
        cy.get('a[id="ui-id-17"]').trigger('mouseover');
        cy.get('a[id="ui-id-21"]')
        .click()
    }); 

    // filter for category
    cy.get('#narrow-by-list > div > div').should('have.attr', 'aria-expanded', 'false').then(() =>{
      cy.contains(navOption).click();
    });
    cy.get('#narrow-by-list').find('a').contains(navSubOption).click();  

    // check items are returned and select first item
    cy.get('div[data-container="product-grid"]')
      .should('have.length.greaterThan', 0);
    cy.get('div[data-container="product-grid"]')
      .first()
      .click();

    // select first size and colour
    cy.get('div[class="swatch-attribute size"]').find('div[class="swatch-option text"]')
      .first()
      .click()
      .should('have.attr', 'aria-checked', 'true');
    cy.get('div[class="swatch-option color"]')
      .should('have.length.greaterThan', 0)
      .first()
      .click();;
    cy.get('#qty')
      .should('have.attr', 'value', '1');

    // add to cart
    cy.get('#product-addtocart-button')
      .click();
    cy.get('#product-addtocart-button')
      .should('have.attr', 'class', 'action primary tocart disabled');
    cy.get('div[role="alert"] > div > div')
      .invoke('text')
      .should('match', addToCartMessage);
    cy.get('span[class="counter qty"]');
  })
})