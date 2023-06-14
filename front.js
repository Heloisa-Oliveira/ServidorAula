conta = 20 + 10;
console.log("Astrobaldo passou por aqui!");
console.log(conta);
var n = 10;
for(let i=0; i<n; i+=2)
{
    console.log("Contando: " + i);
};

$(document).ready(function()
{
    $("#texto1").html("Algo mais "+ conta);
    $.get("http://127.0.0.1:3000/tudo", function(resultado)
    {
        console.log(resultado);
        $("texto2").html(JSON.stringify(resultado))
    });
});

$("#texto1").html(conta);