/*

Welcome to Rime 

Remastered 
Igor 
Master 
Encryptation

*/


/*

Este Arquivo é parte do programa Rime (Deno Version)

Copyright © 2022 Julie Missay Sanday e Mateus Felipe da Silveira Vieira

Rime é um software livre; você pode redistribuí-lo e/ou
modificá-lo sob os termos da Licença Pública Geral GNU como publicada
pela Free Software Foundation; na versão 3 da Licença, ou
(a seu critério) qualquer versão posterior.

Rime é distribuído na esperança de que possa ser útil,
mas SEM NENHUMA GARANTIA; sem uma garantia implícita de ADEQUAÇÃO
a qualquer MERCADO ou APLICAÇÃO EM PARTICULAR. Veja a
Licença Pública Geral GNU para mais detalhes.

Você deve ter recebido uma cópia da Licença Pública Geral GNU junto
com este programa. Se não, veja <http://www.gnu.org/licenses/>.
*/

/*Criando classe Random Int*/
export class Random{

/*Declarando campos privados*/
#min;
#max;
#result;
#letter;
#tableArray;
    
    constructor(min,max){
	this.#min = Math.ceil(min)
	this.#max = Math.floor(max)
	this.#result;

	this.#letter;
    }

    /*Randomizando números inteiros entre um min e max*/
    int(){
	this.#result = Math.floor(Math.random() * (this.#max - this.#min )) + this.#min;
	//console.log(this.#result)
	return this.#result 
    }

    /*Não usado na ultima versão*/
/*
    string(times){

	this.#result = ""

	for (let i = 0; i <= times; i++ ){
	
	this.#letter = new Random(0,25).int()

	console.log(this.#letter)

	this.#tableArray = [
	    "q","w","e","r","t","y","u","i","o","p",
	    "a","s","d","f","g","h","j","k","l","ç",
	    "z","x","c","v","b","n","m"
	];
	    this.#result = this.#result +  this.#tableArray[this.#letter] 
	}
	
	return this.#result
    }
*/

    //trabalando no método

    /*
    comparator(p1){
	if (this.#cipherArray[i].toString().length < p2) {
	    this.#output = this.#output + " " + this.#separator + " 0" + this.#cipherArray[i].toString().length + " " + this.#cipherArray[i].toString();
		this.#cripto = this.#cripto + this.#separator + "0" + this.#cipherArray[i].toString().length + this.#cipherArray[i].toString();
	}
	    else {
		this.#output = this.#output + " " + this.#separator + " " + this.#cipherArray[i].toString().length + " " + this.#cipherArray[i].toString();
		this.#cripto = this.#cripto + this.#separator + this.#cipherArray[i].toString().length + this.#cipherArray[i].toString();
	    }
    }
*/

}

/*Criando Classe Criptografia*/
export class Criptografia {
/*Declarando Campos Privados*/
#msg;
#parsed;
#inverse;
#UTF16;
#maxValue= 99999999;
#initialValue;
#separator;
#cipherArray;
#output;
#cripto;
#last_byte;
#ref;

    /*Igualando o input da classe a campo privado msg*/
    constructor(msg){
	this.#msg = msg;
    }

    /*Metodo de Criptografia*/
    criptografar(debug){
	this.#parsed = this.#msg.split(""); /*Transformando a String em um Array*/
	/*console.log(this.#parsed)*/

	this.#inverse = this.#parsed.slice().reverse();/*Copia e Inverte o Array*/
	this.#UTF16 = this.#inverse.slice() /*Copia o Array*/
	
	this.#initialValue = new Random(1, this.#maxValue ).int(); /*Randomiza Int*/
	
	/*Conversão de UTF-16*/
	for (let i = 0; i < this.#UTF16.length; i++){
	    this.#UTF16[i] = this.#UTF16[i].charCodeAt(0);
	}

	this.#cipherArray = this.#UTF16.slice(); /*Copia Array*/

	/*Criptografia*/
	for (let i = 0; i < this.#cipherArray.length; i++){
	    this.#cipherArray[i] = this.#cipherArray[i] + i; 
	    this.#cipherArray[i] = this.#cipherArray[i] * this.#initialValue;
	}

	let position = new Random(0, this.#cipherArray.length).int();

	this.#cipherArray.splice(position, 0, this.#initialValue); /*esconde a chave de criptografia dentro do array*/

	//this.#cipherArray.unshift(this.#initialValue)

	//console.log(this.#separator)
	
	this.#output = new Random(0,9).int().toString(); /*Adiciona Lixo no Começo da string*/
	this.#output = this.#output + new Random(0,9).int().toString();

	this.#cripto = this.#output.slice(); /*Copia denovo*/

	this.#separator = new Random(0, this.#maxValue).int().toString(); /*Valor inicial do Separador*/

	let size_filler  = this.#separator.length; /*Tamanho do Separador*/

	//console.log(size_filler);
	
	//console.log(`Output Initial:${this.#output}`)

	for (let i = 0; i < this.#cipherArray.length; i++) {
	    //console.log(this.#separator)
	    if (this.#cipherArray[i].toString().length < 10) {
		this.#output = this.#output + " " + this.#separator + " 0" + this.#cipherArray[i].toString().length + " " + this.#cipherArray[i].toString();
		this.#cripto = this.#cripto + this.#separator + "0" + this.#cipherArray[i].toString().length + this.#cipherArray[i].toString();
	    }
	    else {
		this.#output = this.#output + " " + this.#separator + " " + this.#cipherArray[i].toString().length + " " + this.#cipherArray[i].toString();
		this.#cripto = this.#cripto + this.#separator + this.#cipherArray[i].toString().length + this.#cipherArray[i].toString();
	    }
            this.#separator = new Random(0, this.#maxValue).int().toString(); /*Novos valores do Separador*/ 

            if (i < this.#cipherArray.length - 1) {
		if (this.#separator.length < 10) {
		    this.#output = this.#output + " 0" + this.#separator.length;
		    this.#cripto = this.#cripto + "0" + this.#separator.length;
		}
		else {
		    this.#output = this.#output + " " + this.#separator.length;
		    this.#cripto = this.#cripto + this.#separator.length;
		}
	    }
	}

	if (position.toString().length) {
	    this.#output = this.#output + " 0" + position.toString().length + " " + position.toString() + " "  + size_filler.toString();
	    this.#cripto = this.#cripto + "0" + position.toString().length + position.toString() + size_filler.toString();
	}
	else {		
	    this.#output = this.#output + " " + position.toString().length + " " + position.toString() + " "  + size_filler.toString();
	    this.#cripto = this.#cripto + position.toString().length + position.toString() + size_filler.toString();
	}

	/*Log Geral do Programa*/

	console.log(`
##Criptografia\n\n
Mensagem: ${this.#msg}\n
Chave: ${this.#initialValue}\n
Posição da chave: ${position}\n
Cipher Array: ${this.#cipherArray}\n
Mensagem Criptografada Final: ${this.#cripto}\n
________________________________________________________________________________________________________________
`)
	
	/*
	console.log(`
##Criptografia\n\n
Mensagem:${this.#msg}\n
Mensagem Parseada:${this.#parsed}\n
Mensagem Invertida:${this.#inverse}\n
String convertida por UTF-16:${this.#UTF16}\n
Chave:${this.#initialValue}\n
Posição da chave:${position}\n
Cipher Array:${this.#cipherArray}\n
Output:${this.#output}\n

________________________________________________________________________________________________________________
	`)
	*/
	
//Cripto:${this.#cripto}\n 	

	try{
	    Deno.writeTextFile(`./Criptografia-${Date.now()}.rime`, `${this.#cripto}\n`) /*Tenta Gravar rodando em Deno*/
	}
	catch{
	    console.log("Rodando em NodeJS")

	    try{
		const fs = require("fs");
		fs.writeFileSync(`./Criptografia-${Date.now()}.rime`, `${this.#cripto}\n`) /*Tenta Gravar Rodando em NodeJS*/
	    }
	    catch{
		console.error("Não Foi Possível Gravar")
	    }
 
	}

	if (debug === true){

	return {
	    type: "Criptografia",
	    original_msg: this.#msg,
	    parsed_msg: this.#parsed,
	    inverse_msg: this.#inverse,
	    utf16_code:this.#UTF16,
	    key: this.#initialValue,
	    position_key:position,
	    chipher_array:this.#cipherArray,
	    parsed_output:this.#output,
	    
	    cipher_text: this.#cripto
	    
	};
	    
	}

	else{
	    return {type: "Criptografia",cipher_text: this.#cripto}
ca	}

    }

    descriptografar(input){

	let array = []

	this.#msg = input.toString()

	this.#cipherArray = this.#msg.slice();

	this.#last_byte = this.#cipherArray.substr(this.#cipherArray.length-1, 1 );

	this.#cipherArray = this.#cipherArray.substr(0,this.#cipherArray.length-1);

	this.#cipherArray = this.#cipherArray.substr(2,this.#cipherArray.length-2);

	this.#cipherArray = `0${this.#last_byte}${this.#cipherArray}`

	this.#parsed = this.#cipherArray

	for (let i = 0; i < this.#parsed.length;){
	    let jump = parseInt(this.#parsed.substr(i,2));

	    array.push(this.#parsed.substr(i + 2,jump))

	    i = i + jump + 2 
	}

	this.#ref = parseInt(array[array.length - 1])

	this.#parsed = []

	for (let i = 0; i < array.length - 1; i++) {
	    if (i % 2 !== 0){
		this.#parsed.push(array[i])
	    }
	}

	this.#initialValue = this.#parsed[this.#ref]

	//console.log(this.#parsed)

	//console.log(this.#ref)

	this.#parsed.splice(this.#ref,1);

	this.#UTF16 = this.#parsed.slice()

	//console.log(this.#UTF16)

	for (let i = 0; i < this.#UTF16.length; i++){
	this.#UTF16[i] = this.#UTF16[i] /  this.#initialValue;
        this.#UTF16[i] = this.#UTF16[i] - i; 
	}
	
	this.#UTF16.reverse()
	
        this.#output = ""

	for (let i = 0; i < this.#UTF16.length; i++){
            this.#output = this.#output + String.fromCharCode(this.#UTF16[i]);
	}

//Input:${this.#msg}\n
//Cipher String:${this.#cipherArray}\n

		console.log(`
##Descriptografia\n\n
Mensagem Criptografada Inicial: ${this.#msg}\n
Chave: ${this.#initialValue}\n
Posição da chave: ${this.#ref}\n
Cipher Array: ${this.#parsed}\n

Mensagem: ${this.#output}\n
________________________________________________________________________________________________________________
`)

	/*
	console.log(`
##Descriptografia\n\n
Cipher Array:${this.#parsed}\n
UTF-16:${this.#UTF16}
Pointer:${this.#last_byte}\n
Reference:${this.#ref}\n
Key:${this.#initialValue}\n
Output:${this.#output}\n
________________________________________________________________________________________________________________
	`);
	*/

	let big_json = {
	    type: "Descriptografia",
	    cipher_text: this.#msg,
	    
	    cipher_array: this.#parsed,
	    position_key:this.#ref,
	    key: this.#initialValue,
	    utf16_code: this.#UTF16,
	    
	    original_msg:this.#output
	}


	try{
	    /*Tenta Gravar rodando em Deno*/
	    
	    Deno.writeTextFile(`./Descriptografia-${Date.now()}.rime`, `\n${this.#output}\n________________________________________________________________________________________________________________\n\nStatus da Descriptografia: \n\n{\n\ntype: ${JSON.stringify(big_json.type)},\n\ncipher_text: ${JSON.stringify(big_json.cipher_text)},\n\ncipher_array: ${JSON.stringify(big_json.cipher_array)},\n\nposition_key: ${JSON.stringify(big_json.position_key)},\n\nkey:${JSON.stringify(big_json.key)},\n\nutf16_code:${JSON.stringify(big_json.utf16_code)}  \n\n}\n\n________________________________________________________________________________________________________________\n\nMensagem descriptografada automaticamente pelo programa Rime distrbuído em {Licença}\n\nCopyright © 2022 Julie Missay Sanday e Mateus Felipe da Silveira Vieira\n\nOs criadores deste programa não endossam de nenhuma forma as menssagens geradas\n\n`)
 
	}
	catch{
	    console.log("Rodando em NodeJS")

	    try{
		const fs = require("fs");
		fs.writeFileSync(`./Descriptografia-${Date.now()}.rime`, `\n${this.#output}\n________________________________________________________________________________________________________________\n\nStatus da Descriptografia: \n\n{\n\ntype: ${JSON.stringify(big_json.type)},\n\ncipher_text: ${JSON.stringify(big_json.cipher_text)},\n\ncipher_array: ${JSON.stringify(big_json.cipher_array)},\n\nposition_key: ${JSON.stringify(big_json.position_key)},\n\nkey:${JSON.stringify(big_json.key)},\n\nutf16_code:${JSON.stringify(big_json.utf16_code)}  \n\n}\n\n________________________________________________________________________________________________________________\n\nMensagem descriptografada automaticamente pelo programa Rime distrbuído em {Licença}\n\nCopyright © 2022 Julie Missay Sanday e Mateus Felipe da Silveira Vieira\n\nOs criadores deste programa não endossam de nenhuma forma as menssagens geradas\n\n`) /*Tenta Gravar Rodando em NodeJS*/
	    }
	    catch{
		console.error("Não Foi Possível Gravar")
	    }
 
	}

	return big_json;
	    
	
    }


}

console.clear();

console.log(`
##Bem-Vindo ao Pseudo Encriptador Rime\n
Remastered 
Igor 
Master 
Encryptation\n
Este É um Projeto Meramente Escolar, por isso não utilize-o para criptografia real onde segurança é requerida.\n
Copyright © 2022 Julie Missay Sanday e Mateus Felipe da Silveira Vieira
________________________________________________________________________________________________________________
`)

/*função só por segurança de usar o await em node que não tem essa função por padrão como o deno*/

async function run(){

    const teste = await new Criptografia("The quick brown fox jumps over the lazy dog!")

    let saida = await teste.criptografar(true);

    //console.log(saida)
    
    saida = await teste.descriptografar(saida.cipher_text);

    //console.log(saida)

    console.log("\n##Obrigado por testar o Rime. ^^\n")

}

run();
/*
número aleatório de 1 a 9
descarte de x caracteres numéricos
1:
tamanho do dado em 3 caracteres
dado do array
tamanho do descarte
descarte
loop 1:
tamanho do primeiro descarte
posição da chave

*/
