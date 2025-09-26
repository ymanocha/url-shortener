const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const base = alphabet.length

function encode(num){
    let shortCode = ''
    while (num > 0){
        shortCode = alphabet[num % base] + shortCode;
        num = Math.floor(num/base);
    }
    return shortCode ;
}

function decode(shortCode){
    let num = 0;
    for (let i = 0; i < shortCode.length; i++){
        num = num * base + alphabet.indexOf(shortCode[i]);
    }
    return num;
    }

module.exports = {encode,decode}

