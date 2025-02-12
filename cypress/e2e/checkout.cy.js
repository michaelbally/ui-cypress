describe('checkout item', ()=>{
    const shoppingItem = "Sauce Labs Bike Light"
    it('checkout', ()=>{
        cy.visit('/');
        cy.fixture('example').then((user) => {
            cy.get('#user-name').type(user.username);
            cy.get('#password').type(user.password);
          });          
        //cy.get('#user-name').type('standard_user');
        
        //cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('contain', 'inventory');
        cy.get('.shopping_cart_link').find('.shopping_cart_badge').should('not.exist');    
        cy.get(`.inventory_item_description:contains(${shoppingItem})`).as('itemBlock');
        cy.get('@itemBlock').find('button').as('itemBlockButton').click();
        cy.get('@itemBlockButton').contains('Remove');
        cy.get('.shopping_cart_link').find('.shopping_cart_badge');
        
        
        
    })
    

})