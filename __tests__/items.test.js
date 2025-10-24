const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

let item = { name: "popsicle", price: 1.45 };

beforeEach(function() {
    items.push(item);
});

afterEach(function() {
    items.length = 0;
});

describe("GET /items", function() {
    test("Gets a list of items", async function () {
        const resp = await request(app).get("/items");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ items: [item] });
    })
});

describe("POST /items", function() {
    test("Creates a new item", async function() {
        const resp = await request(app)
            .post("/items")
            .send({ name: "cheerios", price: 3.40 });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            added: { name: "cheerios", price: 3.40 }
        });
    })
})

describe("GET /items/:name", function() {
    test("Gets a single item", async function() {
        const resp = await request(app).get(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ item: item });
    })
});

describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
        const resp = await request(app)
            .patch(`/items/${item.name}`)
            .send({ name: "new popsicle", price: 2.45 });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            updated: { name: "new popsicle", price: 2.45 }
        
        });
    });
});

describe("DELETE /items/:name", function() {
    test("Deletes a single item", async function() {
        const resp = await request(app)
            .delete(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    })
});