// // APP
// import { ArrayCollection } from './ArrayCollection';
// import { Collection } from './Collection';

// describe('Collections: ArrayCollection', () => {

//     describe('ArrayCollection:Numeric', () => {
//         let collection: Collection<number>;
//         beforeEach(() => {
//             collection = new ArrayCollection<number>([1, 2, 3]);
//         });
//         it('should instanciate correctly', () => {
//             expect(collection.source).toBe([1, 2, 3]);
//             expect(collection.length).toBe(3);
//             expect(collection.total).toBe(3);
//         });

//         it('should add an item', () => {
//             collection.addItem(4);
//             expect(collection.toArray()).toBe([1, 2, 3, 4]);
//         });

//         it('should add items', () => {
//             collection.addItems([4, 5]);
//             expect(collection.toArray()).toBe([1, 2, 3, 4, 5]);
//         });

//         it('should remove items', () => {
//             collection.removeItem(3);
//             expect(collection.toArray()).toBe([1, 2]);
//         });

//         it('should output as an array', () => {
//             expect(collection.toArray()).toBe([1, 2, 3]);
//         });

//     });

//     describe('ArrayCollection:Objects', () => {
//         let collection: Collection<any>;
//         let source:Array<any> = [
//             { id: 1 },
//             { id: 2 },
//             { id: 3 }
//         ];
//         beforeEach(() => {
//             collection = new ArrayCollection<any>();
//         });
//         it('should instanciate correctly', () => {
//             expect(collection.source).toBe(source);
//             expect(collection.length).toBe(3);
//             expect(collection.total).toBe(3);
//         });

//         it('should add an item', () => {
//             collection.addItem({id: 4});
//             expect(collection.length).toBe(4);
//         });

//         it('should add items', () => {
//             collection.addItems([{id: 4}, {id: 5}]);
//             expect(collection.length).toBe(5);
//         });

//         it('should remove items', () => {
//             collection.removeItem({id: 3});
//             expect(collection.length).toBe(2);
//         });

//         it('should output as an array', () => {
//             expect(collection.toArray()).toBe(source);
//         });

//     });
// });
