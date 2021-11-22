const { calculateAge } = require('../src/models/author');

describe('calculateAge', () => {

    test('returns current age of alive author', () => {

        let dateOfBirth = '1973-06-06T00:00:00.000Z';
        let dateOfDeath = undefined;

        let calculatedAge = calculateAge(dateOfBirth, dateOfDeath);

        let expectedAge = Math.floor((Date.now() - new Date(dateOfBirth)) / (1000 * 60 * 60 * 24 * 365));

        expect(calculatedAge).toEqual(expectedAge);

    });

    test('returns age at date of death of dead author', () => {

        let dateOfBirth = '1973-06-06T00:00:00.000Z';
        let dateOfDeath = '2019-06-06T00:00:00.000Z';

        let calculatedAge = calculateAge(dateOfBirth, dateOfDeath);

        let expectedAge = Math.floor((new Date(dateOfDeath) - new Date(dateOfBirth)) / (1000 * 60 * 60 * 24 * 365));

        expect(calculatedAge).toEqual(expectedAge);


    });

})