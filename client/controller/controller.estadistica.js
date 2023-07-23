

var datosEntrada1 = [];
var datosEntrada2 = [];

function getUserCharts(){
    console.log("charts")

    ref_user.onSnapshot((querySnapshot) => {
        let dataChart1 = [];
        let dataChart2 = [];
        querySnapshot.forEach((doc) => {
            const campo1Valor = doc.data().user_point;
            const campo2Valor = doc.data().user_candidato;

            const campo1Valor2 = doc.data().user_point;
            const campo2Valor1 = doc.data().user_candidato;

            dataChart1.push([campo1Valor, campo2Valor]);
            dataChart2.push([campo2Valor1, campo1Valor2]);
        });
        datosEntrada1 = dataChart1
        datosEntrada2 = dataChart2
       
       initCharts()
       
            
    })
}

const getOptionChart3 = () => {
    const datosProcesados = [['point', 'LISTA'], ...datosEntrada1];
    console.log("asdasd: "+datosProcesados)
    return {
        dataset: {
            source: datosProcesados
        },
        grid: { containLabel: true },
        xAxis: { name: 'amount' },
        yAxis: { type: 'category' },
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#FD665F', '#FFCE34', '#65B581']
            }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    x: 'point',
                    y: 'LISTA'
                }
            }
        ]
    };
};

const getOptionChart4 = () => {

    const datosProcesados = [['list', '2023'], ...datosEntrada2];
    return {
        legend: {},
        tooltip: {},
        dataset: {
            source: datosProcesados
        },
        series: [
            {
                type: 'pie',
                radius: '60%',
                center: ['50%', '50%'],
                encode: {
                    itemName: 'list',
                    value: '2023'
                }
            }
        ]
    }
};

const initCharts = () => {
    const chart3 = echarts.init(document.getElementById("chart3"));
const chart4 = echarts.init(document.getElementById("chart4"));

        chart3.setOption(getOptionChart3());
        chart4.setOption(getOptionChart4());
};

