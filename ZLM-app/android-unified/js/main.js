var zero_la_mie = {};
zero_la_mie.bauturi = [];
zero_la_mie.istoric = [];
var icon_path = false;
zero_la_mie.alcool_pur = 0;
var step = [];
var lang = '';

if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i))
	var click_event = "touchstart";
else
	var click_event = "click";

 // Disable overscroll / viewport moving on everything but scrollable divs
 $('body').on('touchmove', function (e) {
      if (!$('.scrollable').has($(e.target)).length) 
	  {
		  e.preventDefault();
	  }
 });

function alertDismissed() {
	// do something
}

function _(tag, string, replace){
	$(tag+":contains("+string+")").text(replace);
}

/*
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
*/

var dpi = "hdpi";
$( document ).bind('pageinit', function(){
	$('img').each(function(){
		if (window.devicePixelRatio=="1.5" || $(document).width() > 460)
		{
			dpi = "hdpi";
			var src = $(this).attr('src').replace("img", "img-hdpi");
		}

		if (window.devicePixelRatio=="2" || $(document).width() >= 700)
		{
			dpi = "xhdpi";
			var src = $(this).attr('src').replace("img", "img-xhdpi");
		}
		
		$(this).attr('src', src);
	});
	var language = navigator.language.split("-");
	lang = (language[0]);

	if (lang==="ro")
	{
		_("div.title", "WELCOME", "BINE AI VENIT");
		_("div.title", "CHOOSE YOUR GENDER", "ALEGE SEXUL");
		_("div.text", "Please configure your profile so we can make a better estimate of your blood alchool level.", "Te rugam sa completezi profilul pentru face o estimare corecta a nivelului de alcool din sange.");
		_("span", "Male", "Masculin");
		_("span", "Female", "Feminin");
		_("td div", "YOUR WEIGHT", "ALEGE GREUTATEA");
		_("td div", "YOUR HEIGHT", "ALEGE INALTIMEA");
		_("a", "I'm all done", "Pasul urmator");
		_("span", "Your Bio is set. You can go and change the information whenever you want.", "Ai setat Bio. Acum poti sa te intorci si sa schimbi informatia oricand doresti.");
		_("span", "Now create the drinks combination you want to find out when you will have 0% blood alcohol.", "Creaza combinatia de bauturi pe care o doresti pentru a afla cand vei avea ZERO LA MIE.");
		_("span", 'Press the button above "Add a drink" and start the process.', "Apasa butonul \"Adauga o bautura\" si poti incepe.");
		_("span", "Touch to add a drink", "Adauga o bautura");
		_("div.tab", "Add drinks", "Bauturi");
		_("div.tab", "Drinking time", "Ore consum");
		_("div.tab", "Calculate time", "Calculeaza timp");
		_("div.title", "CHOOSE DRINK TYPE", "ALEGE TIPUL DE BAUTURA");

		_("td", "Beer", "Bere");
		_("td", "Wine", "Vin");
		_("td", "Spirits", "Spirtoase");

		_("td.label", "Specify qty.", "Cantitate");
		_("a", "Add the drink", "Adauga bautura");
		_("span", "Add another drink", "Adauga inca o bautura");

		_("a", "Set your time", "Seteaza timpul");
		_("a", "Calculate", "Calculeaza timpul");

		_("td", "I started at", "Am inceput la");
		_("td", "I finished at", "Am incheiat la");

		_("span", "You started drinking at", "Ai inceput sa bei la ora");
		_("span", "and finished at", "si ai incheiat la ora");

		_("h1", "Your blood alcohol level will reach zero at:", "Vei avea zero la mie alcoolemie in sange la ora:");

		_("p", "History", "Istoric");
		_("p", "Drinks", "Bauturi");
		_("p", "Results", "Rezultate");

		_("a", "Start again", "Calculeaza din nou");
		_("a", "This is your history", "Listele tale de bauturi");
		_("a", "Start again", "Incepe un calcul nou");

		_("div.disclaimer", "In Romania, the legal blood alcohol limit is ZERO and you are responsible for your actions. You are allowed to get behind the wheel after the above specified time.", "In Romania, limita legala de alcoolemie in sange este ZERO LA MIE, iar tu esti singurul responsabil pentru faptele tale. Te vei putea urca din nou la volan dupa ora indicata mai sus.");
		_("div.text", "In Romania, the legal blood alcohol limit is ZERO and you are responsible for your actions.", "In Romania, limita legala de alcoolemie in sange este ZERO LA MIE, iar tu esti singurul responsabil pentru faptele tale.");

		_("div.text2", "We cannot make accurate estimates based on the information provided.", "Nu iti putem estima un rezultat pe baza datelor introduse de tine.");

		var ofsaude = " de ";
	}
	else var ofsaude = " of ";

	//cache the viewport tag if the user is using an iPhone
    var $viewport = $('head').children('meta[name="viewport"]');

	//check the navigator.userAgent string to detect if the user is using an iPhone
    if (navigator.userAgent.match(/iPhone/i)) {
		$viewport.attr('content', 'user-scalable=no, width=device-width, height=device-height, target-densitydpi=device-dpi, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5');
    }

	if (navigator.userAgent.match(/iPad/i)) {
		$viewport.attr('content', 'user-scalable=no, width=device-width, height=device-height');
		$('#container').css('margin-left', '60px');
    }

	for (var i=1; i<=9; i++)
	{
		if ($('.step'+i)[0])
		{
			step[i] = $('.step'+i).html();
		}
	}

	//navigator.splashscreen.hide();

	Storage.prototype.setObj = function(key, value) {
		this.setItem(key, JSON.stringify(value));
	};

	Storage.prototype.getObj = function(key) {
		var value = this.getItem(key);
		return value && JSON.parse(value);
	};

	//localStorage.setObj("zero_la_mie", {});

	zero_la_mie = localStorage.getObj("zero_la_mie");
	if (!zero_la_mie)
	{
		zero_la_mie = {};
		zero_la_mie.bauturi = [];
		zero_la_mie.istoric = [];
		zero_la_mie.alcool_pur = 0;
	}
	else
	{
		zero_la_mie.bauturi = [];
	}

	$('.genreicons img').each(function(){
		$(this).attr('src', $(this).attr('src').replace('1', '0'));
	});

	if (zero_la_mie.sex==="M")
	{
		$('#male img', this).attr('src', $('#male img', this).attr('src').replace('0', '1'));
	}

	if (zero_la_mie.sex==="F")
	{		
		$('#female img', this).attr('src', $('#female img', this).attr('src').replace('0', '1'));
	}

	if (zero_la_mie.greutate)
	{
		$('#weight').val(zero_la_mie.greutate);
	}

	if (zero_la_mie.inaltime)
	{
		$('#height').val(zero_la_mie.inaltime);
	}

	$('.step').css('visibility', 'visible');
	if (zero_la_mie.timp_zero_la_mie)
	{
		$('.step').hide();
		var elapsed = round((new Date().getTime()-zero_la_mie.completed)/10);
		var total = round((zero_la_mie.timp_zero_la_mie-zero_la_mie.ora_sfarsit));
		var percent = round(elapsed/total);
		$('#percent').val(percent);
		$('#percent').timer();
		$('.step7 h2').html(date('H:i', zero_la_mie.timp_zero_la_mie));
		$('.step7 .starttime').html(zero_la_mie.startora);
		$('.step7 .endtime').html(zero_la_mie.endora);
		localStorage.setObj("zero_la_mie", zero_la_mie);
		$('.step7').show();
		selectTab('results');
		setInterval(refreshKnob, round((zero_la_mie.timp_zero_la_mie-zero_la_mie.ora_sfarsit)/100)*1000);
	}
	else if (zero_la_mie.sex && zero_la_mie.inaltime && zero_la_mie.greutate && !zero_la_mie.timp_zero_la_mie && zero_la_mie.istoric.length)
	{
		$('.step').hide();
		$('.step8').show();
		selectTab('history');
	}
	else if (zero_la_mie.sex && zero_la_mie.inaltime && zero_la_mie.greutate && !zero_la_mie.timp_zero_la_mie)
	{
		$('.step').hide();
		$('.step2').show();
		selectTab('drinks');
	}
	else 
	{
		$('.step').hide();
		$('.step1').show();
		selectTab('bio');
	}

	computeHistory();

	$('input').textinput({ preventFocusZoom: true });

	$.mobile.loader.prototype.options.text = "";
	$.mobile.loader.prototype.options.textVisible = false;
	$.mobile.loader.prototype.options.theme = "a";
	$.mobile.loader.prototype.options.html = "";

	/**CHANGE*SCREENS*BUTTONS*********************************************/

	$('.show_history').unbind().bind(click_event, function(event){
		if (zero_la_mie.istoric.length)
		{
			computeHistory();
			$('.step').hide();
			$('.step8').show();
			selectTab('history');
		}
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('.show_bio').unbind().live(click_event, function(event){
		$('.step').hide();
		$('.step1').show();
		selectTab('bio');
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('.show_time').unbind().live(click_event, function(event){
		$('.step').hide();
		$('.step6').show();
		selectTab('bio');
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('.show_drinks').unbind().live(click_event, function(event){
		if (zero_la_mie.bauturi.length)
		{
			$('.step').hide();
			$('.step5').show();
			selectTab('drinks');
		}
		else if (zero_la_mie.sex && zero_la_mie.inaltime && zero_la_mie.greutate)
		{
			$('.step').hide();
			$('.step2').show();
			selectTab('drinks');
		}
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('.show_results').unbind().bind(click_event, function(event){
		if (!zero_la_mie.timp_zero_la_mie)
		{
			return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
		}
		$('.step').hide();
		$('.step7').show();
		selectTab('results');
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('#start_again').unbind().live(click_event, function(event){
		if (zero_la_mie.istoric.length)
		{
			computeHistory();
			$('.step').hide();
			$('.step8').show();
			selectTab('history');
		}
		else
		{
			zero_la_mie.timp_zero_la_mie = 0;
			zero_la_mie.bauturi = [];
			resetStep(2);
			resetStep(3);
			resetStep(4);
			resetStep(5);
			selectTab('drinks');
			zero_la_mie.alcool_pur = 0;
			$('.step').hide();
			$('.step2').show();
			selectTab('drinks');
		}
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('#start_a_new_one').unbind().live(click_event, function(event){
		zero_la_mie.timp_zero_la_mie = 0;
		zero_la_mie.bauturi = [];
		resetStep(5);
		selectTab('drinks');
		zero_la_mie.alcool_pur = 0;
		localStorage.setObj("zero_la_mie", zero_la_mie);
		$('.step').hide();
		$('.step2').show();
	});

	// Step 1
	$('#add_some_drinks').unbind().live(click_event, function(event){
		zero_la_mie.timp_zero_la_mie = 0;
		zero_la_mie.bauturi = [];
		resetStep(5);
		selectTab('drinks');
		zero_la_mie.alcool_pur = 0;
		localStorage.setObj("zero_la_mie", zero_la_mie);
		zero_la_mie.inaltime = parseInt($('#height').val());
		zero_la_mie.greutate = parseInt($('#weight').val());
		if (!zero_la_mie.sex)
		{
			if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
			
			if (lang==="ro")
				alert("Trebuie sa specifici sexul.");
			else 
				alert("You must choose the sex.");
			
			return false;
		}
		localStorage.setObj("zero_la_mie", zero_la_mie);

		if (!zero_la_mie.greutate || !isNumber(zero_la_mie.greutate))
		{
			if (lang==="ro")
				alert("Trebuie sa specifici greutatea.");
			else 
				alert("You must choose the weight.");
			return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
		}

		if (!zero_la_mie.inaltime || !isNumber(zero_la_mie.inaltime))
		{
			if (lang==="ro")
				alert("Trebuie sa specifici intaltimea.");
			else 
				alert("You must choose the height.");
			return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
		}

		$('.step').hide();
		$('.step2').show();
		selectTab('drinks');
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	// Step 2
	$('.step2 #add_a_drink').unbind().live(click_event, function(event){
		$('.step').hide();
		zero_la_mie.bauturi = [];
		resetStep(3);
		$('.step3').show();
		selectTab('drinks');
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	// Step 3
	$('.step3 #add_the_drink').unbind().live(click_event, function(event){
		if (typeof cls === "undefined")
		{
			alert("You must select a drink type");
			return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
		}

		zero_la_mie.concentratie_alcool = $('.'+cls+' input').val();
	
		if (!zero_la_mie.concentratie_alcool)
		{
			alert("You must complete the alcohol concentration");
			return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
		}

		zero_la_mie.cantitate = $('#cantitate')[0].value;
		if (!zero_la_mie.cantitate)
		{
			if (lang==="ro")
				alert("Trebuie sa specifici cantitatea.");
			else 
				alert("You must choose the quantity.");
			return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
		}
	
		if ($('.step5 .list .addbutton table').length===1 && $('.step5 .list .addbutton table .icon').html()==="")
		{
			switch (zero_la_mie.tip_bautura)
			{
				case "beer":
				case "bere":
					icon_path = "img-"+dpi+"/icon.beer.list.png";
				break;

				case "wine":
				case "vin":
					icon_path = "img-"+dpi+"/icon.wine.list.png";
				break;

				case "spirits":
				case "spirtoase":
					icon_path = "img-"+dpi+"/icon.spirits.list.png";
				break;
			}
			$('.step5 .list .addbutton table .icon').html($('<img>').attr('src', icon_path));
			$('.step5 .list .addbutton table .qty').html(zero_la_mie.cantitate+'ml'+ofsaude+zero_la_mie.tip_bautura);
		}
		else
		{
			switch (zero_la_mie.tip_bautura)
			{
				case "beer":
				case "bere":
					icon_path = "img-"+dpi+"/icon.beer.list.png";
				break;

				case "wine":
				case "vin":
					icon_path = "img-"+dpi+"/icon.wine.list.png";
				break;

				case "spirits":
				case "spirtoase":
					icon_path = "img-"+dpi+"/icon.spirits.list.png";
				break;
			}

			var $clone = $('.step5 .list .addbutton:last').clone();
			$clone.find('.icon').html($('<img>').attr('src', icon_path));
			$clone.find('.qty').html(zero_la_mie.cantitate+'ml'+ofsaude+zero_la_mie.tip_bautura);
			$('.step5 .list .addbutton.drinks:last').before($clone);
		}
		var bautura = { "TIP_BAUTURA": zero_la_mie.tip_bautura, "CONCENTRATIE": zero_la_mie.concentratie_alcool, "CANTITATE": zero_la_mie.cantitate };
		zero_la_mie.bauturi.push(bautura);
		$('.step').hide();
		$('.step5').show();
		selectTab('drinks');

		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('#drinking_timeframe').unbind().live(click_event, function(event){
		$('.step').hide();
		$('.step6').show();
		selectTab('drinks');
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('#calculate_time').unbind().live(click_event, function(event){
		zero_la_mie.ora_inceput = $('#start_hour').val();
		zero_la_mie.minute_inceput = $('#start_minutes').val();
		zero_la_mie.ora_sfarsit = $('#end_hour').val();
		zero_la_mie.minute_sfarsit = $('#end_minutes').val();

		if(zero_la_mie.ora_inceput+':'+zero_la_mie.minute_inceput === ':') {
			if (lang==="ro")
				alert('Trebuie sa specifici cand ai inceput sa bei.');
			else
				alert('You must specify when you started drinking.');
			return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
		}
		else if (!isNumber(zero_la_mie.ora_inceput) || !isNumber(zero_la_mie.minute_inceput) || zero_la_mie.ora_inceput >= 24 || zero_la_mie.minute_inceput >= 60)
		{
			if (lang==="ro")
				alert('Trebuie sa specifici cand ai inceput sa bei.');
			else
				alert('You must specify when you started drinking.');
			return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
		}

		if (zero_la_mie.ora_sfarsit+':'+zero_la_mie.minute_sfarsit === ':') {
			if (lang==="ro")
				alert('Trebuie sa specifici cand ai terminat sa bei.');
			else
				alert('You must specify when you finished drinking.');
			return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
		}
		else if (!isNumber(zero_la_mie.ora_sfarsit) || !isNumber(zero_la_mie.minute_sfarsit) || zero_la_mie.ora_sfarsit >= 24 || zero_la_mie.minute_sfarsit >= 60)
		{
			if (lang==="ro")
				alert('Trebuie sa specifici cand ai terminat sa bei.');
			else
				alert('You must specify when you finished drinking.');
			return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
		}

		zero_la_mie.startora = zero_la_mie.ora_inceput+':'+zero_la_mie.minute_inceput;
		zero_la_mie.endora = zero_la_mie.ora_sfarsit+':'+zero_la_mie.minute_sfarsit;

		if (zero_la_mie.ora_sfarsit && zero_la_mie.minute_sfarsit!=='' && zero_la_mie.ora_inceput && zero_la_mie.minute_inceput!=='')
		{
			if (strtotime(date('Y-m-d')+' '+zero_la_mie.ora_sfarsit+':'+zero_la_mie.minute_sfarsit) <= strtotime(date('Y-m-d')+' '+zero_la_mie.ora_inceput+':'+zero_la_mie.minute_inceput))
			{
				var may_be_next_day = strtotime('+1 day', strtotime(date('Y-m-d')+' '+zero_la_mie.ora_sfarsit+':'+zero_la_mie.minute_sfarsit));

				if (may_be_next_day <= strtotime(date('Y-m-d')+' '+zero_la_mie.ora_inceput+':'+zero_la_mie.minute_inceput))
				{
					if (lang==="ro")
						alert("Ora de inceput trebuie sa fie inainte de ora de sfarsit.");
					else
						alert('The hour when you finished drinking must be after the start hour.');
					return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
				}
				else
				{
					zero_la_mie.ora_inceput = strtotime(date('Y-m-d')+' '+zero_la_mie.ora_inceput+':'+zero_la_mie.minute_inceput);
					zero_la_mie.ora_sfarsit = may_be_next_day;
				}
			}
			else
			{
				zero_la_mie.ora_inceput = strtotime(date('Y-m-d')+' '+zero_la_mie.ora_inceput+':'+zero_la_mie.minute_inceput);
				zero_la_mie.ora_sfarsit = strtotime(date('Y-m-d')+' '+zero_la_mie.ora_sfarsit+':'+zero_la_mie.minute_sfarsit);
			}
		}

		var r = getWidmarkFactor(zero_la_mie.sex, zero_la_mie.greutate, zero_la_mie.inaltime);

		for (var drink in zero_la_mie.bauturi)
		{
			zero_la_mie.alcool_pur += (zero_la_mie.bauturi[drink]['CONCENTRATIE']/100) * 0.8 * zero_la_mie.bauturi[drink]['CANTITATE'];
		}

		zero_la_mie.concentratia = zero_la_mie.alcool_pur / ( zero_la_mie.greutate * r );

		zero_la_mie.minute_consumate = (zero_la_mie.ora_sfarsit - zero_la_mie.ora_inceput)/60;

		zero_la_mie.alcoolemia_maxima = round(zero_la_mie.concentratia - (zero_la_mie.minute_consumate + 120) / 60 * 0.15, 9);
		zero_la_mie.rata_de_eliminare_la_zero = zero_la_mie.alcoolemia_maxima / 0.15;
		zero_la_mie.minute_zero_la_mie = zero_la_mie.rata_de_eliminare_la_zero * 60;

		zero_la_mie.timp_zero_la_mie = round(zero_la_mie.ora_sfarsit+(zero_la_mie.minute_zero_la_mie*60)+120*60, 9)+60;
		if (zero_la_mie.timp_zero_la_mie < zero_la_mie.ora_sfarsit)
		{
			anterior = true;
		}

		if (zero_la_mie.bauturi)
		{
			zero_la_mie.istoric.reverse();
			zero_la_mie.istoric.push(zero_la_mie.bauturi);
			zero_la_mie.istoric.reverse();
		}

		zero_la_mie.zero_la_mie = date('d-m-Y H:i', zero_la_mie.timp_zero_la_mie);

		zero_la_mie.completed = new Date().getTime();

		if (zero_la_mie.timp_zero_la_mie - zero_la_mie.ora_sfarsit > 86400 || zero_la_mie.timp_zero_la_mie - zero_la_mie.ora_sfarsit < 0 )
		{
			$('.step').hide();
			$('.step9').show();
			selectTab('results');
		}
		else
		{
			$('.step').hide();
			$('#percent').timer();
			$('#percent').val(0).trigger("change");
			$('.step7 .starttime').html(zero_la_mie.startora);
			$('.step7 .endtime').html(zero_la_mie.endora);
			$('.step7 h2').html(date('H:i', zero_la_mie.timp_zero_la_mie));
			localStorage.setObj("zero_la_mie", zero_la_mie);
			$('.step7').show();
			setInterval(refreshKnob, round((zero_la_mie.timp_zero_la_mie-zero_la_mie.ora_sfarsit)/100)*1000);
			selectTab('results');
		}

		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});
	/**END*CHANGE*SCREENS*BUTTONS**************************************/

	/*
	$('div.input').live(click_event, function(event){
		if ($('.unit', this).html()!="")
		{
			$('input', this).focus();
		}
	});
	*/

	$('.step5 .list a').live("swipeleft swiperight",function(event){
		if ($(this).attr('id')==="add_another_drink") return false; 
		if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); } 
		zero_la_mie.bauturi.splice($('.step5 .list a').index($(this)), 1);
		$(this).remove();
		if ($('.step5 a').length===2)
		{
			zero_la_mie.timp_zero_la_mie = 0;
			zero_la_mie.bauturi = [];
			resetStep(5);
			$('.step').hide();
			$('.step2').show();
		}
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('#history_list a').live('swipeleft swiperight',function(event){
		if ($(this).attr('id')==="history_title") return false; 
		if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); } 
		$(this).remove();
		zero_la_mie.istoric.splice($(this).attr('data-id'), 1);
		localStorage.setObj("zero_la_mie", zero_la_mie);
		computeHistory();
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('#history_list a').unbind().live("click", function(event){
		if ($(this).attr('id')==="history_title") return false; 
		if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); } 
		resetStep(5);
		zero_la_mie.bauturi = [];
		zero_la_mie.alcool_pur = 0;
		zero_la_mie.bauturi = zero_la_mie.istoric[$(this).attr('data-id')].slice(0);
		
		for (var drink in zero_la_mie.bauturi)
		{
			if ($('.step5 .list .addbutton table').length===1 && $('.step5 .list .addbutton table .icon').html()==="")
			{
				switch (zero_la_mie.bauturi[drink]['TIP_BAUTURA'])
				{
					case "beer":
					case "bere":
						icon_path = "img-"+dpi+"/icon.beer.list.png";
					break;

					case "wine":
					case "vin":
						icon_path = "img-"+dpi+"/icon.wine.list.png";
					break;

					case "spirits":
					case "spirtoase":
						icon_path = "img-"+dpi+"/icon.spirits.list.png";
					break;
				}
				$('.step5 .list .addbutton table .icon').html($('<img>').attr('src', icon_path));
				$('.step5 .list .addbutton table .qty').html(zero_la_mie.bauturi[drink]['CANTITATE']+'ml'+ofsaude+zero_la_mie.bauturi[drink]['TIP_BAUTURA']);
			}
			else
			{
				switch (zero_la_mie.bauturi[drink]['TIP_BAUTURA'])
				{
					case "beer":
						icon_path = "img-"+dpi+"/icon.beer.list.png";
					break;

					case "wine":
						icon_path = "img-"+dpi+"/icon.wine.list.png";
					break;

					case "spirits":
						icon_path = "img-"+dpi+"/icon.spirits.list.png";
					break;
				}
				var $clone = $('.step5 .list .addbutton:last').clone();
				$clone.find('.icon').html($('<img>').attr('src', icon_path));
				$clone.find('.qty').html(zero_la_mie.bauturi[drink]['CANTITATE']+'ml'+ofsaude+zero_la_mie.bauturi[drink]['TIP_BAUTURA']);
				$('.step5 .list .addbutton.drinks:last').before($clone);
			}
		}
		$('.step').hide();
		$('.step5').show();
		selectTab('drinks');
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('.drink .inputs').click(function(){
		$('input', this).focus();
	});

	$('.genreicons').unbind().live(click_event, function(event){
		if ($(this).attr('id')==="male")
		{
			zero_la_mie.sex = "M";
		}

		if ($(this).attr('id')==="female")
		{
			zero_la_mie.sex = "F";
		}

		$('.genreicons img').each(function(){
			$(this).attr('src', $(this).attr('src').replace('1', '0'));
		});
		$('img', this).attr('src', $('img', this).attr('src').replace('0', '1'));
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('#drinks').unbind().live(click_event, function(event){
		$('.step').hide();
		$('.step2').show();
		selectTab('drinks');
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('.bio').unbind().live(click_event, function(event){
		$('.step').hide();
		$('.step1').show();
		selectTab('bio');
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('input').live("focus", function(){
		$(this).css('background', 'rgba(255, 255, 255, 0.3)');
		$('body').scrollLeft(0);
	});

	$('input').click(function(){
		var v = $(this).val();
		$(this).val(v);
	});

	$('input').live("blur", function(){
		$(this).css('background', 'none');
		$('body').scrollTop(0);
	});

	$('#iconsmall').unbind().live(click_event, function(event){
		if ($('img', this).attr('src').indexOf("icon.beer.small.png")!==-1)
		{
			$('img', this).attr('src', 'img-'+dpi+'/icon.bottle.small.png');
			$('.unitate').html('330');
		}
		else if ($('img', this).attr('src').indexOf('icon.bottle.small.png')!==-1)
		{
			$('img', this).attr('src', 'img-'+dpi+'/icon.beer.small.png');
			$('.unitate').html('500');
		}
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('.drink').unbind().live(click_event, function(event){
		if ($(this).hasClass('beer')) { cls = 'beer'; }
		if ($(this).hasClass('wine')) { cls = 'wine'; }
		if ($(this).hasClass('spirits')) { cls = 'spirits'; }
		concentratie_alcool = $('.'+cls+' input').val();
		if (!concentratie_alcool)
		{
			alert("You must specify an alcohol concentration.");
			return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
		}
		$('#beer').attr('src', $('#beer').attr('src').replace('.selected', ''));
		$('#wine').attr('src', $('#wine').attr('src').replace('.selected', ''));
		$('#spirits').attr('src', $('#spirits').attr('src').replace('.selected', ''));

		$('#'+cls).attr('src', $('#'+cls).attr('src').replace('.png', '.selected.png'));

		$('.alcvol').html(concentratie_alcool);
		$('#icon').attr('src', 'img-'+dpi+'/icon.'+cls+'.small.png');
		if (lang==="ro")
		{
			if (cls==="beer") cls = "bere";
			if (cls==="wine") cls = "vin";
			if (cls==="spirits") cls = "spirtoase";
		}
		zero_la_mie.tip_bautura = cls;
		switch (zero_la_mie.tip_bautura)
		{
			case "beer":
			case "bere":
				$('.unitate').html('500');
			break;

			case "wine":
			case "vin":
				$('.unitate').html('250');
			break;

			case "spirits":
			case "spirtoase":
				$('.unitate').html('50');
			break;
		}
		$('#cantitate').val('');
		$('.topbg.second *, .step3 .redbutton').css('opacity', 1);
		$('td.quickadd td.unit').fadeIn();
		$('#iconsmall').fadeIn();

		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});

	$('#start_hour, #end_hour').live("change", function(){
		if ($(this).val()==="24")
		{
			$(this).val("00");
		}
	});

	$('input').focus(function() {
		var v = $(this).val();
		$(this).val(' ');
		$(this).val(v);
	});

	$('a.quickadd').unbind().live(click_event, function(event){
		$('#cantitate').val(parseInt($(this).html())*$('.unitate').html());
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});
	
	$('#add_another_drink').unbind().live(click_event, function(event){
		$('.step').hide();
		resetStep(3);
		$('.step3').show();
		selectTab('drinks');
		return false; if (typeof event !== "undefined") { event.preventDefault(); event.stopImmediatePropagation(); }
	});
});

function refreshKnob() {
	var number = (parseInt($('#percent').val())+parseInt(1.0));
	$('#percent').val(number);
	$('.fill').css('width', (100-number)+'%');
}

function computeHistory() {
	var line = '';
	resetStep(8);
	for ( index in zero_la_mie.istoric )
	{
		var summary = {};
		summary.beer = 0;
		summary.wine = 0;
		summary.spirits = 0;
		line = '<a class="addbutton drinks scrollable" href="javascript:;" data-id="'+index+'">';
		for ( drink in zero_la_mie.istoric[index] )
		{
			if (zero_la_mie.istoric[index][drink]['TIP_BAUTURA']==="beer" || zero_la_mie.istoric[index][drink]['TIP_BAUTURA']==="bere")
			{
				summary.beer += parseInt(zero_la_mie.istoric[index][drink]['CANTITATE']);
			}

			if (zero_la_mie.istoric[index][drink]['TIP_BAUTURA']==="wine" || zero_la_mie.istoric[index][drink]['TIP_BAUTURA']==="vin")
			{
				summary.wine += parseInt(zero_la_mie.istoric[index][drink]['CANTITATE']);
			}
			
			if (zero_la_mie.istoric[index][drink]['TIP_BAUTURA']==="spirits" || zero_la_mie.istoric[index][drink]['TIP_BAUTURA']==="spirtoase")
			{
				summary.spirits += parseInt(zero_la_mie.istoric[index][drink]['CANTITATE']);
			}
		}

		if (summary.beer)
		{
			line = line + '<img src="img-'+dpi+'/history.beer.png"><span> '+round(summary.beer/1000, 2)+' l </span> ';
		}
		if ((summary.wine && summary.beer) || (summary.spirits && summary.beer))
		{
			line = line + '<img src="img-'+dpi+'/plus.history.png" align="middle" />' ;
		}

		if (summary.wine)
		{
			line = line + '<img src="img-'+dpi+'/history.wine.png"><span> '+round(summary.wine/1000, 2)+' l </span> ';
		}
		if (summary.spirits && summary.wine)
		{
			line = line + '<img src="img-'+dpi+'/plus.history.png" align="middle" />' ;
		}

		if (summary.spirits)
		{
			line = line + '<img src="img-'+dpi+'/history.spirits.png"><span> '+round(summary.spirits/1000, 2)+' l </span> ';
		}
		line = line +'</a>';
		$('#history_list').append(line);
	}
}

function selectTab(name) {
	$('.tab .selected').hide();
	$('.tab img').each(function(){
		$(this).attr('src', $(this).attr('src').replace('1.png', '0.png'));
	});
	//$('.tab.'+name+' img:not(.selected)').attr('src', $('.tab.'+name+' img:not(.selected)').attr('src').replace('0.png', '1.png'));
	$('.tab.'+name+' .selected').show();
}

function resetStep(i) {
	$('.step'+i).html(step[i]);
}