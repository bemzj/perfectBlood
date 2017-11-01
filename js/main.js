//游戏初始化
LInit(1000/40,"perfect",750,1334,main);
//游戏入口主函数
function main(){
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;//设置全屏变量
    LGlobal.screen(LStage.FULL_SCREEN);//设置全面适应
    backLayer = new LSprite();//创建背景层
    addChild(backLayer);//添加背景层到游戏环境中
    LLoadManage.load(loadImg,'',loadImging);
}
//预加载页面
function loadImging(result){
	//背景上层
	bkLayer = new LSprite();
	backLayer.addChild(bkLayer);
	//背景色
	var back = getBitmap(result['back']);
	bkLayer.addChild(back);	
	//加载层
	loadLayer = new LSprite();
	loadLayer.graphics.drawRect(0,"#ed2456",[0,0,185,170],true,'#ed2456');
	bkLayer.addChild(loadLayer);
	loadLayer.x = rCenterWidth(loadLayer)+6;
	loadLayer.y = 180;
	//背景图
	var backImg = getBitmap(result['backImg']);
	bkLayer.addChild(backImg);
	//高光
	var topImg = getBitmap(result['topImg']);
	bkLayer.addChild(topImg);
	topImg.x=316;
	topImg.y=122;
	//花
	flower = getBitmap(result['flower']);
	flower.x = rCenterWidth(flower)-10;
	flower.y = 420;
	bkLayer.addChild(flower);
	flower.alpha = 0;
	//心
	heart = getBitmap(result['heart']);
	heart.x = rCenterWidth(heart);
	heart.y = 485;
	bkLayer.addChild(heart);
	hTween = bigAndSmall(heart,2,2,1.5,0.1,0,true);
	//加载文字
	loadText = new setText(0,0,42,"100%","#ffffff",true);
	loadText.x = rCenterWidth(loadText);
	loadText.y = 560;
	bkLayer.addChild(loadText);
	//logo
	logo = getBitmap(result['logo']);
	logo.x = rCenterWidth(logo);
	logo.y = 848;
	bkLayer.addChild(logo);
	//加载
	LLoadManage.load(gameImg,loadProgress,startGame);
}
//加载函数
function loadProgress(pre){
	var pre = parseInt(pre);
	loadText.childList["0"].text = pre+"%";
	loadText.x = rCenterWidth(loadText);
	loadLayer.graphics.clear();
	loadLayer.graphics.drawRect(0,"#ed2456",[0,0,185,170*(pre/100)],true,'#ed2456');
	loadLayer.y = 180+170*(1-pre/100);
}
//答题开始
function startGame(result){
	imgList = result;
	//出现花
	LTweenLite.to(flower,1.0,{alpha:1.0,onComplete:function(){
		//百分比消失
		LTweenLite.to(loadText,1.0,{alpha:0});
		LTweenLite.to(logo,1.0,{alpha:0,onComplete:function(){
			//大话西游
			var xiText = new setWrapText(0,0,36,"曾经有一份献血的机会放在我面前，我却没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。如果上天能够给我一个再来一次的机会，我会说：","black",false,540,true,52,3);
			xiText.x = rCenterWidth(xiText);
			xiText.y = 820;
			bkLayer.addChild(xiText);
			xiText.play();
			document.getElementById('hit').play();
			xiText.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE, function(){
				document.getElementById('hit').pause();
				LTweenLite.to(xiText,0.8,{alpha:0,onComplete:function(){
					LTweenLite.remove(hTween);
					LTweenLite.to(heart,0.75,{y:820,onComplete:function(){
						var ido = new setText(0, 0, 42, "我愿意", "#ffffff", true);
						ido.x = rCenterWidth(ido);
						ido.y = 900;
						bkLayer.addChild(ido);
						ido.alpha=0;
						LTweenLite.to(ido,1.0,{alpha:1.0,onComplete:function(){
							var hand = getBitmap(imgList['hand']);
							hand.x = rCenterWidth(hand);
							hand.y = 960;
							bkLayer.addChild(hand);
							LTweenLite.to(hand, 0.7, {
								y: 920,
								loop: true,
								alpha: 0,
								onComplete: function() {
									hand.y = 960;
									hand.alpha = 1.0;
								}
							});
							var enter = new LSprite();
							enter.graphics.drawRect(0,'#000000',[275,850,200,100],false,'#000000');
							bkLayer.addChild(enter);
							enter.addEventListener(LMouseEvent.MOUSE_DOWN,first);
						}});
					}});
				}})
			});
		}});
	}});
}
//第一个场景
function first(){
	bkLayer.removeAllChild();
	loadLayer=null;loadText=null;logo=null;flower=null;hTween=null;heart=null;
	//背景
	var firstBkg = getBitmap(imgList['firstBkg']);
	bkLayer.addChild(firstBkg);
	//花圈
	var fcircle = getBitmap(imgList['fcircle']);
	fcircle.x = rCenterWidth(fcircle);
	fcircle.y = rCenterHeight(fcircle);
	bkLayer.addChild(fcircle);
	bling(fcircle,0.8,0.65,1.0,true);
	var person = getBitmap(imgList['person']);
	person.x = rCenterWidth(person);
	person.y = rCenterHeight(person);
	bkLayer.addChild(person);
	person.alpha = 0;
	LTweenLite.to(person,1.2,{alpha:1.0,onComplete:function(){
		var firstOne = new setText(210,1210,36,"你的一次,","black",false);
		firstOne.alpha = 0;
		bkLayer.addChild(firstOne);
		var firstTwo = new setText(390,1210,36,"他的一生","black",false);
		firstTwo.alpha = 0;
		bkLayer.addChild(firstTwo);
		LTweenLite.to(firstOne,1.0,{alpha:1.0}).to(firstTwo,1.0,{alpha:1.0,onComplete:second});
	}});
	setHeartGroup();
}
//第二个场景
function second(){
	var secondBkg = getBitmap(imgList['secondBkg']);
	backLayer.addChild(secondBkg);
	secondBkg.alpha = 0;
	clearInterval(heartTween);
	//过渡第二个场景
	LTweenLite.to(bkLayer,1.5,{alpha:0,delay:1.0});
	LTweenLite.to(secondBkg,1.5,{alpha:1.0,delay:1.0,onComplete:function(){
		bkLayer.removeAllChild();
		//大中小心
		var littleHeart01 = getBitmap(imgList['littleHeart01']);
		littleHeart01.x = 345;
		littleHeart01.y = 275;
		littleHeart01.alpha = 0;
		backLayer.addChild(littleHeart01);
		var littleHeart02 = getBitmap(imgList['littleHeart02']);
		littleHeart02.x = 390;
		littleHeart02.y = 210;
		littleHeart02.alpha = 0;
		backLayer.addChild(littleHeart02);
		var littleHeart03 = getBitmap(imgList['littleHeart03']);
		littleHeart03.x = 446;
		littleHeart03.y = 122;
		littleHeart03.alpha = 0;
		backLayer.addChild(littleHeart03);
		var rule = 0;
		setInterval(function(){
			switch(rule){
				case 0:
					littleHeart01.alpha = 1.0;
					rule++;
					break;
				case 1:
					littleHeart02.alpha = 1.0;
					rule++;
					break;
				case 2:
					littleHeart03.alpha = 1.0;
					rule++;
					break;
				case 3:
					littleHeart01.alpha = 0;
					littleHeart02.alpha = 0;
					littleHeart03.alpha = 0;
					rule++;
					if(rule==4)
					{
						rule = 0;
					}
					break;
			}
		},1000);
		//左心
		var leftHeart = getBitmap(imgList['leftHeart']);
		leftHeart.x = 128;
		leftHeart.y = 1035;
		leftHeart.alpha = 0;
		leftHeart.rotate = -20;
		backLayer.addChild(leftHeart);
		LTweenLite.to(leftHeart,1.0,{alpha:1.0,onComplete:function(){
			LTweenLite.to(leftHeart,0.8,{rotate:20,loop:true}).to(leftHeart,0.8,{rotate:-20});
		}});
		//右心
		var rightHeart = getBitmap(imgList['rightHeart']);
		rightHeart.x = LGlobal.width-rightHeart.getWidth()-128;
		rightHeart.y = 1035;
		rightHeart.alpha = 0;
		rightHeart.rotate = 20;
		backLayer.addChild(rightHeart);
		LTweenLite.to(rightHeart,1.0,{alpha:1.0,onComplete:function(){
			LTweenLite.to(rightHeart,0.8,{rotate:-20,loop:true}).to(rightHeart,0.8,{rotate:20});
		}});
		//文案
		var wantText = new setText(210,1210,36,"你想知道TA是谁吗？","black",false);
		wantText.y = 970;
		wantText.x  = rCenterWidth(wantText);
		wantText.alpha = 0;
		backLayer.addChild(wantText);
		LTweenLite.to(wantText,1.0,{alpha:1.0,onComplete:function(){
			LTweenLite.to(searchTA,1.0,{alpha:1.0});
			LTweenLite.to(wantTa,1.0,{alpha:1.0});
			bigAndSmall(searchTA,2,2,1.0,0.05,0,true);
		}});
		//寻找ta
		var searchTA = new LSprite();
		searchTA.graphics.drawRect(0,"#000000",[0,0,300,60],true,'rgb(192,0,0)');
		searchTA.y = 1150;
		searchTA.x = rCenterWidth(searchTA);
		searchTA.alpha = 0;
		backLayer.addChild(searchTA);
		//寻找他文案
		var wantTa = new setText(210,1210,32,"寻找TA","white",false);
		wantTa.y = 1164;
		wantTa.x  = rCenterWidth(wantTa);
		wantTa.alpha = 0;
		backLayer.addChild(wantTa);
		
		
		setHeartGroup();
		searchTA.addEventListener(LMouseEvent.MOUSE_DOWN,third);
		
	}});
}
//第三个场景
function third(){
	backLayer.removeAllChild();
	clearInterval(heartTween);
	var thirdBkg = getBitmap(imgList['thirdBkg']);
	backLayer.addChild(thirdBkg);
	var ten = getBitmap(imgList['ten']);
	ten.y = 1215;
	ten.x = 79;
	ten.rotate = -10;
	LTweenLite.to(ten,0.8,{rotate:10,loop:true}).to(ten,0.8,{rotate:-10});
	backLayer.addChild(ten);
	
	//文案
	var bloodStyle = new setText(210,1210,36,"请问您的血型是？","black",false);
	bloodStyle.y = 55;
	bloodStyle.x = rCenterWidth(bloodStyle);
	bloodStyle.alpha = 0;
	backLayer.addChild(bloodStyle);
	var a = new setText(174,182,58,"A","black",true);
	a.alpha = 0;
	backLayer.addChild(a);
	var b = new setText(522,370,58,"B","black",true);
	b.alpha = 0;
	backLayer.addChild(b);
	var c = new setText(138,750,58,"AB","black",true);
	c.alpha = 0;
	backLayer.addChild(c);
	var d = new setText(480,935,58,"O","black",true);
	d.alpha = 0;
	backLayer.addChild(d);
	LTweenLite.to(bloodStyle,1.0,{alpha:1.0}).to(a,1.0,{alpha:1.0}).to(b,1.0,{alpha:1.0}).to(c,1.0,{alpha:1.0}).to(d,1.0,{alpha:1.0,onComplete:function(){
		var aBack = new LSprite();
		aBack.graphics.drawRect(0,'#000000',[100,125,165,410],false,'#000000');
		backLayer.addChild(aBack);
		aBack.addEventListener(LMouseEvent.MOUSE_DOWN,four);
		var bBack = new LSprite();
		bBack.graphics.drawRect(0,'#000000',[459,295,180,400],false,'#000000');
		backLayer.addChild(bBack);
		bBack.addEventListener(LMouseEvent.MOUSE_DOWN,four);
		var cBack = new LSprite();
		cBack.graphics.drawRect(0,'#000000',[100,675,180,430],false,'#000000');
		backLayer.addChild(cBack);
		cBack.addEventListener(LMouseEvent.MOUSE_DOWN,four);
		var dBack = new LSprite();
		dBack.graphics.drawRect(0,'#000000',[435,857,165,420],false,'#000000');
		backLayer.addChild(dBack);
		dBack.addEventListener(LMouseEvent.MOUSE_DOWN,four);
	}});
	setHeartGroup();
}
//第四个场景
function four(){
	backLayer.removeAllChild();
	clearInterval(heartTween);
	var fourBkg = getBitmap(imgList['fourBkg']);
	backLayer.addChild(fourBkg);
	var tipText1 = new setText(0,60,36,"请问献血后","black",false);
	tipText1.x = rCenterWidth(tipText1);
	backLayer.addChild(tipText1);
	var tipText2 = new setText(0,118,36,"您会选择哪一种食物做为营养补充？","black",false);
	tipText2.x = rCenterWidth(tipText2);
	backLayer.addChild(tipText2);
	
	var food1 = getBitmap(imgList['food1']);
	food1.x = 12;
	food1.y = 212;
	backLayer.addChild(food1);
	var a = new setText(0,60,36,"a.牛奶面包","black",false);
	a.x = 90;
	a.y = 212+food1.getHeight()+10;
	backLayer.addChild(a);
	
	var food2 = getBitmap(imgList['food2']);
	food2.x = LGlobal.width-food2.getWidth()-12;
	food2.y = 196;
	backLayer.addChild(food2);
	var b = new setText(0,60,36,"b.沙拉","black",false);
	b.x = 555;
	b.y = 212+food1.getHeight()+10;
	backLayer.addChild(b);
	
	var food3 = getBitmap(imgList['food3']);
	food3.x = rCenterWidth(food3);
	food3.y = rCenterHeight(food3)-46;
	backLayer.addChild(food3);	
	var c = new setText(0,60,36,"c.完美肽藻营养粉","black",false);
	c.x = rCenterWidth(c);
	c.y = rCenterHeight(food3)-36+food3.getHeight();
	backLayer.addChild(c);
	
	var food4 = getBitmap(imgList['food4']);
	food4.x = 65;
	food4.y = 850;
	backLayer.addChild(food4);
	var d = new setText(0,60,36,"d.面条","black",false);
	d.x = 125;
	d.y = 850+food4.getHeight()+10;
	backLayer.addChild(d);
	
	var food5 = getBitmap(imgList['food5']);
	food5.x = LGlobal.width-food5.getWidth()-65;
	food5.y = 915;
	backLayer.addChild(food5);
	var e = new setText(0,60,36,"e.快餐","black",false);
	e.x = 500;
	e.y = 850+food4.getHeight()+10;
	backLayer.addChild(e);
	food1.alpha=0;
	food2.alpha=0;
	food3.alpha=0;
	food4.alpha=0;
	food5.alpha=0;
	a.alpha = 0;
	b.alpha = 0;
	c.alpha = 0;
	d.alpha = 0;
	e.alpha = 0;
	tipText1.alpha = 0;
	tipText2.alpha = 0;
	setHeartGroup();
	LTweenLite.to(tipText1,1.0,{alpha:1.0}).to(tipText2,1.0,{alpha:1.0,onComplete:function(){
		LTweenLite.to(food1,1.0,{alpha:1.0});
		LTweenLite.to(a,1.0,{alpha:1.0,onComplete:function(){
			LTweenLite.to(food2,1.0,{alpha:1.0});
			LTweenLite.to(b,1.0,{alpha:1.0,onComplete:function(){
				LTweenLite.to(food3,1.0,{alpha:1.0});
				LTweenLite.to(c,1.0,{alpha:1.0,onComplete:function(){
					LTweenLite.to(food4,1.0,{alpha:1.0});
					LTweenLite.to(d,1.0,{alpha:1.0,onComplete:function(){
						LTweenLite.to(food5,1.0,{alpha:1.0});
						LTweenLite.to(e,1.0,{alpha:1.0,onComplete:function(){
							var aBack = new LSprite();
							aBack.graphics.drawRect(0, '#000000', [12, 212, 340, 210], false, '#000000');
							backLayer.addChild(aBack);
							aBack.addEventListener(LMouseEvent.MOUSE_DOWN, five);
							
							var bBack = new LSprite();
							bBack.graphics.drawRect(0, '#000000', [455, 196, 290, 226], false, '#000000');
							backLayer.addChild(bBack);
							bBack.addEventListener(LMouseEvent.MOUSE_DOWN, five);
							
							var cBack = new LSprite();
							cBack.graphics.drawRect(0, '#000000', [0, 470, 450, 340], false, '#000000');
							cBack.x = rCenterWidth(cBack);
							backLayer.addChild(cBack);
							cBack.addEventListener(LMouseEvent.MOUSE_DOWN, five);
							
							var dBack = new LSprite();
							dBack.graphics.drawRect(0, '#000000', [65, 850, 220, 370], false, '#000000');
							backLayer.addChild(dBack);
							dBack.addEventListener(LMouseEvent.MOUSE_DOWN, five);
							
							var eBack = new LSprite();
							eBack.graphics.drawRect(0, '#000000', [430, 915, 260, 310], false, '#000000');
							backLayer.addChild(eBack);
							eBack.addEventListener(LMouseEvent.MOUSE_DOWN, five);
							
						}});
					}});
				}});
			}});
		}});
	}});
	
}
//第五个场景
function five(){
	backLayer.removeAllChild();
	clearInterval(heartTween);
	bkLayer = new LSprite();
	backLayer.addChild(bkLayer);
	var fiveBkg = getBitmap(imgList['fiveBkg']);
	bkLayer.addChild(fiveBkg);
	var life = getBitmap(imgList['life']);
	life.x = rCenterWidth(life);
	life.y = 48;
	life.alpha = 0;
	bkLayer.addChild(life);
	LTweenLite.to(life,1.0,{alpha:1.0})
	var life = getBitmap(imgList['life']);
	life.x = rCenterWidth(life);
	
	var sence021 = getBitmap(imgList['sence021']);
	sence021.x = 48;
	sence021.y = 158;
	bkLayer.addChild(sence021);
	var st01 = new setWrapText(455,370,22,"“有志愿者答应为你捐献造血干细胞了，还是罕见的少数民族配对成功。”","black",true,155,true,24,5);
	bkLayer.addChild(st01);
	var vt01 =new setWrapText(690,100,28,"来自香港的何俊患白血病多年","black",false,32,true,32,3);
	bkLayer.addChild(vt01);
	var vt02 =new setWrapText(655,162,28,"终于等到了配型成功","black",false,32,true,32,3);
	bkLayer.addChild(vt02);
	var sence022 = getBitmap(imgList['sence022']);
	sence022.x = 48;
	sence022.y = 544;
	bkLayer.addChild(sence022);
	var vt03 =new setWrapText(690,685,28,"配型成功前","black",false,32,true,32,3);
	bkLayer.addChild(vt03);
	var vt04 =new setWrapText(655,607,28,"他只能靠药物维持生命","black",false,32,true,32,3);
	bkLayer.addChild(vt04);
	var sence023 = getBitmap(imgList['sence023']);
	sence023.x = 48;
	sence023.y = 936;
	bkLayer.addChild(sence023);
	var st02 = new setWrapText(450,1110,22,"“等待的那五年里，我几乎看到了人生的尽头。但现在，谢谢你，给了我第二次生命！我会继续传播这种正能量。”","black",true,200,true,24,3);
	bkLayer.addChild(st02);
	var vt05 =new setWrapText(50,990,28,"手术中","black",false,150,true,32,3);
	bkLayer.addChild(vt05);
	//
	sence021.alpha = 0;
	sence022.alpha = 0;
	sence023.alpha = 0;
	st01.alpha = 0;
	st02.alpha = 0;
	vt01.alpha = 0;
	vt02.alpha = 0;
	vt03.alpha = 0;
	vt04.alpha = 0;
	vt05.alpha = 0;
	setHeartGroup();
	LTweenLite.to(sence021,1.0,{alpha:1.0}).to(vt01,1.0,{alpha:1.0}).to(vt02,1.0,{alpha:1.0,onComplete:function(){
		st01.alpha = 1;
		st01.play();
		document.getElementById('hit').play();
		st01.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
			document.getElementById('hit').pause();
			LTweenLite.to(sence022,1.0,{delay:1.0,alpha:1.0}).to(vt03,1.0,{alpha:1.0}).to(vt04,1.0,{alpha:1.0}).to(sence023,1.0,{delay:1.0,alpha:1.0}).to(vt05,1.0,{alpha:1.0,onComplete:function(){
				st02.alpha = 1;
				st02.play();
				document.getElementById('hit').play();
				st02.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
					document.getElementById('hit').pause();
					setTimeout(last,5000);
				});
			}});
		});
	}});
}
function last(){
	LTweenLite.to(bkLayer,1.0,{alpha:0});
	var lastLayer = new LSprite();
	backLayer.addChild(lastLayer);
	lastLayer.alpha = 0;
	LTweenLite.to(lastLayer,1.0,{alpha:1.0,onComplete:function(){
		bkLayer.remove();
	}});
	clearInterval(heartTween);
	var fiveBkg = getBitmap(imgList['fiveBkg']);
	lastLayer.addChild(fiveBkg);
	var life = getBitmap(imgList['life']);
	life.x = rCenterWidth(life);
	life.y = 180;
	life.alpha = 0;
	lastLayer.addChild(life);
	LTweenLite.to(life,1.0,{alpha:1.0})
	var thank1 = ["您勇敢地伸出臂膀，","奉献一点","您短短的几分钟","您的一滴血","献出多一点爱"];
	var thank2 = ["托起生命的太阳。","让人生完美一点","就能延续他人的生命","完美一片爱","让世界更完美"];
	var logo = getBitmap(imgList['logo']);
	logo.x = rCenterWidth(logo);
	logo.y = 310;
	lastLayer.addChild(logo);
	//微信获取微信名
	var wName = new setText(0,560,36,"邱梓佳","black",false);
	wName.x = rCenterWidth(wName);
	lastLayer.addChild(wName);
	//感谢语
	var n = parseInt(Math.random()*5);
	var thankWord = new setText(0,660,36,"谢谢您","black",false);
	thankWord.x = rCenterWidth(thankWord);
	lastLayer.addChild(thankWord);
	var thankWord1 = new setText(0,720,36,thank1[n],"black",false);
	thankWord1.x = rCenterWidth(thankWord1);
	lastLayer.addChild(thankWord1);
	var thankWord2 = new setText(0,780,36,thank2[n],"black",false);
	thankWord2.x = rCenterWidth(thankWord2);
	lastLayer.addChild(thankWord2);
	//寻找ta
	var searchTA = new LSprite();
	searchTA.graphics.drawRect(0, "#000000", [0, 0, 300, 60], true, 'rgb(192,0,0)');
	searchTA.y = 1020;
	searchTA.x = rCenterWidth(searchTA);
	lastLayer.addChild(searchTA);
	bigAndSmall(searchTA,2,2,1.0,0.05,0,true);
	//寻找他文案
	var wantTa = new setText(210, 1210, 32, "让爱继续传递", "white", false);
	wantTa.y = 1034;
	wantTa.x = rCenterWidth(wantTa);
	lastLayer.addChild(wantTa);
	bigAndSmall(wantTa,2,2,1.0,0.05,0,true);
	setHeartGroup();
}
