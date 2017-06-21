/**
 * Cel crawler module
 */

'use strict';

var Crawler = require("simplecrawler");
var cheerio = require("cheerio");
var CelProduct = require("./cell-product.model");

var CEL_ROOT_URL = "http://www.cel.ro/procesoare";

var i = 0;

function pageFetched (queueItem, responseBuffer) {
  var $ = cheerio.load(responseBuffer);

  var codProdus = $('#cod').text();

  if (codProdus && codProdus.length) {
    var numberPattern = /\d+/g;

    var pretOferta = $('.c_online').text().match(numberPattern);

    var product = {
      codProdus: codProdus,
      pret: {
        pretActual: $('span[itemprop="price"]').text(),
        pretVechi: pretOferta && pretOferta.length > 1 ? pretOferta[1] : null
      },
      titlu: $('.productName').text(),
      date: new Date(),
      path: queueItem.path
    };

    var continuee = this.wait();

    CelProduct.create(product, function() {
      console.log("product added ", ++i, queueItem.path);
      continuee();
    });
  }
}

module.exports = function() {

  var crawler = new Crawler(CEL_ROOT_URL);

  crawler.maxDepth = 3;
  // crawler.interval = 100;

  crawler.addFetchCondition(function(queueItem, referrerQueueItem, callback) {
    callback(null,
      queueItem.path.match(/\/procesoare\/.{10,}\/$/) || //pagina de detalii procesoare
      queueItem.path.match(/\/0a-\d+$/) //paginare: oa-1, oa-2, ...
    );
  });

  crawler
    .on("fetchcomplete", pageFetched)
    .on("complete", function () {
      console.log("complete");
    });

  crawler.start();
};
