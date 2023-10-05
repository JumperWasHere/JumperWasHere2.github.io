import { Component,ViewChild  } from '@angular/core';
import {DashboardService} from './../shared/services/dashboard.service'
import {AuthenticationService} from './../shared/services/authentication.service'
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexOptions 
} from "ng-apexcharts";
import { array } from '@amcharts/amcharts5';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public optionsDonut: Partial<ApexOptions>;
  constructor(private dashboardService:DashboardService,private authenticationService:AuthenticationService){
   
  }
  chartBar:any[]
  chartDonut:any[]
  tableUsers:any[]
//  //yearlyInterest Declaration
//  interestSeries: ApexAxisChartSeries;
//  interestChart: ApexChart;
//  interestDataLabels: ApexDataLabels;
//  interestLabel: string[];
//   interestXaxis: ApexXAxis;
//   interestYaxis: ApexYAxis;
//   interestGrid: ApexGrid;
//   interestStroke: ApexStroke;
//   interestTitle: ApexTitleSubtitle;
//   interestTooltip: ApexTooltip;
//   interestColors: string[] = ['#FC390F'];

  public ngOnInit() {
    // this.chartYearlyInterest(res
    this.dashboardService.getcart().subscribe(async (res)=>{
      if(res.success == true){
        this.chartBar = res.chartBar;
        this.chartDonut = res.chartDonut;
        this.tableUsers = res.tableUsers;
        this.prepareChatBar(res.chartBar);
        this.prepareChatDonut(res.chartDonut);
      }
      console.log('res',this.chartBar);

    })
  }
  ngAfterViewInit(){
   

  }
  prepareChatBar(chartBar){
    // console.log('chart',this.chartBar);
    let value = chartBar.map(this.myFunction);
    let name = chartBar.map(item=> item.name);
    // console.log('value',value,'   ', name);
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: value
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Card Title"
      },
      xaxis: {
        categories: name
      }
    };
  }
  prepareChatDonut(array:any[]){
    let value = array.map(this.myFunction);
    let name = array.map(item=> item.name);
    console.log('value',value);
    this.optionsDonut = {
      series: value,
      labels: name,
      chart: {
        height: 350,
        type: 'donut'
      },
      title: {
        text: "Card Title"
      },
      xaxis: {
        categories: name
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: undefined,
                offsetY: -10,
                formatter: function (val) {
                  return val
                }
              },
              value: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                color: undefined,
                offsetY: 16,
                formatter: function (val) {
                  return val
                }
              }
            }
          }
        }
      }

    }

  }
  prepareTablet(){}
  myFunction(val){
return val.value
  }
  logout(){
    this.authenticationService.logout();

  }
  
}
