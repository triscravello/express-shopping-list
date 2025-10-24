const DataStore = require('../dataStore');

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    static getAll() {
        return DataStore.read();
    }

    static add(item) {
        const items = DataStore.read();
        items.push(item);
        DataStore.write(items);
        return item;
    }

    static getByName(name) {
        const items = DataStore.read();
        return items.find(item => item.name === name);
    }

    static update(name, newData) {
        const items = DataStore.read();
        const item = items.find(item => item.name === name);
        if (item) {
            Object.assign(item, newData);
            DataStore.write(items);
        } 
        return item;
    }

    static delete(name) {
        let items = DataStore.read();
        const itemIndex = items.findIndex(item => item.name === name);
        if (itemIndex !== -1) {
            items.splice(itemIndex, 1);
            DataStore.write(items);
            return true;
        }
        return false;
    }
}

module.exports = Item;