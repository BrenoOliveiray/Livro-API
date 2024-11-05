let CadastroRaca = require('../Model/CadastrarRaca');
const pool = require('../database/mysql')
const CadastroCapitulos = {
    async criar(req, res) {
        const {livros_id,nome, ordem_capitulo} = req.body;
    
        let imgUrl = 'http://localhost:3333/images';
    
        // Verifica se um arquivo de imagem foi enviado
        if (req.file) {
            imgUrl += `${req.file.filename}`;
        }


        let sql = `insert into capitulos (livros_id, nome, ordem_capitulo, upload ) VALUES(?,?,?,?)`;
   
        const result = await pool.query(sql,[livros_id,nome, ordem_capitulo, imgUrl])
        const insertId = result[0]?.insertId;
     
        if(!insertId) {
            // return res.status(401).json({message: 'erro ao criar usuario!'})
        }
        const sql_select = 'SELECT * from capitulos where id = ?'
        const [rows] = await pool.query(sql_select, [insertId])
        return res.status(201).json(rows[0])
    },
    async listar(req, res) {

        // return res.status(200).json(Usuario);
        let sql = "select * from capitulos";
        const [rows] = await pool.query(sql);
        return res.status(200).json(rows);
    },
    async alterar(req, res){
        //pegar o id via parametro da url de requisiçao
        const paramId = req.params.id;
        // return res.status(201).json({id: paramId});
        // //pegou os valores do form via body
        const {livros_id,nome, ordem_capitulo} = req.body;
        
        let imgUrl = 'http://localhost:3333/images';
    
        // Verifica se um arquivo de imagem foi enviado
        if (req.file) {
            imgUrl += `${req.file.filename}`;
        }
         let sql = 'UPDATE capitulos SET livros_id= ? nome= ? ordem_capitulo = ?, WHERE id = ?'
         const result = await pool.query(sql, [livros_id,nome, ordem_capitulo, imgUrl, Number(paramId)])

        const changedRows = result[0]?.changedRows;
        if(!changedRows){
            return res.status(401).json({message:'erro ao atualizar a raça!'})
        }
        const sql_select = `SELECT * FROM livros WHERE id = ?`
        const [rows] = await pool.query(sql_select, [paramId])
        return res.status(201).json(rows[0])
    },
    async show(req, res){
        const paramId = req.params.id;
        // const usuarios = Usuario.find(usuarios => usuarios.id === parseInt(paramId) ? true : false);
        // return res.status(201).json(usuarios);
        const sql_select = `SELECT * FROM livros WHERE id = ?`
        const [rows] = await pool.query(sql_select, Number(paramId))
        return res.status(201).json(rows[0])
    },
    async deletar(req, res){
        const paramId = req.params.id;
    //     const usuariosIndex = Usuario.findIndex(usuarios => usuarios.id === parseInt(paramId))
    //     Usuario=[
    //         ...Usuario.slice(0 ,usuariosIndex),
    //         ...Usuario.slice(usuariosIndex+1, Usuario.length)
    // ]
    //     return res.status(200).json({mensagem: "Usuario deletado com sucesso!"})
    // }
    let sql = `DELETE FROM livros WHERE id = ?`
    const result = await pool.query(sql, [Number(paramId)])
    console.log(result)
     const affectedRows = result[0]?.affectedRows;
     if(!affectedRows){
         return res.status(401).json({message:'erro ao deletar o capitulo!'})
     }
    return res.status(200).json({mensagem: "Raça deletada com sucesso!"})
     
}
}
module.exports = CadastroCapitulos;