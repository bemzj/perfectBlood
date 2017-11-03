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
	bkLayer.addChild(new musicBtn(676,20,1,1,result['music'],'Jaudio'));
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
			var xiText = new setWrapText(0,0,36,"曾经有一份献血的机会放在我面前，我却没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。如果上天能够给我一个再来一次的机会，我会说：","black",false,580,true,52,3);
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
		var firstOne = new setText(210,1180,36,"你的一次,","black",false);
		firstOne.alpha = 0;
		bkLayer.addChild(firstOne);
		var firstTwo = new setText(390,1180,36,"他的一生","black",false);
		firstTwo.alpha = 0;
		bkLayer.addChild(firstTwo);
		LTweenLite.to(firstOne,1.0,{alpha:1.0}).to(firstTwo,1.0,{alpha:1.0,onComplete:second});
	}});
	bkLayer.addChild(new musicBtn(676,20,1,1,imgList['music'],'Jaudio'));
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
		backLayer.addChild(new musicBtn(676,20,1,1,imgList['music'],'Jaudio'));
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
	backLayer.addChild(new musicBtn(676,20,1,1,imgList['music'],'Jaudio'));
	LTweenLite.to(bloodStyle,1.0,{alpha:1.0}).to(a,0.7,{alpha:1.0}).to(b,0.7,{alpha:1.0}).to(c,0.7,{alpha:1.0}).to(d,1.0,{alpha:0.7,onComplete:function(){
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
	
	backLayer.addChild(new musicBtn(676,20,1,1,imgList['music'],'Jaudio'));
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
		LTweenLite.to(food1,0.7,{alpha:1.0});
		LTweenLite.to(a,0.7,{alpha:1.0,onComplete:function(){
			LTweenLite.to(food2,0.7,{alpha:1.0});
			LTweenLite.to(b,0.7,{alpha:1.0,onComplete:function(){
				LTweenLite.to(food3,0.7,{alpha:1.0});
				LTweenLite.to(c,0.7,{alpha:1.0,onComplete:function(){
					LTweenLite.to(food4,0.7,{alpha:1.0});
					LTweenLite.to(d,0.7,{alpha:1.0,onComplete:function(){
						LTweenLite.to(food5,0.7,{alpha:1.0});
						LTweenLite.to(e,0.7,{alpha:1.0,onComplete:function(){
							var aBack = new LSprite();
							aBack.graphics.drawRect(0, '#000000', [12, 212, 340, 210], false, '#000000');
							backLayer.addChild(aBack);
							aBack.addEventListener(LMouseEvent.MOUSE_DOWN, transition);
							
							var bBack = new LSprite();
							bBack.graphics.drawRect(0, '#000000', [455, 196, 290, 226], false, '#000000');
							backLayer.addChild(bBack);
							bBack.addEventListener(LMouseEvent.MOUSE_DOWN, transition);
							
							var cBack = new LSprite();
							cBack.graphics.drawRect(0, '#000000', [0, 470, 450, 340], false, '#000000');
							cBack.x = rCenterWidth(cBack);
							backLayer.addChild(cBack);
							cBack.addEventListener(LMouseEvent.MOUSE_DOWN, transition);
							
							var dBack = new LSprite();
							dBack.graphics.drawRect(0, '#000000', [65, 850, 220, 370], false, '#000000');
							backLayer.addChild(dBack);
							dBack.addEventListener(LMouseEvent.MOUSE_DOWN, transition);
							
							var eBack = new LSprite();
							eBack.graphics.drawRect(0, '#000000', [430, 915, 260, 310], false, '#000000');
							backLayer.addChild(eBack);
							eBack.addEventListener(LMouseEvent.MOUSE_DOWN, transition);
							
						}});
					}});
				}});
			}});
		}});
	}});
	
}
function fiveChoice(){
	num = parseInt(Math.random() * 3);
	switch(num) {
		case 0:
			five();
			break;
		case 1:
			fiveTwo();
			break;
		case 2:
			fiveThree();
			break;
	}
}
//第五个场景
function five(){
	backLayer.removeAllChild();
	clearInterval(heartTween);
	bkLayer = new LSprite();
	backLayer.addChild(bkLayer);
	var fiveBkg = getBitmap(imgList['fiveBkg']);
	bkLayer.addChild(fiveBkg);
	backLayer.addChild(new musicBtn(676,20,1,1,imgList['music'],'Jaudio'));
	var life = getBitmap(imgList['life']);
	life.x = rCenterWidth(life);
	life.y = 48;
	life.alpha = 0;
	bkLayer.addChild(life);
	LTweenLite.to(life,1.0,{alpha:1.0})
	var life = getBitmap(imgList['life']);
	life.x = rCenterWidth(life);
	var speed = 3;
	var sence021 = getBitmap(imgList['sence021']);
	sence021.x = 48;
	sence021.y = 158;
	bkLayer.addChild(sence021);
	var box01 = getBitmap(imgList['box09']);
	box01.x = 400;
	box01.y = 345;
	bkLayer.addChild(box01);
	var st01 = new setWrapText(435,375,22,"“有志愿者答应为你捐献造血干细胞了，还是罕见的少数民族配对成功。”","black",true,190,true,28,speed);
	bkLayer.addChild(st01);
	var vt01 =new setWrapText(690,100,28,"来自香港的何俊患白血病多年","black",false,32,true,32,3);
	bkLayer.addChild(vt01);
	var vt02 =new setWrapText(655,100,28,"终于等到了配型成功","black",false,32,true,32,3);
	bkLayer.addChild(vt02);
	var sence022 = getBitmap(imgList['sence022']);
	sence022.x = 48;
	sence022.y = 544;
	bkLayer.addChild(sence022);
	var vt03 =new setWrapText(690,607,28,"配型成功前","black",false,32,true,32,3);
	bkLayer.addChild(vt03);
	var vt04 =new setWrapText(655,607,28,"他只能靠药物维持生命","black",false,32,true,32,3);
	bkLayer.addChild(vt04);
	var sence023 = getBitmap(imgList['sence023']);
	sence023.x = 48;
	sence023.y = 936;
	bkLayer.addChild(sence023);
	var box02 = getBitmap(imgList['box010']);
	box02.x = 350;
	box02.y = 1060;
	bkLayer.addChild(box02);
	var st02 = new setWrapText(425,1098,22,"“等待的那五年里，我几乎看到了人生的尽头。但现在，谢谢你，给了我第二次生命！我会继续传播这种正能量。”","black",true,240,true,28,speed);
	bkLayer.addChild(st02);
	var vt05 =new setWrapText(50,990,28,"手术中","black",false,150,true,32,3);
	bkLayer.addChild(vt05);
	bkLayer.addChild(new musicBtn(676,20,1,1,imgList['music'],'Jaudio'));
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
	box01.alpha = 0 ;
	box02.alpha = 0 ;
	setHeartGroup();
	LTweenLite.to(sence021,1.0,{alpha:1.0}).to(vt01,1.0,{alpha:1.0}).to(vt02,1.0,{alpha:1.0}).to(box01,1.0,{alpha:1.0,onComplete:function(){
		st01.alpha = 1;
		st01.play();
		document.getElementById('hit').play();
		st01.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
			document.getElementById('hit').pause();
			LTweenLite.to(sence022,1.0,{delay:1.0,alpha:1.0}).to(vt03,1.0,{alpha:1.0}).to(vt04,1.0,{alpha:1.0}).to(sence023,1.0,{delay:1.0,alpha:1.0}).to(vt05,1.0,{alpha:1.0}).to(box02,1.0,{alpha:1.0,onComplete:function(){
				st02.alpha = 1;
				st02.play();
				document.getElementById('hit').play();
				st02.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
					document.getElementById('hit').pause();
					setTimeout(last,2000);
				});
			}});
		});
	}});
}
//第五个场景2
function fiveTwo(){
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
	
	var sence011 = getBitmap(imgList['sence011']);
	sence011.x = 48;
	sence011.y = 158;
	bkLayer.addChild(sence011);
	//box
	var box01 = getBitmap(imgList['box01']);
	box01.x = 430;
	box01.y = 270;
	bkLayer.addChild(box01);
	var speed = 3;
	
	var st01 = new setWrapText(475,305,22,"“是急性白血病，生命垂危，急需新鲜血小板，但血库不足。”","black",true,155,true,28,speed);
	bkLayer.addChild(st01);
	var vt01 =new setWrapText(705,85,28,"今年8月，育有两个孩子的小芳","black",false,28,true,32,3);
	vt01.childList["0"].textAlign = 'center';
	bkLayer.addChild(vt01);
	var vt02 =new setWrapText(655,85,28,"发现身体不适，到医院检查","black",false,32,true,32,3);
	bkLayer.addChild(vt02);
	var sence012 = getBitmap(imgList['sence012']);
	sence012.x = 48;
	sence012.y = 544;
	bkLayer.addChild(sence012);
	var box02 = getBitmap(imgList['box02']);
	box02.x = 36;
	box02.y = 175;
	bkLayer.addChild(box02);
	var st02 = new setWrapText(80,220,22,"“怎么办，我还有两个孩子需要照顾啊！”","black",true,140,true,28,speed);
	bkLayer.addChild(st02);
	var vt03 =new setWrapText(690,607,28,"亲友们通过朋友圈","black",false,32,true,32,3);
	bkLayer.addChild(vt03);
	var vt04 =new setWrapText(655,607,28,"不断向社会各界求助","black",false,32,true,32,3);
	bkLayer.addChild(vt04);
	var box03 = getBitmap(imgList['box03']);
	box03.x = 100;
	box03.y = 505;
	bkLayer.addChild(box03);
	var st03 = new setWrapText(150,530,22,"“我们都是看到朋友圈来给小芳献血的，她一定要挺过去。”","black",true,160,true,26,speed);
	bkLayer.addChild(st03);
	var box04 = getBitmap(imgList['box04']);
	box04.x = 465;
	box04.y = 525;
	bkLayer.addChild(box04);
	var st04 = new setWrapText(480,574,22,"“谢谢您的爱心。”","black",true,200,true,26,3);
	bkLayer.addChild(st04);
	
	var sence013 = getBitmap(imgList['sence013']);
	sence013.x = 48;
	sence013.y = 936;
	bkLayer.addChild(sence013);
	var box05 = getBitmap(imgList['box03']);
	box05.x = 20;
	box05.y = 900;
	bkLayer.addChild(box05);
	var vt05 =new setWrapText(690,960,28,"在大家的帮助下","black",false,32,true,32,3);
	bkLayer.addChild(vt05);
	var vt06 =new setWrapText(655,960,28,"小芳的病情得到了缓解","black",false,32,true,32,3);
	bkLayer.addChild(vt06);
	var st05 = new setWrapText(54,925,22,"“我不知道他们是谁，从事什么工作，但我相信，好人一生平安。”","black",true,180,true,26,speed);
	bkLayer.addChild(st05);
	bkLayer.addChild(new musicBtn(676,20,1,1,imgList['music'],'Jaudio'));
	
	sence011.alpha = 0;
	sence012.alpha = 0;
	sence013.alpha = 0;
	st01.alpha = 0;
	st02.alpha = 0;
	st03.alpha = 0;
	st04.alpha = 0;
	st05.alpha = 0;
	box01.alpha = 0;
	box02.alpha = 0;
	box03.alpha = 0;
	box04.alpha = 0;
	box05.alpha = 0;
	vt01.alpha = 0;
	vt02.alpha = 0;
	vt03.alpha = 0;
	vt04.alpha = 0;
	vt05.alpha = 0;
	vt06.alpha = 0;
	setHeartGroup();
	LTweenLite.to(sence011,1.0,{alpha:1.0}).to(vt01,1.0,{alpha:1.0}).to(vt02,1.0,{alpha:1.0}).to(box01,1.0,{alpha:1.0,onComplete:function(){
		st01.alpha = 1;
		st01.play();
		document.getElementById('hit').play();
		st01.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
			document.getElementById('hit').pause();
			LTweenLite.to(box02,1.0,{alpha:1.0,onComplete:function(){
				st02.alpha = 1;
				st02.play();
				document.getElementById('hit').play();
				st02.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
					document.getElementById('hit').pause();
					LTweenLite.to(sence012,1.0,{alpha:1.0}).to(vt03,1.0,{alpha:1.0}).to(vt04,1.0,{alpha:1.0}).to(box03,1.0,{alpha:1.0,onComplete:function(){
						st03.alpha = 1;
						st03.play();
						document.getElementById('hit').play();
						st03.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
							document.getElementById('hit').pause();
							LTweenLite.to(box04,1.0,{alpha:1.0,onComplete:function(){
								st04.alpha = 1;
								st04.play();
								document.getElementById('hit').play();
								st04.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
									document.getElementById('hit').pause();
									LTweenLite.to(sence013,1.0,{alpha:1.0}).to(vt05,1.0,{alpha:1.0}).to(vt06,1.0,{alpha:1.0}).to(box05,1.0,{alpha:1.0,onComplete:function(){
										st05.alpha = 1;
										st05.play();
										document.getElementById('hit').play();
										st05.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
											document.getElementById('hit').pause();
											setTimeout(last,2000);
										});
									}});
								});
							}});
						});
					}});
				});
			}});
		});
	}});
}
//第五个场景3
function fiveThree(){
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
	var speed = 3;
	var sence031 = getBitmap(imgList['sence031']);
	sence031.x = 48;
	sence031.y = 158;
	bkLayer.addChild(sence031);
	//box
	var box01 = getBitmap(imgList['box05']);
	box01.x = 400;
	box01.y = 220;
	bkLayer.addChild(box01);
	var st01 = new setWrapText(450,290,22,"“你父亲出了车祸，情况紧急必须马上手术，需要5000--6000毫升的O型血。但全市血库有限。”","black",true,250,true,28,speed);
	bkLayer.addChild(st01);
	
	var vt01 =new setWrapText(58,130,28,"几年前，海南完美无偿献血","black",false,750,false,32,3);
	bkLayer.addChild(vt01);
	var vt02 =new setWrapText(30,170,28,"志愿者小成的父亲忽然出了车祸","black",false,750,false,32,3);
	bkLayer.addChild(vt02);
	
	var sence032 = getBitmap(imgList['sence032']);
	sence032.x = 48;
	sence032.y = 580;
	bkLayer.addChild(sence032);
	var box02 = getBitmap(imgList['box06']);
	box02.x = 10;
	box02.y = 550;
	bkLayer.addChild(box02);
	
	
	var st02 = new setWrapText(50,585,22,"“帮帮我，我爸出车祸进医院了，急需O型血。”","black",true,160,true,26,speed);
	bkLayer.addChild(st02);
	var box03 = getBitmap(imgList['box07']);
	box03.x = 505;
	box03.y = 525;
	bkLayer.addChild(box03);
	var vt03 =new setWrapText(0,540,28,"向亲友求助无果","black",false,750,false,32,3);
	vt03.x = rCenterWidth(vt03);
	bkLayer.addChild(vt03);
	var vt04 =new setWrapText(0,580,28,"的小成拨通了完美","black",false,750,false,32,3);
	vt04.x = rCenterWidth(vt04);
	bkLayer.addChild(vt04);
	var vt05 =new setWrapText(0,620,28,"公司的电话","black",false,750,false,32,3);
	vt05.x = rCenterWidth(vt05);
	bkLayer.addChild(vt05);
	
	var st03 = new setWrapText(545,575,22,"“我们马上组织全省各地同血型的志愿者到医院献血。”","black",true,180,true,26,speed);
	bkLayer.addChild(st03);
	
	var sence033 = getBitmap(imgList['sence033']);
	sence033.x = 48;
	sence033.y = 940;
	bkLayer.addChild(sence033);
	var box04 = getBitmap(imgList['box08']);
	box04.x = 30;
	box04.y = 1080;
	bkLayer.addChild(box04);
	var vt06 =new setWrapText(30,930,28,"父亲很快脱离了危险，小成从没想过","black",false,750,false,32,3);
	bkLayer.addChild(vt06);
	var vt07 =new setWrapText(58,965,28,"自己会变成无偿献血的受益者。","black",false,750,false,32,3);
	bkLayer.addChild(vt07);
	var st04 = new setWrapText(65,1120,22,"“未来，我会把这种大爱无私的奉献精神传承下去，让更多像我这种遭遇的人得到及时的帮助和救援！”","black",true,200,true,26,speed);
	bkLayer.addChild(st04);
	
	bkLayer.addChild(new musicBtn(676,20,1,1,imgList['music'],'Jaudio'));
	sence031.alpha = 0;
	sence032.alpha = 0;
	sence033.alpha = 0;
	st01.alpha = 0;
	st02.alpha = 0;
	st03.alpha = 0;
	st04.alpha = 0;
	box01.alpha = 0;
	box02.alpha = 0;
	box03.alpha = 0;
	box04.alpha = 0;
	vt01.alpha = 0;
	vt02.alpha = 0;
	vt03.alpha = 0;
	vt04.alpha = 0;
	vt05.alpha = 0;
	vt06.alpha = 0;
	vt07.alpha = 0;
	setHeartGroup();
	LTweenLite.to(sence031,1.0,{alpha:1.0}).to(vt01,1.0,{alpha:1.0}).to(vt02,1.0,{alpha:1.0}).to(box01,1.0,{alpha:1.0,onComplete:function(){
		st01.alpha = 1;
		st01.play();
		document.getElementById('hit').play();
		st01.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
			document.getElementById('hit').pause();
			LTweenLite.to(sence032,1.0,{alpha:1.0}).to(vt03,1.0,{alpha:1.0}).to(vt04,1.0,{alpha:1.0}).to(vt05,1.0,{alpha:1.0}).to(box02,1.0,{alpha:1.0,onComplete:function(){
				st02.alpha = 1;
				st02.play();
				document.getElementById('hit').play();
				st02.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
					document.getElementById('hit').pause();
					LTweenLite.to(box03,1.0,{alpha:1.0,onComplete:function(){
						st03.alpha = 1;
						st03.play();
						document.getElementById('hit').play();
						st03.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
							document.getElementById('hit').pause();
							LTweenLite.to(sence033,1.0,{alpha:1.0}).to(vt06,1.0,{alpha:1.0}).to(vt07,1.0,{alpha:1.0}).to(box04,1.0,{alpha:1.0,onComplete:function(){
								st04.alpha = 1;
								st04.play();
								document.getElementById('hit').play();
								st04.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
									document.getElementById('hit').pause();
									setTimeout(last,2000);
								});
							}});
						});
					}});

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

    wName = new setText(0,560,36,window.nickname,"black",true);
    wName.x = rCenterWidth(wName);
    lastLayer.addChild(wName);
    bigAndSmall(wName,2,2,1.0,0.05,0,true);

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
	searchTA.y = 1070;
	searchTA.x = rCenterWidth(searchTA);
	lastLayer.addChild(searchTA);
	bigAndSmall(searchTA,2,2,1.0,0.05,0,true);
	searchTA.addEventListener(LMouseEvent.MOUSE_DOWN,share);
	//寻找他文案
	var wantTa = new setText(210, 1210, 32, "让爱继续传递", "white", false);
	wantTa.y = 1084;
	wantTa.x = rCenterWidth(wantTa);
	lastLayer.addChild(wantTa);
	bigAndSmall(wantTa,2,2,1.0,0.05,0,true);
	//重温
	var returnBack = new LSprite();
	returnBack.graphics.drawRect(0, "#000000", [0, 0, 300, 60], true, 'rgb(192,0,0)');
	returnBack.y = 970;
	returnBack.x = rCenterWidth(returnBack);
	lastLayer.addChild(returnBack);
	bigAndSmall(returnBack,2,2,1.0,0.05,0,true);
	returnBack.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		console.log(num);
		switch(num) {
			case 0:
				five();
				break;
			case 1:
				fiveTwo();
				break;
			case 2:
				fiveThree();
				break;
		}
	})
	//寻找他文案
	var rBack = new setText(210, 1210, 32, "重温", "white", false);
	rBack.y = 984;
	rBack.x = rCenterWidth(rBack);
	lastLayer.addChild(rBack);
	bigAndSmall(rBack,2,2,1.0,0.05,0,true);
	lastLayer.addChild(new musicBtn(676,20,1,1,imgList['music'],'Jaudio'));
	setHeartGroup();
}
function share(){
	var shareLayer = new LSprite();
	backLayer.addChild(shareLayer);
	shareLayer.graphics.drawRect(0, "#000000", [0, 0, 750,1336], true, 'rgba(0,0,0,0.75)');
	backLayer.addChild(shareLayer);
	var share = getBitmap(imgList['share']);
	shareLayer.addChild(share);
	
	var shareTitle = getBitmap(imgList['shareTitle']);
	shareTitle.x = rCenterWidth(shareTitle);//400
	shareTitle.y = 160;//20
	shareLayer.addChild(shareTitle);
	bigAndSmall(shareTitle,2,2,1.5,0.1,0,true);
	
	shareLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		shareLayer.remove();
	})
}
function transition (){
	backLayer.removeAllChild();
	var transitions = getBitmap(imgList['transition']);
	backLayer.addChild(transitions);
	var bheart = getBitmap(imgList['bheart']);
	bheart.x = 438;
	bheart.y = 846;
	backLayer.addChild(bheart);
	bigAndSmall(bheart,2,2,1.0,0.05,0,true);
	var vt01 =new setWrapText(58,130,36,"你准备好","black",false,750,false,32,5);
	vt01.y = 330;
	vt01.x = 150;
	backLayer.addChild(vt01);
	var vt02 =new setWrapText(58,130,36,"知道TA的故事了吗?","black",false,750,false,32,5);
	vt02.y = 400;
	vt02.x = 70;
	vt02.alpha = 0;
	backLayer.addChild(vt02);
	vt01.play();
	vt01.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
		vt02.alpha = 1;
		vt02.play();
		vt02.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE,function(){
			setTimeout(fiveChoice,2000);
		});
	});
	backLayer.addChild(new musicBtn(676,20,1,1,imgList['music'],'Jaudio'));
	setHeartGroup();
}
