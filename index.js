var understate = require('./understate.js');

console.log("test understate.js:")

function testRunner(){
    var counter = 1;
    function test(string, exp){
        var test = string==exp;
        return (test?"\033[37m":"\033[31m")+counter++ + ': '+test +': '+string+ ' - '+exp+"\033[37m";
    }
    var firstname='Homer', lastname='Simpson';
    console.log(test('hello _!'._('world'), 'hello world!'));
    console.log(test('my name is _ _'._(firstname, lastname), 'my name is '+firstname+' '+lastname));
    console.log(test('this is _1_; _1_ is a _2_'._('bob', 'builder'), 'this is bob; bob is a builder'));
    console.log(test('this is _name_ the _profession_'._({profession: 'builder', name: 'bob'}), 'this is bob the builder'));
    console.log(test('_first_ _1_'._('expressions', {first: 'mixed'}), 'mixed expressions'));
    console.log(test('_1_'._('which', {1:'one?'}), 'which'));
    console.log(test('_'._('_named_', {named: 'hello world'}), 'hello world'));
    console.log(test('hello /_ _'._('world'), 'hello _ world' ));

    console.log(test('_3_'._(), ''));
    console.log(test('_/__'._(), '_'));
}
testRunner();
