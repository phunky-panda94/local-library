const request = require('supertest');
const catalog = require('../src/routes/catalog');
const express = require('express');
const app = express();

app.use('/', catalog);

describe('Author routes', () => {
    
    test('GET request for new author form', async () => {
        const response = await request(app).get('/authors/create');
        expect(response.statusCode).toBe(200);
    });

    test('POST request to create new author', async () => {
        const response = await request(app).post('/authors/create');
        expect(response.statusCode).toBe(200);
    });

    test('GET request to get author details', async () => {
        const response = await request(app).get('/authors/1234');
        expect(response.statusCode).toBe(200);
    });

    test('DELETE request to delete author', async () => {
        const response = await request(app).delete('/authors/1234');
        expect(response.statusCode).toBe(200);
    });

    test('PUT request to update author', async () => {
        const response = await request(app).put('/authors/1234');
        expect(response.statusCode).toBe(200);
    });

    test('GET request for all authors', async() => {
        const response = await request(app).get('/authors');
        expect(response.statusCode).toBe(200);
    });
    
});

describe('Book routes', () => {

    test('GET request for new book form', async () => {
        const response = await request(app).get('/books/create');
        expect(response.statusCode).toBe(200);
    })

    test('POST request to create new book', async () => {
        const response = await request(app).post('/books/create');
        expect(response.statusCode).toBe(200);
    })

    test('GET request to get book details', async () => {
        const response = await request(app).get('/books/1234');
        expect(response.statusCode).toBe(200);
    })

    test('DELETE request to delete book', async () => {
        const response = await request(app).delete('/books/1234');
        expect(response.statusCode).toBe(200);
    })

    test('PUT request to update book', async () => {
        const response = await request(app).put('/books/1234');
        expect(response.statusCode).toBe(200);
    })

    test('GET request for all books', async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);
    })

});

describe('Book instance routes', () => {

    test('GET request for new book instance form', async () => {
        const response = await request(app).get('/books/1234/bookInstances/create');
        expect(response.statusCode).toBe(200);
    })

    test('POST request to create new book instance', async () => {
        const response = await request(app).post('/books/1234/bookInstances/create');
        expect(response.statusCode).toBe(200);
    })

    test('GET request to get book details', async () => {
        const response = await request(app).get('/books/1234/bookInstances/1234');
        expect(response.statusCode).toBe(200);
    })

    test('DELETE request to delete book', async () => {
        const response = await request(app).delete('/books/1234/bookInstances/1234');
        expect(response.statusCode).toBe(200);
    })

    test('PUT request to update book', async () => {
        const response = await request(app).put('/books/1234/bookInstances/1234');
        expect(response.statusCode).toBe(200);
    })

    test('GET request for all books', async () => {
        const response = await request(app).get('/books/1234/bookInstances');
        expect(response.statusCode).toBe(200);
    })

});