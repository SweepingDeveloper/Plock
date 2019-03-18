/*
CONSTANTS FOR:

PLOCK


Special Thanks to:

www.gaminglogy.com
W3Schools
Stack Overflow
Home and Learn


*/

var STAGE_WIDTH = 640, 
    STAGE_HEIGHT= 480,
	FRAMERATE   =  33,
	GAME_FONTS  = "bold 20px sans-serif";

var PADDLE_Y = STAGE_HEIGHT * .9,
    PADDLE_WIDTH = STAGE_WIDTH * .1;
	
var PADDLE_SECTIONS = [0,PADDLE_WIDTH * .3,PADDLE_WIDTH * .7,PADDLE_WIDTH];
	
var BALL_RADIUS = 5;

var BALL_SPEED = 10;

var BALL_BOUNDARIES = [0,STAGE_WIDTH / 2, 0, STAGE_HEIGHT];  //Min x, Max x, Min y, Max y

var BOUNCE_ANGLE = 1.309;  //75 degrees


var NUMS = [0,1,2,3,4,5,6,7,8,9];

var IMAGE_PATH = 'pics/plock/pic_assets.png';
var LOGO_PATH = 'pics/plock/plock_logo.png';

var LOGO_COORD_X = 0;
var LOGO_COORD_Y = 0;
var LOGO_DIM_X = 449;
var LOGO_DIM_Y = 105;
var LOGO_PLACE_X = 96;
var LOGO_PLACE_Y = 64;



var BOX_COORDS_X = [0,100,200,300,0,100,200,300];
var BOX_COORDS_Y = [0,0,0,0,100,100,100,100];
var BOX_DIM_X = [100,100,100,10,100,100,100,10];
var BOX_DIM_Y = [100,100,100,100,100,100,100,100];
var BOX_PLACE_X = [0,100,110,210,220];
var BOX_PLACE_Y = [0,0,0,0,0];

var INDICATOR_COORDS_X = 310;
var INDICATOR_COORDS_Y = 0;
var INDICATOR_DIM_X = 58;
var INDICATOR_DIM_Y = 58;
var INDICATOR_PLACE_X = 20;
var INDICATOR_PLACE_Y = 20;

var SYMBOL_COORDS_X = [368,384,400,416,432];
var SYMBOL_COORDS_Y = [0,0,0,0,0];
var SYMBOL_DIM_X = [16,16,16,16,16];
var SYMBOL_DIM_Y = [16,16,16,16,16];
var SYMBOL_PLACE_X = 5;
var SYMBOL_PLACE_Y = 21;

var NUMBER_COORDS_X = [0,30,60,90,120,150,180,210,240,270,300];
var NUMBER_COORDS_Y = [200,200,200,200,200,200,200,200,200,200,200];
var NUMBER_DIM_X = [30,30,30,30,30,30,30,30,30,30,30];
var NUMBER_DIM_Y = [50,50,50,50,50,50,50,50,50,50,50];
var NUMBER_PLACE_X = 24;
var NUMBER_PLACE_Y = 4;

var BAR_COORDS_X = 310;
var BAR_COORDS_Y = 58;
var BAR_DIM_X = 320;
var BAR_DIM_Y = 32;
var BAR_PLACE_X = [320,320,320,320,320,320,320,320];
var BAR_PLACE_Y = [100,132,164,196,228,260,292,324];


var YELLOW_BAR_COORDS_X = 310;
var YELLOW_BAR_COORDS_Y = 90;
var YELLOW_BAR_DIM_X = 320;
var YELLOW_BAR_DIM_Y = 32;

var PAUSE_BUTTON_COORDS_X = [368,448];
var PAUSE_BUTTON_COORDS_Y = [16,16];
var PAUSE_BUTTON_DIM_X = [80,80];
var PAUSE_BUTTON_DIM_Y = [42,42];
var PAUSE_BUTTON_PLACE_X = 440;
var PAUSE_BUTTON_PLACE_Y = 420;



var BLUE_BOX_COORDS_X = 310;
var BLUE_BOX_COORDS_Y = 122;
var BLUE_BOX_DIM_X = 64;
var BLUE_BOX_DIM_Y = 32;
var BLUE_BOX_PLACE_X = 128;
var BLUE_BOX_PLACE_Y = 32;

var SMALL_NUMBER_COORDS_X = [311,328,345,362,379,396,413,430,447,464];
var SMALL_NUMBER_COORDS_Y = [155,155,155,155,155,155,155,155,155,155];
var YELLOW_SMALL_NUMBER_COORDS_X = [345,362,379,396,413,430,447,464,481,498,515];
var YELLOW_SMALL_NUMBER_COORDS_Y = [200,200,200,200,200,200,200,200,200,200,200];
var SMALL_NUMBER_DIM_X = [16,16,16,16,16,16,16,16,16,16,16];
var SMALL_NUMBER_DIM_Y = [26,26,26,26,26,26,26,26,26,26,26];
var SMALL_NUMBER_PLACE_X = [143,15];
var SMALL_NUMBER_PLACE_Y = [3,3];

//Element 0 is the scoreboard itself.
//Elements 1-4 are the game score.
//Elements 5-6 are the round numbers.
//Elements 7-10 are the time.
//SCOREBOARD_PLACE_X and SCOREBOARD_PLACE_Y elements 1-9 are relative to element 0.
var SCOREBOARD_COORDS_X = [0,35,52,69,86,134,151,211,228,249,266];
var SCOREBOARD_COORDS_Y = [250,260,260,260,260,260,260,260,260,260,260];
var SCOREBOARD_DIM_X = [320,16,16,16,16,16,16,16,16,16,16];
var SCOREBOARD_DIM_Y = [64,26,26,26,26,26,26,26,26,26,26];
var SCOREBOARD_PLACE_X = [320,35,52,69,86,134,151,211,228,249,266];
var SCOREBOARD_PLACE_Y = [0,10,10,10,10,10,10,10,10,10,10];

var STAR_COLOR = ['#101010','#202020','#303030','#404040'];


var BOX_ORDER = [0,3,1,3,2];
var LIT_BOX_ORDER = [4,7,5,7,6];

var MAX_LIT_TIME = 15;

var MAX_TIMER = 300;

var ALERT_ROW_X = [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40];
var ALERT_ROW_Y = [60,84,108,132,156,180,204,228,252,276,300,324,348,372,396,420];


var ALERT_TEXT =[
				 //game_alert == 0
				  ''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,'                     BY THE SWEEPING DEVELOPER'
				 ,'                                   MADE IN 2017'
				 ,''
				 ,'             CLICK ON THE GAME SCREEN TO BEGIN*'
				 ,''
				 ,' (*IF YOU DONT SEE THE LOGO, WAIT A FEW SECONDS.)'
				 ,''
				 ,''
				 ,''
				 ,''
				 
				 //game_alert == 1
				 ,'','','','','','','','','','','','','','','',''
				 
				 //game_alert == 2
				 
				 
				 
				 ]

var GAME_OVER_TEXT = [ ''
				 ,'' 
				 ,'                                     TIME IS UP!'
				 ,'		                    '
				 ,''
				 ,''
				 ,'                                     GAME OVER.'
				 ,''
				 ,''
				 ,'       CLICK ON THE GAME SCREEN TO START OVER.'
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,'']

				 
var BEAT_GAME_TEXT = [ ''
				 ,'' 
				 ,'                              CONGRATULATIONS!'
				 ,'		                    '
				 ,''
				 ,''
				 ,'                             YOU BEAT THE GAME!'
				 ,''
				 ,''
				 ,'       CLICK ON THE GAME SCREEN TO START OVER.'
				 ,''
				 ,''
				 ,''
				 ,''
				 ,''
				 ,'']
				 
var HIT = new Audio('audio/plock/hit.wav');
var BAR_HIT = new Audio('audio/plock/bar_hit.wav');
var CLICK_1 = new Audio('audio/plock/click_1.wav');
var CLICK_2 = new Audio('audio/plock/click_2.wav');
var CLICK_3 = new Audio('audio/plock/click_3.wav');
var CLICK_4 = new Audio('audio/plock/click_4.wav');
var ROUND_WIN = new Audio('audio/plock/applause4.wav');
var GAME_OVER = new Audio('audio/plock/game_over.wav');
var GROAN = new Audio('audio/plock/crowd-groan.wav');
var COUNTDOWN = new Audio('audio/plock/54321.wav');
var ROUND_1 = new Audio('audio/plock/round_1.wav');
var ROUND_2 = new Audio('audio/plock/round_2.wav');
var ROUND_3 = new Audio('audio/plock/round_3.wav');
var ROUND_4 = new Audio('audio/plock/round_4.wav');
var ROUND_5 = new Audio('audio/plock/round_5.wav');
var ROUND_6 = new Audio('audio/plock/round_6.wav');
var ROUND_7 = new Audio('audio/plock/round_7.wav');
var ROUND_8 = new Audio('audio/plock/round_8.wav');
var ROUND_9 = new Audio('audio/plock/round_9.wav');
var ROUND_10 = new Audio('audio/plock/round_10.wav');
var ROUND_11 = new Audio('audio/plock/round_11.wav');
var ROUND_12 = new Audio('audio/plock/round_12.wav');
var BEAT_GAME = new Audio('audio/plock/beat_game.wav');



//For audio files:
/*
var audio = new Audio('audio.mp3');
audio.play();

*/

//4611.24 -67.87
//578.30  -22.13