import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
// import * as ChartData from '../../../assets/Data/current_year.json' 
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("chartdiv", { static: true }) chartDom: ElementRef;
  @ViewChild("char12months", { static: true }) char12months: ElementRef;
  @ViewChild("charQuarterly", { static: true }) charQuarterly: ElementRef;
  @ViewChild("charlastYear", { static: true }) charlastYear: ElementRef;

  private chart: am4charts.XYChart;
  ChartDataSorted: Array<any> = [
	{
	"categoryData": "2021-02-02",
	"valueData": "0.0"
	},
	{
	"categoryData": "2021-02-08",
	"valueData": "3.6"
	},
	{
	"categoryData": "2021-02-16",
	"valueData": "4.33"
	},
	{
	"categoryData": "2021-02-22",
	"valueData": "1.83"
	},
	{
	"categoryData": "2021-03-01",
	"valueData": "2.38"
	},
	{
	"categoryData": "2021-03-08",
	"valueData": "-1.4"
	},
	{
	"categoryData": "2021-03-15",
	"valueData": "2.93"
	},
	{
	"categoryData": "2021-03-22",
	"valueData": "2.56"
	},
	{
	"categoryData": "2021-03-29",
	"valueData": "3.53"
	},
	{
	"categoryData": "2021-04-05",
	"valueData": "7.01"
	},
	{
	"categoryData": "2021-04-12",
	"valueData": "8.9"
	},
	{
	"categoryData": "2021-04-19",
	"valueData": "9.99"
	},
	{
	"categoryData": "2021-04-26",
	"valueData": "11.03"
	},
	{
	"categoryData": "2021-05-03",
	"valueData": "10.54"
	},
	{
	"categoryData": "2021-05-10",
	"valueData": "9.63"
	},
	{
	"categoryData": "2021-05-17",
	"valueData": "8.84"
	},
	{
	"categoryData": "2021-05-24",
	"valueData": "10.18"
	},
	{
	"categoryData": "2021-06-01",
	"valueData": "10.24"
	},
	{
	"categoryData": "2021-06-07",
	"valueData": "10.97"
	},
	{
	"categoryData": "2021-06-14",
	"valueData": "12.49"
	},
	{
	"categoryData": "2021-06-21",
	"valueData": "12.31"
	},
	{
	"categoryData": "2021-06-28",
	"valueData": "14.5"
	},
	{
	"categoryData": "2021-07-06",
	"valueData": "16.45"
	},
	{
	"categoryData": "2021-07-12",
	"valueData": "17.61"
	},
	{
	"categoryData": "2021-07-19",
	"valueData": "14.93"
	},
	{
	"categoryData": "2021-07-26",
	"valueData": "19.8"
	},
	{
	"categoryData": "2021-08-02",
	"valueData": "19.01"
	},
	{
	"categoryData": "2021-08-09",
	"valueData": "16.09"
	},
	{
	"categoryData": "2021-08-16",
	"valueData": "17.55"
	},
	{
	"categoryData": "2021-08-23",
	"valueData": "18.04"
	},
	{
	"categoryData": "2021-08-30",
	"valueData": "19.87"
	},
	{
	"categoryData": "2021-09-07",
	"valueData": "19.99"
	},
	{
	"categoryData": "2021-09-13",
	"valueData": "18.4"
	},
	{
	"categoryData": "2021-09-20",
	"valueData": "17.73"
	}
	]

  constructor(private zone: NgZone) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.createChart(this.chartDom,this.ChartDataSorted,'2 Feb 2021','20 Sep 2021','currentyear');
    });
  }


  createChart(divId:any,chartData:Array<any>,mindate:any,maxdate:any,type:any) {
    am4core.useTheme(am4themes_animated);
	const data = ['unavailable', ''];
			chartData.filter( item => {
		if ( data.includes(item.valueData) ) {
		item.valueData = null;
		}

		item.categoryData =  new Date(item.categoryData)
		});

		 console.log(chartData)

		am4core.useTheme(am4themes_animated);
		let chart = am4core.create(divId.nativeElement, am4charts.XYChart);
		chart.exportable = true;
		chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';
		chart.numberFormatter.numberFormat = `#.#'%'`;
		chart.data = chartData;
		chart.zoomOutButton.icon.disabled = true;
		chart.zoomOutButton.background.cornerRadius(0, 0, 0, 0);
		chart.zoomOutButton.background.fill = am4core.color('rgba(255,255,255,0)');
		chart.zoomOutButton.background.states.getKey('hover').properties.fill = am4core.color('rgba(229,229,229,1)');
		chart.zoomOutButton.background.states.getKey('down').properties.fill = am4core.color('rgba(229,229,229,1)');
		chart.zoomOutButton.label.text = 'Show All';
		chart.zoomOutButton.label.fontSize = 12;

		const dateAxis = chart.xAxes.push(new am4charts.DateAxis());

		dateAxis.renderer.minGridDistance = 100;
		dateAxis.renderer.labels.template.fontSize = 12;
		dateAxis.dateFormats.setKey("day", "MMM");
		dateAxis.periodChangeDateFormats.setKey('day', 'MMM');
		dateAxis.dateFormats.setKey("month", "MMM");
		dateAxis.periodChangeDateFormats.setKey('month', 'MMM');
		dateAxis.dateFormats.setKey("year", "yyyy");
		dateAxis.periodChangeDateFormats.setKey('year', 'yyyy');
		dateAxis.renderer.line.strokeOpacity = 1;
		dateAxis.renderer.line.strokeWidth = 1;
		dateAxis.renderer.line.stroke = am4core.color('#000000');
		dateAxis.tooltip.background.fillOpacity = .8;
		dateAxis.tooltip.label.fontSize = 12;
		dateAxis.tooltip.background.pointerLength = 0;
		dateAxis.tooltipDateFormat = 'MMM dd yyyy';
		dateAxis.min = (new Date(mindate)).getTime();
		dateAxis.max = (new Date(maxdate)).getTime();		
		dateAxis.baseInterval = {
			"timeUnit": "day",
			"count": 1
		};
		dateAxis.dataFields.date = "categoryData";
		dateAxis.autoDispose = false;
		dateAxis.startLocation = -1.5;
		dateAxis.endLocation = 2.4;
		dateAxis.skipEmptyPeriods = true;
		dateAxis.gridIntervals.setAll([
			{ timeUnit: "hour", count: 12 },
			{ timeUnit: "day", count: 1 },
			{ timeUnit: "day", count: 2 },
			{ timeUnit: "day", count: 3 },
			{ timeUnit: "day", count: 4 },
			{ timeUnit: "day", count: 5 },
			{ timeUnit: "week", count: 1 },
			
		  ]);

		const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.cursorTooltipEnabled = false;
		valueAxis.renderer.labels.template.fontSize = 12;
		valueAxis.renderer.line.strokeOpacity = 1;
		valueAxis.renderer.line.strokeWidth = 1;
		valueAxis.renderer.line.stroke = am4core.color('#000000');
		valueAxis.renderer.ticks.template.disabled = false;
		valueAxis.renderer.ticks.template.strokeOpacity = 1;
		valueAxis.renderer.ticks.template.stroke = am4core.color('#000000');
		valueAxis.renderer.ticks.template.strokeWidth = 1;
		valueAxis.renderer.ticks.template.length = 5;
		valueAxis.extraMax = 0.1;


		// set negative xaxis with color
		const range = valueAxis.axisRanges.create();
		range.value = 0;
		range.endValue = -9999999;
		range.axisFill.fill = am4core.color('#cccccc');
		range.axisFill.fillOpacity = 0.3;
		range.grid.strokeOpacity = 0;

		// create series
		const series = chart.series.push(new am4charts.LineSeries());
		series.dataFields.valueY = 'valueData';
		series.dataFields.dateX = 'categoryData';
		series.tooltipText = '{valueData}%';
		series.tooltip.background.fill = am4core.color('#fff');
		series.tooltip.background.fillOpacity = .7;
		series.tooltip.label.fill = am4core.color('#000');
		series.tooltip.getStrokeFromObject = true;
		series.tooltip.background.strokeWidth = 3;
		series.tooltip.pointerOrientation = 'vertical';
		series.tooltip.label.fontSize = 12;
		series.tooltip.label.minWidth = 18;
		series.tooltip.label.minHeight = 18;
		series.tooltip.label.textAlign = 'middle';
		series.tooltip.getFillFromObject = false;
		series.stroke = am4core.color('#3f6840');
		series.strokeWidth = 1;
		series.xAxis = dateAxis;
		series.background.fill = am4core.color('#3f6840');
		let bullet = series.bullets.push(new am4charts.Bullet());
		var circleBullet = bullet.createChild(am4core.Circle);
		circleBullet.horizontalCenter = "middle";
		circleBullet.verticalCenter = "middle";
		circleBullet.fill = am4core.color('#3f6840');
		circleBullet.propertyFields.stroke = 'color';
		circleBullet.radius = 2;
		circleBullet.horizontalCenter = "middle";
		circleBullet.verticalCenter = "middle";
		const bulletHover = bullet.states.create('hover');
		bulletHover.properties.scale = 1.5;
		
		chart.cursor = new am4charts.XYCursor();
		// chart.cursor.xAxis = dateAxis;
		chart.cursor.tooltip.disabled = true;
		chart.cursor.lineX.stroke = am4core.color('#000000');
		chart.cursor.lineX.strokeWidth = 1;
		chart.cursor.lineX.strokeDasharray = '';
		chart.cursor.lineY.disabled = true;
		chart.events.on('beforedatavalidated', function(ev) {
			chart.data.sort(function(a, b) {
				let dateA = new Date(a.categoryData).getTime();
				let dateB = new Date(b.categoryData).getTime();
				return dateA > dateB ? 1 : -1;
			});
		});
		chart.seriesContainer.events.on("hit", function(ev) {
			console.log(ev.target.baseSprite);
		  });
		series.dataItems.template.locations.dateX = 1;
		this.chart = chart;
	
  }
  
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
