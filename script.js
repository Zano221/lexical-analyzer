
const DEFAULT_STATE = 0;
const ALPHABET_SIZE = 26;

let matrix = []; // M[STATE, SYMBOL] = NEW_STATE, EXEMPLO (string "abc"): M[0]["a"] = 1, M[1]["b"] = 2, M[2]["c"] = 3 (final),
let wordList = [];
let automata_length = 0;
let table_length = 0;
let finalStates = [];

let STATE = DEFAULT_STATE;







// FUNÇÃO MAIN
$( function() {

  initializeMatrix();

  $("#insert-input").val("");
  $("#search-input").val("");

    $("#insert-button").click(function() {
      const word = $("#insert-input").val().toLowerCase();
      console.log(word)
      
      if(findElementInArray(word) || word == "") return;

      if(!/^[a-z]+$/.test(word)) return;

      // INSERIR NA LISTA DE PALAVRAS EXISTENTES
      insertToList(word);

      //INSERIR NA MATRIZ DO AUTOMATO FINITO
      appendToMatrix(word);

      // INSERIR NA TABELA VISTA VISUALMENTE NA APLICAÇÃO
      updateTable(word);

      $("#insert-input").val("");
    })

    $("#search-input").keyup(function() {
      const word = $("#search-input").val().toLowerCase();
      let selected_state = STATE = 0; // 0

      $("#lexical-table tbody tr td").removeClass("correct-cell"); // remover todas as instancias de letras corretas no automato
      $("#lexical-table tbody tr td").removeClass("wrong-cell"); // remover todas as instancias de letras incorretas no automato
      $("#lexical-table tbody tr td").removeClass("selection-cell"); // remover cor da coluna selecionada em volta da palavra correta no automato

      
      for(let i = 0; i < word.length; i++) { // iterar sobre a palavra, sempre pegando a ultima palavra e vendo se o caminho dela é correto
        $("#lexical-table tbody tr td").removeClass("correct-cell"); // remover todas as instancias de letras corretas no automato
        $("#lexical-table tbody tr td").removeClass("wrong-cell"); // remover todas as instancias de letras incorretas no automato
        $("#lexical-table tbody tr td").removeClass("selection-cell"); // remover a cor da coluna selecionada da palavra incorreta no automato

        if(matrix[selected_state][word[i]] !== undefined) {
          console.log("POG", `${matrix[selected_state][word[i]]}`);
          console.log($(`#table-state-q${matrix[selected_state][word[i]]}`));
          let table = $(`#table-state-q${matrix[selected_state][word[i]]}`)

          table.addClass("correct-cell");

          for(let j = 0; j < ALPHABET_SIZE; j++) {
            const letter = String.fromCharCode('a'.charCodeAt(0) + j);
            $(`.cell-q${selected_state}-${letter}`).addClass("selection-cell"); 
          }

          let state_ammount = matrix.length;
          for(let j = 0; j < state_ammount; j++) {
            
            console.log(`.cell-q${j}-${word[i]}`);
            $(`.cell-q${j}-${word[i]}`).addClass("selection-cell"); 
          }

          selected_state = matrix[selected_state][word[i]];

        }
        else {
          console.log("UNPOG");
          console.log(`cell-q${selected_state}-${word[i]}`);
          $(`.cell-q${selected_state}-${word[i]}`).addClass("wrong-cell");
          break;
        }
      }

      $("#insert-input").val("");
    });
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
    for(let i = 0; i < ALPHABET_SIZE; i++) {

      let shown_state;
      let letter = String.fromCharCode('a'.charCodeAt(0) + i);
      let _stateElement;

      if(matrix[current_position] === undefined || matrix[current_position][letter] === undefined) {
        shown_state = `-`
        _stateElement = `<td class='table-cell cell-q${current_position}-${letter}'> ${shown_state} </td>`;
      }
      else {
        shown_state = `q${matrix[current_position][letter]}`;
        _stateElement = `<td class='table-cell cell-q${current_position}-${letter}' id='table-state-${shown_state}'> ${shown_state} </td>`;
      }

      $(`#${row_instance}`).append(_stateElement);
    }
  }
}


// FUNÇÕES DA MATRIZ DO AUTOMATO FINITO 
function initializeMatrix() {
  
}

function appendToMatrix(word) {

  // Aqui o estado é nomeado como automata_length

  let same_word = true;
  let length = word.length
  let current_position = DEFAULT_STATE;

  for(let i = 0; i < length; i++) {
    automata_length = matrix.length
   
    let letter = word[i];

    let test_next_state;
    if(matrix[current_position] === undefined) { // Se não existe uma linha nessa posição, então cria uma nova, e define que a palavra obviamente não é a mesma
      same_word = false;
      matrix.push(Array(ALPHABET_SIZE)); // Crio uma nova linha contendo todo o alfabeto, cada letra vai ser inserida ali
      current_position = matrix.length-1;
      matrix[current_position][letter] = current_position+1;
    } else if(matrix[current_position][letter] === undefined) { // Se existe uma linha nessa posição, checar se existe uma letra, se não, então defini como uma palavra diferente
      same_word = false;
      matrix[current_position][letter] = matrix.length;
    }

    automata_length = matrix.length
    if(!same_word)  current_position = automata_length;
    else current_position = matrix[current_position][letter];

    console.log("ESTADO: ", current_position, "LETRA: ", letter, "PROXIMO ESTADO:", test_next_state);
    
  }

  const final_state = matrix.length-1;
  matrix.push(Array(26)); 
  finalStates.push(final_state+1)
  automata_length++;
  //console.log(finalStates)
  console.log(automata_length);
  console.log(finalStates);

}

function searchOnTable() {

}

function searchOnMatrix(letter) {

  //Ira usar o estado atual para pesquizar

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
