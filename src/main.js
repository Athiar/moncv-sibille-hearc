import 'bootstrap.native';
import 'bootstrap-css-only/css/bootstrap.min.css';
import './main.css';
import 'jquery-smooth-scroll';
import Chart from 'chart.js';

$(document).ready(() => {
    $('a').smoothScroll();

    // $('.progress-bar').each((i, progressbar) => {
        // $('body').prepend('<h1> valeur : ' + $(progressbar).attr('aria-valuenow') + '</h1>');
    // });

    Chart.pluginService.register({
        beforeDraw: function (chart) {
            var width = chart.chart.width;
            var height = chart.chart.height;
            var ctx = chart.chart.ctx;
            ctx.restore();
            var fontSize = (height / 90).toFixed(2);
            ctx.font = fontSize + 'em sans-serif';
            ctx.textBaseline = 'middle';
            var text = chart.chart.data.datasets[0].data[0] + '%';
            var textX = Math.round((width - ctx.measureText(text).width) / 2) + 5;
            var textY = (height / 2) + 17;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    });

    $('.progress-bar').each((i, progressbar) => {
        const ctx = $(progressbar).parent()[0].getContext('2d');
        window.myDoughnut = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        $(progressbar).attr('aria-valuenow'), (100 - $(progressbar).attr('aria-valuenow'))
                    ],
                    backgroundColor: ['#428bca', 'rgba(0, 0, 0, 0.0)'],
                    hoverBackgroundColor: ['#63a8e2', 'rgba(0, 0, 0, 0.0)'],
                    borderColor: ['#052d4f', 'rgba(0, 0, 0, 0.0)']
                }]
            },
            options: {
                cutoutPercentage: 75,
                responsive: true,
                tooltips: {
                    enabled: false
                },
                title: {
                    display: true,
                    text: $(progressbar).text(),
                    fontSize: '20'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                layout: {
                    padding: {
                        bottom: 20
                    }
                }
            }
        });
    });
});
