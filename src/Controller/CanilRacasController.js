let Canil = require('../Model/CadastrarCanil')
const pool = require('../database/mysql')
const CanilRacasController = {
    async criar(req, res) {
        const {canil_id, Racas_Racas_Classe_id, Racas_id} = req.body;
       
        // const novoCanil = {
        //     id: Canil[Canil.length-1]?.id ? Canil[Canil.length-1]?.id+1 : 1,
        //     nome: nome,
        //     email: email,
        //     endereco: endereco,
        //     img: imgUrl,
        //     mensagem: mensagem,
        // }
        let sql = `insert into canil_racas (canil_id, Racas_Racas_Classe_id, Racas_id) VALUES(?,?,?)`
        const result = await pool.query(sql, [canil_id, Racas_Racas_Classe_id, Racas_id])
        //const insertId = result[0]?.insertId;
        if(!result) {
            return res.status(401).json({message: 'erro ao ao inserir canil e a raça!'})
        }
        const sql_select = 'SELECT * from canil_racas where canil_id = ?'
        const [rows] = await pool.query(sql_select, [canil_id])
        return res.status(201).json(rows[0])
    },
    async listar(req, res) {
        let sql = "select * from canil_racas";
        const [rows] = await pool.query(sql);
        return res.status(200).json(rows);
    },
    async alterar(req, res){
        //pegar o id via parametro da url de requisiçao
        const paramId = req.params.id;
        // return res.status(201).json({id: paramId});
        //pegou os valores do form via body
        const {canil_id, Racas_Racas_Classe_id, Racas_id} = req.body;
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
        let sql = 'UPDATE canil_racas SET canil_id=?, Racas_Racas_Classe_id=?, Racas_id=? WHERE id = ?'
        const result = await pool.query(sql, [canil_id, Racas_Racas_Classe_id, Racas_id, Number(paramId)])

        const changedRows = result[0]?.changedRows;
        if(!changedRows){
            return res.status(401).json({message:'erro ao atualizar o canil e a raça'})
        }
        const sql_select = `SELECT * FROM canil_racas WHERE id = ?`
        const [rows] = await pool.query(sql_select, [paramId])
        return res.status(201).json(rows[0])
    },
    async show(req, res){
        const paramId = req.params.id;
        // const canis = Canil.find(canis => canis.id === parseInt(paramId) ? true : false);
        // return res.status(201).json(canis);
        const sql_select = `SELECT * FROM canil_racas WHERE id = ?`
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
    const {canil_id, Racas_Racas_Classe_id, Racas_id} = req.body;
    let sql = `DELETE FROM canil_racas WHERE canil_id = ? AND  Racas_Racas_Classe_id=? AND  Racas_id=?`
    const result = await pool.query(sql,canil_id, Racas_Racas_Classe_id, Racas_id)
    console.log(result)
     const affectedRows = result[0]?.affectedRows;
     if(!affectedRows){
         return res.status(401).json({message:'erro ao deletar o canil e a raça!'})
     }
    return res.status(200).json({mensagem: "canil e raça deletada com sucesso!"})
}
}
module.exports = CanilRacasController;