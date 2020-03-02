// 紀錄localStorage、
var BMIdata = JSON.parse(localStorage.getItem('myBMI'))|| [];

BMIprint();
function BMIprint(){
	var str = "";
	var paper = document.querySelector('.tablebody');
	for (var i = 0; i < BMIdata.length; i++) {
		str += 
		'<tr>'+
			'<td>'+
				'<span class="'+BMIdata[i].level+'"></span>'+
			'</td>'+
			'<td>'+
				BMIdata[i].BMI+
			'</td>'+
			'<td>'+
				BMIdata[i].height+
			'</td>'+
			'<td>'+
				BMIdata[i].weight+
			'</td>'+
			'<td>'+
				BMIdata[i].time+
			'</td>'+
			'<td>'+
				'<a href="#"><i class="fas fa-trash-alt" data-num="'+[i]+'"></i></a>'+
			'</td>'+
		'</tr>';
	}
	paper.innerHTML = str;
}


var postButton = document.querySelector('.keyInArea_submitArea input');
postButton.addEventListener('click',sendingTrigger);
function sendingTrigger(e){
	// 預防性羈押
	e.preventDefault();
	// 測量時間
	var fromNowGenera = new Date();
	var nowtime = (fromNowGenera.getFullYear() - 1911) +'/'+ (fromNowGenera.getMonth() + 1) + '/' +fromNowGenera.getDate() + '/' + fromNowGenera.getHours() + ':' + fromNowGenera.getMinutes();
	var height = document.querySelector('.keyInArea_height').value;
	var weight = document.querySelector('.keyInArea_weight').value;
	// 並非空值就計算
	if (height !== "" && weight !== "") {
	var BMI = (weight / ((height / 100)*(height / 100))).toFixed(2);
	}else{
		alert("請您輸入正確身高體重");
		return;
	}
	// 進入判斷，由下個判斷推入最終結果
	Judge(height,weight,BMI,nowtime);
	// 身高、體重、BMI、時間
}


// 重新讀取
var reseting = document.querySelector('.keyInArea_reloadArea');
reseting.addEventListener('click',reload);
function reload(){
	window.location.reload();
}



// 判斷BMI，警示顏色，評價
function Judge(height,weight,BMI,nowtime){
	if (BMI < 18.5) {
		var score = "過輕";
		var level = 'BMILevel_1';
	}else if(BMI > 18.5 && BMI <= 24){
		var score = "正常";
		var level = 'BMILevel_2';
	}else if(BMI > 24 && BMI <= 27){
		var score = "過重";
		var level = 'BMILevel_3';
	}else if(BMI > 27 && BMI <= 30){
		var score = "肥胖";
		var level = 'BMILevel_4';
	}else if(BMI > 30 && BMI <= 33){
		var score = "中度肥胖";
		var level = 'BMILevel_5';
	}else if(BMI > 33){
		var score = "嚴重肥胖";
		var level = 'BMILevel_6';
	};
	var allValue = {
		height:height,
		weight:weight,
		BMI:BMI,
		time:nowtime,
		alert:score,
		level:level
	};
	BMIdata.push(allValue);
	localStorage.setItem('myBMI',JSON.stringify(BMIdata));
	// 更動按鈕樣式需要元素
	// 評價與BMI
	chnageBtn(score,BMI);
	// 主題內容打印
	BMIprint()
}

// 按鈕變動
function chnageBtn(score,BMI){
	postButton.setAttribute('style','display:none;');
	var displayResultBtn = document.querySelector('.keyInArea_submitArea_BMIresult');
	var displayResultBtnSpan =document.querySelectorAll('.keyInArea_submitArea_BMIresult span');
	var keyInArea_reloadArea = document.querySelector('.keyInArea_reloadArea');
	switch(score){
		case '過輕':
		displayResultBtn.setAttribute('style','display:block;border-color:#31BAF9;');
	// 如何一行就選取所有內部相同tag標籤並且setAttribute
		displayResultBtnSpan[0].textContent = BMI;
		displayResultBtnSpan[0].setAttribute('style','color:#31BAF9;');
		displayResultBtnSpan[1].setAttribute('style','color:#31BAF9;');
		displayResultBtnSpan[2].textContent = '過輕'
		displayResultBtnSpan[2].setAttribute('style','color:#31BAF9;');
		keyInArea_reloadArea.setAttribute('style','display:block;color:#31BAF9;background:#31BAF9;')
		break;
		case '正常':
		displayResultBtnSpan[0].textContent = BMI;
		displayResultBtn.setAttribute('style','display:block;border-color:#86D73F;');
		displayResultBtnSpan[0].setAttribute('style','color:#86D73F;');
		displayResultBtnSpan[1].setAttribute('style','color:#86D73F;');
		displayResultBtnSpan[2].textContent = '正常'
		displayResultBtnSpan[2].setAttribute('style','color:#86D73F;');
		keyInArea_reloadArea.setAttribute('style','display:block;color:#86D73F;background:#86D73F;')

		break;
		case '過重':
		displayResultBtn.setAttribute('style','display:block;border-color:#FF982D;');
		displayResultBtnSpan[0].textContent = BMI;
		displayResultBtnSpan[0].setAttribute('style','color:#FF982D;');
		displayResultBtnSpan[1].setAttribute('style','color:#FF982D;');
		displayResultBtnSpan[2].textContent = '過重'
		displayResultBtnSpan[2].setAttribute('style','color:#FF982D;');
		keyInArea_reloadArea.setAttribute('style','display:block;color:#FF982D;background:#FF982D;')

		break;
		case '肥胖':
		displayResultBtn.setAttribute('style','display:block;border-color:#FF6C02;');
		displayResultBtnSpan[0].textContent = BMI;
		displayResultBtnSpan[0].setAttribute('style','color:#FF6C02;');
		displayResultBtnSpan[1].setAttribute('style','color:#FF6C02;');
		displayResultBtnSpan[2].textContent = '肥胖'
		displayResultBtnSpan[2].setAttribute('style','color:#FF6C02;');
		keyInArea_reloadArea.setAttribute('style','display:block;color:#FF6C02;background:#FF6C02;')

		break;
		case '中度肥胖':
		displayResultBtn.setAttribute('style','display:block;border-color:#FF4C42;');
		displayResultBtnSpan[0].textContent = BMI;
		displayResultBtnSpan[0].setAttribute('style','color:#FF4C42;');
		displayResultBtnSpan[1].setAttribute('style','color:#FF4C42;');
		displayResultBtnSpan[2].textContent = '中度肥胖'
		displayResultBtnSpan[2].setAttribute('style','color:#FF4C42;width:128px;');
		keyInArea_reloadArea.setAttribute('style','display:block;color:#FF4C42;background:#FF4C42;')

		break;
		case '嚴重肥胖':
		displayResultBtn.setAttribute('style','display:block;border-color:#FF1200;');
		displayResultBtnSpan[0].textContent = BMI;
		displayResultBtnSpan[0].setAttribute('style','color:#FF1200;');
		displayResultBtnSpan[1].setAttribute('style','color:#FF1200;');
		displayResultBtnSpan[2].textContent = '嚴重肥胖'
		displayResultBtnSpan[2].setAttribute('style','color:#FF1200;width:128px;');
		keyInArea_reloadArea.setAttribute('style','display:block;color:#FF1200;background:#FF1200;')

		break;
	}
}


var splice = document.querySelector('.tablebody');
splice.addEventListener('click',del,false);
function del(e){
	if (e.target.nodeName !== 'I') {
		return;
	}
	var index = e.target.dataset.num;
	BMIdata.splice(index,1);
	localStorage.setItem('myBMI',JSON.stringify(BMIdata));
	BMIprint();
	reload();
	console.log(index);
}


// 先輸入方便快速選字
// console.log(e.target.nodeName);
// 
// 