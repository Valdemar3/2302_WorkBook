import { faker } from "@faker-js/faker"
import * as pet from "../fixtures/pet.json"

pet.id = parseInt(faker.random.numeric(5))
pet.name = faker.animal.crocodilia.name
pet.category.id = parseInt(faker.random.numeric(3))
pet.category.name = faker.animal.type()

describe('Pet Suite', () => {
  it('Pet creation', () => {

    cy.log('**Create Pet**')
    cy.request('POST', '/pet', pet).then( response => {
      console.log(response) //showing infirmation in console
      
      // showing information in log in Cypress
      // cy.log(`Request Body: ${response.allRequestResponses[0]["Request Body"]}`)
      // cy.log(`Request Headers: ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`)
      // cy.log(`Request URL: ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`)

      expect(response.status).to.be.equal(200)
      expect(response.statusText).to.be.equal('OK')
      expect(response.isOkStatusCode).to.be.true
      
      expect(response.body.id).to.be.equal(pet.id)
      expect(response.body.name).to.be.equal(pet.name)
      expect(response.body.category.id).to.be.equal(pet.category.id)
      expect(response.body.category.name).to.be.equal(pet.category.name)

    })

  })
})