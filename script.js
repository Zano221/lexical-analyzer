
let wordList = [];
let hasFirstInput = false;

function insertToList(word) {
    
    list.push(word)
    console.log(list)
}

function findElementInArray(word) { //lol too lazy
  let res = false;
  wordList.forEach(element => {
    if(element == word) res = true;
  });
  return res;
}

$( function() {

    $("#insert-button").click(function() {
      const word = $("#insert-input").val()
      
      if(findElementInArray(word)) return;
      
      if(!hasFirstInput)  generateTable()

      hasFirstInput = true;
      
      insertToList(word)
    })
})

function generateTable() {
  $('#section-main-page').append("<table id='lexical-table'></table>");
  $('#lexical-table').append("<thead id='table-head'></thead>");
  $('$lexical-table').append("<tbody id='table-body'></tbody>");

  $('#table-head').append("<th class=table-head-element>δ</th>");
  for(let i = 0; i < 26; i++) {

    var _headerElement = "<th class=table-head-element>" + String.fromCharCode(97 + i) + "</th>";
    var headerElement = $('#table-head').append(_headerElement);
  }

  $(".table-head-element").css({"padding": "0", 
  "border": "white solid 1px", 
  "width": "calc((100vw * 0.75) / 26)", 
  "height": "calc((100vw * 0.75) / 31)"})
}

function appendTable() {
  $("#table-body").append()
}