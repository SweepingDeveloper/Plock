//------------	
//System Vars
//------------
var stage = document.getElementById('gameCanvas');
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "black";
ctx.font = GAME_FONTS;

var ball_x = STAGE_WIDTH / 4;
var ball_y = STAGE_HEIGHT / 2;
var finalBounceAngle;

var paddle_pos = STAGE_WIDTH / 4;

//var ball_x_direction = 1;  //-1 is left, 1 is right
//var ball_y_direction = 1;  //-1 is up, 1 is down

var ball_x_velocity = 0;
var ball_y_velocity = 10;

var mouseX = 0;
var mouseY = 0;

var relativeIntersect;

var lit_time;
var lit_flag = -1;

var timer= 0;
var supercounter = 1;
var round = 0;
var score = 0;
var scoreString = '';
var scoreStringNum = 0;

var roundTen = 0;
var roundOne = 0;

var timerString = '';
var timerStringNum = 0;

var penalty = 0;
var startFlag = 0;
var pauseGameFlag = 0;

var mouseflag = 0;
var symbol = [1,1,1];
var box_num = [1,3,1];
var bars_to_go = 8;
// 0: off
// 1: +
// 2: -
// 3: *
// 4: /

var pause_mode = 0;

var target = [12,11,10,9,8,7,6,5];
var target_string = ['05','06','07','08','09','10','11','12'];
var num = [0,0];
var base = 0;
var base_num = [0,0];

var starfieldX = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var starfieldY = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var starfieldR = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


var blow_up_flag = -1;
//-----------------
	//Browser Detection
	//-----------------
	navigator.sayswho= (function(){
		var N= navigator.appName, ua= navigator.userAgent, tem;
		var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
		M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

		return M;
	})();

	var browser;
	if (navigator.sayswho[0] == "Firefox")
		browser="f";
	else if (navigator.sayswho[0] == "Chrome")
		browser="c";
	else if (navigator.sayswho[0] == "Safari")
		browser="s";
	else  if (navigator.sayswho[0] == "Microsoft")
		browser="m";
	else
		browser="f";

	
//---------------
//Preloading ...
//---------------
//var gameImage = new Image();
//gameImage.onload = setInterval(mainloop, FRAMERATE);
//gameImage.src = IMAGE_PATH;

//This starts the loop.
var gameImage = new Image();
gameImage.onload = setInterval(mainloop, FRAMERATE);
gameImage.src = IMAGE_PATH;


var gameLogo = new Image();
gameLogo.src = LOGO_PATH;


for (var a = 0; a <= 7; a++)
{
	target[a] = Math.floor(Math.random()*10)+5;
}


for (var a = 0; a <= 49; a++)
{
	starfieldX[a] = Math.floor(Math.random()* (STAGE_WIDTH / 2));
	starfieldY[a] = Math.floor(Math.random()* STAGE_HEIGHT);
	starfieldR[a] = Math.floor(Math.random() * 3)+1;
}




function mainloop()

{
	if (lit_flag == -1)
	{
		lit_time = MAX_LIT_TIME;
	}
	
	stage.addEventListener("mousemove",mouseCoords, false);
	stage.addEventListener("mousedown", mouseDown, false);
	stage.addEventListener("mouseup", mouseUp, false);

	//Draw Stage.
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,stage.width,stage.height);
	
	ctx.fillStyle = "#444444";
	ctx.fillRect(stage.width / 2,0,stage.width/2, stage.height);	
	
	//Draw Stars.
	console.log("Drawing stars...");
	for (var a = 0; a <= 49; a++)
	{
		
		ctx.strokeStyle= STAR_COLOR[starfieldR[a]];
		ctx.fillStyle = STAR_COLOR[starfieldR[a]];
		ctx.beginPath();
		ctx.arc(starfieldX[a], starfieldY[a], starfieldR[a], 0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
	}
	

	//Draw ball.
	ctx.strokeStyle="#FFFFFF";
	ctx.fillStyle="#FFFFFF";
	ctx.beginPath();
	ctx.arc(ball_x,ball_y,BALL_RADIUS,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	
	//Draw paddle.
	ctx.strokeStyle="#FF0000";
	ctx.fillStyle="#FFFFFF";
	
	ctx.fillRect(paddle_pos - (PADDLE_WIDTH / 2),PADDLE_Y,PADDLE_WIDTH,10);
	ctx.strokeRect(paddle_pos - (PADDLE_WIDTH / 2),PADDLE_Y,PADDLE_WIDTH,10);
	
	
	//Draw boxes.
	for (var a = 0; a <= 4; a++)
	{
		ctx.drawImage(gameImage,BOX_COORDS_X[BOX_ORDER[a]], BOX_COORDS_Y[BOX_ORDER[a]],BOX_DIM_X[BOX_ORDER[a]], BOX_DIM_Y[BOX_ORDER[a]], BOX_PLACE_X[a], BOX_PLACE_Y[a], BOX_DIM_X[BOX_ORDER[a]], BOX_DIM_Y[BOX_ORDER[a]]);
		if (lit_flag == a)
		{
			ctx.drawImage(gameImage,BOX_COORDS_X[LIT_BOX_ORDER[a]], BOX_COORDS_Y[LIT_BOX_ORDER[a]],BOX_DIM_X[LIT_BOX_ORDER[a]], BOX_DIM_Y[LIT_BOX_ORDER[a]], BOX_PLACE_X[a], BOX_PLACE_Y[a], BOX_DIM_X[LIT_BOX_ORDER[a]], BOX_DIM_Y[LIT_BOX_ORDER[a]]);			
		}
		if (a % 2 == 0)
		{
			ctx.drawImage(gameImage, INDICATOR_COORDS_X,INDICATOR_COORDS_Y,INDICATOR_DIM_X,INDICATOR_DIM_Y,BOX_PLACE_X[a]+INDICATOR_PLACE_X,BOX_PLACE_Y[a]+INDICATOR_PLACE_Y, INDICATOR_DIM_X,INDICATOR_DIM_Y);			
			ctx.drawImage(gameImage, SYMBOL_COORDS_X[symbol[a/2]], SYMBOL_COORDS_Y[symbol[a/2]],SYMBOL_DIM_X[symbol[a/2]], SYMBOL_DIM_Y[symbol[a/2]], BOX_PLACE_X[a]+INDICATOR_PLACE_X+SYMBOL_PLACE_X,BOX_PLACE_Y[a]+INDICATOR_PLACE_Y+SYMBOL_PLACE_Y,SYMBOL_DIM_X[symbol[a/2]], SYMBOL_DIM_Y[symbol[a/2]]);
			ctx.drawImage(gameImage, NUMBER_COORDS_X[box_num[a/2]], NUMBER_COORDS_Y[box_num[a/2]],NUMBER_DIM_X[box_num[a/2]], NUMBER_DIM_Y[box_num[a/2]], BOX_PLACE_X[a]+INDICATOR_PLACE_X+NUMBER_PLACE_X,BOX_PLACE_Y[a]+INDICATOR_PLACE_Y+NUMBER_PLACE_Y,NUMBER_DIM_X[box_num[a/2]], NUMBER_DIM_Y[box_num[a/2]]);
			
		}
		
	}

	if (penalty > 0)
	{
		ball_x = STAGE_WIDTH / 4;
		ball_y = STAGE_HEIGHT / 2;
	    ball_x_velocity = 0;
	    ball_y_velocity = 10;
	}
	
	
	
	//Timer.
	timer = 300 - (round*15) - (Math.floor(supercounter/(FRAMERATE/10))/10);
	
	//Draw Scoreboard.
	ctx.drawImage(gameImage, SCOREBOARD_COORDS_X[0], SCOREBOARD_COORDS_Y[0], SCOREBOARD_DIM_X[0], SCOREBOARD_DIM_Y[0], SCOREBOARD_PLACE_X[0],SCOREBOARD_PLACE_Y[0], SCOREBOARD_DIM_X[0], SCOREBOARD_DIM_Y[0]);
	
	
	ctx.fillText(mouseX + " " + mouseY, 100,100);
	
	//Draw Timer.
	ctx.fillStyle = "#FFFFFF";
	if (timer >= 60 && Math.floor(timer% 60) < 10)
	{
		
		timerString = '0'+(Math.floor(timer / 60).toString()+ '0' + Math.floor(timer % 60).toString());
		//ctx.fillText(Math.floor(timer / 60)+ ':0' + Math.floor(timer % 60),500,24);
	}
	else if (timer >= 60)
	{
		timerString = '0'+(Math.floor(timer / 60).toString()+ Math.floor(timer % 60).toString());
		//ctx.fillText(Math.floor(timer / 60)+ ':' + Math.floor(timer % 60),500,24);	
	}
	else if (timer >= 10) 
	{
		timerString = '00'+(Math.floor(timer));
		//ctx.fillText((Math.floor(timer * 10)/10).toFixed(1),500,24);	
	}
	else
	{
		timerString = '000'+(Math.floor(timer));
	}
	
	for (var a = 7; a <= 10; a++)
	{
		timerStringNum = parseInt(timerString.substring(a-7,a-6));
		ctx.drawImage(gameImage, SMALL_NUMBER_COORDS_X[timerStringNum]
							   , SMALL_NUMBER_COORDS_Y[timerStringNum]
							   , SMALL_NUMBER_DIM_X[timerStringNum]
							   , SMALL_NUMBER_DIM_Y[timerStringNum]
							   , SCOREBOARD_PLACE_X[0] + SCOREBOARD_PLACE_X[a]
							   , SCOREBOARD_PLACE_Y[0] + SCOREBOARD_PLACE_Y[a]
							   , SMALL_NUMBER_DIM_X[timerStringNum]
							   , SMALL_NUMBER_DIM_Y[timerStringNum]);
	}
	
	
	
	
	//Draw Score.
	if (score > 999) {scoreString = score.toString();}
	else if (score > 99) {scoreString = '0'+score.toString();}
	else if (score > 9) {scoreString = '00'+score.toString();}
	else if (score > 0) {scoreString = '000'+score.toString();}
	else {scoreString = '0000'};
	
	for (var a = 1; a <= 4; a++)
	{
		scoreStringNum = parseInt(scoreString.substring(a-1,a));
		ctx.drawImage(gameImage, SMALL_NUMBER_COORDS_X[scoreStringNum]
							   , SMALL_NUMBER_COORDS_Y[scoreStringNum]
							   , SMALL_NUMBER_DIM_X[scoreStringNum]
							   , SMALL_NUMBER_DIM_Y[scoreStringNum]
							   , SCOREBOARD_PLACE_X[0] + SCOREBOARD_PLACE_X[a]
							   , SCOREBOARD_PLACE_Y[0] + SCOREBOARD_PLACE_Y[a]
							   , SMALL_NUMBER_DIM_X[scoreStringNum]
							   , SMALL_NUMBER_DIM_Y[scoreStringNum]);
	}
	
	//Draw Round.
	roundTen = parseInt((round + 1) / 10);
	roundOne = (round + 1) % 10;
	
		ctx.drawImage(gameImage, SMALL_NUMBER_COORDS_X[roundTen]
							   , SMALL_NUMBER_COORDS_Y[roundTen]
							   , SMALL_NUMBER_DIM_X[roundTen]
							   , SMALL_NUMBER_DIM_Y[roundTen]
							   , SCOREBOARD_PLACE_X[0] + SCOREBOARD_PLACE_X[5]
							   , SCOREBOARD_PLACE_Y[0] + SCOREBOARD_PLACE_Y[5]
							   , SMALL_NUMBER_DIM_X[roundTen]
							   , SMALL_NUMBER_DIM_Y[roundTen]);
	
		ctx.drawImage(gameImage, SMALL_NUMBER_COORDS_X[roundOne]
							   , SMALL_NUMBER_COORDS_Y[roundOne]
							   , SMALL_NUMBER_DIM_X[roundOne]
							   , SMALL_NUMBER_DIM_Y[roundOne]
							   , SCOREBOARD_PLACE_X[0] + SCOREBOARD_PLACE_X[6]
							   , SCOREBOARD_PLACE_Y[0] + SCOREBOARD_PLACE_Y[6]
							   , SMALL_NUMBER_DIM_X[roundOne]
							   , SMALL_NUMBER_DIM_Y[roundOne]);

	
	//ctx.fillText('Score: '+score,400,24);
	
	//Draw Bars.
	for (var a = 0 ; a <= bars_to_go - 1; a++)
	{
		if (target[a] < 10)
		{
			num[0] = 0;
			num[1] = target[a];
		}
		if (target[a] > 9) 
		{
			num[1] = target[a] % 10;
			num[0] = (target[a] - num[1]) / 10;
		}
	
		//Make blow up flag animation (this needs work, you don't see the yellow bars)
		if (a == bars_to_go - 1 && blow_up_flag > 0 && blow_up_flag % 2 == 0)
		{
			
			ctx.drawImage(gameImage, YELLOW_BAR_COORDS_X,YELLOW_BAR_COORDS_Y, YELLOW_BAR_DIM_X, YELLOW_BAR_DIM_Y, BAR_PLACE_X[a], BAR_PLACE_Y[a],YELLOW_BAR_DIM_X, YELLOW_BAR_DIM_Y);			
		}
		else
		{
			ctx.drawImage(gameImage, BAR_COORDS_X,BAR_COORDS_Y, BAR_DIM_X, BAR_DIM_Y, BAR_PLACE_X[a], BAR_PLACE_Y[a],BAR_DIM_X, BAR_DIM_Y);
		}

		
		for (var b = 0; b <= 1; b++)
		{
			ctx.drawImage(gameImage, SMALL_NUMBER_COORDS_X[num[b]]
								   , SMALL_NUMBER_COORDS_Y[num[b]]
								   , SMALL_NUMBER_DIM_X[num[b]]
								   , SMALL_NUMBER_DIM_Y[num[b]]
								   , BAR_PLACE_X[a] + SMALL_NUMBER_PLACE_X[0] + 17*b
								   , BAR_PLACE_Y[a] + SMALL_NUMBER_PLACE_Y[0] 
								   , SMALL_NUMBER_DIM_X[num[b]]
								   , SMALL_NUMBER_DIM_Y[num[b]])
		}
		
		
	}
	ctx.drawImage(gameImage, BLUE_BOX_COORDS_X
						   , BLUE_BOX_COORDS_Y
						   , BLUE_BOX_DIM_X
						   , BLUE_BOX_DIM_Y
						   , BAR_PLACE_X[bars_to_go - 1] + BLUE_BOX_PLACE_X
						   , BAR_PLACE_Y[bars_to_go - 1] + BLUE_BOX_PLACE_Y
						   , BLUE_BOX_DIM_X
						   , BLUE_BOX_DIM_Y);	
	

	
	if (base < 0)
	{
		base_num[0] = 10;
		base_num[1] = Math.abs(base);
	}
	
	if (base >= 0 && base < 10)
	{
		base_num[0] = 0;
		base_num[1] = base;
	}
	if (base > 9) 
	{
		base_num[1] = base % 10;
		base_num[0] = (base - base_num[1]) / 10;
	}


	console.log('base_num[0] = '+base_num[0]);
	console.log('base_num[1] = '+base_num[1]);
	for (var a = 0; a <= 1; a++)
	{
		ctx.drawImage(gameImage, YELLOW_SMALL_NUMBER_COORDS_X[base_num[a]]
							   , YELLOW_SMALL_NUMBER_COORDS_Y[base_num[a]]
							   , SMALL_NUMBER_DIM_X[base_num[a]]
							   , SMALL_NUMBER_DIM_Y[base_num[a]]
							   , BAR_PLACE_X[bars_to_go - 1] + BLUE_BOX_PLACE_X + SMALL_NUMBER_PLACE_X[1] + 17*a
							   , BAR_PLACE_Y[bars_to_go - 1] + BLUE_BOX_PLACE_Y + SMALL_NUMBER_PLACE_Y[1] 
							   , SMALL_NUMBER_DIM_X[base_num[a]]
							   , SMALL_NUMBER_DIM_Y[base_num[a]])
	}

			
	//Pause Button.

			ctx.drawImage(gameImage, PAUSE_BUTTON_COORDS_X[0]
							   , PAUSE_BUTTON_COORDS_Y[0]
							   , PAUSE_BUTTON_DIM_X[0]
							   , PAUSE_BUTTON_DIM_Y[0]
							   , PAUSE_BUTTON_PLACE_X
							   , PAUSE_BUTTON_PLACE_Y 
							   , PAUSE_BUTTON_DIM_X[0]
							   , PAUSE_BUTTON_DIM_Y[0]);

		if (mouseX >= PAUSE_BUTTON_PLACE_X && mouseX <= PAUSE_BUTTON_PLACE_X + PAUSE_BUTTON_DIM_X[0] - 1 
		 && mouseY >= PAUSE_BUTTON_PLACE_Y && mouseY <= PAUSE_BUTTON_PLACE_Y + PAUSE_BUTTON_DIM_Y[0] - 1
		 && mouseflag == 1)
		 {
			ctx.drawImage(gameImage, PAUSE_BUTTON_COORDS_X[1]
							   , PAUSE_BUTTON_COORDS_Y[1]
							   , PAUSE_BUTTON_DIM_X[1]
							   , PAUSE_BUTTON_DIM_Y[1]
							   , PAUSE_BUTTON_PLACE_X
							   , PAUSE_BUTTON_PLACE_Y 
							   , PAUSE_BUTTON_DIM_X[1]
							   , PAUSE_BUTTON_DIM_Y[1]);
			 
			 pauseGameFlag = 1;
		 }


	var game_alert = pause_mode / 5;
	
	//Game Alerts.
	if (pause_mode == 0)
	{
		console.log('game_alert = '+game_alert);
		var grad = ctx.createLinearGradient(0,0,0,479);
		grad.addColorStop(0,"#0000AA");
		grad.addColorStop(1,"#0000FF");
		ctx.fillStyle = grad;
		//ctx.fillStyle = "#008000";
		ctx.fillRect(32,32,stage.width-64, stage.height-64);
		ctx.strokeStyle="#FFFF00";		//This may cause the ball to go yellow.
		ctx.rect(32,32,stage.width-64, stage.height-64);
		//ctx.stroke();
		
		//game_alert is usually in 2s

			ctx.drawImage(gameLogo, LOGO_COORD_X, LOGO_COORD_Y, LOGO_DIM_X, LOGO_DIM_Y, LOGO_PLACE_X, LOGO_PLACE_Y,LOGO_DIM_X,LOGO_DIM_Y);
		
		for (var a = 0+ (16*game_alert); a <= 15 + (16*game_alert); a++)
		{
			//console.log(game_alert, a);
			ctx.fillStyle = "#000000";
			ctx.fillText(ALERT_TEXT[a], ALERT_ROW_X[a % 16]+2, ALERT_ROW_Y[a % 16]+2);
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText(ALERT_TEXT[a], ALERT_ROW_X[a % 16], ALERT_ROW_Y[a % 16]);
		}
		supercounter = 1;
	}
	
	//Game Over Alert.
	if (pause_mode == 990)		
	{
		console.log('game_alert = '+game_alert);
		var grad = ctx.createLinearGradient(0,0,0,479);
		grad.addColorStop(0,"#AA0000");
		grad.addColorStop(1,"#FF0000");
		ctx.fillStyle = grad;
		//ctx.fillStyle = "#008000";
		ctx.fillRect(32,32,stage.width-64, stage.height-64);
		ctx.strokeStyle="#FFFF00";		//This may cause the ball to go yellow.
		ctx.rect(32,32,stage.width-64, stage.height-64);
		//ctx.stroke();
		
		//game_alert is usually in 2s
		
		for (var a = 0; a <= 15; a++)
		{
			//console.log(game_alert, a);
			ctx.fillStyle = "#000000";
			ctx.fillText(GAME_OVER_TEXT[a], ALERT_ROW_X[a % 16]+2, ALERT_ROW_Y[a % 16]+2);
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText(GAME_OVER_TEXT[a], ALERT_ROW_X[a % 16], ALERT_ROW_Y[a % 16]);
		}
	}

	//Beat Game Alert
	if (pause_mode == 1000)		
	{
		console.log('game_alert = '+game_alert);
		var grad = ctx.createLinearGradient(0,0,0,479);
		grad.addColorStop(0,"#FF00B3");
		grad.addColorStop(1,"#FFDDB3");
		ctx.fillStyle = grad;
		//ctx.fillStyle = "#008000";
		ctx.fillRect(32,32,stage.width-64, stage.height-64);
		ctx.strokeStyle="#FFFF00";		//This may cause the ball to go yellow.
		ctx.rect(32,32,stage.width-64, stage.height-64);
		//ctx.stroke();
		
		//game_alert is usually in 2s
		
		for (var a = 0; a <= 15; a++)
		{
			//console.log(game_alert, a);
			ctx.fillStyle = "#000000";
			ctx.fillText(BEAT_GAME_TEXT[a], ALERT_ROW_X[a % 16]+2, ALERT_ROW_Y[a % 16]+2);
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText(BEAT_GAME_TEXT[a], ALERT_ROW_X[a % 16], ALERT_ROW_Y[a % 16]);
		}
	}

	//if (pause_mode == 0)
	//{
		
		
	//}
	if (startFlag ==  1) 
		{
			ctx.fillStyle = "#404040";
			ctx.fillText('GAME BEGINS IN '+(Math.floor(penalty/30) + 1),72,242);
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText('GAME BEGINS IN '+(Math.floor(penalty/30) + 1),70,240);
			
		}
			
	if (pauseGameFlag > 1)
	
	{
			ctx.fillStyle = "#000000";
			ctx.fillRect(0,0,stage.width,stage.height);
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText('GAME PAUSED.', 232, 240);
			ctx.fillText('CLICK ON THE GAME SCREEN TO CONTINUE.', 100, 270);
	}
	
		 
	
			//Diagnostic Text.
			//ctx.fillStyle = "#404040";
			//ctx.fillText(supercounter,52,52);
			//ctx.fillStyle = "#FFFFFF";
			//ctx.fillText(supercounter,50,50);
		
	/*
	*
	*
	*
	*
	*
	*
	*
	*END OF DRAWING...
	*
	*
	*
	*
	*
	*
	*
	*/
	
	//Calculate ball movement, if pause mode ends in 5.  Else, leave the ball alone.
	if (pause_mode % 10 == 5 && pauseGameFlag < 2)
	{
		ball_x += ball_x_velocity;
		ball_y += ball_y_velocity;
	}
	
	
	
	
	//Wall collision detection.
	if (ball_x + BALL_RADIUS >= BALL_BOUNDARIES[1])		//If the ball hits the east border...
	{
		CLICK_1.play();
		ball_x = BALL_BOUNDARIES[1] - BALL_RADIUS;		//Reset the x-value to match the border.
		ball_x_velocity *= -1;							//Reverse the x-direction.
	}
	if (ball_x - BALL_RADIUS <= BALL_BOUNDARIES[0])		//If the ball hits the west border...
	{
		CLICK_1.play();
		ball_x = BALL_BOUNDARIES[0] + BALL_RADIUS;		//Reset the x-value to match the border.
		ball_x_velocity *= -1;							//Reverse the x-direction.
	}
	
	if (ball_y + BALL_RADIUS >= BALL_BOUNDARIES[3])		//If the ball hits the south border...
	{
		GROAN.play();
		ball_y = BALL_BOUNDARIES[3] - BALL_RADIUS;		//Reset the y-value to match the border.
		ball_y_velocity *= -1;							//Reverse the y-direction.
		penalty = FRAMERATE * 5;
		
		
	}
	if (ball_y - BALL_RADIUS <= BALL_BOUNDARIES[2])		//If the ball hits the north border... 
	{
		CLICK_1.play();
		ball_y = BALL_BOUNDARIES[2] + BALL_RADIUS;		//Reset the y-value to match the border.
		ball_y_velocity *= -1;							//Reverse the y-direction.
	}
	
	//Box collission detection.
	if (ball_y - BALL_RADIUS <= BOX_DIM_Y[0])
	{
		ball_y = BOX_DIM_Y[0] + BALL_RADIUS;
		ball_y_velocity *= -1;
		
		for (var a = 0; a <= 4; a++)
		{
			if (ball_x >= BOX_PLACE_X[a] && ball_x <= BOX_PLACE_X[a] + BOX_DIM_X[BOX_ORDER[a]])
			{
				console.log('Previous value: '+base);

				lit_flag = a;
				if (a % 2 == 0)
				{
					if (box_num[a/2] == 1) {CLICK_1.play();}
					if (box_num[a/2] == 2) {CLICK_2.play();}
					if (box_num[a/2] == 3) {CLICK_3.play();}
					if (box_num[a/2] == 4) {CLICK_4.play();}
					if (symbol[a/2] == 1) {base += box_num[a/2];}
					if (symbol[a/2] == 2) {base -= box_num[a/2];}
					console.log('+-: '+ box_num[a/2]);
					console.log('New value: '+base);
				}
				else
				{
					CLICK_1.play();
				}
				
				
				
			}
			
		}

		
	/*
	for (var a = 0; a <= 2; a++)
	{
		if (base < box_num[a])
		{
			symbol[a] = 1;
		}
		
	}
	*/

}
	
	
	//https://gamedev.stackexchange.com/questions/4253/in-pong-how-do-you-calculate-the-balls-direction-when-it-bounces-off-the-paddl
	//Paddle collision detection.
	if (ball_y + BALL_RADIUS >= PADDLE_Y && ball_x + BALL_RADIUS >= paddle_pos - (PADDLE_WIDTH / 2) && ball_x - BALL_RADIUS <= paddle_pos + (PADDLE_WIDTH / 2))
	{
		CLICK_1.play();
		relativeIntersect = (ball_x - paddle_pos) / (PADDLE_WIDTH / 2);
		finalBounceAngle = relativeIntersect * BOUNCE_ANGLE;
		console.log("relativeIntersect: " + relativeIntersect);
		console.log("finalBounceAngle in radians: " + finalBounceAngle);
		console.log("Math.cos(finalBounceAngle) : "+ Math.cos(finalBounceAngle));
		console.log("-Math.sin(finalBounceAngle) : "+ -Math.sin(finalBounceAngle));
		ball_y = PADDLE_Y - BALL_RADIUS;
		//ball_y_velocity *= -1;
		
		
		if (relativeIntersect >= -1 && relativeIntersect <= 1)
		{
			ball_x_velocity = BALL_SPEED * Math.sin(finalBounceAngle); 	
			ball_y_velocity = BALL_SPEED * -Math.cos(finalBounceAngle);  
			console.log("ball_x_velocity: "+ball_x_velocity);
			console.log("ball_y_velocity: "+ball_y_velocity);
		}
		//sohcahtoa
		//
	}
	
	if (lit_flag > -1)
	{
		lit_time--;
		if (lit_time < 1)
		{
			lit_flag = -1;
		}
		
	}
	
	
	//Blow up flag detection.
	if (blow_up_flag > 0)
	{
			blow_up_flag--;
	}
	if (blow_up_flag == 0)
	{
		blow_up_flag = -1;
		bars_to_go--;
		base = 0;
		do
		{
			do
			{
				
				for (var a = 0; a <= 2; a++)
				{
					box_num[a] = Math.floor(Math.random()*4)+1;
					symbol[a] = 1;
				}
			}
			while (box_num[0] % 2 == 1);
		}
		while (box_num[1] % 2 == 0);
		
	}
	//Round win
	if (bars_to_go == 0)
	{
		ROUND_WIN.play();
		bars_to_go = 8;
		supercounter = 1;
		round++;
		if (round < 12)
		{
			
			//bars_to_go = 8;
			for (var a = 0; a <= 7; a++)
			{
				target[a] = Math.floor(Math.random()*10)+5;
			}
			//supercounter = 0;
			pause_mode += 10;
			ball_x = STAGE_WIDTH / 4;
			ball_y = STAGE_HEIGHT / 2;
			ball_x_velocity = 0;
			ball_y_velocity = 10;
			for (var a = 0; a <= 2; a++)
			{
				symbol[a] = 1;
			}
			penalty = 150;
			startFlag = 1;
		}
		startFlag = 1;
	}
	
	
	//Time up
	if (timer <= 0)
	{
		GAME_OVER.play();
		supercounter = 0; 
		pause_mode = 990;  //Game Over mode
		startFlag = 2;
	}
	
	//Beat Game
	if (round == 12)
	{
		
		round = 13;
		timer = 1; 
		BEAT_GAME.play();
		pause_mode = 1000;
		startFlag = 2;
	}
	
	
	//If the pause mode ends in 5, run the timer.
	if (pause_mode % 10 == 5 && startFlag == 0 && pauseGameFlag < 2)
	{
		supercounter++;	
	}
	
	if (penalty > 0)
	{
		penalty--;
	}
	
	if (penalty == 1 && startFlag == 1)
	{
		if (round == 0) {ROUND_1.play();}   //5:00
		if (round == 1) {ROUND_2.play();}
		if (round == 2) {ROUND_3.play();}
		if (round == 3) {ROUND_4.play();}
		if (round == 4) {ROUND_5.play();}   //4:00
		if (round == 5) {ROUND_6.play();}
		if (round == 6) {ROUND_7.play();}
		if (round == 7) {ROUND_8.play();}
		if (round == 8) {ROUND_9.play();}   //3:00
		if (round == 9) {ROUND_10.play();} 
		if (round == 10) {ROUND_11.play();} 
		if (round == 11) {ROUND_12.play();} 
		
		
	}
	
	
	if (penalty == 0 && startFlag == 1)
	{
		startFlag = 0;
	}
	
	//Move stars.
	for (var a = 0; a <= 49; a++)
	{
		starfieldY[a] += starfieldR[a];
		if (starfieldY[a] > 490)
		{
			starfieldX[a] = Math.floor(Math.random()* (STAGE_WIDTH / 2));
			starfieldY[a] = -10;
			starfieldR[a] = Math.floor(Math.random() * 3)+1;
		}
		
		
	}
	
	
	console.log('pause_mode = '+pause_mode);

		
}

function mouseCoords(event)
{
	if (browser == "f" || browser == "m")
	{
	mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
	}
	else //"s" or "c"
	{
	mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	}	
	
	paddle_pos = mouseX;
	if (paddle_pos > ((STAGE_WIDTH/2) - (PADDLE_WIDTH / 2)))
		{
			paddle_pos = ((STAGE_WIDTH/2) - (PADDLE_WIDTH / 2));
		}
	
	if (paddle_pos < (PADDLE_WIDTH / 2))
		{
			paddle_pos = (PADDLE_WIDTH / 2);
		}
	//console.log(paddle_pos);
}


function mouseDown(event)
{
	if (mouseflag == 0) {mouseflag = 1;}

	if (browser == "f" || browser == "m")
	{
	mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
	}
	else //"s" or "c"
	{
	mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	}
		
	if (pauseGameFlag == 2)
	{
		pauseGameFlag = 3;
	}
	

}

function mouseUp(event)
{	
	if (mouseflag == 1) 
	{
		mouseflag = 0;
		
	}
	
	if (pauseGameFlag == 1)
	{
		pauseGameFlag = 2;
	}
	
	if (pauseGameFlag == 3)
	{
		pauseGameFlag = 0;
	}
	
	for (var a = 0; a <= 2; a++)
	{
		symbol[a] = 3-symbol[a];
		
	}
	console.log(event.button);
	
	//Make a score.
	if ( base == target[bars_to_go-1] )
	{
		BAR_HIT.play();
		score += base;
		blow_up_flag = 20;
	}
	
	//If the game is in the first pause mode, start the game.
	//Let the symbols be +.
	if (pause_mode % 10 == 0)
	{
		for (var a = 0; a <= 2; a++)
		{
			symbol[a] = 1;
		}
		pause_mode += 5;
		penalty = 150;
		startFlag = 1;
		if (supercounter == 1 && round < 12) 
		{
			COUNTDOWN.play();
			supercounter = 0;
		}
	}
	
	
	//Reset game.
	if (pause_mode == 995 || pause_mode == 1005)
	{
		pause_mode = 0;
		penalty = 150;
		//startFlag = 1;
	    timer= 0;
		supercounter = 3;
		round = 0;
		score = 0;
		scoreString = '';
		scoreStringNum = 0;

		timerString = '';
		timerStringNum = 0;
		penalty = 0;
		startFlag = 0;

		mouseflag = 0;
		symbol = [1,1,1];
		box_num = [1,3,1];
		bars_to_go = 8;
		base = 0;
		
		ball_x = STAGE_WIDTH / 4;
		ball_y = STAGE_HEIGHT / 2;

		ball_x_velocity = 0;
		ball_y_velocity = 10;

	}

	
	
	
	if (browser == "f" || browser == "m")
	{
	mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
	}
	else //"s" or "c"
	{
	mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	}
}	
