var expect = require('expect.js');
var ChartDao = require(process.cwd() + '/server/daos/chart.js');

describe('ChartDao', function() {
    it('is an object used to retrieve charts information from remote endpoint', function() {
        var chartDao = new ChartDao();

        expect(chartDao).to.be.an('object');
        expect(chartDao).to.have.property('getAllCompleteCharts');
        expect(chartDao).to.have.property('getAllCompleteChartsByChartSlug');
        expect(chartDao).to.have.property('getCompleteChartBySlug');
        expect(chartDao).to.have.property('insertCompleteChartVote');

        describe('#getAllCompleteCharts', function() {
            this.timeout(5000);

            it('should return an array with all complete charts', function(done) {
                var criteria = {
                    page: 1
                };

                chartDao.getAllCompleteCharts(criteria, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.complete_charts).to.be.an('array');
                    expect(data.count).to.be.equal(data.complete_charts.length);
                    done();
                });
            });
        });

        describe('#getAllCompleteChartsByChartSlug', function() {
            this.timeout(5000);

            it('should return an array with all complete charts of a specific type (for example electronic s charts)',
                function(done) {
                    var slug = 'electronic-chart';

                    chartDao.getAllCompleteChartsByChartSlug(slug, function(err, data) {
                        if (err) throw err;

                        var data = JSON.parse(data);

                        expect(data).to.be.an('object');
                        expect(data.status).to.be('ok');
                        expect(data.complete_charts).to.be.an('array');
                        expect(data.count).to.be.equal(data.complete_charts.length);
                        done();
                    });
                });
        });

        describe('#getCompleteChartBySlug', function() {
            this.timeout(5000);

            it('should return a single complete chart', function(done) {
                var slug = 'electronic-chart-2014-10-27';

                chartDao.getCompleteChartBySlug(slug, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    expect(data.complete_chart).to.be.an('object');
                    expect(data.complete_chart.chart_archive_slug).to.be.equal(slug);
                    done();
                });
            });
        });

        describe('#insertCompleteChartVote', function() {
            this.timeout(5000);

            it('should insert a vote for single chart', function(done) {
                var vote = {
                    chart_archive_slug: "electronic-chart-2014-10-27",
                    id_song: 9041,
                    username: "gabri.bradipo",
                    uuid_user: "c2cfc9e0-b749-11e3-8ade-ff64b8dd6b9c",
                };

                chartDao.insertCompleteChartVote(vote, function(err, data) {
                    if (err) throw err;

                    var data = JSON.parse(data);

                    expect(data).to.be.an('object');
                    expect(data.status).to.be('ok');
                    done();
                });
            });
        });
    });
});