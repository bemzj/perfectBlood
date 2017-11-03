//生成文字
function setText(x,y,size,text,color,weight)
{
	/*
	 * x为文字的横坐标
	 * y为文字的纵坐标
	 * size为文字大小
	 * text为文字内容
	 * color为颜色
	 * weight为颜色是否加粗
	 */
	base(this,LSprite,[]);
	var word = new LTextField();
	word.text = text;
	word.color = color;
	word.size = size;
	var self = this;
	self.x = x;
	self.y = y;
	if(weight==true)
	{
		word.weight ="bolder";
	}
	self.addChild(word);
}
//变大变小
function bigAndSmall(tween,x,y,time,scales,delayTime,loops){
	/*
	 * tween为变化的对象
	 * x为倍数
	 * y为倍数
	 * time为变化的时间
	 * scales为变化的倍数
	 * delayTime为延迟的时间
	 * loops为是否循环
	 */
	var bigBeforeX = tween.x;
	var bigBeforeY = tween.y;
	var bigAfterX = tween.x-tween.getWidth()*scales/x;
	var bigAfterY = tween.y-tween.getHeight()*scales/y;
	return LTweenLite.to(tween,time/2,{loop:loops,delay:delayTime,x:bigAfterX,y:bigAfterY,scaleX:(1+scales),scaleY:(1+scales)}).to(tween,time/2,{x:bigBeforeX,y:bigBeforeY,scaleX:1,scaleY:1});
}
var opening = true;
//音乐按钮类
function musicBtn(x,y,sx,sy,name,musicId){
	/*
	 * x为音乐按钮横坐标位置
	 * y为音乐按钮纵坐标位置
	 * sx为音乐按钮横向放大或缩小倍数
	 * sy为音乐按钮纵向放大或缩小倍数
	 * name为音乐图片名称
	 * musicId为video音乐
	 */
	base(this,LSprite,[]);
	var self = this;
	self.x=x;
	self.y=y;
	self.open=opening;
	self.n = 1;
	var musicImg = new LBitmap(new LBitmapData(name));
	musicImg.scaleX = sx;
	musicImg.scaleY = sy;
	//音乐按钮旋转
	if(self.open==true)
	{
		self.musicplay = LTweenLite.to(musicImg,1.0,{rotate:360,loop:true,onComplete:function(){
			musicImg.rotate = 0;
		}});
		self.n = 0;
	}
	
	self.addChild(musicImg);
	self.graphics.drawRect(0,'#000000',[0,0,musicImg.getWidth(),musicImg.getHeight()],false,'#ff0000');
	self.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(self.n==1&&opening==false)
		{
			self.musicplay = LTweenLite.to(musicImg,1.0,{rotate:360,loop:true,onComplete:function(){
				musicImg.rotate = 0;
			}});
			document.getElementById(musicId).play();
		}else{
			if(self.open==true)
			{
				document.getElementById(musicId).pause();
				self.open = false;
				self.musicplay.pause();
				opening=false;
				
			}else{
				document.getElementById(musicId).play();
				self.open = true;
				self.musicplay.resume();
				opening=true;
			}
		}
		self.n = 0;	
	});
}
//闪闪发光
function bling(target,time,alphaB,alphaA,loops){
	/*
	 * target为目标
	 * time为时间
	 * alphaB为淡出度
	 * alphaA为淡出度
	 * loops为是否重复
	 */
	return LTweenLite.to(target,time,{alpha:alphaB,loop:loops}).to(target,time,{alpha:alphaA});
}
//空函数
function setNull(){}
//返回图片对象
function getBitmap(name){
	return new LBitmap(new LBitmapData(name));
}
//返回按钮对象
function getButton(name){
	return new LButton(new LBitmap(new LBitmapData(imgList[name])));
}
//返回位置横坐标
function rCenterWidth(target){
	return (LGlobal.width-target.getWidth())/2;
}
//返回位置纵坐标
function rCenterHeight(target){
	return (LGlobal.height-target.getHeight())/2;
}
//设置换行
function setWrapText(x,y,size,text,color,weight,width,wrap,height,speed)
{
	/*
	 * x为文字的横坐标
	 * y为文字的纵坐标
	 * size为文字大小
	 * text为文字内容
	 * color为颜色
	 * weight为颜色是否加粗
	 * width为宽度
	 * wrap为是否支持换行
	 * height为行高
	 */
	base(this,LSprite,[]);
	var self = this;
	self.word = new LTextField();
	self.word.text = text;
	self.word.color = color;
	self.word.size = size;
	self.word.setWordWrap(wrap,height);
	self.word.width = width;
	self.word.speed = speed;
	self.x = x;
	self.y = y;
	if(weight==true)
	{
		self.word.weight ="bolder";
	}
	self.addChild(self.word);	
}
setWrapText.prototype.play = function(){
	var self = this;
	self.word.wind();
}
