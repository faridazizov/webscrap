const express=require('express');
const router=express.Router();
const cheerio=require('cheerio');
const request=require('request');

// boss bottttttttttttttttttttttttttttttttttttttttttttttttttt
router.get('/boss',(req,res,next)=>{
    request(req.body.surl,(error,response,html)=>{
        let job={};
        if(!error && response.statusCode==200){
            const $=cheerio.load(html);
            const div=$('div.main');
            job.title=$(div).find('.post-title').text().toLowerCase();
            job.company=$(div).find('.post-company').text();
            job.phone=$(div).find('a.phone').text();
            //job.email=$(div).find('.email.params-i-val').text();
            job.person=$(div).find('.contact.params-i-val').text();
            job.experience=$(div).find('.experience.params-i-val').text();
            job.education=$(div).find('.education.params-i-val').text();
            job.city=$(div).find('.region.params-i-val').text();
            // job.minage=$(div).find('.age.params-i-val').text().slice(0,2);
            // job.maxage=$(div).find('.age.params-i-val').text().slice(5,7);
            job.age=$(div).find('.age.params-i-val').text();
            // const index=$(div).find('span.post-salary.salary').text().indexOf('-');
            // job.minSalary=$(div).find('span.post-salary.salary').text().slice(0,index-1);
            // const index2=$(div).find('span.post-salary.salary').text().indexOf('AZN');
            // job.maxSalary=$(div).find('span.post-salary.salary').text().slice(index+2,index2-1);
            job.salary=$(div).find('span.post-salary.salary').text();
            job.category=$(div).find('div.breadcrumbs').children().first().text();
            job.subcategory=$(div).find('div.breadcrumbs').children().last().text();
            job.about=$(div).find('.job_description.params-i-val').text();
            job.requirments=$(div).find('.requirements.params-i-val').text();
                      
            res.json(job);             
        }
        else{
            res.json({message:'Xeta bas verdi!!!,internet baglantisini ve linki kontrol edin',
                statusCode:response.statusCode
            });
        }
            
    });

});
//position bottttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
router.get('/position',(req,res,next)=>{
    request(req.body.surl,(error,response,html)=>{
        if(!error && response.statusCode==200){
            let job={};
            const $=cheerio.load(html);
            job.title=$('.vacancy-title').text();
            job.company=$('.vacancy-company-header-title').html();
            job.city=$('.vacancy-city').text().slice(7);
            job.published=$('.vacancy-date').text().slice(8,18);
            job.deadline=$('.vacancy-date').text().slice(21);
            job.content=$('.vacancy-text').html();
            
            res.json(job);
        }
        else{
            res.json({message:'Xeta bas verdi!!!,internet baglantisini ve linki kontrol edin',
                statusCode:response.statusCode
            });
        }
    });
});
//gojob bottttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
router.get('/gojob',(req,res,next)=>{
    request(req.body.surl,(error,response,html)=>{
        if(!error && response.statusCode==200){
            let job={};
            const $=cheerio.load(html);
            job.title=$('div.name.pl-1').text();
            job.company=$('div','div.options.pl-1').first().text();
            job.city=$('div','div.options.pl-1').eq(1).text();
            job.published=$('div','div.options.pl-1').eq(2).text();
            job.deadline=$('div.app-view-aside').children().eq(0).children().eq(1).children().eq(3).text().slice(16);
            job.category=$('div.app-view-aside').children().eq(0).children().eq(1).children().eq(1).text().slice(13);
            job.time=$('div.app-view-aside').children().eq(0).children().eq(1).children().eq(2).text().slice(17);
            job.content=$('div.text').html();
            
            res.json(job);
        }
        else{
            res.json({message:'Xeta bas verdi!!!,internet baglantisini ve linki kontrol edin',
                statusCode:response.statusCode
            });
        }
    });
});
//ejob bottttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
router.get('/ejob',(req,res,next)=>{
    request(req.body.surl,(error,response,html)=>{
        if(!error && response.statusCode==200){
            let job={};
            const $=cheerio.load(html);
            job.title=$('h1.position').text();
            job.company=$('h2.name').text();
            job.city=$('div.page').find('table').first().children().children().eq(0).children().last().text();
            job.person=$('div.page').find('table').first().children().children().eq(1).children().last().text();
            job.phone1=$('div.page').find('table').first().children().children().eq(3).children().last().text();
            job.phone2=$('div.page').find('table').first().children().children().eq(4).children().last().text();
            //job.email=$('div.page').find('table').first().children().children().eq(5).children().last().text();
            //job.email=$('#m505595510').text();
            //job.website=$('div.page').find('table').first().children().children().eq(6).children().last().text();
            job.published=$('div.date').text().slice(15,25);
            job.salary=$('h3.salary').text().slice(13);
            const index=$('h2.title').text().indexOf('►');
            job.category=$('h2.title').text().slice(0,index-1);
            job.subcategory=$('h2.title').text().slice(index+2);
            job.about=$('table.description').children().children().children().first().html();
            job.requirments=$('table.description').children().children().children().last().html();     

            res.json(job);
        }
        else{
            res.json({message:'Xeta bas verdi!!!,internet baglantisini ve linki kontrol edin',
                statusCode:response.statusCode
            });
        }
    });
});

//jobin botttt
router.get('/jobin',(req,res,next)=>{
    request(req.body.surl,(error,response,html)=>{
        if(!error && response.statusCode==200){
            let job={};
            const $=cheerio.load(html);
            let primaryTable=$('div.middle').find('table').children().children().children().children()
            .first().children().children();
           
            job.title=$(primaryTable).eq(7).children().last().text().trim();
            job.company=$(primaryTable).eq(1).children().last().text();          
            job.city=$(primaryTable).eq(3).children().last().text().trim();
            job.mobil=$(primaryTable).eq(4).children().last().text().trim();
            job.email=$(primaryTable).eq(5).children().last().text().trim();
            job.category=$(primaryTable).eq(6).children().last().text().trim();
            job.salary=$(primaryTable).eq(8).children().last().text().trim();
            const index=$(primaryTable).eq(2).children().last().text().indexOf('/');
            job.published=$(primaryTable).eq(2).children().last().text().slice(0,10);
            job.deadline=$(primaryTable).eq(2).children().last().text().slice(index+1);
            job.content=$('div.middle').find('table').children().children()
            .children().children().eq(2).text();
           
            res.json(job);
        }
        else{
            res.json({message:'Xeta bas verdi!!!,internet baglantisini ve linki kontrol edin',
                statusCode:response.statusCode
            });
        }
    });
});

//kadr  botttttttttttttttttttttttttttttttttttttt
router.get('/kadr',(req,res,next)=>{
    request(req.body.surl,(error,response,html)=>{
        let job={};
        if(!error && response.statusCode==200){
            const $=cheerio.load(html);
            const firstDiv=$('#container-pdf');
            const secondDiv=$(firstDiv).find('.more_top_left');
            const threethDiv=$(firstDiv).find('.more_sred_ob_div');
            job.title=$(secondDiv).find('h2.pages_more_zaqlaviya').text().toLowerCase();
            job.company=$(secondDiv).find('.pages_more_company').text();
            job.salary=$(secondDiv).find('.pages_more_price').text();
            // const index=job.salary.indexOf('-');
            // const index2=job.salary.indexOf('AZN');
            // job.minSalary=job.salary.slice(0,index-1);
            // job.maxSalary=job.salary.slice(index+2,index2-1);  
            job.city=$(threethDiv).children().eq(0).children().eq(0).children().eq(1).text();
            job.age=$(threethDiv).children().eq(0).children().eq(1).children().eq(1).text();
            job.education=$(threethDiv).children().eq(0).children().eq(3).children().eq(1).text();
            job.experience=$(threethDiv).children().eq(0).children().eq(4).children().eq(1).text();
            job.published=$(threethDiv).children().eq(0).children().eq(5).children().eq(1).text();
            job.deadline=$(threethDiv).children().eq(0).children().eq(6).children().eq(1).text();
            job.person=$(threethDiv).children().eq(0).children().eq(7).children().eq(1).text();
            job.phone=$(threethDiv).children().eq(1).children().eq(0).children().eq(1).text();
            job.email=$(threethDiv).children().eq(1).children().eq(1).children().eq(1).text();
            job.category=$(threethDiv).children().eq(1).children().eq(2).children().eq(1).text();
            job.subcategory=$(threethDiv).children().eq(1).children().eq(3).children().eq(1).text();
            job.content=$(firstDiv).find('.more_button_ob_div').html();     
            res.json(job);             
        }
        else{
            res.json({message:'Xeta bas verdi!!!,internet baglantisini ve linki kontrol edin',
             statusCode:response.statusCode               
            });
        }
            
    });

});

//jobsearch  botttttttttttttttttttttttttttttttttttttt
router.get('/jobsearch',(req,res,next)=>{
    request(req.body.surl,(error,response,html)=>{
        let job={};
        if(!error && response.statusCode==200){
            const $=cheerio.load(html);
            job.title=$('#tableup_str').text();
            const xyz= $('#tableup_str').parent().next().next().children().children().eq(0).children().children()
            .eq(1).children().eq(1).children().children().children();

            job.company=$(xyz).eq(1).children().eq(0).text().slice(10);
            job.published=$(xyz).eq(2).children().eq(0).text().slice(11);
            job.deadline=$(xyz).eq(2).children().eq(2).text().slice(10);

            job.content=$('#tableup_str').parent().next().next().children().children().eq(0).children().children()
            .eq(3).children().eq(1).children().children().children().children().text();
            
            res.json(job);             
        }
        else{
            res.json({message:'Xeta bas verdi!!!,internet baglantisini ve linki kontrol edin',
             statusCode:response.statusCode               
            });
        }
            
    });

});
module.exports=router;
