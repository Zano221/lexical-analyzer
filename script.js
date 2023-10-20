let automatoFinito = [[]]
let wordList = [];
let hasFirstInput = false;

function insertToList(word) {
    
    wordList.push(word)
    console.log(wordList)
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
      
      if(findElementInArray(word) || word == "") return;
      
      //if(!hasFirstInput)  generateTable()

      hasFirstInput = true;
      
      insertToList(word)
      appendToTable();
    })
})

function appendToTable() {

  console.log("NÃO IMPLEMENTADO")

  $('#lexical-table').append("<tbody id='table-body'></tbody>");
  $("#table-body").append("<tr id='automata-instance'></tr>")
  $('#automata-instance').append("<td class='table-terminal-head'>q0</td>");
  for(let i = 0; i < 26; i++) {

    var _stateElement = "<td class=table-terminal> q0 </td>";
    $('#automata-instance').append(_stateElement);
  }
}


// USAR PARA DEPOIS SE POSSIVEL
 /*function generateTable() {
  $('#section-main-page').append("<table id='lexical-table'></table>");
  $('#lexical-table').append("<thead id='table-head'></thead>");

  $('#table-head').append("<th class=table-head-element id=table-head-main-element>δ</th>");
  $("#table-head-main-element").css({"border-left": "solid black 1px",
  "border": "solid black 1px",
  "flex-grow": "1"})
  for(let i = 0; i < 26; i++) {

    var _headerElement = "<th class=table-head-element>" + String.fromCharCode(97 + i) + "</th>";
    var headerElement = $('#table-head').append(_headerElement);
  }

  $(".table-head-element").css({"padding": "0", 
  "border-top": "black solid 1px",
  "border-right": "black solid 1px",
  "border-bottom": "black solid 1px", 
  "width": "calc((100vw * 0.75) / 26)", 
  "height": "calc((100vw * 0.75) / 31)"})
}*/
