'use strict';
const LinkedList = require('./linkedList');

class HashMapChain {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
    this.SIZE_RATIO = 3;
    this.MAX_LOAD_RATIO = 0.5;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    const ll = this._hashTable[index];
    let currNode = ll.head;
    while (currNode.next !== null && currNode.value.key !== key) {
      currNode = currNode.next;
    }
    if (currNode.value.key === key) {
      return currNode.value.value;
    } else throw new Error('Key error');
  }

  set(key, value) {
    // const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    // if (loadRatio > this.MAX_LOAD_RATIO) {
    //   this._resize(this._capacity * this.SIZE_RATIO);
    // }
    const index = this._findSlot(key);

    if (!this._hashTable[index]) {
      this.length++;
      this._hashTable[index] = new LinkedList();
      this._hashTable[index].insertFirst({ key, value });
    }
    let currNode = this._hashTable[index].head;
    while (currNode !== null) {
      if (currNode.value.key === key) {
        currNode.value.value = value;
        return;
      }
      currNode = currNode.next;
    }
    this._hashTable[index].insertFirst({ key, value });
  }

  delete(key) {
    const index = this._findSlot(key);
    const list = this._hashTable[index];
    if (list === undefined) {
      throw new Error('Key error');
    }
    let currNode = list.head;
    if (currNode.value.key === key) {
      list.head = currNode.next;
      return;
    } else {
      while (currNode.next !== null && currNode.next.value.key !== key) {
        currNode = currNode.next;
      }
      if (currNode.next !== null) {
        currNode.next = currNode.next.next;
        return;
      } else throw new Error('Key error');
    }
  }

  _findSlot(key) {
    const hash = HashMapChain._hashString(key);
    const start = hash % this._capacity;

    return start;
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }
}
module.exports = HashMapChain;
