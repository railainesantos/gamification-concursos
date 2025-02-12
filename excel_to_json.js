const fs = require('fs');
const xlsx = require('xlsx');

function excelToJson(excelFile, jsonFile) {
    const workbook = xlsx.readFile(excelFile);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    
    const structuredData = { disciplinas: [] };
    
    jsonData.forEach(row => {
        let disciplina = structuredData.disciplinas.find(d => d.nome === row.Disciplina);
        if (!disciplina) {
            disciplina = { nome: row.Disciplina, assuntos: [] };
            structuredData.disciplinas.push(disciplina);
        }
        
        let assunto = disciplina.assuntos.find(a => a.nome === row.Assunto);
        if (!assunto) {
            assunto = { nome: row.Assunto, topicos: [] };
            disciplina.assuntos.push(assunto);
        }
        
        let topico = assunto.topicos.find(t => t.nome === row.Tópico);
        if (!topico) {
            topico = { nome: row.Tópico, itens: [] };
            assunto.topicos.push(topico);
        }
        
        topico.itens.push({ nome: row.Item });
    });
    
    fs.writeFileSync(jsonFile, JSON.stringify(structuredData, null, 4), 'utf8');
    console.log(`Arquivo JSON gerado com sucesso: ${jsonFile}`);
}

excelToJson("clica_e_arrasta.xlsx", "item_procap.json");
