var yourCharId;
var currentClickedFigureId;
var defendercount = 0;
var defenderId;
var tempFigId;
// array of objects for  characters 
var marvelPropsArray = [
							{
								name : 'CpAmerica',
								marvelGroup : '',
								originalHealthPointsCount : 100, 
								healthPointsCount : 100, 
								baseAttackPower : 8,
								attackPower : 8,
								counterAttackPower :5
							},
							{
								name : 'IronMan',
								marvelGroup : '',
								originalHealthPointsCount : 150, 
								healthPointsCount : 150,  
								baseAttackPower : 25,
								attackPower : 25,
								counterAttackPower :15
							},
							{
								name : 'Spiderman',
								marvelGroup : '',
								originalHealthPointsCount : 125, 
								healthPointsCount : 125, 
								baseAttackPower : 30,
								attackPower : 30,
								counterAttackPower :20
							},
							{
								name : 'Hulk',
								marvelGroup : '',
								originalHealthPointsCount : 200, 
								healthPointsCount : 200, 
								baseAttackPower : 15,
								attackPower : 15,
								counterAttackPower :35
							}
				];

$(document).ready(function(){

	initializeHealthPoints();

    $('.marvel').on('click', function() {
    	//trying to find index oh html element figure
    	currentClickedFigureId = $(this).attr('id').replace("figid", "");

    	if (!yourCharId) {
    		//trying to set user cliked image to yourcharacter div
    		$("#yourcharacterdivid").append(this);
    		console.log(" your id:"+currentClickedFigureId);
    		yourCharId = currentClickedFigureId;
    		marvelPropsArray[yourCharId].marvelGroup = "yourCharacter";
    		$('.marvel').each(function(){
			  	tempFigId = $(this).attr('id').replace("figid", "");
    			if ( yourCharId !== tempFigId) {
			  	//	console.log("id:"+$(this).attr('id'));
			  		console.log(" probable enemy id:"+tempFigId);
			  		$("#enemiesdivid").append($(this));
			  		// array index starts with 0
			  		marvelPropsArray[tempFigId].marvelGroup = "enemies";
			  	}
			});
    		console.log("After dividing the figures marvelPropsArrayContents:");
		

    	}

    	if ( marvelPropsArray[currentClickedFigureId].marvelGroup === "enemies" ) {
    		//tryning to set defender from enimies group
    		console.log("enemies id:"+currentClickedFigureId);
    		// var defendercount = $("#defenderdivid figure").children().length;
    	//	defendercount = $("#defenderdivid figure").length;
    		console.log("defendercount:"+defendercount);
    		console.log("yourCharId:"+yourCharId);

    		if ( (marvelPropsArray[yourCharId].healthPointsCount > 0) &&
    				( defendercount <= 0 ) ) {
    			defendercount = 1;
    			$("#defenderdivid").append($(this));
    			$('#attackinfoparaid').html("");
    			defenderId = $(this).attr('id').replace("figid", "");
    			defendercount = $("#defenderdivid figure").length;
    	//		console.log("now defendercount:"+defendercount);
    			console.log("initial values of yourCharacter and Defender");
    						    			
    		}
    	}
    });


    $('#attackbuttonid').on('click', function() {
    	//processing healthponts,attackpower for both your character and defender
    	if ( yourCharId &&
    		(marvelPropsArray[yourCharId].healthPointsCount > 0) &&
    		( defendercount > 0 ) ) {

    		marvelPropsArray[defenderId].healthPointsCount -=
    			marvelPropsArray[yourCharId].attackPower;
    		$('#attackinfoparaid').html("You attacked "+ marvelPropsArray[defenderId].name + " for " +
	    	 marvelPropsArray[yourCharId].attackPower + " damage.");
	    	console.log("You attacked "+marvelPropsArray[defenderId].name + " for " + marvelPropsArray[yourCharId].attackPower + " damage.");
	    	$('#fchpid'+defenderId).html(marvelPropsArray[defenderId].healthPointsCount);
	    	marvelPropsArray[yourCharId].attackPower +=
	    		marvelPropsArray[yourCharId].baseAttackPower;

	     	if (marvelPropsArray[defenderId].healthPointsCount > 0) {
	    		marvelPropsArray[yourCharId].healthPointsCount -=
	    			marvelPropsArray[defenderId].counterAttackPower;

	     		console.log(marvelPropsArray[defenderId].name +
		     		" attacked you back for " +
		    	 marvelPropsArray[defenderId].counterAttackPower + " damage.");
	    		$('#fchpid'+yourCharId).html(marvelPropsArray[yourCharId].healthPointsCount);
		     	
	    		$('#attackinfoparaid').append("<br>"+ marvelPropsArray[defenderId].name +
		     		" attacked you back for " +
		    	 marvelPropsArray[defenderId].counterAttackPower + " damage.");
    		}

    		//if defender health points become zero,hide it and select another defender.
    		if (marvelPropsArray[defenderId].healthPointsCount <= 0) {
    			$('#figid'+defenderId).hide();
    			defendercount = 0;
    			$('#attackinfoparaid').html("You have defeated "+ marvelPropsArray[defenderId].name + ".");
    			console.log("enemies count:"+$("#enemiesdivid figure").length);
    			if ($("#enemiesdivid figure").length > 0) {
    				$('#attackinfoparaid').append(", you can choose to fight another enemy.");
    			} else {
    				$('#attackinfoparaid').html("You Won!!!! GAME OVER!!!");
    				addRestartButton();
    			}
    					    		
	    	}
		    	
    		console.log("Current Values of yourCharacter and Defender");
    		

	    	if (marvelPropsArray[yourCharId].healthPointsCount <= 0) {
	    		console.log("You been defeated...GAME OVER!!!");
	    		$('#attackinfoparaid').html("You been defeated...GAME OVER!!!");
	    		addRestartButton();
	    		
	    	}

    	} else {
    		if ( yourCharId &&
    		(marvelPropsArray[yourCharId].healthPointsCount > 0) &&
    		( defendercount <= 0 ) ) {
    			$('#attackinfoparaid').html("No enemy here.");
    		}

    	}

    });

});	

function addRestartButton() {

	var b = $('<button>');
	b.attr('id', 'restartbuttonid');
	b.css('color','black');
	b.css('background', 'white');
	b.text("Restart");
	b.on('click', function() {
    	console.log("inside restartbuttonid click");
    	restoreCharacterFigures();
    	initializeHealthPoints();
		yourCharId = undefined;
		currentClickedFigureId = undefined;
		defendercount = 0;
		defenderId = undefined;
		tempFigId = undefined;
		$('#attackinfoparaid').html("");
		$("#restartbuttonid").remove();
    });
	$("#attackinfodivid").append(b);

}

function restoreCharacterFigures() {	
	console.log("inside restoreCharacterFigures");
    $(".marvel").each(function() {
    	$("#initialcharacterdivid").append($(this));
    	$(this).show();
    	console.log("hello");
	});	    
}
		    	

function initializeHealthPoints() {		    	
	$.each(marvelPropsArray, function(index, val) {
		console.log("index:"+index+", originalHealthPointsCount:"+val.originalHealthPointsCount);
		$('#fchpid'+index).html(val.originalHealthPointsCount);
		marvelPropsArray[index].marvelGroup = "";
		marvelPropsArray[index].healthPointsCount = marvelPropsArray[index].originalHealthPointsCount;
		$('#fcnameid'+index).html(val.name);

	});
}
