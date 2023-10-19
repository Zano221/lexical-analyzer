
let list = [];
function insertToList(word) {
    list.push(word)
    console.log(list)
}

$( function() {

    $("insert-button").click(function() {
      
      insertToList($("insert-input"))
    })
})