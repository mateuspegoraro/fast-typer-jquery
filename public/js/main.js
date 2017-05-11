var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});


function atualizaTamanhoFrase() {

    var frase = $(".frase").text();
    var numPalavras  = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {

    campo.on("input", function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);

    });
}

function inicializaCronometro() {

    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                //campo.addClass("campo-desativado");
                campo.addClass("campo-desativado");//on/off
            }
        }, 1000);
    });
}

$("#botao-reiniciar").click(reiniciaJogo);

function inicializaMarcadores(){
  var frase = $(".frase").text();
  campo.on("input", function(){
      var digitado = campo.val();
      var comparavel = frase.substr(0, digitado.length);
      if(digitado == comparavel){
        campo.addClass("campo-correto");
        campo.removeClass("campo-incorreto");
      } else {
        campo.removeClass("campo-correto");
        campo.addClass("campo-incorreto");
      }
  });
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");

    $("#tempo-digitacao").text(tempoInicial);
    campo.removeClass("campo-desativado");
    //campo.toggleClass("campo-desativado");//on/off
    inicializaCronometro();
    campo.removeClass("campo-correto");
    campo.removeClass("campo-incorreto");
}
