let arr=["Daenerys Targaryen","Jon Snow","Jaime Lannister","Tyrion Lannister","Cersei Lannister","Eddard Stark","Catelyn Stark","Sansa Stark","Arya Stark","Bran Stark","Davos Seaworth","Theon Greyjoy","Robb Stark","Kevan Lannister","Petyr Baelish","Varys","Margaery Tyrell","Robert I Baratheon","Stannis Baratheon","Renly Baratheon","Joffrey Baratheon","Samwell Tarly","Brienne of Tarth","Sandor Clegane","Jorah Mormont","Oberyn Martell","Ygritte","Asha Greyjoy","Euron Greyjoy","Rhaegar Targaryen","Melisandre","Barristan Selmy","Drogo","Aemon Targaryen","Viserys Targaryen","Olenna Redwyne","Loras Tyrell","Brynden Tully","Doran Martell","Jon Arryn"];
async function ajax(json) {
    var opt = {
        url:'',
        data:{},
        method:'get',
        dataType:'json',
        success:function(){},
        fail:function(){}
    };
    Object.assign(opt,json);
    let arr=[];
    for(let attr in opt.data){
        arr.push(attr+'='+opt.data[attr]);
    }
    opt.data=arr.join('&');

    let xhr=new XMLHttpRequest;
    if (opt.method==='get') {
        xhr.open('get',opt.url+'?'+encodeURI(opt.data),true);
        xhr.send();
    }else if(opt.method==='post'){
        xhr.open('post',opt.url,true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(opt.data);
    }
    xhr.onreadystatechange=function () {
        if (xhr.readyState===4) {
            if (xhr.status>=200 && xhr.status<=207) {
                if(opt.dataType === 'json'){
                    opt.success(JSON.parse(xhr.responseText));
                }else if(opt.dataType === 'xml'){
                    opt.success(xhr.responseXML);
                }else{
                    opt.success(xhr.responseText);
                }  
            }else{
                opt.fail(xhr.status);
            }
        }
    }
}

let all=[];
arr.forEach(e=>{
	ajax({
		url:'https://www.anapioficeandfire.com/api/characters/',
		data:{name:e},
		success:(data)=>{
			let url=data[data.length-1].url;
			all.push({name:e,url:url})
		}
	})
})
let obj={
	characters:[],
	seats:[{name:"Winterfell",url:"https://www.anapioficeandfire.com/api/houses362"},
	{name:"The Vale",url:"https://www.anapioficeandfire.com/api/houses11"},
	{name:"Riverrun",url:"https://www.anapioficeandfire.com/api/houses395"},
	{name:"Pyke",url:"https://www.anapioficeandfire.com/api/houses169"},
	{name:"Casterly Rock",url:"https://www.anapioficeandfire.com/api/houses229"},
	{name:"King's Landing",url:"https://www.anapioficeandfire.com/api/houses17"},
	{name:"Highgarden",url:"https://www.anapioficeandfire.com/api/houses398"},
	{name:"Sunspear",url:"https://www.anapioficeandfire.com/api/houses285"},
	{name:"Dragonstone",url:"https://www.anapioficeandfire.com/api/houses378"},
]}
obj.characters=all;
setTimeout(()=>console.log(JSON.stringify(obj),obj),2000)