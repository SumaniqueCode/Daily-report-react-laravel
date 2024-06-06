
import ReactApexChart from 'react-apexcharts';

const Report = () => {
    const chartData = {
        series: [
            {
                name: 'Tasks Completed',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
        ],
        options: {
            // chart: {
            //     type: 'line',
            // },
            // xaxis: {
            //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            // },
        },
    };

    const projectProgressData = {
        series: [
            {
                name: 'Completed',
                data: [25, 40, 60, 75, 90],
            },
            {
                name: 'Remaining',
                data: [75, 60, 40, 25, 10],
            },
        ],
        options: {
            // chart: {
            //     type: 'bar',
            // },
            xaxis: {
                categories: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5'],
            },
            // legend: {
            //     position: 'top',
            // },
        },
    };

    const teamPerformanceData = {
        series: [
            {
                name: 'In Progress',
                data: [30, 25, 45],
            },
            {
                name: 'Doing',
                data: [15, 20, 35],
            },
            {
                name: 'Pending',
                data: [10, 15, 25],
            },
        ],
        options: {
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            xaxis: {
                categories: ['Sujan', 'Manish', 'Sagar'],
            },
            
        },
    };
    return (
        <>
            <div className="container-fluid py-3 bg-body-secondary d-flex align-items-center">
                <div className="container-fluid">
                    <nav className="breadcrumb">
                        <a className="breadcrumb-item" href="#">Home</a>
                        <span className="breadcrumb-item active" aria-current="page">Report</span>
                    </nav>
                </div>
            </div>

            <div className="container-fluid my-3 homepage">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="title">Task Overview</div>

                        <div className="">
                            <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={350} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="title">Project Progress</div>
                        <div className="">
                            <ReactApexChart options={projectProgressData.options} series={projectProgressData.series} type="bar" height={350} />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="title">Team Performance</div>
                        <div className="">
                            <ReactApexChart options={teamPerformanceData.options} series={teamPerformanceData.series} type="bar" height={550} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report