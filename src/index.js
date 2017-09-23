module.exports = function check(str, bracketsConfig) {
  let arrBrcktsSrc = str.split('');

  if (arrBrcktsSrc.length%2 !== 0) { return false};

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
  	return obj;
  });

return brchksKiller(arrObjs);
};


 function brchksKiller (arr) {
 	let clonedArr = Object.assign([], arr);
 	for (let i = arr.length-1; i>0; i--) {
 		if ((arr[i].type == arr[i-1].type && arr[i].side == 1 && arr[i-1].side == 0 && !arr[i].mono && !arr[i-1].mono)){
 			clonedArr.splice(i-1, 2);
 		} else if (arr[i].type == arr[i-1].type && arr[i].mono && arr[i-1].mono) {
 			clonedArr.splice(i-1, 2);
 			i--;
 		}
 	};
 	if ( arr.length == clonedArr.length) {
 		return false;
 	} else if (clonedArr.length == 0) {
 		return  true;
 	} else {
 		return brchksKiller (clonedArr)
 	};
 };