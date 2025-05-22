const {expect} = require('chai');
const {
    add,
    capitalize,
    getEvenNumbers,
    getUserFullName,
    fetchData,
    divide,
    isValidEmail
} = require('../app');

describe('App Fuction Tests', () => {

    it('correct add two numbers', () => {
        expect(add(5,7)).to.equal(12);
    });

    it('correctly capitalize a string', () => {
        expect(capitalize('hello')).to.equal('Hello');
    })

    it('return only even numbers from the array', () => {
        expect(getEvenNumbers([1,2,3,4])).to.deep.equal([2,4]);
    });

    it('return fullname from user obj', () => {
        expect(getUserFullName({firstName:"Shahabas", lastName:"Aman"})).to.equal("Shahabas Aman");
    });

    it('fetch data async', async()=> {
        const res = await fetchData();
        expect(res).to.have.property('status', 200);
        expect(res).to.have.property('data', 'success');
    });

    it('throw err when divide by 0', ()=>{
        expect(() => divide(10,0).to.throw("Cannot divide by 0"))
    });

    it('validate correct mail', ()=>{
        expect(isValidEmail('test@mail.com')).to.be.true;
        expect(isValidEmail('invalidMail')).to.be.false;
    });
});