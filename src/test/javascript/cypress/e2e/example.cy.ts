describe('My First Test', () => {
  it('Visits the Angular app', () => {
    cy.visit('/');
    cy.contains('Hello, car-tracker-client-app');
  });
});
