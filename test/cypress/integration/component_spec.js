describe('Single component', () => {
	before(() => {
		// Open simple button component in isolation
		cy.visit('/#!/Button');
	});

	describe('props and methods section', () => {
		beforeEach(() => {
			cy.get('button')
				.contains('Props & methods')
				.as('propsBtn');

			cy.get('@propsBtn')
				.closest('[class^=rsg--tabs]')
				.as('container');
		});

		it('is present', () => {
			cy.get('@propsBtn').should('exist');
		});

		it('does not show table initially', () => {
			cy.get('@container')
				.find('table')
				.should('not.exist');
		});

		it('shows the table on button click', () => {
			cy.get('@propsBtn').click();
			cy.get('@container')
				.find('table')
				.should('contain', 'Prop name');
		});
	});

	describe('preview section', () => {
		beforeEach(() => {
			cy.get('[class^=rsg--preview]')
				.as('preview')
				.closest('[class^=rsg--root]')
				.as('container')
				.find('button')
				.contains('View Code')
				.as('viewCodeBtn');
		});

		it('renders component preview', () => {
			cy.get('@preview')
				.find('button', { timeout: 10000 })
				.contains('Push Me')
				.should('exist');
		});

		it('has view code button', () => {
			cy.get('@viewCodeBtn').should('exist');
		});

		it('does not show code initially', () => {
			cy.get('@container')
				.find('textarea')
				.should('not.exist');
		});

		it('shows code on click', () => {
			cy.get('@viewCodeBtn').click();
			cy.get('@container')
				.find('textarea')
				.should('exist');
		});

		it('changes the render after code change', () => {
			const codeToSkip = '</Button>';
			cy.get('@container')
				.find('textarea')
				.type(`${'{leftarrow}'.repeat(codeToSkip.length)} Harder`);

			cy.get('@preview')
				.find('button')
				.contains('Push Me Harder')
				.should('exist');
		});
	});

	describe('isolated mode', () => {
		beforeEach(() => {
			cy.get('[class^=rsg--root] article')
				.as('componentExamples')
				.find('a[aria-label="Open isolated"], a[aria-label="Show all components"]')
				.first()
				.as('isolatedExampleBtn');
		});

		it('shows only one example in isolated example mode', () => {
			cy.get('@isolatedExampleBtn').click();
			cy.get('@componentExamples')
				.find('[class^=rsg--root]')
				.should('have.length', 1);
		});

		it('shows all examples again after exiting isolated example mode', () => {
			cy.get('@isolatedExampleBtn').click();
			cy.get('@componentExamples')
				.find('[class^=rsg--root]')
				.should('have.length.above', 1);
		});

		// TODO: this test currently fails due to a bug (returns to normal mode rather than isolated component mode)
		// it('returns to isolated component mode, rather than normal mode', () => {
		// 	cy.get('[id$=container]').should('have.length', 1);
		// });
	});
});
