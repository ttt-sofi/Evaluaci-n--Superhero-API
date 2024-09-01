
$(function () {
    $('#resultado').hide();

    $('#buscar').click(function () {
        let heroNumber = $('#busqueda').val();

        if (!/^\d+$/.test(heroNumber)) {
            alert("Ingresa un número de superhéroe del 1 al 731");
            return;
        }

        const ACCESS_TOKEN = '74026f7c483543e601bdf4ad9825c36b';
        const url = `https://www.superheroapi.com/api.php/${ACCESS_TOKEN}/${heroNumber}`;

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.response === 'success') {
                    mostrarResultado(data);
                    $('html, body').animate({
                        scrollTop: $("#resultado").offset().top
                    }, 500);
                } else {
                    $('#resultado').text('No se encontró ningún superhéroe con ese ID.').show();
                }
            },
            error: function () {
                $('#resultado').text('Error en la solicitud.').show();
            }
        });
    });

    $('#volver-arriba').click(function () {
        $('html, body').animate({
            scrollTop: $("#buscador").offset().top
        }, 500);
    });
});

function mostrarResultado(heroe) {
    $('#nombre').text(heroe.name);
    $('#imagen').attr('src', heroe.image.url).attr('alt', heroe.name);
    $('#nombre-completo').text(heroe.biography['full-name']);
    $('#alter-ego').text(heroe.biography['alter-egos']);
    $('#alias').text(heroe.biography['aliases'].join(', '));
    $('#lugar-de-nacimiento').text(heroe.biography['place-of-birth']);
    $('#fecha-de-nacimiento').text(heroe.biography['first-appearance']);
    $('#base').text(heroe.work.base);
    $('#occupation').text(heroe.work.occupation);
    $('#group-affiliation').text(heroe.connections['group-affiliation']);
    $('#relatives').text(heroe.connections['relatives']);

    // Renderizar el gráfico
    // Si hay algun valor null, que muestre un mensaje 

    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: `${heroe.name} Power Stats`
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legend: {
                Width: 200,
                itemWidth: 120
            },
            legendText: "{indexLabel}",
            dataPoints: [
                { y: heroe.powerstats.intelligence, indexLabel: "Inteligencia" },
                { y: heroe.powerstats.strength, indexLabel: "Fuerza" },
                { y: heroe.powerstats.speed, indexLabel: "Velocidad" },
                { y: heroe.powerstats.durability, indexLabel: "Durabilidad" },
                { y: heroe.powerstats.power, indexLabel: "Poder" },
                { y: heroe.powerstats.combat, indexLabel: "Combate" }
            ]
        }]
    });
    chart.render();

    $('#resultado').show();
}