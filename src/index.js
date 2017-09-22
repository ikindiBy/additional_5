module.exports = function check(str, bracketsConfig) {
 
 // let arrBrcktsSrc = str.split('');

 //  if (arrBrcktsSrc.length%2 !== 0) { return false};

 //  for (let j=0; j<bracketsConfig.length; j++) {
	//   	if (bracketsConfig[j][0] !== bracketsConfig[j][1]) {
	//   		if (arrBrcktsSrc[0] == bracketsConfig[j][1]) { return false};                      // if first br has side = 1
	//   		if (arrBrcktsSrc[arrBrcktsSrc.length-1] == bracketsConfig[j][0]) { return false};  // if last br has side = 0
	//   	}
 //  }

 //  let arrObjs = arrBrcktsSrc.map((item, ind) => {
 //  	let obj = {};
 //  	obj.mono = false;
 //  	for (let j=0; j<bracketsConfig.length; j++) {
 //  		if (item == bracketsConfig[j][0]  || item == bracketsConfig[j][1]) {obj.type = j;};
 //  		if (item == bracketsConfig[j][0]) {
 //  			if (bracketsConfig[j][0] == bracketsConfig[j][1]) {
 //  				obj.side = 0;
 //  				obj.mono = true;
 //  				break;
 //  			}
 //  			obj.side = 0;
 //  			break;
 //  		} else {
 //  			obj.side = 1;
 //  		};	
 //  	};
 //  	obj.pstn = ind;
 //  	return obj;
 //  });

 //  for (let i=0; i<arrObjs.length-1; i++) {
  	
 //  	if (arrObjs[i].type !== arrObjs[i+1].type && arrObjs[i].side == 0 &&  arrObjs[i+1].side == 1 && !arrObjs[i].mono ) {
 //  		return false;   //if (  ]
 // 	}
 //  }
 //  // console.log(arrBrcktsSrc);
 //  // console.log( arrObjs);
 //  return true;


  let arrBrcktsSrc = str.split('');

  if (arrBrcktsSrc.length%2 !== 0) { return false};

  let arrTypes = bracketsConfig.map((br, ind) => {
  		return {type: ind, count: 0};
  });


  let arrObjs = arrBrcktsSrc.map((item, ind) => {
  	let obj = {};
  	obj.mono = false;
  	for (let j=0; j<bracketsConfig.length; j++) {

  		if (item == bracketsConfig[j][0]  || item == bracketsConfig[j][1]) {obj.type = j;};

  		if (item == bracketsConfig[j][0]) {
  			if (bracketsConfig[j][0] == bracketsConfig[j][1]) {
  				obj.side = 0;
  				obj.mono = true;
  				break;
  			}
  			obj.side = 0;
  			break;
  		} else {
  			obj.side = 1;
  		};	
  	};
  	obj.pstn = ind;
  	return obj;
  });

  for(let j=1; j<arrObjs.length; j++) {
  	if (arrObjs[j-1].side == 0 && arrObjs[j].side == 0) {
  		arrObjs[j].parent = arrObjs[j-1].type;
  	};

  	if (arrObjs[j].side == 1 && arrObjs[j].type == arrObjs[j-1].type ) {
  		arrObjs[j].closed = true;
  	};
  }

return brchksKiller(arrObjs);


}


 function brchksKiller (arr) {
 	let clonedArr = Object.assign([], arr);
 	let result ;
 	for (let i = arr.length-1; i>0; i--) {
 		if ((arr[i].type == arr[i-1].type && arr[i].side == 1 && arr[i-1].side == 0)
 		|| (arr[i].type == arr[i-1].type && arr[i].mono))  {
 			clonedArr.splice(i-1, 2);
 		}
 	};

 	if ( arr.length == clonedArr.length) {
 		result =  false;
 	} else if (clonedArr.length == 0) {
 		result =  true;
 	} else {
 		return brchksKiller (clonedArr)
 	};
	return result;
 };