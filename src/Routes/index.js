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
router.get('/avaliacao', Avaliacao_Controller.listar)
 
router.post('/avaliacao', Avaliacao_Controller.criar )
 
router.put('/avaliacao/:id', Avaliacao_Controller.alterar)
 
router.get('/avaliacao/:id', Avaliacao_Controller.show)
 
router.delete('/avaliacao/:id', Avaliacao_Controller.deletar)

router.get('/perguntas', PerguntasController.listar)
 
router.post('/perguntas', PerguntasController.criar )
 
router.put('/perguntas/:id', PerguntasController.alterar)
 
router.get('/perguntas/:id', PerguntasController.show)
 
router.delete('/perguntas/:id', PerguntasController.deletar)


router.get('/opcao', OpcaoController.listar)
 
router.post('/opcao', OpcaoController.criar )
 
router.put('/opcao/:id', OpcaoController.alterar)
 
router.get('/opcao/:id', OpcaoController.show)
 
router.delete('/opcao/:id', OpcaoController.deletar)

router.get('/votacao', VotacaoController.listar)
 
router.post('/votacao', VotacaoController.criar )
 
router.put('/votacao/:id', VotacaoController.alterar)
 
router.get('/votacao/:id', VotacaoController.show)
 
router.delete('/votacao/:id', VotacaoController.deletar)

module.exports = router; 