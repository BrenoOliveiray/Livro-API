const express = require('express');
const multer = require('multer');
const router = express.Router();
const crypto = require('crypto');
const FavoritosController = require('../Controller/FavoritosController');
const ComentariosController = require('../Controller/ComentariosController');
const CadastroController = require('../Controller/CadastroController');
const CadastroLivro = require('../Controller/CadastroLivro');
const CadastroCapitulos = require('../Controller/CadastroCapitulos');
const Avaliacao_Controller = require('../Controller/avaliacao_controller');
const PerguntasController = require('../Controller/Perguntas');
const OpcaoController = require('../Controller/Opcao');
const VotacaoController = require('../Controller/Votacao');
const authenticateJWT = require('../middleware/auth');

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

router.get('/users', authenticateJWT, CadastroController.listar);


router.post('/usuarios', upload.single('avatar'), CadastroController.criar)

router.put('/usuarios/:id',  authenticateJWT,CadastroController.alterar)

router.get('/usuarios',  authenticateJWT,CadastroController.listar)

router.get('/usuarios/:id',  authenticateJWT,CadastroController.show);

router.delete('/usuarios/:id',  authenticateJWT,CadastroController.deletar)

router.post('/login',  CadastroController.login)

// canil cadastro
router.get('/livros',  CadastroLivro.listar)

router.post('/livros',  upload.single('file'), authenticateJWT,CadastroLivro.criar )

router.put('/livros/:id',   upload.single('file'), authenticateJWT,CadastroLivro.alterar)

router.get('/livros/meuslivros',  authenticateJWT,CadastroLivro.show)

router.delete('/livros/:id',  authenticateJWT,CadastroLivro.deletar)
//comentarios

router.get('/comentarios',  authenticateJWT,ComentariosController.listar)

router.post('/comentarios',  authenticateJWT,ComentariosController.criar )

router.put('/comentarios/:id',   authenticateJWT,ComentariosController.alterar)

router.get('/comentarios/meuscomentarios',  authenticateJWT,ComentariosController.show)

router.delete('/comentarios/:id',  authenticateJWT,ComentariosController.deletar)

//  cadastro raças
router.get('/capitulos',  authenticateJWT,CadastroCapitulos.listar)

router.post('/capitulos', upload.single('upload'),  authenticateJWT,CadastroCapitulos.criar )

router.put('/capitulos/:id',  upload.single('upload'), authenticateJWT,CadastroCapitulos.alterar)

router.get('/capitulos/:id', authenticateJWT,CadastroCapitulos.show)

router.delete('/capitulos/:id', authenticateJWT,CadastroCapitulos.deletar)


// Favoritos Controller
router.get('/favoritos', authenticateJWT,FavoritosController.listar)
 
router.post('/favoritos', authenticateJWT,FavoritosController.criar )
 
router.put('/favoritos/:id', authenticateJWT,FavoritosController.alterar)
 
router.get('/favoritos/:meusfavoritos', authenticateJWT,FavoritosController.show)
 
router.delete('/favoritos/:id', authenticateJWT,FavoritosController.deletar)
 
// CanilRacas Controller
router.get('/avaliacao', authenticateJWT,Avaliacao_Controller.listar)
 
router.post('/avaliacao', authenticateJWT,Avaliacao_Controller.criar )
 
router.put('/avaliacao/:id', authenticateJWT,Avaliacao_Controller.alterar)
 
router.get('/avaliacao/:minhasavaliacoes', authenticateJWT,Avaliacao_Controller.show)
 
router.delete('/avaliacao/:id', authenticateJWT,Avaliacao_Controller.deletar)

router.get('/perguntas', authenticateJWT,PerguntasController.listar)
 
router.post('/perguntas', authenticateJWT,PerguntasController.criar )
 
router.put('/perguntas/:id', authenticateJWT,PerguntasController.alterar)
 
router.get('/perguntas/:id', authenticateJWT,PerguntasController.show)
 
router.delete('/perguntas/:id', authenticateJWT,PerguntasController.deletar)


router.get('/opcao', authenticateJWT,OpcaoController.listar)
 
router.post('/opcao', authenticateJWT,OpcaoController.criar )
 
router.put('/opcao/:id', authenticateJWT,OpcaoController.alterar)
 
router.get('/opcao/:id', authenticateJWT,OpcaoController.show)
 
router.delete('/opcao/:id', authenticateJWT,OpcaoController.deletar)

router.get('/votacao', authenticateJWT,VotacaoController.listar)
 
router.post('/votacao', authenticateJWT,VotacaoController.criar )
 
router.put('/votacao/:id', authenticateJWT,VotacaoController.alterar)
 
router.get('/votacao/:minhasvotacoes', authenticateJWT,VotacaoController.show)
 
router.delete('/votacao/:id', authenticateJWT,VotacaoController.deletar)

module.exports = router; 