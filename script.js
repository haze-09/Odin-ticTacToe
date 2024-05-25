//factory

const dude = function(name,coolFactor){
    const discordId = '@' + name;
    return {discordId,coolFactor};
}

const wordEngine = (function(){
    const array = (word) => [...word];

    const and = (word) => word + ' and ';

    const insert = (word,position,word2) => {
        const before = word.slice(0,position);
        const after = word.slice(position);
        const result = before + word2 + after;
        return result;
    }

    return {array,and,insert};
})();

let person1 = dude('kevin','cool');

console.log(wordEngine.array('pizza'));
console.log(wordEngine.and('pizza'));
console.log(wordEngine.insert('pizza',3,'gay'));





