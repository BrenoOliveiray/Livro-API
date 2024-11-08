let Canil = require('../Model/CadastrarCanil')
const pool = require('../database/mysql')
const VotacaoController = {
    async criar(req, res) {
        const {usuarios_id, Perguntas_id, Opcao_id} = req.body;
       
    
        let sql = `insert into Votacao (usuarios_id, Perguntas_id, Opcao_id) VALUES(?,?,?)`
        const result = await pool.query(sql, [usuarios_id, Perguntas_id, Opcao_id])
        const insertId = result[0]?.insertId;

        //const insertId = result[0]?.insertId;
        if(!insertId) {
            return res.status(401).json({message: 'erro ao ao inserir Votação!'})
        }
        const sql_select = 'SELECT * from Votacao where id = ?'
        const [rows] = await pool.query(sql_select, [insertId])
        return res.status(201).json(rows[0])
    },
    async listar(req, res) {
        let sql = "select * from Votacao";
        const [rows] = await pool.query(sql);
        return res.status(200).json(rows);
    },
    async alterar(req, res){
        //pegar o id via parametro da url de requisiçao
        const paramId = req.params.id;

        const {usuarios_id, Perguntas_id, Opcao_id} = req.body;
        
        let sql = 'UPDATE Votacao Set usuarios_id=? Perguntas_id=? Opcao_id =? WHERE id = ?'
        const result = await pool.query(sql, [usuarios_id, Perguntas_id, Opcao_id, Number(paramId)])

        const changedRows = result[0]?.changedRows;
        if(!changedRows){
            return res.status(401).json({message:'erro ao atualizar Votacao'})
        }
        const sql_select = `SELECT * FROM Votacao WHERE id = ?`
        const [rows] = await pool.query(sql_select, [paramId])
        return res.status(201).json(rows[0])
    },
    async show(req, res){
        const paramId = req.params.id;
        // const canis = Canil.find(canis => canis.id === parseInt(paramId) ? true : false);
        // return res.status(201).json(canis);
        const sql_select = `SELECT * FROM Votacao WHERE id = ?`
        const [rows] = await pool.query(sql_select, Number(paramId))
        return res.status(201).json(rows[0])
    },
    async deletar(req, res){
        // const paramId = req.params.id;
    //     const canisIndex = Canil.findIndex(canis => canis.id === parseInt(paramId))
    //     Canil=[
    //         ...Canil.slice(0 ,canisIndex),
    //         ...Canil.slice(canisIndex+1, Canil.length)
    // ]
    //     return res.status(200).json({mensagem: "Canil deletado com sucesso!"})
    // }
    const paramId = req.params.id;
    let sql = `DELETE FROM Votacao WHERE id = ?`
    const result = await pool.query(sql, [Number(paramId)])
    console.log(result)
     const affectedRows = result[0]?.affectedRows;
     if(!affectedRows){
         return res.status(401).json({message:'erro ao deletar a pergunta!'})
     }
    return res.status(200).json({mensagem: "Pergunta deletada com sucesso!"})
}
}
module.exports = VotacaoController;