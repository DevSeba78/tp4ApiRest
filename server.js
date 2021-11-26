let express = require('express');
let multer = require('multer');
let path = require('path');
let {Router} = express

let Contenedor = require('./contenedor')
let contenedor = new Contenedor('./api/productos.txt');
// let upload = multer({ dest: 'uploads/' })

const PORT = 8080;

let app = express();
let router = new Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req, res) => {
  res.send("<center><h2>Bienvenidos a mi primer servidor con EXPRESS </h2></center>");
});

//OBTENGO Y MUESTRA TODOS LOS PRODUCTOS

router.get('/productos', (req, res) => {
    contenedor.getProductos().then((productos)=>{
        res.json(productos);
        console.log(productos)
    }).catch((error)=>{
        res.send(error);
    })
   
})
//MUESTRA PRODUCTO POR ID
router.get('/productos/:id', (req, res,next) => {
    console.log('ID:', req.params.id)
   
        contenedor.getById(req.params.id).then(productos => {
            res.json(productos);
        }).catch(error => {
            res.send(error);
        });
    
});


router.post('/productos', (req, res) => {//controlar que el producto no exista
    console.log(req.body);
    //res.send("ok");
    contenedor.save(req.body)
    .then(producto => {
        res.json(producto);
    }).catch(error => {
        res.send(error);
    });
});

router.put('/productos/:id', (req, res) => {
    let updateProducto = req.body;  
    console.log("updateProducto", updateProducto);
    contenedor.update(req.params.id, updateProducto)
    .then(producto => {
        res.json(producto);
    }).catch(error => {
        res.send(error);
    });
});

router.delete('/productos/:id', (req, res) => {
    contenedor.deleteById(req.params.id)
    .then(producto => {
        res.json(producto);
    })
   

});

app.use('/api',router);
app.get('/', (req, res) => {
    res.sendFile(__dirname +'./public/index.html');
  });

app.listen(PORT, () => {
    console.log(`Server escuchando desde http://localhost:${PORT}`);
    });

module.exports = app