let matrix = []; // M[STATE, SYMBOL] = NEW_STATE, EXEMPLO (string "abc"): M[0]["a"] = 1, M[1]["b"] = 2, M[2]["c"] = 3 (final),
let wordList = [];
let hasFirstInput = false;
let automata_length = 0;
let finalStates = [];

const DEFAULT_STATE = 0;
let STATE = DEFAULT_STATE;







// FUNÇÃO MAIN
$( function() {

  initializeMatrix();

    $("#insert-button").click(function() {
      const word = $("#insert-input").val()
      console.log(word)
      
      if(findElementInArray(word) || word == "") return;
      
      //if(!hasFirstInput)  generateTable()

      

      hasFirstInput = true;
      
      insertToList(word)
      appendToTable(word);
    })
})






function switchState(state) { STATE = state }

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

function appendToTable(word) {


  let letter_pos = 0;
  for(let l = 0; l < word.length; l++) {
    
    letter = word[l];
    let row_instance = `automata-instance-${automata_length}` // vai ser o id da primeira coluna de cada linha da matriz ex δ `automata-instance-0 = q0`

    // Esse codigo abaixo vai renderizar o header (primera coluna) de cada linha, vai atribuir um o id `automata-instance-{NUMERO}` para cada head

    $('#table-body').append(`<tr id=${row_instance}></tr>`) // atribuir o o id da primeira coluna a cada linha novamente
    let current_state = `q${automata_length}`; // atribuir o valor q{ESTADO} à uma variavel q salva o estado
    $(`#${row_instance}`).append(`<td class='table-terminal-head'>${current_state}</td>`); // atribuir essa variavel do q{ESTADO} à coluna


    //INSERIR NA MATRIZ DO AUTOMATO FINITOz`

    appendToMatrix(letter)

    // Esse codigo abaixo, vai renderizar o resto das linhas da matriz, seguindo o alfabeto inteiro
    for(let i = 0; i < 26; i++) {

      let shown_state;
      let current_position = automata_length-1;

      //console.log(matrix[current_position][String.fromCharCode('a'.charCodeAt(0) + i)])
      
      if(matrix[current_position] === undefined || matrix[current_position][String.fromCharCode('a'.charCodeAt(0) + i)] === undefined) {
        shown_state = `-`

      }
      else {
        shown_state = `q${matrix[current_position][String.fromCharCode('a'.charCodeAt(0) + i)]}`
      }

      const _stateElement = `<td class=table-terminal id='table-terminal-${current_state}'> ${shown_state} </td>`;
      $(`#${row_instance}`).append(_stateElement);
    }

    letter_pos++;
  }

}


// FUNÇÕES DA MATRIZ DO AUTOMATO FINITO 
function initializeMatrix() {
  
}

function appendToMatrix(letter) {

  // Aqui o estado é nomeado como automata_length

  //console.log(matrix);

  matrix.push(Array(26)); // Crio uma nova linha contendo todo o alfabeto, cada letra vai ser inserida ali
  matrix[automata_length][letter] = automata_length+1;

  automata_length++;
}

function searchOnMatrix(letter) {

  //Ira usar o estado atual para pesquizar
  let prev_state = STATE;
  if(matrix[STATE][letter] !== null) switchState(matrix[STATE][letter]);

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
