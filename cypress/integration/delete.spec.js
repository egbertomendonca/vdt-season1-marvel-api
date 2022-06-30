
describe('DELETE /characters/id', () => {

    const tochaHumana = {
        name: 'Jhonny Storm',
        alias: 'Tocha Humana',
        team: ['Quarteto Fantástico'],
        active: true
    }


    context('quando tenho um personagem cadastrado', () => {

        before(() => {
            cy.postCharacter(tochaHumana)
                .then((response) => {
                    Cypress.env('characterId', response.body.character_id)
                })
        });

        it('deve remover o personagem pelo id', () => {
            const id = Cypress.env('characterId')
            cy.deleteCharacterById(id)
                .then((response) => {
                    expect(response.status).to.eql(204)    
                })
        });

        after(() => {
            const id = Cypress.env('characterId')
            cy.getCharacterById(id)
            .then((response)=>{
                expect(response.status).to.eql(404)
            })
        });
        
    });

    it('deve retornar 404 remover por id não cadatrado', () => {
        const id = '62bd7b05962e1a1da70f7f2c'
        cy.deleteCharacterById(id)
            .then((response) => {
                expect(response.status).to.eql(404)
            })
    });
});