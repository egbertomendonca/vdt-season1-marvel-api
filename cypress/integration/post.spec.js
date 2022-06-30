
describe('POST /characters', () => {
    // biblioteca: npm install @bahmutov/cy-api --save-dev
    it('deve cadastrar um personagem', () => {
        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then((response) => {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eq(24)
            })

    });

    context('quando o personagem já existe', () => {

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: ['vingadores da costa oeste', 'irmandade de mutantes'],
            active: true
        }

        before(() => {
            cy.postCharacter(character)
                .then((response) => {
                    expect(response.status).to.eql(201)
                })
        });

        it('não deve cadastrar duplicado', () => {
            cy.postCharacter(character)
                .then((response) => {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')
                })
        });
    });
    
});



