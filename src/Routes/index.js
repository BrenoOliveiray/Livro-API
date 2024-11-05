const express = require('express');
const multer = require('multer');
const router = express.Router();
const crypto = require('crypto');
const CadastrarRaca = require('../Controller/CadastroCapitulos');
const FavoritosController = require('../Controller/FavoritosController');
const CanilRacasController = require('../Controller/CanilRacasController');
const ComentariosController = require('../Controller/ComentariosController');
const ClassesController = require('../Controller/ClassesController');
const CadastroController = require('../Controller/CadastroController');
const CadastroLivro = require('../Controller/CadastroLivro');
const CadastroGenero = require('../Controller/CadastroLivro');
const CadastroCapitulos = require('../Controller/CadastroCapitulos');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/')
    },
    filename: (req,file,cb) => {
        const extensaoArquivo = file.originalname.split('.')[1]
        const novoNomeArquivo = crypto.randomBytes(16).toString('hex');
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
    }
})

const upload = multer({storage});

router.get('/ping', (req, res) => {
    res.json({
        "pong": "true"
    })
})

router.post('/usuarios', upload.single('avatar'), CadastroController.criar)

router.put('/usuarios/:id', CadastroController.alterar)

router.get('/usuarios', CadastroController.listar)

router.get('/usuarios/:id', CadastroController.show);

router.delete('/usuarios/:id', CadastroController.deletar)

router.post('/login', CadastroController.login)

// canil cadastro
router.get('/livros', CadastroLivro.listar)

router.post('/livros', upload.single('imagem'), CadastroLivro.criar )

router.put('/livros/:id',  upload.single('file'), CadastroLivro.alterar)

router.get('/livros/:id', CadastroLivro.show)

router.delete('/livros/:id', CadastroLivro.deletar)
//comentarios

router.get('/comentarios', ComentariosController.listar)

router.post('/comentarios', ComentariosController.criar )

router.put('/comentarios/:id',  ComentariosController.alterar)

router.get('/comentarios/:id', ComentariosController.show)

router.delete('/comentarios/:id', ComentariosController.deletar)

//  cadastro raças
router.get('/capitulos', CadastroCapitulos.listar)

router.post('/capitulos', upload.single('upload'), CadastroCapitulos.criar )

router.put('/capitulos/:id',  upload.single('upload'),CadastroCapitulos.alterar)

router.get('/capitulos/:id', CadastroCapitulos.show)

router.delete('/capitulos/:id', CadastroCapitulos.deletar)


// Favoritos Controller
router.get('/favoritos', FavoritosController.listar)
 
router.post('/favoritos', FavoritosController.criar )
 
router.put('/favoritos/:id', FavoritosController.alterar)
 
router.get('/favoritos/:id', FavoritosController.show)
 
router.delete('/favoritos/:id', FavoritosController.deletar)
 
// CanilRacas Controller
router.get('/canil_racas', CanilRacasController.listar)
 
router.post('/canil_racas', CanilRacasController.criar )
 
router.put('/canil_racas/:id', CanilRacasController.alterar)
 
router.get('/canil_racas/:id', CanilRacasController.show)
 
router.delete('/canil_racas', CanilRacasController.deletar)

// CanilRacas Controller
router.get('/classes', ClassesController.listar)
 
router.post('/classes', ClassesController.criar )
 
router.put('/classes/:id', ClassesController.alterar)
 
router.get('/classes/:id', ClassesController.show)
 
router.delete('/classes', ClassesController.deletar)


module.exports = router; 