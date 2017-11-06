//加载页面的图片
var loadImg = [
	{path:'img/logo.png',type:'img',name:'logo'},//完美logo
	{path:'img/backImg.png?v=1',type:'img',name:'backImg'},//背景图片
	{path:'img/heart.png',type:'img',name:'heart'},//心
	{path:'img/back.jpg',type:'img',name:'back'},//背景图片
	{path:'img/topImg.png',type:'img',name:'topImg'},//高光
	{path:'img/flower.png',type:'img',name:'flower'},//花
	{path:'img/music.png',type:'img',name:'music'},//音乐
]
//加载的图片的资源
var gameImg = [
	{path:'img/lifes.png',type:'img',name:'lifes'},//ta
	{path:'img/bheart.png',type:'img',name:'bheart'},//心
	{path:'img/music.png',type:'img',name:'music'},//音乐
	{path:'img/logo.png?v=1',type:'img',name:'logo'},//完美logo
	{path:'img/hand.png',type:'img',name:'hand'},//手
	{path:'img/hand2.png',type:'img',name:'hand2'},//手
	{path:'img/person.png',type:'img',name:'person'},//人
	{path:'img/fcircle.png',type:'img',name:'fcircle'},//花圈
	{path:'img/firstBkg.jpg',type:'img',name:'firstBkg'},//背景图片
	{path:'img/secondBkg.jpg',type:'img',name:'secondBkg'},//背景图片
	{path:'img/littleHeart01.png',type:'img',name:'littleHeart01'},//小心1
	{path:'img/littleHeart02.png',type:'img',name:'littleHeart02'},//小心2
	{path:'img/littleHeart03.png',type:'img',name:'littleHeart03'},//小心3
	{path:'img/leftHeart.png',type:'img',name:'leftHeart'},//左心
	{path:'img/rightHeart.png',type:'img',name:'rightHeart'},//右心
	{path:'img/ten.png',type:'img',name:'ten'},//十
	{path:'img/thirdBkg.jpg',type:'img',name:'thirdBkg'},//右心
	{path:'img/fourBkg.jpg',type:'img',name:'fourBkg'},//背景图
	{path:'img/food1.png',type:'img',name:'food1'},//食物
	{path:'img/food2.png',type:'img',name:'food2'},//食物
	{path:'img/food3.png',type:'img',name:'food3'},//食物
	{path:'img/food4.png',type:'img',name:'food4'},//食物
	{path:'img/food5.png',type:'img',name:'food5'},//食物
	{path:'img/fiveBkg.jpg',type:'img',name:'fiveBkg'},//背景图
	{path:'img/life.png',type:'img',name:'life'},//Ta的一生
	{path:'img/sence011.png',type:'img',name:'sence011'},//场景1
	{path:'img/sence012.png',type:'img',name:'sence012'},//场景2
	{path:'img/sence013.png',type:'img',name:'sence013'},//场景3
	{path:'img/sence021.png',type:'img',name:'sence021'},//场景1
	{path:'img/sence022.png',type:'img',name:'sence022'},//场景2
	{path:'img/sence023.png?v=1',type:'img',name:'sence023'},//场景3
	{path:'img/sence031.png',type:'img',name:'sence031'},//场景1
	{path:'img/sence032.png',type:'img',name:'sence032'},//场景2
	{path:'img/sence033.png',type:'img',name:'sence033'},//场景3
	{path:'img/box01.png',type:'img',name:'box01'},//对话框1
	{path:'img/box02.png',type:'img',name:'box02'},//对话框2
	{path:'img/box03.png',type:'img',name:'box03'},//对话框3
	{path:'img/box04.png',type:'img',name:'box04'},//对话框4
	{path:'img/box05.png',type:'img',name:'box05'},//对话框5
	{path:'img/box06.png',type:'img',name:'box06'},//对话框6
	{path:'img/box07.png',type:'img',name:'box07'},//对话框7
	{path:'img/box08.png',type:'img',name:'box08'},//对话框8
	{path:'img/box09.png',type:'img',name:'box09'},//对话框9
	{path:'img/box010.png',type:'img',name:'box010'},//对话框10
	{path:'img/share.png?v=2',type:'img',name:'share'},//分享
	{path:'img/shareTitle.png?v=2',type:'img',name:'shareTitle'},//分享语
	{path:'img/transition.jpg?v=2',type:'img',name:'transition'},//过度页面
	{path:'img/lastBkg.jpg',type:'img',name:'lastBkg'},//背景
	{path:'img/c1.png',type:'img',name:'c1'},//c1
	{path:'img/c2.png',type:'img',name:'c2'},//c2
	{path:'img/c3.png',type:'img',name:'c3'},//c3
	{path:'img/c4.png',type:'img',name:'c4'},//c4
	{path:'img/down.png',type:'img',name:'down'},//下心
	{path:'img/upheart.png',type:'img',name:'upheart'},//上心
];
//全局变量
var backLayer,loadLayer,loadText,logo,flower,hTween,heart,bkLayer,imgList,heartTween,num;
//上传
function upHeart(x){
	base(this,LSprite,[]);
	var self = this;
	self.heart = getBitmap(imgList['littleHeart02']);
	self.addChild(self.heart);
	self.x = x;
	self.y = 1336;
	LTweenLite.to(self,10,{y:-self.heart.getHeight(),onComplete:function(){
		self.remove();
	}});
}
//设置心群
function setHeartGroup(){
	var p = [2.5, 4, 1.5, 5.5];
	var pn = 0;
	backLayer.addChild(new upHeart(p[pn] * 100));
	heartTween = setInterval(function() {
		pn++;
		if(pn == 4) {
			pn = 0;
		}
		backLayer.addChild(new upHeart(p[pn] * 100));
	
	}, 2500);
}






