var ec = new tg.ElevationClient({
    urls: [
        'https://cloud1.thinkgeo.com',
        'https://cloud2.thinkgeo.com',
        'https://cloud3.thinkgeo.com',
        'https://cloud4.thinkgeo.com',
        'https://cloud5.thinkgeo.com',
        'https://cloud6.thinkgeo.com'
    ],
    apiKey: "Yy6h5V0QY4ua3VjqdkJl7KTXpxbKgGlFJWjMTGLc_8s~"
});


document.getElementById('search').addEventListener('click', function () {
    var coord1 = document.getElementById('coord1').value;
    var coord2 = document.getElementById('coord2').value;
    var srid1 = document.getElementById('srid1').value;
    var srid2 = document.getElementById('srid2').value;
    ec.getElevationOfPoints({
        body: [{
                "coord": coord1,
                "srid": srid1,
            },
            {
                "coord": coord2,
                "srid": srid2,
            }
        ]
    }, function (status, response) {
        document.getElementById('response').innerHTML = "<br/>" + JSON.stringify(response, null, 4);
    })
});