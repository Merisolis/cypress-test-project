describe('Visit web site', () => {
    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
    });

    it('All buttons in the header', () => {
        cy.contains('Home').should('exist').and('be.visible');
        cy.contains('About').should('exist').and('be.visible');
        cy.contains('Contacts').should('exist').and('be.visible');
    });

    it('should check social media links in the contacts section', () => {
        cy.get('#contactsSection').within(() => {
            // Facebook
            cy.get('a[href="https://www.facebook.com/Hillel.IT.School"]')
                .should('have.attr', 'target', '_blank')
                .within(() => {
                    cy.get('span.socials_icon.icon.icon-facebook')
                        .should('exist')
                        .and('be.visible');
                });

            // Telegram
            cy.get('a[href="https://t.me/ithillel_kyiv"]')
                .should('have.attr', 'target', '_blank')
                .within(() => {
                    cy.get('span.socials_icon.icon.icon-telegram')
                        .should('exist')
                        .and('be.visible');
                });

            // YouTube
            cy.get('a[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]')
                .should('have.attr', 'target', '_blank')
                .within(() => {
                    cy.get('span.socials_icon.icon.icon-youtube')
                        .should('exist')
                        .and('be.visible');
                });

            // Instagram
            cy.get('a[href="https://www.instagram.com/hillel_itschool/"]')
                .should('have.attr', 'target', '_blank')
                .within(() => {
                    cy.get('span.socials_icon.icon.icon-instagram')
                        .should('exist')
                        .and('be.visible');
                });

            // LinkedIn
            cy.get('a[href="https://www.linkedin.com/school/ithillel/"]')
                .should('have.attr', 'target', '_blank')
                .within(() => {
                    cy.get('span.socials_icon.icon.icon-linkedin')
                        .should('exist')
                        .and('be.visible');
                });
        });
    });
});