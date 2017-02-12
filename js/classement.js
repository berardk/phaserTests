/*------------------------------------------------------------------------*/
/*                        Declaration des objets                          */
/*------------------------------------------------------------------------*/
let Zone = function(nameZone,god) {
	/* Attributes */
	this.name=nameZone;
	this.god=god;
	this.players=[]; // Liste triee
	this.father=null;
	this.sonL=null;
	this.sonR=null;
	
	/* Methods */
//	this.nomFonction = function (){
//  };
	this.setFather = function (father){
		this.father=father;
	};
	this.getFather = function(){
		return this.father;
	};
	this.setSonL = function (xsonL){
		this.sonL=xsonL;
	};
	this.getSonL = function(){
		return this.sonL;
	};
	this.setSonR = function (xsonR){
		this.sonR=xsonR;
	};
	this.getSonR = function(){
		return this.sonR;
	};
	this.isGod = function(){
		return this.god;
	};
	this.displayFamily = function (){
		var display=this.name + "=";
		//console.log("----------");
		if(this.father != null){display+= "father:" + this.father.name + ":";}
		if(this.sonL != null){display+= "sonL:" + this.sonL.name + ":";}
		if(this.sonR != null){display+= "sonR:" + this.sonR.name + ":";}
		display+= this.god;
		console.log(display);
		//sconsole.log("----------");
    };
    
    this.displayList = function (list){
    	if (list==null) {
        	console.log(this.name + ":LIST_OF_PLAYERS_" + this.getPlayersCount());
        	for (let s of this.players)
        	{
        		console.log(s.id + ":" + s.pos);
        	}
    	} else {
    		console.log(this.name + ":LIST_");
        	for (let s of list)
        	{
        		console.log(s.id + ":" + s.pos);
        	}
    	}
    };
    
    // Méthodes pour le calcul du classement
    this.getFirstPlayer = function(){
    	let min = 999999;
    	let first = null;
    	for (let p of this.players)
    	{
    		if(p.pos < min) {
    			min = p.pos;
    			first = p;
    		}
    	}
    	
    	return first;
    };

    this.getLastPlayer = function(){
    	let max = -99999;
    	let last = null;
    	for (let p of this.players)
    	{
    		if(p.pos > max) {
    			max = p.pos;
    			last = p;
    		}
    	}
    	
    	return last;
    };

    this.getPlayersCount = function(){
    	return this.players.length;
    };
    
    this.getDataToSend = function(){
    	let data = [];
    	if(this.god) {
    		// Je suis la zone 1, je calcule le classement final
    		let dataL = this.sonL.getDataToSend();
    		let dataR = this.sonR.getDataToSend();
    		data = dataL.concat(dataR);
    		data.sort(this.comparePlayers);
    		
    	} else if(this.sonL == null && this.sonG == null) {
    		// Je suis une zone sans fils, j'envoie simplement les bonnes infos
    		data.push(this.getFirstPlayer());
    		data.push(this.getLastPlayer());
    	} else {
    		// Je suis une zone quelconque, je merge mes infos et ceux de mes fils avant de les envoyer
    		let dataL = this.sonL.getDataToSend();
    		let dataR = this.sonR.getDataToSend();
    		let dataLR = [];
    		dataLR = dataL.concat(dataR);
    		dataLR.sort(this.comparePlayers);
    		
    		let dataF = [];
    		dataF.push(this.getFirstPlayer());
    		dataF.push(this.getLastPlayer());
    		
    		data = dataLR.concat(dataF);
    		data.sort(this.comparePlayers);
    	}
    	d("dataSentBy:" + this.name);
    	this.displayList(data);
    	return data;
    };
    
    this.comparePlayers = function(a,b) {
    	return a.pos-b.pos;
    };
    
    this.displayDataToSend = function(){
    	let display = this.name + "=from:" + this.getFirstPlayer().id + "_to:" + this.getLastPlayer().id + "_count:" + this.getPlayersCount();
    	console.log(display);
    };
}

let Player = function(namePlayer,zone,position) {
	this.id = namePlayer;
	this.pos = position;
	this.zone = zone;
	
	this.zone.players.push(this);
	
	this.display = function (){
		var display=this.id + "=";
		//console.log("----------");
		display+= "zone:" + this.zone + ":";
		display+= "pos:" + this.pos + ":";
		console.log(display);
		//sconsole.log("----------");
    };
}

let Classement = function(f,l,c) {
	this.first=f;
	this.last=l;
	this.count=c;
}

let d = function(o) {
	let l="----------------------";
	console.log(l + o + l);
};

/*------------------------------------------------------------------------*/
/*                       Instanciation des objets                         */
/*------------------------------------------------------------------------*/
d("Création des zones");
let z1 = new Zone("Zone1", true);
let z2 = new Zone("Zone2", false);
let z3 = new Zone("Zone3", false);
var z4 = new Zone("Zone4", false);
var z5 = new Zone("Zone5", false);
var z6 = new Zone("Zone6", false);
var z7 = new Zone("Zone7", false);

d("Association des zones");
z1.setSonL(z2);
z2.setFather(z1);
z1.setSonR(z3);
z3.setFather(z1);

z2.setSonL(z4);
z4.setFather(z2);
z2.setSonR(z5);
z5.setFather(z2);

z3.setSonL(z6);
z6.setFather(z3);
z3.setSonR(z7);
z7.setFather(z3);

d("Affichage des familles de zones");
z1.displayFamily();
z2.displayFamily();
z3.displayFamily();
z4.displayFamily();
z5.displayFamily();
z6.displayFamily();
z7.displayFamily();

d("Création des joueurs");
let p1 = new Player("A", z2, 7);
let p2 = new Player("B", z2, 7);
let p3 = new Player("C", z2, 5);
let p4 = new Player("D", z2, 9);
let p5 = new Player("E", z2, 8);
let p6 = new Player("F", z2, 2);

let p7 = new Player("G", z3, 3);

let p8 = new Player("H", z4, 22);
let p9 = new Player("I", z4, 22);
let p10 = new Player("J", z4, 14);

let p11 = new Player("K", z5, 27);
let p12 = new Player("L", z5, 11);
let p13 = new Player("M", z5, 24);
let p14 = new Player("N", z5, 19);

let p15 = new Player("O", z6, 29);
let p16 = new Player("P", z6, 12);
let p17 = new Player("Q", z6, 17);
let p18 = new Player("R", z6, 11);
let p19 = new Player("S", z6, 23);
let p20 = new Player("T", z6, 29);
let p21 = new Player("U", z6, 14);

let p22 = new Player("V", z7, 14);
let p23 = new Player("W", z7, 15);
let p24 = new Player("X", z7, 28);
let p25 = new Player("Y", z7, 29);
let p26 = new Player("Z", z7, 13);

d("Affichage des joueurs par zone");
z1.displayList();
z2.displayList();
z3.displayList();
z4.displayList();
z5.displayList();
z6.displayList();
z7.displayList();

d("Affichage des données à envoyer pour le classement par zone");
z2.displayDataToSend();
z3.displayDataToSend();
z4.displayDataToSend();
z5.displayDataToSend();
z6.displayDataToSend();
z7.displayDataToSend();

d("Affichage finale ZONE 1");
z1.getDataToSend();

/*------------------------------------------------------------------------*/
/*                             END OF FILE                                */
/*------------------------------------------------------------------------*/