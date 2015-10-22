const items = [
  {
    id: 1,
    name: 'item 1'
  },
  {
    id: 2,
    name: 'item 2'
  },
];

class Items {
  getAll() {
    return items;
  }

  getById(id) {
    return items[id - 1];
  }
}

export default Items;
