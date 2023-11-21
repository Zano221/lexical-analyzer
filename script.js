let matrix = []; // M[STATE, SYMBOL] = NEW_STATE, EXEMPLO (string "abc"): M[0]["a"] = 1, M[1]["b"] = 2, M[2]["c"] = 3 (final),
let wordList = [];
let automata_length = 0;
let table_length = 0;
let finalStates = [];

const DEFAULT_STATE = 0;
let STATE = DEFAULT_STATE;







// FUNÇÃO MAIN
$( function() {

  initializeMatrix();

    $("#insert-button").click(function() {
      const word = $("#insert-input").val().toLowerCase();
      console.log(word)
      
      if(findElementInArray(word) || word == "") return;
      

      // INSERIR NA LISTA DE PALAVRAS EXISTENTES
      insertToList(word);

      //INSERIR NA MATRIZ DO AUTOMATO FINITO
      appendToMatrix(word);

      // INSERIR NA TABELA VISTA VISUALMENTE NA APLICAÇÃO
      updateTable(word);
    })

    /*$("#botao-morrer").click(function() {
      $("#table-body").empty();
    })*/
})


function switchState(state) { STATE = state }

function insertToList(word) {
    
  wordList.push(word)
  console.log(wordList)

  let wordList_length = wordList.length-1;

  let _container = $("#word-list").append(`<div class='word-list-container' id='word-list-container-${wordList_length}'></div>`)
  let _word = $(`#word-list-container-${wordList_length}`).append(`<p class='word-in-list' id='word-${wordList_length}'>${wordList[wordList_length]}</p>`)

}

function findElementInArray(word) { //lol too lazy
  let res = false;
  wordList.forEach(element => {
    if(element == word) res = true;
  });
  return res;
}

function updateTable() {

  $("#table-body").empty(); // ANTES DE MAIS NADA: limpar a tabela anterior (se existe)

  console.log("MATRIX LENGTH =", matrix.length);

  for(let matrix_row = 0; matrix_row < matrix.length; matrix_row++) {

    let last_state_pos = 0;
    let current_position = matrix_row;
    let row_instance = `matrix-instance-${matrix_row}` // vai ser o id da primeira coluna de cada linha da matriz ex δ `matrix-instance-0 = q0`

    //////////////////////////////////////////////////////////////
    // Esse codigo abaixo vai renderizar o header (primera coluna) de cada linha, vai atribuir um o id `matrix-instance-{NUMERO}` para cada head
    /////////////////////////////////////////////////////////////
    $('#table-body').append(`<tr id=${row_instance}></tr>`) // atribuir o o id da primeira coluna a cada linha novamente
    let current_state = `q${matrix_row}`;
    
    finalStates.map(val => {
      if(matrix_row == val) {
        current_state = `*` + current_state
      }
    })
    
    $(`#${row_instance}`).append(`<td class='table-terminal-head'>${current_state}</td>`); // atribuir essa variavel do q{ESTADO} à coluna



    // Esse codigo abaixo, vai renderizar o resto das linhas da matriz, seguindo o alfabeto inteiro
    for(let i = 0; i < 26; i++) {

      let shown_state;
      let letter = String.fromCharCode('a'.charCodeAt(0) + i);

      if(matrix[current_position] === undefined || matrix[current_position][letter] === undefined) {
        shown_state = `-`
      }
      else {
        shown_state = `q${matrix[current_position][letter]}`;
      }

      let _stateElement = `<td class=table-terminal id='table-terminal-${current_state}'> ${shown_state} </td>`;
      $(`#${row_instance}`).append(_stateElement);
    }

    
  
  
    table_length++;
  }


  // ADICIONAR A LINHA DE TERMINO

  /*let final_state = `q${matrix[automata_length-1]["FINAL"]}`
  row_instance++;
  table_length++;
  $('#table-body').append(`<tr id=${row_instance}></tr>`) // atribuir o o id da primeira coluna a cada linha novamente
  let current_state = `q${table_length}`; // atribuir o valor q{ESTADO} à uma variavel q salva o estado
  $(`#${row_instance}`).append(`<td class='table-terminal-head'>${current_state}</td>`); // atribuir essa variavel do q{ESTADO} à coluna

  
  const _finalElement = `<td class=table-terminal-final id='table-terminal-*${final_state}'> ${final_state} </td>`;
  $(`#${row_instance}`).append(_finalElement);*/


}


// FUNÇÕES DA MATRIZ DO AUTOMATO FINITO 
function initializeMatrix() {
  
}

function appendToMatrix(word) {

  // Aqui o estado é nomeado como automata_length

  let same_word = true;
  let length = word.length
  
  for(let i = 0; i < length; i++) {
    automata_length = matrix.length
   
    let letter = word[i];
    let current_position;

    if(!same_word) current_position = automata_length;
    else current_position = i;

    if(matrix[current_position] === undefined) { // Se não existe uma linha nessa posição, então cria uma nova, e define que a palavra obviamente não é a mesma
      same_word = false;
      matrix.push(Array(26)); // Crio uma nova linha contendo todo o alfabeto, cada letra vai ser inserida ali
      current_position = matrix.length-1;
      matrix[current_position][letter] = current_position+1;
    } else {
      if(matrix[current_position][letter] === undefined) { // Se existe uma linha nessa posição, checar se existe uma letra, se não, então defini como uma palavra diferente
        same_word = false;
        matrix[current_position][letter] = matrix.length;
      }
    }
    automata_length = matrix.length

    console.log(same_word);
    console.log(current_position);
    
  }

  const final_state = matrix.length-1;
  matrix.push(Array(26)); 
  matrix[final_state]["FINAL"] = 0;
  finalStates.push(final_state+1)
  automata_length++;
  //console.log(finalStates)
  console.log(automata_length);
  console.log(finalStates);

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
