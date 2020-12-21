const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');

//Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'employeedb'
});

//Connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

app.use(bodyparser.json());






//Insert data into Supliers
app.get('/insersupdetails/:sup_regno/:suplier_name/:suplier_email/:suplier_address/:supliertelephone', (req,res)=>{
    let item = {sup_regno:req.params.sup_regno,suplier_name:req.params.suplier_name,suplier_email:req.params.suplier_email,suplier_address:req.params.suplier_address,supliertelephone:req.params.supliertelephone};
    let sql = `INSERT INTO suplier(sup_regno,suplier_name,suplier_email,suplier_address,supliertelephone) VALUES ('${req.params.sup_regno}','${req.params.suplier_name}','${req.params.suplier_email}','${req.params.suplier_address}','${req.params.supliertelephone}')`;
    let query = db.query(sql,item,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.send('Suplier added');
    })
});


//view data 
app.get('/suplierfetching',(req,res)=>{
res.set('Access-Control-Allow-Origin', '*');
let sql = 'SELECT * FROM suplier';
let query = db.query(sql, (err,result)=>{
    if(err) throw err;
    console.log(result);
    return res.json({
        //send data to html file as a json file
        data:result
    })
});

});



//update Suplier data
    app.get('/Updatesup/:id/:sup_regno/:suplier_name/:suplier_email/:suplier_address/:supliertelephone',(req,res)=>{
        console.log(req.params.sup_regno);
        console.log("hi");
        console.log("bye");
        console.log("bye2");
    let sup = {sup_regno:req.params.sup_regno,suplier_name:req.params.suplier_name,suplier_email:req.params.suplier_email,suplier_address:req.params.suplier_address,supliertelephone:req.params.supliertelephone};
    let sql = `UPDATE suplier SET sup_regno ='${sup.sup_regno}',suplier_name ='${sup.suplier_name}', suplier_email ='${sup.suplier_email}',suplier_address = '${sup.suplier_address}',supliertelephone ='${sup.supliertelephone}'WHERE supId= ${req.params.id}`;
    let query = db.query(sql,(err,result) =>{
        if(err) throw err;
        console.log(result);
        console.log('item updated');
    });
});



//fetching details for the suplier details

app.get('/suplierUpdatefetching/:id',(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    let sql = `SELECT * FROM suplier WHERE supId= ${req.params.id}`;
        let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.json({
            //send data to html file as a json file
            data:result
        })
    });
    
    });


//central stock fetch data

app.get('/stockfetch',(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    let sql = 'SELECT * FROM sup_grn';
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.json({
            //send data to html file as a json file
            data:result
        })
    });
    
    });




//insert data into GRN_sup database
app.get('/insergrndetails/:Suplier_NO/:Item_Description/:Genaric_Name/:Qty/:Packsize/:Price/:BatchNo/:date/:Brand_Name', (req,res)=>{
    let item = {Suplier_NO:req.params.Suplier_NO,Item_Description:req.params.Item_Description,Genaric_Name:req.params.Genaric_Name,Qty:req.params.Qty,Packsize:req.params.Packsize,Price:req.params.Price,BatchNo:req.params.BatchNo,date:req.params.date,Brand_Name:req.params.Brand_Name};
    let sql = `INSERT INTO sup_grn(Suplier_NO,Item_Description,Genaric_Name,Brand_Name,Qty,Packsize,Price,BatchNo,Date) VALUES ('${req.params.Suplier_NO}','${req.params.Item_Description}','${req.params.Genaric_Name}','${req.params.Brand_Name}','${req.params.Qty}','${req.params.Packsize}','${req.params.Price}','${req.params.BatchNo}','${req.params.date}')`;
    let query = db.query(sql,item,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.send('Stock added');
    })
});



//PO insertion of data (PO-Purchase Order)

app.get('/insertPO/:Suplier_NO/:Requested_By/:Genaric_Name/:Qty/:date/:Brand_Name', (req,res)=>{
    let item = {Suplier_NO:req.params.Suplier_NO,Requested_By:req.params.Requested_By,Genaric_Name:req.params.Genaric_Name,Qty:req.params.Qty,Brand_Name:req.params.Brand_Name,date:req.params.date};
    let sql = `INSERT INTO po_details(sup_no,req_by ,gen_name,brand_name,qty,date) VALUES ('${req.params.Suplier_NO}','${req.params.Requested_By}','${req.params.Genaric_Name}','${req.params.Brand_Name}','${req.params.Qty}','${req.params.date}')`;
    let query = db.query(sql,item,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.send('PO ADDED');
    })
});

//PO data retrieval

app.get('/POfetch',(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    let sql = 'SELECT * FROM po_details';
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.json({
            //send data to html file as a json file
            data:result
        })
    });
    
    });


//update data from PO
app.get('/UpdatePO/:id/:gen_name/:brand_name/:qty',(req,res)=>{
    console.log(req.params.id);
let sup = {gen_name:req.params.gen_name,brand_name:req.params.brand_name,qty:req.params.qty};
let sql = `UPDATE po_details SET gen_name ='${sup.gen_name}',brand_name ='${sup.brand_name}', qty ='${sup.qty}'WHERE PO_number= ${req.params.id}`;
let query = db.query(sql,(err,result) =>{
    if(err) throw err;
    console.log(result);
    console.log('PO updated');
});
});



app.get('/POUpdatefetching/:id',(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    let sql = `SELECT * FROM po_details WHERE PO_number= ${req.params.id}`;
        let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.json({
            //send data to html file as a json file
            data:result
        })
    });
    
    });



//deleting PO
app.get('/POdelete/:id',(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    let sql = `DELETE FROM po_details WHERE PO_number= ${req.params.id}`;
        let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.json({
            //send data to html file as a json file
            data:result
        })
    });
    
    });





app.listen('3000',()=>{
    console.log('Server startted on 3000');
});