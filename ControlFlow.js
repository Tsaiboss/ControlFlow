const fs = require('fs');
const parser    = require("@babel/parser");
const traverse  = require("@babel/traverse").default;
const types     = require("@babel/types");
const generator = require("@babel/generator").default;

//将源代码解析为AST
process.argv.length > 2?encodeFile = process.argv[2]:encodeFile = "./encode.js";
process.argv.length > 3?decodeFile = process.argv[3]:decodeFile = "./decode_result.js";
sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});
ast    = parser.parse(sourceCode);

function getRandomArray(length)
{
	let puzzleArr = [];
	for (var i = 0; i < length; i++) {
		puzzleArr.push(i)
  }
  puzzleArr = puzzleArr.sort(() => {
  	return Math.random() - 0.5
  }); 
  return puzzleArr;
}


function getRandomName(length)
{
	let puzzleArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f","g"];
	
	let randomName = "_0x";
	
	for (var i=0;i<length;i++)
	{
		randomName += puzzleArr[Math.round(Math.random() * 16)];
	}
	
	return randomName;
}


let names = [];
const renameIdentifier = 
{
	"Identifier"({node,scope})
	{
		let oldName = node.name,newName;
		if (oldName.startsWith("_0x")) return;
		
		do
		{
			newName = getRandomName(6);
			
		}while (names.includes(newName))
		scope.rename(oldName,newName);
	},
}

traverse(ast, renameIdentifier);

const codeControlFlow = 
{
	"FunctionDeclaration|FunctionExpression|ForStatement"({node})
	{
		let body = node.body.body;
		if (!body || body.length == 0) return;
		
		let newArray = getRandomArray(body.length);
		let firstVarName  = getRandomName(6);
		let secondVarName = getRandomName(6);
		
		let firstVarNode  = types.VariableDeclarator(types.Identifier(firstVarName),types.valueToNode(newArray));
		let secodeVarNode = types.VariableDeclarator(types.Identifier(secondVarName),types.valueToNode(0));
		
		let firstNode = types.VariableDeclaration("var",[firstVarNode,secodeVarNode]);
		
		let Unarynode = types.UnaryExpression("!",types.ArrayExpression(),true);
		let testNode = types.UnaryExpression("!",Unarynode,true);
		
		let updateNode = types.UpdateExpression("++",types.Identifier(secondVarName),false);
		let discriminNode = types.MemberExpression(types.Identifier(firstVarName),updateNode,true);
		
		let cases = [];
		for (let index = 0;index < body.length; index++)
		{
			let testNode = types.valueToNode(String(newArray[index]));
			let consequent = [body[index],types.ContinueStatement()];
			let SwitchCaseNode = types.SwitchCase(testNode,consequent);
			cases[newArray[index]] = SwitchCaseNode;
		}
		
		let switchNode = types.SwitchStatement(discriminNode,cases);
		
		let WhileNode = types.WhileStatement(testNode,types.BlockStatement([switchNode,types.BreakStatement()]));
		node.body.body = [firstNode,WhileNode];
	},
}

traverse(ast, codeControlFlow);

const arrayToCall = 
{
	ArrayExpression(path)
	{
		let elements = path.node.elements;
		if (elements.length == 0) return;
		if (!elements.every(element => types.isNumericLiteral(element)))
		{
			return;
		}
		let arr = [];
		elements.forEach((ele,index) =>{arr[index] = ele.value;});
		let newString = arr.join("|");
		
		let memberNode   = types.MemberExpression(types.valueToNode(newString),types.valueToNode("split"),true);
		
		let argumentNode = types.valueToNode("|");
		
		let callNode = types.CallExpression(memberNode,[argumentNode]);
		
		path.replaceWith(callNode);
	}
}

traverse(ast, arrayToCall);



let {code} = generator(ast);

fs.writeFile(decodeFile, code, (err) => {});
