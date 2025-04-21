describe('checkout item', ()=>{
    const shoppingItem = "Sauce Labs Bike Light"
    it('adds a product then checks it out', function(){
        //login
        cy.visit('/');
        cy.login();
        
        // products page
        cy.url().should('contain', 'inventory');
        cy.get('.shopping_cart_link').find('.shopping_cart_badge').should('not.exist');
        cy.get(`.inventory_item_description:contains(${shoppingItem})`).as('itemBlock').should('exist');;
        cy.get('@itemBlock').find('.inventory_item_price').invoke('text').then((price) => {
            cy.wrap(price).as('itemPrice'); 
          });
        
        // add product to cart
        cy.get('@itemBlock').find('button').as('itemBlockButton').click();
        cy.get('@itemBlockButton').should('contain', 'Remove');
        cy.get('.shopping_cart_link').find('.shopping_cart_badge').should('be.visible');
        
        // go to cart
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_quantity').should('contain', '1');
        cy.get('@itemPrice').then(()=>{
            cy.get('.inventory_item_price').should('have.text', this.itemPrice);
        })
        
        // checkout step 1
        cy.get('#checkout').click();
        cy.url().should('contain', 'checkout-step-one');
        cy.get('#continue').click();
        cy.get('.error-button').should('be.visible');
        cy.get('#first-name').type('Michael');
        cy.get('#last-name').type('Ball');
        cy.get('#postal-code').type('PE27 6UF');
        cy.get('#continue').click();

        // checkout step 2
        cy.url().should('contain', 'checkout-step-two');
        cy.get('#finish').click();

        // checkout complete
        cy.url().should('contain', 'checkout-complete');
        cy.get('.pony_express').should('be.visible');
        cy.get('.complete-header').should('be.visible');
        cy.get('.complete-text').should('be.visible');
        cy.get('#back-to-products').click();
    })
})