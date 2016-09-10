   $( document ).ready(function() {
	//Shuffle the list
	$('#0').shuffle();
	$('#shu').click(function(){
		$('#0').shuffle();
		$("#masterList").sortable({ items: "li", handle:'.containerTitle', opacity: 0.6, helper: 'clone', forcePlaceholderSize: true,forceHelperSize: true});
		return false;
	});

	//Planning processes ordering test
	$('#planning').click(function(){

		$('#new').click(function(){
	    if (confirm("Deseja começar novamente?") == true) {
	    	location.reload();
	    }
		});

		$('#result').replaceWith("<a href='#' id='seq' style='color:#ffb058'>Mostrar os erros da sequencia</a>");
		$('#shu').replaceWith("<a href='#' id='shuPla'>Randomizar lista</a>");

		$('#shuPla').click(function(){
			$('.planning').shuffle();
			$(".planning").sortable({ items: "li", handle:'.containerTitle', opacity: 0.6, helper: 'clone', forcePlaceholderSize: true,forceHelperSize: true});
			return false;
		});

		//Show sequence of planning items
		$('#seq').click(function(){
			$('.unmovable').remove();

			i=201;
			n=1;

			$('.pane ul').find('li').each(function(){
				$(this).attr('rel',i);
				i++;
			});

			$('.pane ul').find('li').each(function(){
				if(parseInt($(this).attr('rel'))!=parseInt($(this).attr('value')))
				{
					var updown='';
					if(parseInt($(this).attr('rel'))>parseInt($(this).attr('value')))
						updown=parseInt($(this).attr('rel'))-parseInt($(this).attr('value'))+" passos &uarr;";
					else
						updown=parseInt($(this).attr('value'))-parseInt($(this).attr('rel'))+" passos &darr;";

					$(this).find('.bullet').remove();
					$(this).html("<span class=bullet>"+updown+" - </span>"+ $(this).html()).css('background','#ffb058');
				}
				else
				{
					$(this).find('.bullet').remove();
					$(this).html("<span class=bullet>"+n+" - </span>"+ $(this).html()).css('background','#E7E7E7');
				}
				n++;
			});

		  return false;
		});

		//From everything from mixed but leave planning
		$('#0').find('li').each(function(){
			if($(this).attr('id')!='2') $(this).remove();//remove all others
		});

		//shift planning list from mixed to planning
		$('.planning').append($('#0').html());
		//Shuffle planning list
		$('.planning').shuffle().parent().css({"width":"500px", "margin":"0 auto","position":"absolute","left":"32%"});
		$(".planning").sortable({ items: "li", handle:'.containerTitle', opacity: 0.6, helper: 'clone', forcePlaceholderSize: true,forceHelperSize: true});

		//Remove all other panels and just leave the planning panel for eazy sorting
		$('#masterList').find('ul').each(function(){
			if(!$(this).hasClass('planning')) $(this).parent().remove();
		});
		return false;
	});


	$('#new').click(function(){
		if(!confirm('Confirma iniciar nova avaliacao?')) return false;
		var list='';
		$('.pane').each(function(){
			list+=$(this).find('ul').html();
			$(this).find('ul').html("<li class='unmovable'></li>");
		});
		$('#0').append(list).shuffle();
		$('#0').find('.correct').each(function(){
			$(this).parent().css('background','#E7E7E7');
			$(this).remove();
		});
		$('#r').remove();
		$("#masterList").sortable({ items: "li", handle:'.containerTitle', opacity: 0.6, helper: 'clone', forcePlaceholderSize: true,forceHelperSize: true});
		$("#footer").remove();
		return false;
	});

	//Make all <li> items in the list sortable using the jQuery UI Sortables code
	$("#masterList").sortable({ items: "li", handle:'.containerTitle', opacity: 0.6, helper: 'clone', forcePlaceholderSize: true,forceHelperSize: true});
	$(".containerTitle").mousedown(function(){ alert('O cabecalho nao pode ser movido!'); });
	$('#hide,#hide1').click(function(){ $(this).parent().slideUp('slow');return false; });

	$('#result').click(
		function()
		{
			if($('#0').find('li').length==79)
			{
				if (!confirm('Deseja verificar o resultado antes de mover todos os processos?')) return false;
			}

			var wrong=0;
			var total=0;
			$("#masterList").find('li').each(function(){
				//Check the result
				if($(this).attr('id')!=$(this).parent().attr('id') && $(this).parent().attr('id')!='0' && $(this).attr('class')!='unmovable')
				{
					$(this).css("background","#FFCC99");
					wrong+=1;
					var correctHeading='';
					var currentId=$(this).attr('id');
					$("#masterList").find('ul').each(function(){
						if($(this).attr('id')==currentId)
							correctHeading=$(this).parent().find('.containerTitle').html();
					});
					$(this).find('.correct').remove();
					$(this).append("<span class='correct' style='display:block;padding-top:3px;margin-top:3px;border-top: 1px dotted #ff0000;'><strong>Deveria ser em:<br> \""+ correctHeading +"\"</strong></span>");
				}

				//attmpted
				if($(this).parent().attr('id')!='0' && $(this).attr('class')!='unmovable') total+=1;
			});
			$('#r').remove();

			if(total>0)
			{
				var string="<span id='r'>: ( Total: <strong>79</strong> | Tentativas: <strong>";
				string+=total+"</strong> | Resultado: <strong>"+ parseInt(total-wrong)+"</strong> de <strong>";
				string+=total + "</strong> | <strong>";
				string+=parseInt((total-wrong)*100/total);
				string+="%</strong> )</span>";
				$(this).after(string);
			}
			return false;
		});


	});