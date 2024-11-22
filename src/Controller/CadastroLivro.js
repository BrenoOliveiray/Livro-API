let Canil = require('../Model/CadastrarCanil')
const pool = require('../database/mysql')
const CadastroGenero = {
    async criar(req, res) {
        console.log(req.body)
        const usuarios_id = req.userId;
        const {generos_id, nome, sinopse, tags, avaliacao_geral} = req.body;
    
        // Definindo a URL base da imagem
        let imgUrl = 'http://localhost:3333/images';
    
        // Verifica se um arquivo de imagem foi enviado
        if (req.file) {
            imgUrl += `${req.file.filename}`;
        }
    
        // SQL para inserir os dados na tabela `canil`
        const sql = `INSERT INTO livros (generos_id, usuarios_id, nome, imagem, sinopse, tags, avaliacao_geral) VALUES (?,?,?,?,?,?,?)`;
    
        try {
            // Executa a inserção no banco de dados
            const [result] = await pool.query(sql, [generos_id, usuarios_id, nome, imgUrl, sinopse, tags, avaliacao_geral]);
    
            // Obtém o ID da inserção
            const insertId = result.insertId;
    
            if (!insertId) {
                return res.status(401).json({ message: 'Erro ao criar postagem!' });
            }
    
            // Seleciona o registro recém-criado para retornar
            const sql_select = 'SELECT * FROM livros WHERE id = ?';
            const [rows] = await pool.query(sql_select, [insertId]);
    
            return res.status(201).json(rows[0]);
        } catch (error) {
            // Trata possíveis erros de execução da query
            console.error(error);
            return res.status(500).json({ message: 'Erro no servidor ao criar postagem!' });
        }
    },
    async listar(req, res) {
        let sql = "select * from livros ";
        const [rows] = await pool.query(sql);
        return res.status(200).json(rows);
    },
    async alterar(req, res){
        //pegar o id via parametro da url de requisiçao
        const paramId = req.params.id;
        const usuarios_id = req.userId;

        // return res.status(201).json({id: paramId});
        //pegou os valores do form via body
        const {generos_id, nome, sinopse, tags, avaliacao_geral} = req.body;
        let imgUrl = 'http://localhost:3333/images/'
          if(req.file) {
            imgUrl = imgUrl + `${req.file.filename}`
          }
        //recuperar a postagem a partir do id
        // const canis = Canil.find(canis => canis.id === parseInt(paramId) ? true : false);
        // const canisIndex = Canil.findIndex(canis => canis.id === parseInt(paramId))
        // canis.nome = nome;
        // canis.email = email;
        // canis.endereco = endereco;
        // canis.img = imgUrl;
        // canis.mensagem = mensagem;
   
        // //salvar as alterações
        // Canil[canisIndex] = canis;
         
        // return res.status(201).json(canis);
        let sql = 'UPDATE livros SET generos_id= ? usuarios_id= ? nome= ? imagem= ? sinopse= ? tags= ? avaliacao_geral =? WHERE id = ?'
        const result = await pool.query(sql, [generos_id, usuarios_id, nome, sinopse, tags, avaliacao_geral, Number(paramId)])
 
        const changedRows = result[0]?.changedRows;
        if(!changedRows){
            return res.status(401).json({message:'erro ao atualizar o canil!'})
        }
        const sql_select = `SELECT * FROM livros WHERE id = ?`
        const [rows] = await pool.query(sql_select, [paramId])
        return res.status(201).json(rows[0])
    },
    async show(req, res){
      const usuarios_id = req.userId
        const sql_select = `SELECT * FROM livros WHERE  usuarios_id= ?`
        const [rows] = await pool.query(sql_select, Number(usuarios_id))
        return res.status(201).json(rows)
    },
    async deletar(req, res){
        const paramId = req.params.id;
    //     const canisIndex = Canil.findIndex(canis => canis.id === parseInt(paramId))
    //     Canil=[
    //         ...Canil.slice(0 ,canisIndex),
    //         ...Canil.slice(canisIndex+1, Canil.length)
    // ]
    //     return res.status(200).json({mensagem: "Canil deletado com sucesso!"})
    // }
    let sql = `DELETE FROM livros WHERE id = ?`
    const result = await pool.query(sql, [Number(paramId)])
    console.log(result)
     const affectedRows = result[0]?.affectedRows;
     if(!affectedRows){
         return res.status(401).json({message:'erro ao deletar o canil!'})
     }
    return res.status(200).json({mensagem: "Canil deletado com sucesso!"})
}
}
module.exports = CadastroGenero;
 