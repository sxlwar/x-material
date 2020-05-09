/// <reference types="cypress" />

describe('Testing Demo page', () => {
  const sideNav = ['password', 'breadcrumb', 'message', 'date-picker', 'paginator', 'loading'];

  it('should contain nav list and nav works', () => {
    cy.visit('/');
    sideNav.forEach(nav => {
      cy.contains(nav).click();
      cy.url().should('include', nav);
    });
  });
});
