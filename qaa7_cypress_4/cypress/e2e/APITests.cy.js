/// <reference types="cypress" />

describe('httpbin tests', () => {

    const baseUrl = 'https://httpbin.org';

    it('GET request should return 200', () => {
        const request = {
            method: 'GET',
            url: `${baseUrl}/get`,
            failOnStatusCode: false
        };

        cy.request(request).then(response => {
            assert.equal(200, response.status);
        });
    });

    it('POST request with JSON body should return 200 and correct JSON', () => {
        const request = {
            method: 'POST',
            url: `${baseUrl}/post`,
            body: {
                name: 'Cypress',
                type: 'test'
            },
            failOnStatusCode: false
        };

        cy.request(request).then(response => {
            assert.equal(200, response.status);
            assert.deepEqual(response.body.json, { name: 'Cypress', type: 'test' });
        });
    });

    it('PUT request should return 200 and correct JSON', () => {
        const request = {
            method: 'PUT',
            url: `${baseUrl}/put`,
            body: {
                name: 'Cypress',
                type: 'test'
            },
            failOnStatusCode: false
        };

        cy.request(request).then(response => {
            assert.equal(200, response.status);
            assert.deepEqual(response.body.json, { name: 'Cypress', type: 'test' });
        });
    });

    it('DELETE request should return 200', () => {
        const request = {
            method: 'DELETE',
            url: `${baseUrl}/delete`,
            failOnStatusCode: false
        };

        cy.request(request).then(response => {
            assert.equal(200, response.status);
        });
    });

    it('HEAD request should return 200', () => {
        const request = {
            method: 'HEAD',
            url: `${baseUrl}/get`,
            failOnStatusCode: false
        };

        cy.request(request).then(response => {
            assert.equal(200, response.status);
        });
    });

    it('GET request with User-Agent header should return 200 and correct header', () => {
        const request = {
            method: 'GET',
            url: `${baseUrl}/headers`,
            headers: {
                'User-Agent': 'Cypress Test'
            },
            failOnStatusCode: false
        };

        cy.request(request).then(response => {
            assert.equal(200, response.status);
            assert.equal(response.body.headers['User-Agent'], 'Cypress Test');
        });
    });

    it('GET request with custom header should return 200 and correct header', () => {
        const request = {
            method: 'GET',
            url: `${baseUrl}/headers`,
            headers: {
                'X-Custom-Header': 'Cypress Test Header'
            },
            failOnStatusCode: false
        };

        cy.request(request).then(response => {
            assert.equal(200, response.status);
            assert.equal(response.body.headers['X-Custom-Header'], 'Cypress Test Header');
        });
    });

    it('GET request with query parameters should return 200 and correct parameters', () => {
        const params = {
            name: 'Cypress',
            type: 'test'
        };

        const request = {
            method: 'GET',
            url: `${baseUrl}/get`,
            qs: params,
            failOnStatusCode: false
        };

        cy.request(request).then(response => {
            assert.equal(200, response.status);
            assert.deepEqual(response.body.args, params);
        });
    });

    it('GET request with random query parameters should return 200 and correct parameters', () => {
        const randomString = Math.random().toString(36).substring(7);

        const request = {
            method: 'GET',
            url: `${baseUrl}/get`,
            qs: { random: randomString },
            failOnStatusCode: false
        };

        cy.request(request).then(response => {
            assert.equal(200, response.status);
            assert.equal(response.body.args.random, randomString);
        });
    });

    it('GET request to delay endpoint should return 200 and complete within 2 seconds', () => {
        const request = {
            method: 'GET',
            url: `${baseUrl}/delay/1`,
            failOnStatusCode: false
        };

        cy.request(request).then(response => {
            assert.equal(200, response.status);
            assert.isBelow(response.duration, 2000); // szybciej niz 2 sekundy
        });
    });

});
