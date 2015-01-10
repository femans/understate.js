var understate = require('./understate.js');

function testRunner(){
    var counter = 1;
    function test(string, exp){
        var test = string==exp;
        return (test?"\033[37m":"\033[31m")+counter++ + ': '+test +': '+string+ ' - '+exp+"\033[37m";
    }

    console.log("test understate.js:")

    var firstname='Homer', lastname='Simpson';
    console.log(test('hello _!'._('world'), 'hello world!'));
    console.log(test('my name is _ _'._(firstname, lastname), 'my name is '+firstname+' '+lastname));
    console.log(test('this is _1_; _1_ is a _2_'._('Bob', 'builder'), 'this is Bob; Bob is a builder'));
    console.log(test('escaped: /_1/_; unescaped: _1_'._('this'), 'escaped: _1_; unescaped: this'));
    console.log(test('this is _name_ the _profession_'._({profession: 'builder', name: 'bob'}), 'this is bob the builder'));
    console.log(test('/__2_ _'._('one?', 'which'), '_which one?'));
    console.log(test('hello /_ _'._('world'), 'hello _ world' ));

    console.log(test('_3_'._(), ''));
    console.log(test('_/__'._(), '_'));
    understate.keep_in_place(true);
    console.log(test('_3_'._(), '_3_'));
    console.log(test('_/__'._(), '_/__'));
    understate.replace_character('\\%');
    console.log(test('hello %!'._('world'), 'hello world!'));
    console.log(test('hello %name%!'._({name: 'john'}), 'hello john!'));

}
testRunner();
