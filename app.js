// math operations

function add(a,b){
    return a + b;
}

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getEvenNumbers(arr){
    return arr.filter(num => num % 2 === 0);
}

function getUserFullName(user){
    return `${user.firstName} ${user.lastName}`;
}

async function fetchData(){
    return new Promise(resolve => {
        setTimeout(() => resolve({ status:200, data:"success"}),100);
    })
}

function divide(a,b){
    if (b==0) throw new Error("cannot divide by zero");
    return a/b;
}

function isValidEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = {
    add,
    capitalize,
    getEvenNumbers,
    getUserFullName,
    fetchData,
    divide,
    isValidEmail
  };