

var request = require("request").request;
var cheerio = require("cheerio");



 
request("https://www.hostgator.in/web-hosting/index.php",
    function (err,response,body) {
        var $ =  cheerio.load(body);
   
        let arrs ={
        
            arrval : true
        }
        let title = $("form#hostingplan_4044929_in .container_hosting-package").children().eq(4)
        let features = $("form#hostingplan_4044929_in .container_hosting-package").children().eq(7);
       

        
        title.each((index, el) => {
           
            let mainInfo = $("form#hostingplan_4044929_in .container_hosting-package > .hg-plans-name").eq(index).text()
            let offerBar = $(".container_hosting-package > .hg-plans-name + .hg-offer").eq(index).text()
            arrs.heading = arrs.heading || [];
            arrs.heading.push(mainInfo+" "+offerBar)
      
        })

        title.each((index) => {
            let domainFeature = $("form#hostingplan_4044929_in .container_hosting-package > .params-block").eq(index).text()
            domainFeature = (domainFeature.replace(/\n/g," ")).trim()
            arrs.space = arrs.space || [];
            arrs.space.push(domainFeature)
           
        })
        features.each((index,el)=> {
            let pricesPay = $("form#hostingplan_4044929_in .container_hosting-package > .hosting-package_actions").eq(index).find(".btn-group").text()
            pricesPay = ((pricesPay.replace(/\n/g," ")).substr(31,pricesPay.length)).trim()
            arrs.plan = arrs.plan || []
           arrs.plan.push(pricesPay)
            console.log(arrs)
            
        })


    })

  


