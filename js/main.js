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
	first();
	//出现花
//	LTweenLite.to(flower,1.0,{alpha:1.0,onComplete:function(){
//		//百分比消失
//		LTweenLite.to(loadText,1.0,{alpha:0});
//		LTweenLite.to(logo,1.0,{alpha:0,onComplete:function(){
//			//大话西游
//			var xiText = new setWrapText(0,0,36,"曾经有一份献血的机会放在我面前，我却没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。如果上天能够给我一个再来一次的机会，我会说：","black",false,540,true,52,3);
//			xiText.x = rCenterWidth(xiText);
//			xiText.y = 820;
//			bkLayer.addChild(xiText);
//			xiText.play();
//			xiText.childList["0"].addEventListener(LTextEvent.WIND_COMPLETE, function(){
//				LTweenLite.to(xiText,0.8,{alpha:0,onComplete:function(){
//					LTweenLite.remove(hTween);
//					LTweenLite.to(heart,0.75,{y:820,onComplete:function(){
//						var ido = new setText(0, 0, 42, "我愿意", "#ffffff", true);
//						ido.x = rCenterWidth(ido);
//						ido.y = 900;
//						bkLayer.addChild(ido);
//						ido.alpha=0;
//						LTweenLite.to(ido,1.0,{alpha:1.0,onComplete:function(){
//							var hand = getBitmap(imgList['hand']);
//							hand.x = rCenterWidth(hand);
//							hand.y = 960;
//							bkLayer.addChild(hand);
//							LTweenLite.to(hand, 0.7, {
//								y: 920,
//								loop: true,
//								alpha: 0,
//								onComplete: function() {
//									hand.y = 960;
//									hand.alpha = 1.0;
//								}
//							});
//							var enter = new LSprite();
//							enter.graphics.drawRect(0,'#000000',[275,850,200,100],false,'#000000');
//							bkLayer.addChild(enter);
//							enter.addEventListener(LMouseEvent.MOUSE_DOWN,first);
//						}});
//					}});
//				}})
//			});
//		}});
//	}});
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
	LTweenLite.to(person,2.0,{alpha:1.0,onComplete:function(){
		var firstOne = new setText(210,1210,36,"你的一次,","black",false);
		firstOne.alpha = 0;
		bkLayer.addChild(firstOne);
		var firstTwo = new setText(390,1210,36,"你的一生","black",false);
		firstTwo.alpha = 0;
		bkLayer.addChild(firstTwo);
	}});
}

