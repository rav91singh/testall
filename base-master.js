mainJSLoaded = 1;

function showPlayerImage(e, url) {
	$("#imageContImg")
		.attr({
		"src": url
	});
	var mouseX = e.pageX;
	var mouseY = e.pageY;
	if (mouseX == null || mouseY == null) {
		mouseX = e.clientX + $('body')
			.offset()
			.left;
		mouseY = e.clientY + $('body')
			.offset()
			.top;
	}
	$("#imageContainer")
		.css({
		"left": mouseX + 15,
		"top": mouseY + 15
	})
		.show();
	//$("#imageContainer").css({"left":e.pageX+15,"top":e.pageY+15}).show();
}

function hidePlayerImage() {
	$("#imageContImg")
		.attr({
		"url": CDN_URL + "images/images/loading.gif"
	});
	$("#imageContainer")
		.hide();
}

function showSubMenu(callDivId, divid) {
	var pos = $("#" + callDivId)
		.offset();
	var ht = $("#" + callDivId)
		.height();
	$("#" + divid)
		.css({
		"left": pos.left + "px",
		"top": (pos.top + ht) + "px"
	})
		.show();
}

function hideSubMenu(divid) {
	$("#" + divid)
		.hide();
}

var lastTabSelected = "noteTab";

function viewboardToggleTab(divId) {
	if (lastTabSelected == divId) return false;
	$("#" + divId)
		.css({
		"display": "block"
	});
	$("#" + lastTabSelected)
		.css({
		"display": "none"
	});
	lastTabSelected = divId;
	return false;
}

function saveNote(fl) {
    var callUrl = main_path + "/ajax/saveNotes.php";
    $.ajax({
        method: "get",
        url: callUrl,
        data:{id:fl,data:$("#notes").val(), random:Math.random()},
        beforeSend: function(){
            $("#savedresult").html("Saving...");
        },
        complete: function(){
            $("#savedresult").html("Saved.");
        },
        success: function(html){

        }
    });
    
    return false;
} 

function saveNote_New() {
	//alert(fl);
	if(gameId != ''){
		var callUrl = APP_URL_JS + "ajax/saveNotes_New.php";
		$.ajax({
			method: "get",
			url: callUrl,
			data: {
				gid: gameId,
				user: fb_uid,
				data: $("#notes")
					.val(),
				random: Math.random()
			},
			beforeSend: function() {
				$("#savedresult")
					.html("Saving...");
			},
			complete: function() {
				$("#savedresult")
					.html("Saved.");
			},
			success: function(html) {
	
			}
		});

		return false;
	}else{
		return false;
	}
}

function getGameNote(gid,fb_uid){
var getNoteAjax = APP_URL_JS+"ajax/getNotes.php?gid="+gid+"&user="+fb_uid;
$.ajax({
	method: "get",
	url: getNoteAjax,
	beforeSend: function() {

	},
	complete: function() {

	},
	success: function(reply) {
		$("#savedresult").html("");
		$("#notes").val(reply);
	}
});

}

var lastDivSelected = "Basic";

function statToggleShow(tag) {
	if (lastDivSelected == tag) {
		return false;
	} else {
		$("#" + tag + "Div")
			.css({
			"display": "block"
		});
		$("#" + lastDivSelected + "Div")
			.css({
			"display": "none"
		});
		$("#" + tag + "Tab")
			.removeClass("heading1")
			.addClass("heading2");
		$("#" + lastDivSelected + "Tab")
			.removeClass("heading2")
			.addClass("heading1");
	}
	lastDivSelected = tag;
	return false;
}

function showToolTip(e, txt) {
	var mouseX = e.pageX;
	var mouseY = e.pageY;
	if (mouseX == null || mouseY == null) {
		mouseX = e.clientX + $('body')
			.offset()
			.left;
		mouseY = e.clientY + $('body')
			.offset()
			.top;
	}
	$("#tooltipdiv")
		.css({
		"left": (mouseX + 15) + "px",
		"top": (mouseY + 15) + "px"
	})
		.html(txt)
		.show();
	return false;
}

function hideToolTip() {
	$("#tooltipdiv")
		.hide();
	return false;
}

function showNewGamePublish() {
	FB.ui({
		method: 'feed',
		name: 'Lexulous',
		link: 'https://apps.facebook.com/lexulous/',
		picture: CDN_URL + 'images/images/new_game.png',
		caption: 'Hey, I have started a game of Lexulous with you. Join the game and enjoy!',
		description: 'Lexulous is a crossword game where you get letter tiles to make words with on a 15x15 board. Score more points by playing bigger words!',
		actions: [{
			"name": "Start playing Lexulous",
			"link": "https://apps.facebook.com/lexulous/"
		}],
		message: ''
	}, function(response) {});
}

function showRequestFeed() {
	FB.ui({
		method: 'feed',
		name: 'Lexulous',
		link: 'https://apps.facebook.com/lexulous/?action=viewrequest',
		picture: CDN_URL + 'images/images/new_game.png',
		caption: 'Hey, I\'ve just setup a new table at Lexulous, want to play a game?',
		description: 'Lexulous is a crossword game where you get letter tiles to make words with on a 15x15 board. Score more points by playing bigger words!',
		message: ''
	}, function(response) {});
}


function showBookmarkUI() {
	FB.ui({
		method: 'bookmark.add'
	}, function() {});
}

function showPermissionUI() {
	FB.login(function(response) {
		if (response.session) {
			if (response.scope) {} else {}
		} else {}
	}, {
		scope: 'email'
	});
}

function showInviteUI() {
	FB.ui({
		method: 'apprequests',
		message: 'Join me for a quick game of Lexulous - the classic crossword game. You get to create words using letters from your rack. May the highest scorer win!'
	});
}

function showHeaderOption(uid) {
	var op_load_count = 0;

	FB.api({
		method: 'fql.query',
		query: 'SELECT email,publish_stream FROM permissions WHERE uid=' + uid
	},

	function(response) {

		$("#bookmark_on")
			.css({
			'display': 'none'
		});

		if ((response[0].publish_stream == 0) || (response[0].email == 0)) {
			$("#perm_off")
				.css({
				'display': 'none'
			});
			op_load_count++;
		} else {
			$("#perm_on")
				.css({
				'display': 'none'
			});
		}
		if (op_load_count > 0) {
			$("#bookmark")
				.css({
				'display': 'block'
			});
		}
		FB.api({
			method: 'fql.query',
			query: 'SELECT uid FROM page_fan WHERE uid= ' + uid + ' AND page_id=3052170175'
		},

		function(response) {
			var flag = 0;
			if (response.length) flag = 1;

			if (flag == 0) {
				$("#fan_off")
					.css({
					'display': 'none'
				});
				op_load_count++;
			} else {
				$("#fan_on")
					.css({
					'display': 'none'
				});
				$("#footer_perm_on")
					.css({
					'display': 'none'
				});
			}
			if (op_load_count > 0) {
				$("#bookmark")
					.css({
					'display': 'block'
				});
			}
		});
	});



}

function getHostedGames(uid, signReq) {
	var callurl = APP_URL_JS + "ajax/viewrequest_response.php";
	var chkAdult = "n";
	var chkFastGame = "s";
	var chkLang = "";

	if ($("#searchOptionAdult")
		.is(":checked")) {
		chkAdult = "y";
	}
	if ($("#searchOptionFast")
		.is(":checked")) {
		chkFastGame = "f";
	}
	if ($("#searchOptionEng")
		.is(":checked")) {
		chkLang = "sow,twl";
	}

	if ($("#searchOptionFre")
		.is(":checked")) {
		if (chkLang != "") {
			chkLang += ",fr";
		} else {
			chkLang = "fr";
		}
	}

	if ($("#searchOptionIta")
		.is(":checked")) {
		if (chkLang != "") {
			chkLang += ",it";
		} else {
			chkLang = "it";
		}
	}

	$.ajax({
		method: "get",
		url: callurl,
		data: {
			user: uid,
			signed_request: signReq,
			dictionary: chkLang,
			speed: chkFastGame,
			adult: chkAdult,
			random: Math.random()
		},
		beforeSend: function() {
			$("#searchResDiv")
				.html("");
			$("#gif_loader")
				.fadeIn("slow");
		},
		complete: function() {
			$("#gif_loader")
				.fadeOut("slow");
		},
		success: function(html) {
			$("#searchResDiv")
				.html(html);
		}
	});

}

function loadFriendListInNewgame(fbuid) {
	FB.api({
		method: 'fql.query',
		query: "SELECT uid, first_name, last_name FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = '" + fbuid + "')"
	},

	function(response) {
		for (var i = 0; i < response.length; i++) {
			$('#friends')
				.append($("<option></option>")
				.attr("value", response[i].uid)
				.text(response[i].first_name + " " + response[i].last_name));
		}
		$("#friends")
			.fcbkcomplete({
			json_url: "",
			addontab: true,
			height: 10,
			maxshownitems: 5
		});
	});
}

function showJoinUserInfo($ids_str) {
	FB.api({
		method: 'fql.query',
		query: "SELECT uid, pic_square FROM user WHERE uid IN (" + $ids_str + ")"
	},

	function(response) {
		for (var i = 0; i < response.length; i++) {
			$("#userImage" + response[i].uid)
				.html('<img src="' + response[i].pic_square + '" alt="" />');
			//$("#userName"+response[i].uid).html(response[i].first_name + " " + response[i].last_name);
		}
	});
}


function showGameboardUserInfo($str) { //alert ($str);
	//alert("SELECT uid,first_name,last_name,pic_square,pic_big FROM user WHERE uid IN ("+$str+")");
	FB.api({
		method: 'fql.query',
		query: "SELECT uid,first_name,last_name,pic_square,pic_big FROM user WHERE uid IN (" + $str + ")"
	},

	function(response) {
		for (var i = 0; i < response.length; i++) {
			//alert(response[i].pic_square);
			$("#userPhoto" + response[i].uid)
				.html('<img src="' + response[i].pic_square + '" alt="" width="30" height="30" />');
			if (response[i].pic_big != "") {
				$("#userPhoto" + response[i].uid)
					.attr('onmousemove', 'showPlayerImage(event,\"' + response[i].pic_big + '\")');
				$("#userPhoto" + response[i].uid)
					.attr('onmouseout', 'hidePlayerImage()');
			}
			$("#userName" + response[i].uid)
				.html(response[i].first_name + " " + response[i].last_name);
		}
	});
}






function setPublishLink(etype, etext, score) {
	var title = "";
	var imageUrl = "";
	var desc = "";
	//var displayName="";
	//alert(etype);
	//alert(etext);
	//alert(score);
	if (etype.substr(0, 9) == "conbingos") {
		var splitBingoTxt = etext.split("|");
		var displayTxt = "";
		for (var i = 0; i < splitBingoTxt.length; i++) {
			if (i == splitBingoTxt.length - 2) displayTxt += splitBingoTxt[i].replace(",", " for ") + " and ";
			else displayTxt += splitBingoTxt[i].replace(",", " for ") + " points, ";
		}
		displayTxt = displayTxt.substring(0, displayTxt.length - 2);
		displayTxt = displayTxt.replace("undefined", "");
	}
	//alert(etype);
	switch (etype) {
	case "vowels":
		title = "Vowelitis";
		imageUrl = "vowelitis.png";
		desc = displayName + " was playing Lexulous and got all vowels during a turn. Painful!";
		break;

	case "winby1":
		title = "Oh my God!";
		imageUrl = "omg.png";
		desc = displayName + " won a game of Lexulous by just ONE point! The scores were " + etext + " Whew!";
		break;

	case "winby2":
		title = "Cheeky Victory!";
		imageUrl = "cheeky.png";
		desc = displayName + " played won a game of Lexulous by just 2 points! The scores were " + etext + ".";
		break;

	case "lostby1":
		title = "Frustration!";
		imageUrl = "omg.png";
		desc = displayName + " is pulling out his hairs. He lost a game of Lexulous by just ONE point (" + etext + ")!";
		break;

	case "lostby2":
		title = "Geez!";
		imageUrl = "geez.png";
		desc = displayName + " lost a game of Lexulous by a measly two points (" + etext + "). Argh!";
		break;

	case "conbingos1":
		title = "Bingo!";
		imageUrl = "bingo.png";
		desc = displayName + " played a bingo! " + displayTxt + "!";
		break;

	case "conbingos2":
		title = "Two in a row!";
		imageUrl = "2_in_a_row.png";
		desc = displayName + " played two bingos in a row! " + displayTxt + "!";
		break;

	case "conbingos3":
		title = "Triple Bonanza!";
		imageUrl = "triple_bingo.png";
		desc = displayName + " is killing it in Lexulous, he just managed 3 bingos in a row! " + displayTxt + "!";
		break;

	case "conbingos4":
		title = "Quad Damage!";
		imageUrl = "quad_damage.png";
		desc = displayName + " managed a QUAD DAMAGE, with 4 bingos in a row! " + displayTxt + "!";
		break;

	case "conbingos5":
		title = "Complete Domination";
		imageUrl = "bingo.png";
		desc = " Can anyone stop " + displayName + "? " + pron + " just dominated the game by playing 5 bingos in a row! " + displayTxt + "!";
		break;

	}

	var pubBttnBg = $("<a></a>")
		.attr('href', '#');
	$('#achievement_box')
		.append(pubBttnBg);
	var img_src = CDN_URL + "images/images/achievements/" + imageUrl;
	var imgPub = $("<img>")
		.attr('src', img_src);
	$(pubBttnBg)
		.append(imgPub);
	$(pubBttnBg)
		.mouseup(function() {
		goPublish(title, imageUrl, desc);
	});
	$(pubBttnBg)
		.mousemove(function(e) {
		showToolTip(e, title);
	});
	$(pubBttnBg)
		.mouseout(function() {
		hideToolTip();
	});
	document.getElementById("publishTray")
		.style.display = 'block';

}


function goPublish(title, imageUrl, desc) {
	FB.ui({
		method: 'feed',
		name: title,
		link: 'https://apps.facebook.com/lexulous/',
		picture: CDN_URL + 'images/images/achievements/' + imageUrl,
		caption: 'Play Lexulous!',
		description: desc,
		message: ''
	}, function(response) {});
}

function gameoverPublish(p2, p3, p4, s1, s2, s3, s4) {
	var players = "";
	var scores = "";
	//var displayName = "";
	if (p2 != "") {
		players += p2;
	}
	if (p3 != "") {
		players += ", " + p3;
	}
	if (p4 != "") {
		players += ", " + p4;
	}

	if (s1 != 0) {
		scores += s1;
	}
	if (s2 != 0) {
		scores += " / " + s2;
	}
	if (s3 != 0) {
		scores += " / " + s3;
	}
	if (s4 != 0) {
		scores += " / " + s4;
	}

	var totscore = 0 + parseInt(s1) + parseInt(s2) + parseInt(s3) + parseInt(s4);
	var str = displayName + " was playing Lexulous and WON!"

	FB.ui({
		method: 'feed',
		name: displayName + ' WON a round of the Lexulous Word Game!',
		link: 'https://apps.facebook.com/lexulous/?cmp=winpost',
		picture: CDN_URL + 'images/images/game_winner.png',
		caption: str,
		description: 'A total of ' + totscore + ' points were scored in the game.',
		message: '',
		actions: [{
			'name': 'Start Playing Lexulous',
			'link': 'https://apps.facebook.com/lexulous/?cmp=winpost'
		}]
	}, function(response) {});
}


function gameoverArchivePublish(uname, opp_players, s1, s2, s3, s4) {
	var players = opp_players;
	var scores = "";
	var displayName = uname;
	//if(p2!="") { players+= p2; }
	//if(p3!="") { players+= ", " + p3; }
	//if(p4!="") { players+= ", " + p4; }

	if (s1 != 0) {
		scores += s1;
	}
	if (s2 != 0) {
		scores += " / " + s2;
	}
	if (s3 != 0) {
		scores += " / " + s3;
	}
	if (s4 != 0) {
		scores += " / " + s4;
	}

	var totscore = 0 + s1 + s2 + s2 + s4;
	var str = displayName + " was playing Lexulous and WON!";

	FB.ui({
		method: 'feed',
		name: 'Lexulous - The FUN Crossword Game',
		link: 'https://apps.facebook.com/lexulous/?cmp=winpost',
		picture: CDN_URL + 'images/images/game_winner.png',
		caption: str,
		description: displayName + ' won the game!',
		message: ''
	}, function(response) {});

}




/**
 * json_url         - url to fetch json object
 * cache            - use cache
 * height           - maximum number of element shown before scroll will apear
 * newel            - show typed text like a element
 * firstselected    - automaticly select first element from dropdown
 * filter_case      - case sensitive filter
 * filter_selected  - filter selected items from list
 * complete_text    - text for complete page
 * maxshownitems    - maximum numbers that will be shown at dropdown list (less better performance)
 * onselect         - fire event on item select
 * onremove         - fire event on item remove
 * maxitimes        - maximum items that can be added
 * delay            - delay between ajax request (bigger delay, lower server time request)
 * addontab         - add first visible element on tab or enter hit
 * attachto         - after this element fcbkcomplete insert own elements
 */
jQuery(function($) {
	$.fn.fcbkcomplete = function(opt) {
		return this.each(function() {
			function init() {
				createFCBK();
				preSet();
				addInput(0);
			}

			function createFCBK() {
				element.hide();
				element.attr("multiple", "multiple");
				if (element.attr("name")
					.indexOf("[]") == -1) {
					element.attr("name", element.attr("name") + "[]");
				}

				holder = $(document.createElement("ul"));
				holder.attr("class", "holder");

				if (options.attachto) {
					if (typeof(options.attachto) == "object") {
						options.attachto.append(holder);
					} else {
						$(options.attachto)
							.append(holder);
					}

				} else {
					element.after(holder);
				}

				complete = $(document.createElement("div"));
				complete.addClass("facebook-auto");
				complete.append('<div class="default">' + options.complete_text + "</div>");
				complete.hover(function() {
					options.complete_hover = 0;
				}, function() {
					options.complete_hover = 1;
				});

				feed = $(document.createElement("ul"));
				feed.attr("id", elemid + "_feed");

				complete.prepend(feed);
				holder.after(complete);
				feed.css("width", complete.width());
			}

			function preSet() {
				element.children("option")
					.each(function(i, option) {
					option = $(option);
					if (option.hasClass("selected")) {
						addItem(option.text(), option.val(), true, option.hasClass("locked"));
						option.attr("selected", "selected");
					}
					cache.push({
						key: option.text(),
						value: option.val()
					});
					search_string += "" + (cache.length - 1) + ":" + option.text() + ";";
				});
			}

			//public method to add new item
			$(this)
				.bind("addItem",

			function(event, data) {
				addItem(data.title, data.value, 0, 0, 0);
			});

			//public method to remove item
			$(this)
				.bind("removeItem",

			function(event, data) {
				var item = holder.children('li[rel=' + data.value + ']');
				if (item.length) {
					removeItem(item);
				}
			});

			//public method to remove item
			$(this)
				.bind("destroy",

			function(event, data) {
				holder.remove();
				complete.remove();
				element.show();
			});

			function addItem(title, value, preadded, locked, focusme) {
				if (!maxItems()) {
					return false;
				}
				var li = document.createElement("li");
				var txt = document.createTextNode(title);
				var aclose = document.createElement("a");
				var liclass = "bit-box" + (locked ? " locked" : "");
				$(li)
					.attr({
					"class": liclass,
					"rel": value
				});
				$(li)
					.prepend(txt);
				$(aclose)
					.attr({
					"class": "closebutton",
					"href": "#"
				});

				li.appendChild(aclose);
				holder.append(li);

				$(aclose)
					.click(function() {
					removeItem($(this)
						.parent("li"));
					return false;
				});

				if (!preadded) {
					$("#" + elemid + "_annoninput")
						.remove();
					var _item;
					addInput(focusme);
					if (element.children("option[value=" + value + "]")
						.length) {
						_item = element.children("option[value=" + value + "]");
						_item.get(0)
							.setAttribute("selected", "selected");
						_item.attr("selected", "selected");
						if (!_item.hasClass("selected")) {
							_item.addClass("selected");
						}
					} else {
						var _item = $(document.createElement("option"));
						_item.attr("value", value)
							.get(0)
							.setAttribute("selected", "selected");
						_item.attr("value", value)
							.attr("selected", "selected");
						_item.attr("value", value)
							.addClass("selected");
						_item.text(title);
						element.append(_item);
					}
					if (options.onselect) {
						funCall(options.onselect, _item)
					}
					element.change();
				}
				holder.children("li.bit-box.deleted")
					.removeClass("deleted");
				feed.hide();
			}

			function removeItem(item) {

				if (!item.hasClass('locked')) {
					item.fadeOut("fast");
					if (options.onremove) {
						var _item = element.children("option[value=" + item.attr("rel") + "]");
						funCall(options.onremove, _item)
					}
					element.children('option[value="' + item.attr("rel") + '"]')
						.removeAttr("selected")
						.removeClass("selected");
					item.remove();
					element.change();
					deleting = 0;
				}
			}

			function addInput(focusme) {
				var li = $(document.createElement("li"));
				var input = $(document.createElement("input"));
				var getBoxTimeout = 0;

				li.attr({
					"class": "bit-input",
					"id": elemid + "_annoninput"
				});
				input.attr({
					"type": "text",
					"class": "maininput",
					"size": "1"
				});
				holder.append(li.append(input));

				input.focus(function() {
					complete.fadeIn("fast");
				});

				input.blur(function() {
					if (options.complete_hover) {
						complete.fadeOut("fast");
					} else {
						input.focus();
					}
				});

				holder.click(function() {
					input.focus();
					if (feed.length && input.val()
						.length) {
						feed.show();
					} else {
						feed.hide();
						complete.children(".default")
							.show();
					}
				});

				input.keypress(function(event) {
					if (event.keyCode == 13) {
						return false;
					}
					//auto expand input             
					input.attr("size", input.val()
						.length + 1);
				});

				input.keydown(function(event) {
					//prevent to enter some bad chars when input is empty
					if (event.keyCode == 191) {
						event.preventDefault();
						return false;
					}
				});

				input.keyup(function(event) {
					var etext = xssPrevent(input.val());

					if (event.keyCode == 8 && etext.length == 0) {
						feed.hide();
						if (!holder.children("li.bit-box:last")
							.hasClass('locked')) {
							if (holder.children("li.bit-box.deleted")
								.length == 0) {
								holder.children("li.bit-box:last")
									.addClass("deleted");
								return false;
							} else {
								if (deleting) {
									return;
								}
								deleting = 1;
								holder.children("li.bit-box.deleted")
									.fadeOut("fast",

								function() {
									removeItem($(this));
									return false;
								});
							}
						}
					}

					if (event.keyCode != 40 && event.keyCode != 38 && event.keyCode != 37 && event.keyCode != 39 && etext.length != 0) {
						counter = 0;

						if (options.json_url) {
							if (options.cache && json_cache) {
								addMembers(etext);
								bindEvents();
							} else {
								getBoxTimeout++;
								var getBoxTimeoutValue = getBoxTimeout;
								setTimeout(function() {
									if (getBoxTimeoutValue != getBoxTimeout) return;
									$.getJSON(options.json_url, {
										tag: etext
									},

									function(data) {
										addMembers(etext, data);
										json_cache = true;
										bindEvents();
									});
								},
								options.delay);
							}
						} else {
							addMembers(etext);
							bindEvents();
						}
						complete.children(".default")
							.hide();
						feed.show();
					}
				});
				if (focusme) {
					setTimeout(function() {
						input.focus();
						complete.children(".default")
							.show();
					},
					1);
				}
			}

			function addMembers(etext, data) {
				feed.html('');

				if (!options.cache && data != null) {
					cache = new Array();
					search_string = "";
				}

				addTextItem(etext);

				if (data != null && data.length) {
					$.each(data,

					function(i, val) {
						cache.push({
							key: val.key,
							value: val.value
						});
						search_string += "" + (cache.length - 1) + ":" + val.key + ";";
					});
				}

				var maximum = options.maxshownitems < cache.length ? options.maxshownitems : cache.length;
				var filter = "i";
				if (options.filter_case) {
					filter = "";
				}

				var myregexp,
				match;
				try {
					myregexp = eval('/(?:^|;)\\s*(\\d+)\\s*:[^;]*?' + etext + '[^;]*/g' + filter);
					match = myregexp.exec(search_string);
				} catch (ex) {};

				var content = '';
				while (match != null && maximum > 0) {
					var id = match[1];
					var object = cache[id];
					if (options.filter_selected && element.children("option[value=" + object.value + "]")
						.hasClass("selected")) {
						//nothing here...
					} else {
						content += '<li rel="' + object.value + '">' + itemIllumination(object.key, etext) + '</li>';
						counter++;
						maximum--;
					}
					match = myregexp.exec(search_string);
				}
				feed.append(content);

				if (options.firstselected) {
					focuson = feed.children("li:visible:first");
					focuson.addClass("auto-focus");
				}

				if (counter > options.height) {
					feed.css({
						"height": (options.height * 24) + "px",
						"overflow": "auto"
					});
				} else {
					feed.css("height", "auto");
				}
			}

			function itemIllumination(text, etext) {
				if (options.filter_case) {
					try {
						eval("var text = text.replace(/(.*)(" + etext + ")(.*)/gi,'$1<em>$2</em>$3');");
					} catch (ex) {};
				} else {
					try {
						eval("var text = text.replace(/(.*)(" + etext.toLowerCase() + ")(.*)/gi,'$1<em>$2</em>$3');");
					} catch (ex) {};
				}
				return text;
			}

			function bindFeedEvent() {
				feed.children("li")
					.mouseover(function() {
					feed.children("li")
						.removeClass("auto-focus");
					$(this)
						.addClass("auto-focus");
					focuson = $(this);
				});

				feed.children("li")
					.mouseout(function() {
					$(this)
						.removeClass("auto-focus");
					focuson = null;
				});
			}

			function removeFeedEvent() {
				feed.children("li")
					.unbind("mouseover");
				feed.children("li")
					.unbind("mouseout");
				feed.mousemove(function() {
					bindFeedEvent();
					feed.unbind("mousemove");
				});
			}

			function bindEvents() {
				var maininput = $("#" + elemid + "_annoninput")
					.children(".maininput");
				bindFeedEvent();
				feed.children("li")
					.unbind("mousedown");
				feed.children("li")
					.mousedown(function() {
					var option = $(this);
					addItem(option.text(), option.attr("rel"), 0, 0, 1);
					feed.hide();
					complete.hide();
				});

				maininput.unbind("keydown");
				maininput.keydown(function(event) {
					if (event.keyCode == 191) {
						event.preventDefault();
						return false;
					}

					if (event.keyCode != 8) {
						holder.children("li.bit-box.deleted")
							.removeClass("deleted");
					}

					if ((event.keyCode == 13 || event.keyCode == 9) && checkFocusOn()) {
						var option = focuson;
						addItem(option.text(), option.attr("rel"), 0, 0, 1);
						complete.hide();
						event.preventDefault();
						focuson = null;
						return false;
					}

					if ((event.keyCode == 13 || event.keyCode == 9) && !checkFocusOn()) {
						if (options.newel) {
							var value = xssPrevent($(this)
								.val());
							addItem(value, value, 0, 0, 1);
							complete.hide();
							event.preventDefault();
							focuson = null;
							return false;
						}

						if (options.addontab) {
							focuson = feed.children("li:visible:first");
							var option = focuson;
							addItem(option.text(), option.attr("rel"), 0, 0, 1);
							complete.hide();
							event.preventDefault();
							focuson = null;
							return false;
						}
					}

					if (event.keyCode == 40) {
						removeFeedEvent();
						if (focuson == null || focuson.length == 0) {
							focuson = feed.children("li:visible:first");
							feed.get(0)
								.scrollTop = 0;
						} else {
							focuson.removeClass("auto-focus");
							focuson = focuson.nextAll("li:visible:first");
							var prev = parseInt(focuson.prevAll("li:visible")
								.length, 10);
							var next = parseInt(focuson.nextAll("li:visible")
								.length, 10);
							if ((prev > Math.round(options.height / 2) || next <= Math.round(options.height / 2)) && typeof(focuson.get(0)) != "undefined") {
								feed.get(0)
									.scrollTop = parseInt(focuson.get(0)
									.scrollHeight, 10) * (prev - Math.round(options.height / 2));
							}
						}
						feed.children("li")
							.removeClass("auto-focus");
						focuson.addClass("auto-focus");
					}
					if (event.keyCode == 38) {
						removeFeedEvent();
						if (focuson == null || focuson.length == 0) {
							focuson = feed.children("li:visible:last");
							feed.get(0)
								.scrollTop = parseInt(focuson.get(0)
								.scrollHeight, 10) * (parseInt(feed.children("li:visible")
								.length, 10) - Math.round(options.height / 2));
						} else {
							focuson.removeClass("auto-focus");
							focuson = focuson.prevAll("li:visible:first");
							var prev = parseInt(focuson.prevAll("li:visible")
								.length, 10);
							var next = parseInt(focuson.nextAll("li:visible")
								.length, 10);
							if ((next > Math.round(options.height / 2) || prev <= Math.round(options.height / 2)) && typeof(focuson.get(0)) != "undefined") {
								feed.get(0)
									.scrollTop = parseInt(focuson.get(0)
									.scrollHeight, 10) * (prev - Math.round(options.height / 2));
							}
						}
						feed.children("li")
							.removeClass("auto-focus");
						focuson.addClass("auto-focus");
					}
				});
			}

			function maxItems() {
				if (options.maxitems != 0) {
					//alert(holder.children("li.bit-box").length);
					if (holder.children("li.bit-box")
						.length < options.maxitems) {
						return true;
					} else {
						return false;
					}
				}
			}

			function addTextItem(value) {
				if (options.newel && maxItems()) {
					feed.children("li[fckb=1]")
						.remove();
					if (value.length == 0) {
						return;
					}
					var li = $(document.createElement("li"));
					li.attr({
						"rel": value,
						"fckb": "1"
					})
						.html(value);
					feed.prepend(li);
					counter++;
				} else {
					return;
				}
			}

			function funCall(func, item) {
				var _object = "";
				for (i = 0; i < item.get(0)
					.attributes.length; i++) {
					if (item.get(0)
						.attributes[i].nodeValue != null) {
						_object += "\"_" + item.get(0)
							.attributes[i].nodeName + "\": \"" + item.get(0)
							.attributes[i].nodeValue + "\",";
					}
				}
				_object = "{" + _object + " notinuse: 0}";
				func.call(func, _object);
			}

			function checkFocusOn() {
				if (focuson == null) {
					return false;
				}
				if (focuson.length == 0) {
					return false;
				}
				return true;
			}

			function xssPrevent(string) {
				string = string.replace(/[\"\'][\s]*javascript:(.*)[\"\']/g, "\"\"");
				string = string.replace(/script(.*)/g, "");
				string = string.replace(/eval\((.*)\)/g, "");
				string = string.replace('/([\x00-\x08,\x0b-\x0c,\x0e-\x19])/', '');
				return string;
			}

			var options = $.extend({
				json_url: null,
				cache: false,
				height: "10",
				newel: false,
				addontab: false,
				firstselected: false,
				filter_case: false,
				filter_selected: false,
				complete_text: "Start typing a name",
				maxshownitems: 30,
				maxitems: 10,
				onselect: null,
				onremove: null,
				attachto: null,
				delay: 350
			},
			opt);

			//system variables
			var holder = null;
			var feed = null;
			var complete = null;
			var counter = 0;
			var cache = new Array();
			var json_cache = false;
			var search_string = "";
			var focuson = null;
			var deleting = 0;
			var complete_hover = 1;

			var element = $(this);
			var elemid = element.attr("id");
			init();

			return this;
		});
	};
});



//////////// #2481 ///////////////////

/*************FOR NEW LAYOUT******************/
/**********************************************/

function contactUs_submit() {
	$("#email_error_msg")
		.html("");
	$("#message_error_msg")
		.html("");
	var val_mail = $("#contact_mail_id")
		.val();
	var val_msg = $("#contact_msg_id")
		.val();
	var patern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if (val_mail == "") {
		//alert("email empty");
		$("#email_error_msg")
			.html("* Email is empty");
	} else if (val_msg == "") {
		//alert("msg empty");
		$("#message_error_msg")
			.html("* Message is empty");
	} else if (!patern.test(val_mail)) {
		//alert("email incorrect");
		$("#email_error_msg")
			.html("* Incorrect Email");
	} else {
		$("#contact_cmail_id")
			.val(val_mail);
		$("#contactForm")
			.submit();
	}
}

/////For Join page/////////

function showJoinUserInfo_new($ids_str) {
	showMiniStatsForUsers($ids_str, "joingame");
	return;
	FB.api({
		method: 'fql.query',
		query: 'SELECT pic_small,uid FROM user WHERE uid IN (' + $ids_str + ')'
	},

	function(response) {
		for (var i = 0; i < response.length; i++) {
			$("#userImage" + response[i].uid)
				.html('<img src="' + response[i].pic_small + '" width="30" height="30" alt="" style="position: relative;display: block;"/>');
			$("a#joingame_img_" + response[i].uid)
				.html('<img src="' + response[i].pic_small + '" height="50" width="50"/>'); /////31_1_13
		}
	});

	////31_1_13
	var callUrl = APP_URL_JS + "ajax/show_stats.php?uid_list=" + $ids_str;
	$.ajax({
		method: "get",
		url: callUrl,
		beforeSend: function() {},
		complete: function() {},
		success: function(reply) {
			var users_statsArr = jQuery.parseJSON(reply);
			for (var key in users_statsArr) {
				var total_played = parseInt(users_statsArr[key]['won']) + parseInt(users_statsArr[key]['lost']) + parseInt(users_statsArr[key]['drawn']);
				$('span#stats_plays_' + key)
					.text(total_played);
				$('span#stats_won_' + key)
					.text(users_statsArr[key]['won']);
				$('span#stats_lost_' + key)
					.text(users_statsArr[key]['lost']);
				//$('span#stats_drawn_'+key).text(users_statsArr[key]['drawn']);//#3175
				$('span#stats_rating_' + key)
					.text(users_statsArr[key]['rating']); //--#3175
			}
		}
	});
	///31_1_13
}


/* Used in host table */

function hostgame_submit() {
	var val_dic = $("#hostgameDic")
		.text();
	var val_type = $("#gametype")
		.text();
	var val_speed = $("#hostgamespeed")
		.text();
	var val_maxreq = $("#hostgamemaxrequest")
		.text();
	var brag = $("#host_brag")
		.val();

	if (val_dic == '' || val_speed == '' || val_maxreq == '') {
		top.location.href = FB_APP_PATH + '?action=gamerequest';
		exit;
	}

	if (val_dic == 'US English') val_dictionary = 'twl';
	else if (val_dic == 'UK English') val_dictionary = 'sow';
	else if (val_dic == 'French') val_dictionary = 'fr';
	else if (val_dic == 'Italian') val_dictionary = 'it';
	$("#dictionary")
		.val(val_dictionary);

	if (val_type == 'Regular') val_gametype = 'R';
	else if (val_type == 'Challenge') val_gametype = 'C';
	else if (val_type == '') val_gametype = 'R';
	$("#hostgametype")
		.val(val_gametype);

	if (val_speed == 'Slow') val_gamespeed = 's';
	else if (val_speed == 'Medium') val_gamespeed = 'm';
	else if (val_speed == 'Fast') val_gamespeed = 'f';
	$("#gamespeed")
		.val(val_gamespeed);

	$("#maxplayers")
		.val(val_maxreq);

	$("#brag")
		.val(brag);

	$("#gamereqform")
		.submit();
	$("#greybtn5")
		.removeClass("grey_button")
		.addClass("grey_button_press");
	return false;
}

var lastDivSelected = "Basic";

function statToggleShow_new(tag) {
	if (tag != "Basic") {
		$("#reset_stats_div")
			.css({
			"display": "none"
		});
	} else if (tag == "Basic") {
		$("#reset_stats_div")
			.css({
			"display": "block"
		});
	}
	if (lastDivSelected == tag) {
		return false;
	} else {
		$("#" + tag + "Div")
			.css({
			"display": "block"
		});
		$("#" + lastDivSelected + "Div")
			.css({
			"display": "none"
		});
		$("#" + tag + "Tab")
			.addClass("active");
		$("#" + lastDivSelected + "Tab")
			.removeClass("active");
	}
	lastDivSelected = tag;
	return false;
}

/* Used in viewrequest.php   */

function getHostedGames_new(uid, signReq) {
	var callurl = APP_URL_JS + "ajax/viewrequest_response_new.php";
	var chkAdult = "n";
	var chkFastGame = "";
	var chkLang = "";

	var val_dic = $("#joingameDic")
		.text();
	if (val_dic == "US English") {
		chkLang = "twl";
	} else if (val_dic == "UK English") {
		chkLang = "sow";
	} else if (val_dic == "French") {
		chkLang = "fr";
	} else if (val_dic == "Italian") {
		chkLang = "it";
	} else chkLang = "";

	var val_speed = $("#joingamespeed")
		.text();
	if (val_speed == "Slow Games") {
		chkFastGame = "s";
	} else if (val_speed == "Medium Paced Games") {
		chkFastGame = "m";
	} else if (val_speed == "Fast Games Only") {
		chkFastGame = "f";
	} else chkFastGame = "";

	$.ajax({
		method: "get",
		url: callurl,
		data: {
			user: uid,
			signed_request: signReq,
			dictionary: chkLang,
			speed: chkFastGame,
			adult: chkAdult,
			random: Math.random()
		},
		beforeSend: function() {
			$("#searchResDiv")
				.html("");
			$("#gif_loader")
				.fadeIn("slow");
		},
		complete: function() {
			$("#gif_loader")
				.fadeOut("slow");
		},
		success: function(html) {
			$("#searchResDiv")
				.html(html);
		}
	});

}

/* For newgame.php  */

function matchfriend(e, id) {
	$("#newgame_ad")
		.css({
		"display": "none"
	});
	var posX = $("#" + id)
		.offset()
		.left;
	var posY = $("#" + id)
		.offset()
		.top;
	$("div#newgame_friend_popup")
		.css({
		"left": posX + 131,
		"top": posY - 50
	});
	var match_flg = $("#match_flag")
		.val();

	if (match_flg == 0) {
		matchfriend_newgame('appfriend');
		$("#newgame_friend_popup")
			.show();
	} else {
		var str = $("#frnds")
			.val();
		$("#friend_list")
			.html('<input name="" type="text" value="Search Friends" onFocus="clearText(this)" onBlur="clearText(this)" id="search" onkeyup="search_friend()" class="newgame_search-box-bg" /><div style="border-bottom:1px solid #ccc;"></div>' + str);
	}
} /* For newgame.php  */

function friend_selection(friend_option, page) {

	/*var frnd_option='';
	if(friend_option=='appfriend')
	frnd_option='appfriend';
	else 
	frnd_option='allfriend';*/

	//alert(frnd_option);
	if (page == 'newgame') {
		$("#friend_list")
			.html('<div class="newgame_user_active_row1 newgame_loading_text" id="search_div">Loading friends list, please wait...</div>');
		matchfriend_newgame(friend_option);
		$("#newgame_friend_popup")
			.show();
	} else if (page == 'header') {
		$("#friend_list_header")
			.html('<div class="newgame_user_active_row1 newgame_loading_text" id="search_div"> Loading friends list, please wait...</div>');
		matchfriend_header(friend_option);
		$("#header_friend_popup")
			.show();
	}

}


function matchfriend_newgame(friend_option) {
		if((global_appfrndCount <= 100) && (friend_option == 'appfriend')){
			
			//appfrndArr = $.jStorage.get('LEXappfrndArr' + fb_uid, null);
			appfrndArr = friends_countOBJ["LEXappfrndArr" + fb_uid]
			appfrndList = appfrndArr.join(",");
			getUsersFBInfoForMiniStats(appfrndList, 'newgame_appfriend');
			
			$("#allfrnd_newgame").removeClass("active");
			$("#allfrnd_newgame").css("color", "");
			$("#appfrnd_newgame").addClass("active");
			$("#appfrnd_newgame").css("color", "#555");	
			
			//$("#search_friend_newgame")
			//.html('<input name="" type="text" class="input_box" style="font-size:14px;color:#999;" value="Search..." onFocus="clearText(this)" onBlur="clearText(this)"  id="search" onkeyup="search_friend()" autocomplete="off"/>');
			
		}else if((global_allfrndCount <= 100) && (friend_option == 'allfriend')){
			
			//nonappfrndArr = $.jStorage.get('LEXnonappfrndArr' + fb_uid, null);
			nonappfrndArr = friends_countOBJ["LEXnonappfrndArr" + fb_uid]
			nonappfrndList = nonappfrndArr.join(",");
			getUsersFBInfoForMiniStats(nonappfrndList, 'newgame_allfriend');
			
			$("#appfrnd_newgame").removeClass("active");
			$("#appfrnd_newgame").css("color", "");
			$("#allfrnd_newgame").addClass("active");
			$("#allfrnd_newgame").css("color", "#555");
			
			//$("#search_friend_newgame")
			//.html('<input name="" type="text" class="input_box" style="font-size:14px;color:#999;" value="Search..." onFocus="clearText(this)" onBlur="clearText(this)"  id="search" onkeyup="search_friend()" autocomplete="off"/>');	
		
	}else{
			var nickname;
			var str = "";
			var str2 = "";
			FB.api('/me', function(response) {
				var query = FB.Data.query('SELECT uid,name,first_name,last_name,pic_square,is_app_user FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me() AND NOT (uid2 IN (' + blockedUserStr + '))) order by first_name', response.id);
				query.wait(function(rows) {
					str = '<div class="navigation_tab">';
					str2 = '<div class="navigation_tab">';
					for (var i = 0; i < rows.length; i++) {
						nickname = rows[i].first_name + " " + rows[i].last_name.substr(0, 1);
		
						if (rows[i].is_app_user) {
							details = "'" + rows[i].uid + "," + rows[i].name + "'";
							str += '<div class="section clear">' + '<span><img src="' + rows[i].pic_square + '" alt="" width="32px" height="32px" /></span>' + '<span class="user_name">' + rows[i].name + '</span>' + '<a href="#" class="blue_button blue_button_small flt_right" style="line-height:16px;height:18px;margin:6px 15px 0 0;" onclick="showSelected(' + details + ');return false;">Select</a>' + '</div>';
						} else {
							str2 += '<div class="section clear">' + '<span><img src="' + rows[i].pic_square + '" alt="" width="32px" height="32px" /></span>' + '<span class="user_name">' + rows[i].name + '</span>' + '<a href="#" class="blue_button blue_button_small flt_right" style="line-height:16px;height:18px;margin:6px 15px 0 0;" onclick="showInviteUI_header(\'' + rows[i].uid + '\');">Invite</a>' + '</div>';
		
						}
		
		
					}
					str += '</div>';
					str2 += '</div>';
					//$("#search_friend_newgame")
					//	.html('<input name="" type="text" class="input_box" style="font-size:14px;color:#999;" value="Search..." onFocus="clearText(this)" onBlur="clearText(this)"  id="search" onkeyup="search_friend()" autocomplete="off"/>');
					if (str == '<div class="navigation_tab"></div>') friend_option = 'allfriend';
					if (friend_option == 'allfriend') {
						$("#appfrnd_newgame")
							.removeClass("active");
						$("#appfrnd_newgame")
							.css("color", "");
						$("#allfrnd_newgame")
							.addClass("active");
						$("#allfrnd_newgame")
							.css("color", "#555");
						$("#friend_list")
							.html(str2);
		
					} else {
						$("#allfrnd_newgame")
							.removeClass("active");
						$("#allfrnd_newgame")
							.css("color", "");
						$("#appfrnd_newgame")
							.addClass("active");
						$("#appfrnd_newgame")
							.css("color", "#555");
						$("#friend_list")
							.html(str);
					}
		
				});
			});
		}

		$("#search_friend_newgame")
		.html('<input name="" type="text" class="input_box" style="font-size:14px;color:#999;" value="Search..." onFocus="clearText(this)" onBlur="clearText(this)"  id="search" onkeyup="search_friend()" autocomplete="off"/>');
}

/* For newgame.php  */

function clearText(field) {
	if (field.defaultValue == field.value) field.value = '';
	else if (field.value == '') field.value = field.defaultValue;
}

function search_friend() {
	var search_text = $('#search')
		.val();
	var rg = new RegExp(search_text, 'i');
	$('#friend_list .navigation_tab .user_name')
		.each(function() {
		if ($.trim($(this)
			.html())
			.search(rg) == -1) {
			$(this)
				.parent()
				.css('display', 'none');
		} else {
			$(this)
				.parent()
				.css('display', '');
		}
	});
}

/* For newgame.php  */

function hide_search() {
	$("#search")
		.val('');
} /* For newgame.php  */

function showSelected(fid) {
	var fdetails = fid.split(",");
	$("#newgame_friend_popup")
		.hide();

	var flag = $("#flag")
		.val();
	if (flag < 4) {

		var str = '<span id=' + fdetails[0] + ' class="uiToken"><a href="#" id="name" onclick="showprofile(\'' + fdetails[0] + '\'); return false;" >' + fdetails[1] + '</a>&nbsp;' + '<a href="#" style="font-size:11px;color:333px;" onclick="hideimage(\'' + fdetails[0] + '\');">X</a></span>';

		$(".selectedlist")
			.append(str);
		if (flag == 1) {
			$("#selectedfriend")
				.val(fdetails[0]);
			$("#friend")
				.hide();
			$("#select_text")
				.hide();
			$("#add_friend")
				.show();
		} else {
			var f_uid = $("#selectedfriend")
				.val() + ',' + fdetails[0];
			$("#selectedfriend")
				.val(f_uid);
		}
		flag++;
		$("#flag")
			.val(flag);
		if (flag > 1) { ///added on 8_1_13
			$("#greybtn5")
				.removeClass("grey_button_newgame grey_button_normal")
				.addClass("blue_button blue_button_big");
		}

		if (flag == 4) {
			$("#add_friend")
				.hide();
		}
	}
	$("#newgame_ad")
		.css({
		"display": "block"
	});
} /*	End	 newgame */


function showprofile(fid) {
	var url = FB_APP_PATH + "?action=profile&profileid=" + fid;
	window.open(url);
}

function hideimage(fid) {
	$("#" + fid)
		.remove();
	var ids = $("#selectedfriend")
		.val();
	var temp = ids.split(",");
	var flag = $("#flag")
		.val();
	flag--;
	$("#flag")
		.val(flag);
	if (flag <= 1) { ///added on 8_1_13
		$("#greybtn5")
			.removeClass("blue_button blue_button_big")
			.addClass("grey_button_newgame grey_button_normal");
	}

	var newid;
	switch (temp.length) {
	case 1:
		$("#selectedfriend")
			.val('');
		$("#friend")
			.show();
		$("#select_text")
			.show();
		$("#add_friend")
			.hide();
		break;
	case 2:
		if (temp[0] == fid) newid = temp[1];
		else newid = temp[0];
		$("#selectedfriend")
			.val(newid);
		break;
	case 3:
		if (temp[0] == fid) newid = temp[1] + "," + temp[2];
		else if (temp[1] == fid) newid = temp[0] + "," + temp[2];
		else newid = temp[0] + "," + temp[1];
		$("#selectedfriend")
			.val(newid);
		$("#add_friend")
			.show();
		break;
	default:
		break;
	}

}

function hide_popup() {
	$("#newgame_friend_popup")
		.hide();
} /*   End newgame.php***/

function check_nudge(oppid, link) {
	FB.ui({
		method: 'send',
		name: 'Hey, we have a game of Lexulous in progress and it\'s your turn:) Please click on this link to play your move.',
		to: oppid,
		link: link
	});
}

function completedgame_submit(id, txt) {
	$("#newcompleteDic")
		.text(txt);
	$("#search_option")
		.val(txt);
	$("#gamecomplete_dic")
		.hide();
	$("#archive_form")
		.submit();
}


function goToProfile(uid) {
	top.location.href = FB_APP_PATH + '?action=profile&profileid=' + uid;
}

function goto_newgame() {
	top.location.href = FB_APP_PATH + '?action=newgame';
}

function showVal(cnt) {
	$("#msgindex_" + cnt)
		.text("View Game");
}

function hideval(cnt) {
	$("#msgindex_" + cnt)
		.html("");
}

function changePage(url) {
	top.location.href = url;
}

function gameoverPublish_new(opp_names, scores, displayName) {

	var str = displayName + " was playing Lexulous and WON!"

	FB.ui({
		method: 'feed',
		name: displayName + ' WON a round of the Lexulous Word Game!',
		link: 'https://apps.facebook.com/lexulous/?cmp=winpost',
		picture: CDN_URL + 'images/images/game_winner.png',
		caption: str,
		description: 'A total of ' + scores + ' points were scored in the game.',
		message: '',
		actions: [{
			'name': 'Start Playing Lexulous',
			'link': 'https://apps.facebook.com/lexulous/?cmp=winpost'
		}]
	}, function(response) {});
	return false;
}

//////defaul.php for nudge and force win

function nudge_message(oppid, gid, count, oppname) {

	var path = FB_APP_PATH + "?viewgid=" + gid;

	var name = oppname;
	if ($("#nudge_previous")
		.val() != "") {
		$($("#nudge_previous")
			.val())
			.css({
			'display': 'block'
		});
	}
	$("#page_heading_nudge")
		.html("Nudge " + name);
	$("#nudge_span_id")
		.html("It seems " + name + " hasn't played a move for a couple of days. A nudge will remind them that it's their turn to play a move!");
	$("#blue_button_nudge")
		.html('<span onclick="do_nudge(' + gid + ',' + count + ',' + oppid + ');return false;">Nudge \'em</span>');

	$("#nudge_close_btn")
		.click(function() {
		$("#nudge_popup")
			.hide();
		return false;
	});

	var mouseX = $("a#nudgebtn" + count)
		.offset()
		.left; //alert(mouseX);
	var mouseY = $("a#nudgebtn" + count)
		.offset()
		.top; //alert(mouseY);

	$("div#nudge_popup")
		.css({
		"left": mouseX - 300,
		"top": mouseY - 200
	})
		.show();
	$("#nudge_previous")
		.val("#forcewin2_id_" + count);

}


function do_nudge(gid, count, oppid) {

	var callUrl = APP_URL_JS + "ajax/show_nudge.php?gameid=" + gid + "&opp_id=" + oppid; //alert(callUrl);
	$.ajax({
		method: "post",
		url: callUrl,
		beforeSend: function() {
			$("#blue_button_nudge")
				.html("Loading..");
		},
		complete: function() {},
		success: function(reply) {
			$("div#nudged_div_" + count)
				.removeClass('text4 td04');
			$("div#nudged_div_" + count)
				.addClass('text7');
			$("div#nudged_div_" + count)
				.html('<a href="#" class="white_button" id="test" onmousedown="javascript:document.getElementById("test").className="white_button_press" onmouseup="javascript:document.getElementById("test").className="white_button" onmouseout="javascript:document.getElementById("test").className="white_button">Nudge</a>');
			$("a#nudgebtn" + count)
				.removeClass('greenbutton');
			$("a#nudgebtn" + count)
				.addClass('white_button');
			$("a#nudgebtn" + count)
				.attr('onclick', '');
			$("a#nudgebtn" + count)
				.html('Nudge');
			$("div#nudge_popup")
				.hide();

		}
	});
}

function do_forceWin(gid, pid, password, uid) {

	var callUrl = APP_URL_JS + "ajax/do_forcewin.php?gid=" + gid + "&pid=" + pid + "&password=" + password + "&user=" + uid; //alert(callUrl);
	$.ajax({
		method: "post",
		url: callUrl,
		beforeSend: function() {

		},
		complete: function() {

		},
		success: function(reply) {
			$("#forcewin_popup")
				.hide();
			alert(reply);
			top.location.href = FB_APP_PATH;
		}
	});
}

function forcewin_popup(gid, pid, passwd, user, opp_name, cnt) {
	if ($("#forcewin_previous")
		.val() != "") {
		$($("#forcewin_previous")
			.val())
			.css({
			'display': 'block'
		});
	}

	var passwd = "'" + passwd + "'";
	var name = opp_name;

	$("#force_win_id")
		.html(name + " hasn't played their turn for quite a few days now. If you feel they won't be playing, you can force win the game now.");

	$("#red_button_forcewin")
		.html('<span onclick="do_forceWin(' + gid + ',' + pid + ',' + passwd + ',' + user + ');return false;">Force Win</span>');

	$("#close_button_forcewin")
		.click(function(event) {
		$("#forcewin_popup")
			.hide();
		return false;
	});

	var mouseX = $("a#forcewinbtn" + cnt)
		.offset()
		.left;
	var mouseY = $("a#forcewinbtn" + cnt)
		.offset()
		.top;

	$("div#forcewin_popup")
		.css({
		"left": mouseX - 300,
		"top": mouseY - 200
	});

	$("#forcewin_popup")
		.show();
	//$("#forcewin2_id_"+cnt).css({'display':'none'});
	$("#forcewin_previous")
		.val("#forcewin2_id_" + cnt);
}
///////nudge force win end

////////mysettings.php

function submit_form() {
	$("#settingform")
		.submit();
}

///////////newgame.php

function newgameform_submit(url) {
	var flag = $("#flag")
		.val();
	if (flag == 1) return;
	$("#greybtn5")
		.text("Please wait...");
	$("#greybtn5")
		.removeClass("blue_button blue_button_big")
		.addClass("grey_button grey_button_normal");
	$("#greybtn5")
		.css({
		"color": "#999"
	});
	var val_dic = $.trim($("span#newgameDic")
		.text());
	var val_type = $.trim($("span#newgametype")
		.text());
	if (val_dic == '') {
		top.location.href = url;
		return;
	}
	if (val_dic == 'US English') val_dictionary = 'twl';
	else if (val_dic == 'UK English') val_dictionary = 'sow';
	else if (val_dic == 'French') val_dictionary = 'fr';
	else if (val_dic == 'Italian') val_dictionary = 'it';
	$("#dictionary")
		.val(val_dictionary);

	if (val_type == 'Regular') val_gametype = 'R';
	else if (val_type == 'Challenge') val_gametype = 'C';
	if (val_type == '') val_gametype = 'R';

	$("#gametype")
		.val(val_gametype);
	$("#gamenumber")
		.val($.trim($("span#newgame_number")
		.text())); ////#3105
	$("#newgameform")
		.submit();
	return false;
}
////end


///Used in Header.php

function matchfriend_open_header(e, status, id) {
	if (!status) { //header
		var posX = $("#" + id)
			.offset()
			.left;
		var posY = $("#" + id)
			.offset()
			.top;
		$("div#header_friend_popup")
			.css({
			"left": posX + 40,
			"top": posY - 45
		});
		matchfriend_header('appfriend');
		$("#header_friend_popup")
			.show();
	} else { //index
		var posX = $("div#" + id)
			.offset()
			.left;
		var posY = $("div#" + id)
			.offset()
			.top;
		if(status=="newpage"){
			posX += 260;
			posY += 260;
		}
		$("div#header_friend_popup")
			.css({
			"left": posX + 110,
			"top": posY - 150
		});
		matchfriend_header('appfriend');
		$("#header_friend_popup")
			.show();
	}
}

var fav_friendsOBJ = {};
function matchfriend_header(friend_option) {

	
	/*fav_friendsUids = $.jStorage.get("LEXfav_friendsUids" + fb_uid, null);
	if(fav_friendsUids == null){*/
		//var fav_friendsArr = new Array();
		var fav_friendsUids = '';
		var callUrl = APP_URL_JS + "ajax/show_favfriends.php?uid=" + fb_uid + "&block=" + blockedUserStr;
		$.ajax({
			method: "POST",
			url: callUrl,
			dataType: "json",
			async: false,
			beforeSend: function() {
	
			},
			complete: function() {
	
			},
			success: function(reply) {
				//alert(reply.length);alert(reply[1].opp_id);
				$("a#favfrnd_header")
					.html("Favorites (" + reply.length + ")");
				for (var i = 0; i < reply.length; i++) {
					//fav_friendsArr[reply[i]['opp_id']] = reply[i]['games'];
					fav_friendsUids = fav_friendsUids + reply[i]['opp_id'] + ",";
					//$.jStorage.set("LEXfav_friendsUids" + fb_uid, fav_friendsUids);
					//$.jStorage.setTTL("LEXfav_friendsUids" + fb_uid, 900000);
					fav_friendsOBJ["LEXfav_friendsUids" + fb_uid] = fav_friendsUids;
				}				
			}
		});
	/*}else{
		$("a#favfrnd_header").html("Favorites (" + fav_friendsUids.substring(0, fav_friendsUids.length - 1).split(",").length + ")");
	}*/
	
	
	
	/*var fav_friendsArr = new Array();
	var fav_friendsUids = '';
	var callUrl = APP_URL_JS + "ajax/show_favfriends.php?uid=" + fb_uid + "&block=" + blockedUserStr;
	$.ajax({
		method: "POST",
		url: callUrl,
		dataType: "json",
		async: false,
		beforeSend: function() {

		},
		complete: function() {

		},
		success: function(reply) {
			//alert(reply.length);alert(reply[1].opp_id);
			$("a#favfrnd_header")
				.html("Favorites (" + reply.length + ")");
			for (var i = 0; i < reply.length; i++) {
				fav_friendsArr[reply[i]['opp_id']] = reply[i]['games'];
				fav_friendsUids = fav_friendsUids + reply[i]['opp_id'] + ",";
			}
		}
	});*/
	
	appfrndCount = global_appfrndCount;
	allfrndCount = global_allfrndCount;
	//alert(appfrndCount);
	//alert(allfrndCount);

	if (friend_option != 'favfriend') {
		
		if((appfrndCount <= 100) && (friend_option == 'appfriend')){
			
			//appfrndArr = $.jStorage.get('LEXappfrndArr' + fb_uid, 0);
			appfrndArr = friends_countOBJ["LEXappfrndArr" + fb_uid];

			appfrndList = appfrndArr.join(",");
			getUsersFBInfoForMiniStats(appfrndList, friend_option);
			
			if ($("#allfrnd_header").hasClass("active")) {
				$("#allfrnd_header").removeClass("active");
				$("#allfrnd_header").css("color", "");
			}
			if ($("#favfrnd_header").hasClass("active")) {
				$("#favfrnd_header").removeClass("active");
				$("#favfrnd_header").css("color", "");
			}
			$("#appfrnd_header").addClass("active");
			$("#appfrnd_header").css("color", "#555");
			
			//$("#search_friend")
			//.html('<input name="" type="text" class="input_box" style="font-size:14px;color:#999;" value="Search..." onFocus="clearText(this)" onBlur="clearText(this)"  id="search" onkeyup="search_friend_header()" autocomplete="off"/>');					
			
		}else if((allfrndCount <= 100) && (friend_option == 'allfriend')){
			
			//nonappfrndArr = $.jStorage.get('LEXnonappfrndArr' + fb_uid, null);
			nonappfrndArr = friends_countOBJ["LEXnonappfrndArr" + fb_uid]
			nonappfrndList = nonappfrndArr.join(",");
			getUsersFBInfoForMiniStats(nonappfrndList, friend_option);
			
			if ($("#appfrnd_header").hasClass("active")) {
				$("#appfrnd_header").removeClass("active");
				$("#appfrnd_header").css("color", "");
			}
			if ($("#favfrnd_header").hasClass("active")) {
				$("#favfrnd_header").removeClass("active");
				$("#favfrnd_header").css("color", "");
			}
			$("#allfrnd_header").addClass("active");
			$("#allfrnd_header").css("color", "#555");
			
			//$("#search_friend")
			//.html('<input name="" type="text" class="input_box" style="font-size:14px;color:#999;" value="Search..." onFocus="clearText(this)" onBlur="clearText(this)"  id="search" onkeyup="search_friend_header()" autocomplete="off"/>');			
		}else{
		
			var nickname;
			var str = "";
			var str2 = "";
			FB.api('/me', function(response) {
				var query = FB.Data.query('SELECT uid,name,first_name,last_name,pic_square,is_app_user FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me() AND NOT (uid2 IN (' + blockedUserStr + '))) order by first_name', response.id);
				query.wait(function(rows) { // alert(rows.length);
					str = '<div class="navigation_tab">';
					str2 = '<div class="navigation_tab">';
					for (var i = 0; i < rows.length; i++) {
						nickname = rows[i].first_name + " " + rows[i].last_name.substr(0, 1); //	alert(nickname);	     
	
						if (rows[i].is_app_user) {
							str += '<div class="section clear">' + '<span><img src="' + rows[i].pic_square + '" alt="" width="32px" height="32px" /></span>' + '<span class="user_name">' + rows[i].name + '</span>' +
	
							'<a href="' + FB_APP_PATH + '?action=startnewgamefromHeader&profileid=' + rows[i].uid + '&name=' + nickname + '" target="_top" class="blue_button blue_button_small flt_right" style="line-height:16px;height:18px;margin:6px 15px 0 0;">Play</a>' + '</div>';
						} else {
							str2 += '<div class="section clear">' + '<span><img src="' + rows[i].pic_square + '" alt="" width="32px" height="32px" /></span>' + '<span class="user_name">' + rows[i].name + '</span>' + '<a href="#" class="blue_button blue_button_small flt_right" style="line-height:16px;height:18px;margin:6px 15px 0 0;" onclick="showInviteUI_header(\'' + rows[i].uid + '\');">Invite</a>' + '</div>';
	
						}
	
	
					}
					str += '</div>';
					str2 += '</div>';
					//$("#search_friend")
					//	.html('<input name="" type="text" class="input_box" style="font-size:14px;color:#999;" value="Search..." onFocus="clearText(this)" onBlur="clearText(this)"  id="search" onkeyup="search_friend_header()" autocomplete="off"/>');
					if (str == '<div class="navigation_tab"></div>') friend_option = 'allfriend';
					if (friend_option == 'allfriend') {
	
						if ($("#appfrnd_header")
							.hasClass("active")) {
							$("#appfrnd_header")
								.removeClass("active");
							$("#appfrnd_header")
								.css("color", "");
						}
						if ($("#favfrnd_header")
							.hasClass("active")) {
							$("#favfrnd_header")
								.removeClass("active");
							$("#favfrnd_header")
								.css("color", "");
						}
						$("#allfrnd_header")
							.addClass("active");
						$("#allfrnd_header")
							.css("color", "#555");
						$("#friend_list_header")
							.html(str2);
	
					} else {
	
						if ($("#allfrnd_header")
							.hasClass("active")) {
							$("#allfrnd_header")
								.removeClass("active");
							$("#allfrnd_header")
								.css("color", "");
						}
						if ($("#favfrnd_header")
							.hasClass("active")) {
							$("#favfrnd_header")
								.removeClass("active");
							$("#favfrnd_header")
								.css("color", "");
						}
						$("#appfrnd_header")
							.addClass("active");
						$("#appfrnd_header")
							.css("color", "#555");
						$("#friend_list_header")
							.html(str);
					}
	
				});
			});
		}

	} else if (friend_option == 'favfriend') {
		fav_uids = " ";
		if(typeof fav_friendsUids != 'undefined') {
			fav_uids = fav_friendsUids.substring(0, fav_friendsUids.length - 1);
		}
		//fav_uids = fav_friendsUids.substring(0, fav_friendsUids.length - 1);

		var fav_frndCnt = fav_uids.split(",").length;
		if(fav_frndCnt <= 100){
			
			//fav_friendsUids = $.jStorage.get("LEXfav_friendsUids" + fb_uid, null);
			fav_friendsUids = fav_friendsOBJ["LEXfav_friendsUids" + fb_uid]
			if(typeof fav_friendsUids != 'undefined') {
				fav_uids = fav_friendsUids.substring(0, fav_friendsUids.length - 1);
			}
			//fav_uids = fav_friendsUids.substring(0, fav_friendsUids.length - 1);
			getUsersFBInfoForMiniStats(fav_uids, friend_option);

			if ($("#allfrnd_header").hasClass("active")) {
				$("#allfrnd_header").removeClass("active");
				$("#allfrnd_header").css("color", "");
			}
			if ($("#appfrnd_header").hasClass("active")) {
				$("#appfrnd_header").removeClass("active");
				$("#appfrnd_header").css("color", "");
			}
			$("#favfrnd_header").addClass("active");
			$("#favfrnd_header").css("color", "#555");
			//$("#search_friend")
			//.html('<input name="" type="text" class="input_box" style="font-size:14px;color:#999;" value="Search..." onFocus="clearText(this)" onBlur="clearText(this)"  id="search" onkeyup="search_friend_header()" autocomplete="off"/>');			
		}else{

			str = '';
			FB.api('/me', function(response) {
				var query = FB.Data.query('SELECT uid,name,first_name,last_name,pic_square,is_app_user FROM user WHERE uid IN (' + fav_uids + ') order by first_name', response.id);
				query.wait(function(rows) {
					str = '<div class="navigation_tab">';
	
					for (var i = 0; i < rows.length; i++) {
						nickname = rows[i].first_name + " " + rows[i].last_name.substr(0, 1); //	alert(nickname);	     
	
						if (rows[i].is_app_user) {
							str += '<div class="section clear">' + '<span><img src="' + rows[i].pic_square + '" alt="" width="32px" height="32px" /></span>' + '<span class="user_name">' + rows[i].name + '</span>' +
	
							'<a href="' + FB_APP_PATH + '?action=startnewgamefromHeader&profileid=' + rows[i].uid + '&name=' + nickname + '" target="_top" class="blue_button blue_button_small flt_right" style="line-height:16px;height:18px;margin:6px 15px 0 0;">Play</a>' + '</div>';
						} else {
	
						}
					}
					str += '</div>';
	
					//$("#search_friend")
					//	.html('<input name="" type="text" class="input_box" style="font-size:14px;color:#999;" value="Search..." onFocus="clearText(this)" onBlur="clearText(this)"  id="search" onkeyup="search_friend_header()" autocomplete="off"/>');
					if (str == '<div class="navigation_tab"></div>') friend_option = 'allfriend';
	
					if ($("#allfrnd_header")
						.hasClass("active")) {
						$("#allfrnd_header")
							.removeClass("active");
						$("#allfrnd_header")
							.css("color", "");
					}
					if ($("#appfrnd_header")
						.hasClass("active")) {
						$("#appfrnd_header")
							.removeClass("active");
						$("#appfrnd_header")
							.css("color", "");
					}
					$("#favfrnd_header")
						.addClass("active");
					$("#favfrnd_header")
						.css("color", "#555");
					$("#friend_list_header")
						.html(str);
	
				});
			});
		}

	}
	$("#search_friend")
	.html('<input name="" type="text" class="input_box" style="font-size:14px;color:#999;" value="Search..." onFocus="clearText(this)" onBlur="clearText(this)"  id="search" onkeyup="search_friend_header()" autocomplete="off"/>');
}

function search_friend_header() {
	var search_text = $('#search')
		.val();
	var rg = new RegExp(search_text, 'i');
	$('#friend_list_header .navigation_tab .user_name')
		.each(function() {
		if ($.trim($(this)
			.html())
			.search(rg) == -1) {
			$(this)
				.parent()
				.css('display', 'none');
		} else {
			$(this)
				.parent()
				.css('display', '');
		}
	});
}

function showInviteUI_header(uid) {
	
	var uid_arr = uid.split(",");
	var req_length = uid_arr.length;
	if(req_length > 50){
		uid_arr = shuffleArray(uid_arr);
		uid_arr = uid_arr.slice(0,50);
	}
	uid = uid_arr.join(",");
	
	FB.ui({
		method: 'apprequests',
		message: 'Join me for a quick game of Lexulous - the classic crossword game. You get to create words using letters from your rack. May the highest scorer win!',
		to: uid
	});
}

/////SEND TO WALL WHILE START A NEW GAME
function showNewGamePublish_new(uid,to_id) {
		FB.api({method: 'fql.query',query: "SELECT uid,first_name FROM user WHERE uid IN ("+uid+")"},
	    function(response) {
	        for(var i=0;i<response.length;i++) {
	            var uname = response[i].first_name;
	        
					var to_array=to_id.split(",");
					for(var i=0;i<to_array.length;i++){
						FB.ui( 
							    {
							     method: 'feed',
							     to:to_array[i],
							     name: 'Lexulous',
							     link: 'https://apps.facebook.com/lexulous/',
							     picture: CDN_URL + 'imagesv3/new_game.png',							     
							     caption: uname +' just started a new game of Lexulous.',
							     description: 'It is the crossword game you know and love! Add the app now if you wish to play with '+ uname +' or other friends!',
							     actions:[{"name":"Start playing Lexulous","link":"https://apps.facebook.com/lexulous/"}],
							     message: ''
							    },function(response) {});
					} 
					
		     }
	    }
	);
}

////USED IN HEADER

function show_options(link, val) {

	if (val == 'n') {
		$("#greybtn1,#greybtn2,#greybtn3,#greybtn4")
			.fadeOut(1000, function() {
			$("#header_menu")
				.removeClass("top_bg");
			$("#header_menu")
				.addClass("top_bg2");
			$("#hide_options")
				.fadeIn();
		});
	} else if (val == 'y') {
		$("#hide_options")
			.fadeOut(1000, function() {
			$("#header_menu")
				.removeClass("top_bg2");
			$("#header_menu")
				.addClass("top_bg");
			$("#greybtn1,#greybtn2,#greybtn3,#greybtn4")
				.fadeIn();
		});
	}

	return false;
}

function keep_using_this(uid) {
	var callUrl = APP_URL_JS + "ajax/keep_using_this.php?uid=" + uid;

	$.ajax({
		method: "POST",
		url: callUrl,
		//data:form_data,
		beforeSend: function() {

		},
		complete: function() {

		},
		success: function(reply) {
			$("#greybtn1,#greybtn2,#greybtn3,#greybtn4")
				.fadeOut(1000, function() {
				$("#header_menu")
					.removeClass("top_bg");
				$("#header_menu")
					.addClass("top_bg2");
				$("#hide_options")
					.fadeIn();
			});
			document.cookie = encodeURIComponent("header_menu") + "=deleted; expires=" + new Date(0)
				.toUTCString();
		}
	});
}

//for default page 20-11-12

function show_home_menu(uid) {
	var callUrl = APP_URL_JS + "ajax/show_home_menu.php?uid=" + uid;

	$.ajax({
		method: "POST",
		url: callUrl,
		beforeSend: function() {

		},
		complete: function() {

		},
		success: function(reply) {
			$("#show_option_default")
				.slideToggle();
			$("#default_arrow")
				.toggleClass("newgame_dnArrow");

		}
	});

}

function showToolTip_new(e, txt, action) {
	if (action == 'rating_level') {
		txt = $("span#ratings_label_details" + txt)
			.text();
	}
	var mouseX = e.pageX;
	var mouseY = e.pageY;
	if (mouseX == null || mouseY == null) {
		mouseX = e.clientX + $('body')
			.offset()
			.left;
		mouseY = e.clientY + $('body')
			.offset()
			.top;
	}
	$("div#tooltipblack")
		.css({
		"left": mouseX - 20,
		"top": mouseY + 20
	});
	$("div.tooltip_content")
		.html(txt);
	$("div#tooltipblack")
		.show(); //alert(text);	
	//return false;
}

function hideToolTip_new() {
	$("#tooltipblack")
		.hide();
	return false;
}


function tooltip(e, text, id) {

	var mouseX = $("a#" + id)
		.offset()
		.left; //alert(mouseX);
	var mouseY = $("a#" + id)
		.offset()
		.top; //alert(mouseY);	
	if (id == 'rating') {
		$("div#tooltipblack")
			.css({
			"left": mouseX + 50,
			"top": mouseY - 50
		});
	} else {
		$("div#tooltipblack")
			.css({
			"left": mouseX,
			"top": mouseY + 20
		});
	}

	$("div.tooltip_black")
		.html(text);
	$("div#tooltipblack")
		.show(); //alert(text);	
	$("a#" + id)
		.bind({
		mouseleave: function() {
			$("div#tooltipblack")
				.attr("style", "display:none;");
		}
	});
	return false;
}


function no_advert_trial(uid) {
	//alert(uid);
	var callUrl = APP_URL_JS + "ajax/no_advert_trial.php?user=" + uid; //alert(callUrl);
	$.ajax({
		method: "post",
		url: callUrl,
		beforeSend: function() {
			$("#trial_button")
				.text("Wait...");
		},
		complete: function() {

		},
		success: function(reply) {

			if (reply == "n") {
				//alert("You have purchased it already");
				//$("#trial_button").val("Activated");
			} else if (reply == "y") {
				//alert("Success");
				$("#trial_button")
					.val("Activate");
				$("#trial_button")
					.removeClass("blue_button blue_button_big")
					.addClass("grey_button grey_button_normal");

			}
		}
	});
}

/******FOR mystats.php**********/

function show_opp_images(uids) {
	var users=uids.split(',');
	var me=users[1];
	var opp=users[0];
	if($.inArray(parseInt(opp),robotIdArr)>-1){
		FB.api({
			method: 'fql.query',
			query: 'SELECT pic_small FROM user WHERE uid IN (' + me + ')'
		},

		function(response) {
					$("#small_img_2")
					.html("<img src=" + response[0]['pic_small'] + " alt='' width='30' height='30' />");
		
		});
		
	}else{
		FB.api({
			method: 'fql.query',
			query: 'SELECT pic_small FROM user WHERE uid IN (' + uids + ')'
		},
	
		function(response) {
			for (var i = 0; i < response.length; i++) {
				$("#small_img_" + (i + 1))
					.html("<img src=" + response[i]['pic_small'] + " alt='' width='30' height='30' />");
			}
		});
	}
}

/********mysettings Page *************/

function show_settingsOption(id) {
	$("#" + id)
		.css({
		"display": "block"
	});
}

function hide_settingsOption(id) {
	$("#" + id)
		.css({
		"display": "none"
	});
}

function set_notification_val(val, txt) {
	if (val == "DL") {
		$("span#notification_id")
			.text(txt);
		$("#emailInstantRdBttn")
			.val("y");
	} else if (val == "HRS") {
		$("span#notification_id")
			.text(txt);
		$("#emailTwelveHour")
			.val("y");
	} else if (val == "INST") {
		$("span#notification_id")
			.text(txt);
		$("#emailInstantRdBttn")
			.val("y");
	} else if (val == "OFF") {
		$("span#notification_id")
			.text(txt);
		$("#emailInstantRdBttn")
			.val("n");
		$("#emailTwelveHour")
			.val("n");
		$("#emailInstantRdBttn")
			.val("n");
	}
	$("#notification_option")
		.css({
		"display": "none"
	});
}

function set_defaultDic(val, txt) {
	$("span#default_game_dic")
		.text(val);
	$("#defaultDic")
		.val(txt);
	$("#default_game_dicOption")
		.css({
		"display": "none"
	});
}

function set_newgameclick(val, txt) {
	$("span#default_newgame_click")
		.text(val);
	$("#newgameClick")
		.val(txt);
	$("#default_newgameclick_Option")
		.css({
		"display": "none"
	});
}

function settings_form_submit() {
	var notification = $("span#notification_id")
		.text();
	var dictionary = $("span#default_game_dic")
		.text();
	var newgameClick = $("span#default_newgame_click")
		.text(); ///#3105
	if (notification == "Daily") {
		$("#emailInstantRdBttn")
			.val("y");
	} else if (notification == "12 hrs") {
		$("#emailTwelveHour")
			.val("y");
	} else if (notification == "Instant") {
		$("#emailInstantRdBttn")
			.val("y");
	}
	if (dictionary == "US") {
		$("#defaultDic")
			.val("twl");
	} else if (dictionary == "UK") {
		$("#defaultDic")
			.val("sow");
	} else if (dictionary == "FR") {
		$("#defaultDic")
			.val("fr");
	} else if (dictionary == "IT") {
		$("#defaultDic")
			.val("it");
	}
	if (newgameClick == "Match Friend") {
		$("#newgameClick")
			.val("m");
	} else if (newgameClick == "Join Game") {
		$("#newgameClick")
			.val("j");
	} else if (newgameClick == "Host Table") {
		$("#newgameClick")
			.val("h");
	}
	$("#settingform")
		.submit();
	return false;
}

//used in mybingo

function view_allbingos(uid, signReq) {
	var callurl = APP_URL_JS + "ajax/viewbingos_response.php";

	var val_month = $("#month_name")
		.text();
	var val_year = $("#year_name")
		.text();

	$.ajax({
		method: "get",
		url: callurl,
		data: {
			user: uid,
			signed_request: signReq,
			bingomonth: val_month,
			bingoyear: val_year
		},
		beforeSend: function() {
			$("#searchResDiv")
				.html("");
			$("#gif_loader")
				.fadeIn("slow");
		},
		complete: function() {
			$("#gif_loader")
				.fadeOut("slow");
		},
		success: function(html) {

			$("#searchResDiv")
				.html(html);
		}
	});

}

function loadDefaultImage_New() {
	getUsersFBInfoForMiniStats(fb_uid, "refreshDefaultImage");
	showMiniStatsForUsers(unique_uid_list,"default");
}

var users_statsArr = new Array();

function showMiniStatsForUsers(uidlist, action) {
	//alert(uidlist);
	var callUrl = APP_URL_JS + "ajax/show_stats.php?uid_list=" + uidlist;
	$.ajax({
		method: "get",
		url: callUrl,
		beforeSend: function() {},
		complete: function() {},
		success: function(reply) {
			users_statsArr = jQuery.parseJSON(reply);
			getUsersFBInfoForMiniStats(uidlist, action);
		}
	});

}
var usersFBInfo = {};
function getUsersFBInfoForMiniStats(uidlist, action) {

	/// split userid list
	uidList_arr = uidlist.split(",");

	/// RUN LOOP
	/// check if userid exists in jstorage cache
	/// if not exist, then append to newuseridlist
	/// END LOOP
	var getNewList = "";
	for (var i = 0; i < uidList_arr.length; i++) {
		/*key = 'exists' + uidList_arr[i];
		tmp = $.jStorage.get(key, null);
		if (tmp == null) {*/
			getNewList = getNewList + uidList_arr[i] + ",";
		//}
	}

	/// IF NEW useridlist.length > 1
	if (getNewList.length > 1) {
		getNewList = getNewList.substr(0, getNewList.length - 1);
		FB.api({
			method: 'fql.query',
			///// SEND NEW useridlist
			query: 'SELECT uid,pic_square,first_name, last_name, pic_big,name FROM user WHERE uid IN (' + getNewList + ')'
		},

		function(response) {
			for (var i = 0; i < response.length; i++) {

				/// SET IN jstoragecache and not in variable
				//// $.jStorage.set("square" + rows[i].uid, rows[i].pic_square);
				//// $.jStorage.setTTL("square" + rows[i].uid, 900000);

				/*$.jStorage.set("square" + response[i].uid, response[i].pic_square);
				$.jStorage.setTTL("square" + response[i].uid, 900000);
				$.jStorage.set("fname" + response[i].uid, response[i].first_name);
				$.jStorage.setTTL("fname" + response[i].uid, 900000);
				$.jStorage.set("lname" + response[i].uid, response[i].last_name);
				$.jStorage.setTTL("lname" + response[i].uid, 900000);				
				$.jStorage.set("pic_big" + response[i].uid, response[i].pic_big);
				$.jStorage.setTTL("pic_big" + response[i].uid, 900000);			
				$.jStorage.set("exists" + response[i].uid, 1);
				$.jStorage.setTTL("exists" + response[i].uid, 900000);
				$.jStorage.set("name" + response[i].uid, response[i].name);
				$.jStorage.setTTL("name" + response[i].uid, 900000);*/	


				usersFBInfo["square" + response[i].uid] = response[i].pic_square;
				usersFBInfo["fname" + response[i].uid] = response[i].first_name;
				usersFBInfo["lname" + response[i].uid] = response[i].last_name;
				usersFBInfo["pic_big" + response[i].uid] = response[i].pic_big;
				usersFBInfo["exists" + response[i].uid] = 1;
				usersFBInfo["name" + response[i].uid] = response[i].name;

			}
			populatedivWithData(uidlist, action);
		});
	} else { //// ELSE
		populatedivWithData(uidlist, action);
	}

}

///uidlist instead of users_statsArr

function populatedivWithData(uidlist, action) {

	if(action == 'refreshDefaultImage') {
		/*var pic_square = $.jStorage.get("square" + uidlist, small_default_img);
		var pic_big = $.jStorage.get("pic_big" + uidlist, small_default_img);*/

		var pic_square = usersFBInfo["square" + uidlist];
		var pic_big = usersFBInfo["pic_big" + uidlist];

		$("#default_small_pic").html("<img src=" + pic_square + " alt='' width='30px' height=30px; />");
		$("#default_big_pic").html("<img src=" + pic_big + " alt='' />");
		$("#default_small_pic").bind({
			mouseover: function() {
				$("#default_big_pic")
					.show();
				return false;
			},
			mouseout: function() {
				$("#default_big_pic")
					.hide();
			}
		});
		return;
	
	}else if(action == 'appfriend'){
		//alert(uidlist);
		
		var fb_uidList = uidlist.split(",");
		var str = "";
		str = '<div class="navigation_tab">';
		for (var i = 0; i < fb_uidList.length; i++) {
					
			key = fb_uidList[i];		
			key_img = "square" + fb_uidList[i];
			key_name = "name" + fb_uidList[i];
			key_fname = "fname" + fb_uidList[i];
			key_lname = "lname" + fb_uidList[i];
			
			var pic_square = usersFBInfo[key_img]; //$.jStorage.get(key_img, small_default_img);
			var name = usersFBInfo[key_name]; //$.jStorage.get(key_name, 'Anonymous U');
			var nickname = usersFBInfo[key_fname]+" "+usersFBInfo[key_lname]; //$.jStorage.get(key_fname, 'Anonymous') + " " + $.jStorage.get(key_lname, 'U'); 
			
			str +='<div class="section clear">'+
    		'<span><img src="'+pic_square+'" alt="" width="32px" height="32px" /></span>'+
			'<span class="user_name">'+name+'</span>'+					
			'<a href="'+FB_APP_PATH+'?action=startnewgamefromHeader&profileid='+key+'&name='+nickname+'" target="_top" class="blue_button blue_button_small flt_right" style="line-height:16px;height:18px;margin:6px 15px 0 0;">Play</a>'+
			'</div>';
					
		}
		str += '</div>';
		$("#friend_list_header").html(str);
		if (str == '<div class="navigation_tab"></div>') friend_option = 'allfriend';		
		return;
	}else if(action == 'allfriend'){
		//alert(uidlist);
		var fb_uidList = uidlist.split(",");
		
		var str2 = "";
		
		str2 = '<div class="navigation_tab">';
		for (var i = 0; i < fb_uidList.length; i++) {
					
			key = fb_uidList[i];
			
			key_img = "square" + fb_uidList[i];
			key_name = "name" + fb_uidList[i];
			key_fname = "fname" + fb_uidList[i];
			key_lname = "lname" + fb_uidList[i];
			
			/*var pic_square = $.jStorage.get(key_img, small_default_img);
			var name = $.jStorage.get(key_name, 'Anonymous U');
			var nickname = $.jStorage.get(key_fname, 'Anonymous') + " " + $.jStorage.get(key_lname, 'U');*/ 

			var pic_square = usersFBInfo[key_img]; //$.jStorage.get(key_img, small_default_img);
			var name = usersFBInfo[key_name]; //$.jStorage.get(key_name, 'Anonymous U');
			var nickname = usersFBInfo[key_fname]+" "+usersFBInfo[key_lname]; //$.jStorage.get(key_fname, 'Anonymous') + " " + $.jStorage.get(key_lname, 'U'); 
				
			if((key != null) && (key != '')) {						
				str2 +='<div class="section clear">'+
				'<span><img src="'+pic_square+'" alt="" width="32px" height="32px" /></span>'+
				'<span class="user_name">'+name+'</span>'+					
				'<a href="#" class="blue_button blue_button_small flt_right" style="line-height:16px;height:18px;margin:6px 15px 0 0;" onclick="showInviteUI_header(\''+key+'\');">Invite</a>'+
				'</div>';
			}
									
		}				
		
		str2 += '</div>';
		$("#friend_list_header").html(str2);
		if (str2 == '<div class="navigation_tab"></div>') friend_option = 'allfriend';
		return;
	}else if(action == 'favfriend'){
		
		var fb_uidList = uidlist.split(",");
		var str = '';
		str = '<div class="navigation_tab">';
		
		for (var i = 0; i < fb_uidList.length; i++) {
			
			key = fb_uidList[i];
			
			key_img = "square" + fb_uidList[i];
			key_name = "name" + fb_uidList[i];
			key_fname = "fname" + fb_uidList[i];
			key_lname = "lname" + fb_uidList[i];
			
			/*var pic_square = $.jStorage.get(key_img, small_default_img);
			var name = $.jStorage.get(key_name, 'Anonymous U');
			var nickname = $.jStorage.get(key_fname, 'Anonymous') + " " + $.jStorage.get(key_lname, 'U'); */

			var pic_square = usersFBInfo[key_img]; //$.jStorage.get(key_img, small_default_img);
			var name = usersFBInfo[key_name]; //$.jStorage.get(key_name, 'Anonymous U');
			var nickname = usersFBInfo[key_fname]+" "+usersFBInfo[key_lname]; //$.jStorage.get(key_fname, 'Anonymous') + " " + $.jStorage.get(key_lname, 'U'); 
				
			if((key != null) && (key != '')) {													
				str += '<div class="section clear">' + '<span><img src="' + pic_square + '" alt="" width="32px" height="32px" /></span>' + '<span class="user_name">' + name + '</span>' +
				'<a href="' + FB_APP_PATH + '?action=startnewgamefromHeader&profileid=' + key + '&name=' + nickname + '" target="_top" class="blue_button blue_button_small flt_right" style="line-height:16px;height:18px;margin:6px 15px 0 0;">Play</a>' + '</div>';
			}
			
		}
		str += '</div>';
		$("#friend_list_header").html(str);
		if (str == '<div class="navigation_tab"></div>') friend_option = 'allfriend';
		return;
		
	}else if(action == 'newgame_appfriend'){
		//alert(uidlist);
		
		var fb_uidList = uidlist.split(",");
		var str = "";
		str = '<div class="navigation_tab">';
		for (var i = 0; i < fb_uidList.length; i++) {
					
			key = fb_uidList[i];		
			key_img = "square" + fb_uidList[i];
			key_name = "name" + fb_uidList[i];
			key_fname = "fname" + fb_uidList[i];
			key_lname = "lname" + fb_uidList[i];
			
			/*var pic_square = $.jStorage.get(key_img, small_default_img);
			var name = $.jStorage.get(key_name, 'Anonymous U');
			name= name.replace(/\'/g,'&#039;');
			var nickname = $.jStorage.get(key_fname, 'Anonymous') + " " + $.jStorage.get(key_lname, 'U'); 
			//details = "'" + key + "," + name + "'";
			details = key + "," + name;*/

			var pic_square = usersFBInfo[key_img]; //$.jStorage.get(key_img, small_default_img);
			var name = usersFBInfo[key_name]; //$.jStorage.get(key_name, 'Anonymous U');
			name= name.replace(/\'/g,'&#039;');
			var nickname = usersFBInfo[key_fname]+" "+usersFBInfo[key_lname]; //$.jStorage.get(key_fname, 'Anonymous') + " " + $.jStorage.get(key_lname, 'U'); 
			details = key + "," + name;
			
    		str += '<div class="section clear">' 
    			+ '<span><img src="' + pic_square + '" alt="" width="32px" height="32px" /></span>' 
    			+ '<span class="user_name">' + name + '</span>' 
    			+ '<a href="#" class="blue_button blue_button_small flt_right" style="line-height:16px;height:18px;margin:6px 15px 0 0;" onclick="showSelected(&quot;'+details+'&quot;);return false;">Select</a>' 
    			+ '</div>';
    		
					
		}
		str += '</div>';
		$("#friend_list").html(str);
		if (str == '<div class="navigation_tab"></div>') friend_option = 'allfriend';		
		return;
		
	}else if(action == 'newgame_allfriend'){
		//alert(uidlist);
		var fb_uidList = uidlist.split(",");
		
		var str2 = "";
		
		str2 = '<div class="navigation_tab">';
		for (var i = 0; i < fb_uidList.length; i++) {
					
			key = fb_uidList[i];
			
			key_img = "square" + fb_uidList[i];
			key_name = "name" + fb_uidList[i];
			key_fname = "fname" + fb_uidList[i];
			key_lname = "lname" + fb_uidList[i];
			
			/*var pic_square = $.jStorage.get(key_img, small_default_img);
			var name = $.jStorage.get(key_name, 'Anonymous U');
			var nickname = $.jStorage.get(key_fname, 'Anonymous') + " " + $.jStorage.get(key_lname, 'U'); */

			var pic_square = usersFBInfo[key_img]; //$.jStorage.get(key_img, small_default_img);
			var name = usersFBInfo[key_name]; //$.jStorage.get(key_name, 'Anonymous U');
			var nickname = usersFBInfo[key_fname]+" "+usersFBInfo[key_lname]; //$.jStorage.get(key_fname, 'Anonymous') + " " + $.jStorage.get(key_lname, 'U'); 
						
			str2 += '<div class="section clear">' 
				+ '<span><img src="' + pic_square + '" alt="" width="32px" height="32px" /></span>' 
				+ '<span class="user_name">' + name + '</span>' 
				+ '<a href="#" class="blue_button blue_button_small flt_right" style="line-height:16px;height:18px;margin:6px 15px 0 0;" onclick="showInviteUI_header(\'' + key + '\');">Invite</a>' 
				+ '</div>';									
		}						
		str2 += '</div>';
		$("#friend_list").html(str2);
		if (str2 == '<div class="navigation_tab"></div>') friend_option = 'allfriend';
		return;
				
	}else if(action == 'invite_friend'){
		var fb_uidList = uidlist.split(",");
		var invitestr = '';
		var selectstr = '';					
		invitestr += '<ol class="user_name_invite">';
		selectstr += '<ul>';
				
		for (var i = 0; i < fb_uidList.length; i++) {
					
			var key = fb_uidList[i];
			var name = usersFBInfo[key_name]; //$.jStorage.get("name" + fb_uidList[i], 'Anonymous U'); 
						     						
			invitestr += '<li id="inviteFriend_'+key+'"><span class="box1" onclick="selectForInvite(\'' + key + '\');"></span><span class="invitename">'+name+'</span></li>';
			selectstr += '<li id="selectedFriend_'+key+'" style="display:none;font-weight:bold;"><span class="tic" onclick="undoselectForInvite(\'' + key + '\');"></span><span class="selectname">'+name+'</span></li>';
			users_to_invite += key + ',';		 	
					
		}
				
		invitestr += '</ol>';
		selectstr += '</ul>';
				
		$("#friend_list_invite").html(invitestr);
		$("#selected_friend_list_invite").html(selectstr);
					
		return;
	}else{
		
		/// split UIDlist
		/// LOOP over uidLIST and get id
		/// returnArray['big'] = $.jStorage.get(key , STATIC_PATH + 'images/pic_big.png');
		var fb_uidList = uidlist.split(",");
		for (var i = 0; i < fb_uidList.length; i++) {
			key = fb_uidList[i];
			key_img = "square" + fb_uidList[i];
			key_name = "fname" + fb_uidList[i];
			var img = usersFBInfo[key_img]; //$.jStorage.get(key_img, small_default_img);
			var name = usersFBInfo[key_name]; //$.jStorage.get(key_name, 'Anonymous');
			users_statsArr[key]['img'] = img;
			users_statsArr[key]['fname'] = name;
		}
	
		var url = $(location).attr('href');
		var urlArr = url.split("&");
		var queryObj = {};
		for ( var i=0; i<urlArr.length; i++ ) {
		      var name = urlArr[i].split('=')[0];
		      var value = urlArr[i].split('=')[1];
		      queryObj[name] = value;
		}
		
		for (var key in users_statsArr) {
			if (key != '') {
				//if (users_statsArr[key]['img'] == small_default_img && users_statsArr[key]['fname'] == "Anonymous U") {
	
					if (action == 'default') {
						//users_statsArr[key]['fname'] = $("span#opp_name" + key + ":eq(0)")
							//.text()
							//.split(' ')[0];
					} else if (action == 'viewboard') {
						//if ($("#name_" + key)
						//	.text() == 'Loading ...') users_statsArr[key]['fname'] = 'Anonymous';
						//else users_statsArr[key]['fname'] = $("#name_" + key)
						//	.text();
						
						var bigImg = usersFBInfo["pic_big"+key]; //$.jStorage.get("pic_big"+key, img_big);
						var l_name = usersFBInfo["lname"+key]; //$.jStorage.get("lname"+key, "U");	
						var player_name = users_statsArr[key]['fname']+' '+l_name.charAt(0);
						if(fb_uidList.length == 2){
							if(queryObj['with'] != undefined){
								if (users_statsArr[key]['img'] == small_default_img){
									player_name = queryObj['with'].split('+')[0]+' '+queryObj['with'].split('+')[1];
									users_statsArr[key]['fname'] = queryObj['with'].split('+')[0];
								}
							}
						}
						
						if($.inArray(parseInt(key),robotIdArr)>-1){
							var index=$.inArray(parseInt(key),robotIdArr);
							users_statsArr[key]['img']=CDN_URL + 'imagesv3/avatarImg/'+key+'.png';
							bigImg=CDN_URL + 'imagesv3/avatarImg/'+key+'.png';
							player_name=robotNameArr[index];
						}
						
						$('#photo_' + key).html('<a href="#" target="_top" onmouseout="hidePlayerImage();" onmousemove="showPlayerImage(event,\'' + bigImg +'\')" ><img src="' + users_statsArr[key]['img'] + '" width="30" height="30" /></a>');
						$("#name_" + key).html('<a href="#" target="_top">'+player_name+'</a>').css({"line-height":"12px"});
						
					}
				//}alert($(location).attr('href'));
					
					if($.inArray(parseInt(key),robotIdArr)>-1){
						var index=$.inArray(parseInt(key),robotIdArr);
						var nameLen=robotNameArr[index].length;
						users_statsArr[key]['img']=CDN_URL + 'imagesv3/avatarImg/'+key+'.png';
						users_statsArr[key]['fname']=robotNameArr[index].substring(0,nameLen-1);
						
					}
					
	
				$("a#opp_userImage" + key)
					.html('<img src="' + users_statsArr[key]['img'] + '" alt="Loading" height="30" width="30"/>');
				$("div#tiny_opp_img_" + key)
					.html('<img src="' + users_statsArr[key]['img'] + '" alt="Loading" height="16" width="16"/>');
				$("span#newphoto_" + key)
					.html('<img src="' + users_statsArr[key]['img'] + '" alt="Loading2" height="24" width="24" />');
				$('span#newphoto_' + key)
					.css({
					"cursor": "pointer"
				});
				$('span#newphoto_' + key)
					.css({
					"position": "relative"
				});
	
	
				var total_played = parseInt(users_statsArr[key]['won']) + parseInt(users_statsArr[key]['lost']) + parseInt(users_statsArr[key]['drawn']);
				var str = '';
				str += '<div class = "user_stats_popup_arrow"><img src="' + CDN_URL + 'imagesv3/user_stats_popup_arrow.png" alt="" /></div>' + '<div class="user_stats_popup_container clear">' + '<a href="#" class="user_stats_popup_photo"><img src="' + users_statsArr[key]['img'] + '" height="50" width="50"/></a>' + '<div class="user_stats_popup_info">';
				if (action == 'viewboard') str += '<div class="drawDiv clear" style="width: 48px;"><span style="font-weight: bold;">Rating</span><br />';
				else str += '<div class="drawDiv clear" style="width: 48px;">Rating<br />';
	
				str += '<span style="color:#343434;float:left;">' + users_statsArr[key]['rating'] + '</span>';
	
				if (action != 'joingame') str += '<a href="' + FB_APP_PATH + '?action=faq" target="_top" class="green_icon" style="width:8px;height:8px;margin-top: 6px;"  id="rating_label_icon_' + key + '" onmousemove="showToolTip_new(event,\'' + key + '\',\'rating_level\');" onmouseout="hideToolTip_new()"></a>';
	
				str += '</div>' + '<div class="playDiv">Played<br /><span style="color:#343434;">' + total_played + '</span></div>' + '<div class="wonDiv">Won<br /><span style="color:#343434;">' + users_statsArr[key]['won'] + '</span></div>' + '<div class="lostDiv">Lost<br /><span style="color:#343434;">' + users_statsArr[key]['lost'] + '</span></div>' + '<div style="clear:both;"></div>' + '<a href="' + FB_APP_PATH + '?action=profile&profileid=' + key + '" target="_top">' + users_statsArr[key]['fname'] + '\'s full profile</a>' + '</div>' + '</div>' + '</div>';
				if (action == 'viewboard') str += '<span id="ratings_label_details' + key + '" style="display:none;"></span>';
	
				$("div#ministats_" + key)
					.html(str);
	
				if ($("span#ratings_label_details" + key)
					.text() == '') {
					if ((users_statsArr[key]['rating'] >= 0) && (users_statsArr[key]['rating'] <= 1199)) {
						$("span#ratings_label_details" + key)
							.text('Level 1 of 8');
						$("a#rating_label_icon_" + key)
							.css({
							"background": "#9f0"
						});
					} else if ((users_statsArr[key]['rating'] >= 1200) && (users_statsArr[key]['rating'] <= 1399)) {
						$("span#ratings_label_details" + key)
							.text('Level 2 of 8');
						$("a#rating_label_icon_" + key)
							.css({
							"background": "#0c3"
						});
					} else if ((users_statsArr[key]['rating'] >= 1400) && (users_statsArr[key]['rating'] <= 1599)) {
						$("span#ratings_label_details" + key)
							.text('Level 3 of 8');
						$("a#rating_label_icon_" + key)
							.css({
							"background": "#ff0"
						});
					} else if ((users_statsArr[key]['rating'] >= 1600) && (users_statsArr[key]['rating'] <= 1799)) {
						$("span#ratings_label_details" + key)
							.text('Level 4 of 8');
						$("a#rating_label_icon_" + key)
							.css({
							"background": "#69f"
						});
					} else if ((users_statsArr[key]['rating'] >= 1800) && (users_statsArr[key]['rating'] <= 1999)) {
						$("span#ratings_label_details" + key)
							.text('Gifted (Level 5 of 8)');
						$("a#rating_label_icon_" + key)
							.css({
							"background": "#c69"
						});
					} else if ((users_statsArr[key]['rating'] >= 2000) && (users_statsArr[key]['rating'] <= 2199)) {
						$("span#ratings_label_details" + key)
							.text('Genius (Level 6 of 8)');
						$("a#rating_label_icon_" + key)
							.css({
							"background": "#939"
						});
					} else if ((users_statsArr[key]['rating'] >= 2200) && (users_statsArr[key]['rating'] <= 2399)) {
						$("span#ratings_label_details" + key)
							.text('Champion (Level 7 of 8)');
						$("a#rating_label_icon_" + key)
							.css({
							"background": "#f63"
						});
					} else if (users_statsArr[key]['rating'] >= 2400) {
						$("span#ratings_label_details" + key)
							.text('Grandmaster (Level 8 of 8)');
						$("a#rating_label_icon_" + key)
							.css({
							"background": "#f00"
						});
					}
				}
	
			}
		}

	}
}

function show_image(e, image) {

	mouseX = e.pageX;
	mouseY = e.pageY;
	if (mouseX == null || mouseY == null) {
		mouseX = e.clientX + $('body')
			.offset()
			.left;
		mouseY = e.clientY + $('body')
			.offset()
			.top;
	}
	$("#stats")
		.css({
		"left": mouseX - 50,
		"top": mouseY - 110
	});

	$("#stats")
		.html(str);
	$("#stats")
		.show(); //alert(str);
}

function bigimage_hide() {
	$("#stats")
		.hide();
}


//Help-faq
var lastSelected = "startNewGame";

function helpToggleShow(tag) {
	if (lastSelected == tag) {
		return false;
	} else {
		$("#" + tag + "Div")
			.css({
			"display": "block"
		});
		$("#" + lastSelected + "Div")
			.css({
			"display": "none"
		});
		$("#" + tag + "Heading")
			.css({
			"color": "#dd4631"
		});
		$("#" + lastSelected + "Heading")
			.css({
			"color": ""
		});

		$("#" + tag + "Arr")
			.removeClass("arrow");
		$("#" + tag + "Arr")
			.addClass("red_arrow");
		$("#" + lastSelected + "Arr")
			.removeClass("red_arrow");
		$("#" + lastSelected + "Arr")
			.addClass("arrow");
	}
	lastSelected = tag;
	return false;
}

///---#2481

var friends_countOBJ = {};
function friends_count() {
	
	var appfrndCount = nonappfrndCount = 0;
	var appfrndArr = new Array();
	var nonappfrndArr = new Array();
	
	/*appfrndCount = $.jStorage.get('LEXappfrndCount' + fb_uid, null);
	nonappfrndCount = $.jStorage.get('LEXnonappfrndCount' + fb_uid, null);*/
	
	/*if (appfrndCount == null || nonappfrndCount == null) {
	appfrndCount = 0;nonappfrndCount = 0;*/
		FB.api('/me', function(response) {
			var query = FB.Data.query('SELECT uid,is_app_user FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me() AND NOT (uid2 IN (' + blockedUserStr + ')))', response.id);
			query.wait(function(rows) { //alert(rows.length);
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].is_app_user) {
						
						//appfrndList = appfrndList + rows[i].uid + ",";
						appfrndCount = appfrndCount + 1;
						appfrndArr.push(rows[i].uid);
						
						
					} else {
						
						//nonappfrndList = nonappfrndList + rows[i].uid + ",";
						nonappfrndCount = nonappfrndCount + 1;
						nonappfrndArr.push(rows[i].uid);
						
					}
				}
				//appfrndList = appfrndList.substr(0, appfrndList.length - 1);
				//nonappfrndList = nonappfrndList.substr(0, nonappfrndList.length - 1);	


				/*$.jStorage.set("LEXappfrndCount" + fb_uid, appfrndCount);
				$.jStorage.setTTL("LEXappfrndCount" + fb_uid, 900000);				
				$.jStorage.set("LEXnonappfrndCount" + fb_uid, nonappfrndCount);
				$.jStorage.setTTL("LEXnonappfrndCount" + fb_uid, 900000);
				
				$.jStorage.set("LEXappfrndArr" + fb_uid, appfrndArr);
				$.jStorage.setTTL("LEXappfrndArr" + fb_uid, 900000);				
				$.jStorage.set("LEXnonappfrndArr" + fb_uid, nonappfrndArr);
				$.jStorage.setTTL("LEXnonappfrndArr" + fb_uid, 900000);*/


				friends_countOBJ["LEXappfrndCount" + fb_uid] = appfrndCount;
				friends_countOBJ["LEXnonappfrndCount" + fb_uid] = nonappfrndCount;

				friends_countOBJ["LEXappfrndArr" + fb_uid] = appfrndArr;
				friends_countOBJ["LEXnonappfrndArr" + fb_uid] = nonappfrndArr;


				showfriendsCountDetails();
			});
		});		
	/*}else{
		showfriendsCountDetails();
	}*/
}

var global_appfrndCount,global_allfrndCount;
function showfriendsCountDetails(){
	
	/*appfrndCount = $.jStorage.get("LEXappfrndCount" + fb_uid, null);
	diffrndCount = $.jStorage.get("LEXnonappfrndCount" + fb_uid, null);*/

	appfrndCount = friends_countOBJ["LEXappfrndCount" + fb_uid];
	diffrndCount = friends_countOBJ["LEXnonappfrndCount" + fb_uid];

	if(appfrndCount == null)appfrndCount = 0;
	if(diffrndCount == null)diffrndCount = 0;
	global_appfrndCount = appfrndCount; 
	global_allfrndCount = diffrndCount;
	
	$("#appfrnd_header").html("Playing Now (" + appfrndCount + ")");
	$("#allfrnd_header").html("All Friends (" + diffrndCount + ")");
	$("#appfrnd_newgame").html("Playing Now (" + appfrndCount + ")");
	$("#allfrnd_newgame").html("All Friends (" + diffrndCount + ")");
	if (appfrndCount > 0) {
		$("#friend_count_default").html(appfrndCount + " friends are already playing!");
		$("#friend_count_header").html(appfrndCount + " friends are already playing!");
	} else {
		$("#friend_count_default").html("No friends are playing!");
		$("#friend_count_header").html("No friends are playing!");
	}

}


var lastTabSelected_new = "note";

function viewboardToggleTab_new(divId) {
	if (lastTabSelected_new == divId) {
		return false;
	} else {
		$("#" + divId + "Div")
			.css({
			"display": "block"
		});
		$("#" + lastTabSelected_new + "Div")
			.css({
			"display": "none"
		});
		$("#" + divId + "Tab")
			.addClass("active");
		$("#" + lastTabSelected_new + "Tab")
			.removeClass("active");
	}
	lastTabSelected_new = divId;
	return false;
}
///#3150



function view_archivesmonthwise(uid, signReq) {
	var callurl = APP_URL_JS + "ajax/view_archivesmonthwise.php";

	var val_month = $("#month_name")
		.text();
	var val_year = $("#year_name")
		.text();
	$.ajax({
		method: "get",
		url: callurl,
		data: {
			user: uid,
			signed_request: signReq,
			month: val_month,
			year: val_year
		},
		beforeSend: function() {
			$("#completed_games")
				.html("");
			$("#gif_loader")
				.fadeIn("slow");
		},
		complete: function() {
			$("#gif_loader")
				.fadeOut("slow");
		},
		success: function(html) {
			//alert(html);
			$("#completed_games")
				.html(html);
		}
	});

}

function sendfeedback_fromboard() {
	window.open("http://lexulousfb.uservoice.com/");
}

function showclickonmore() {
	$("#header_more")
		.hide();
	$('#header_multiplayer,#header_jointable,#header_hosttable')
		.fadeIn(1000);
}

function hideclickonmore() {
	$("#header_more")
		.show();
	$('#header_multiplayer')
		.hide();
	$('#header_jointable')
		.hide();
	$('#header_hosttable')
		.hide();
}

function getrightclick(e, link) {
	if (e.which === 3) {
		window.open(link);
	}
}


function showInviteFriendPopup(e,page){

	/*var nonAppFrndCount = $.jStorage.get("nonappfrndCount" + fb_uid, null);	*/
	//var nonAppFrndCount = friends_countOBJ["LEXnonappfrndCount" + fb_uid];	

	/*if((nonAppFrndCount != null) && (nonAppFrndCount < 100)){		
	// var nonappfrndArr = $.jStorage.get('nonappfrndArr' + fb_uid, null);
		var nonappfrndArr = friends_countOBJ["LEXnonappfrndArr" + fb_uid];

		var nonappfrndList = nonappfrndArr.join(",");
		//getUsersFBInfoForMiniStats(nonappfrndList, 'invite_friend');
		
	}else{*/
		var invitestr = '';
		var selectstr = '';
		
		FB.api('/me', function(response) {
		var query = FB.Data.query('SELECT uid,name,first_name,last_name,pic_square,is_app_user FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) order by first_name', response.id);
			query.wait(function(rows) {
			
				invitestr = '<ol class="user_name_invite">';
				selectstr = '<ul>';					
				for (var i = 0; i < rows.length; i++) {
							     
					if (rows[i].is_app_user) {
						
					} else {
												
						invitestr += '<li id="inviteFriend_'+rows[i].uid+'" onclick="selectForInvite(\'' + rows[i].uid + '\');"><span class="box1"></span><span class="invitename">'+rows[i].name+'</span></li>';
						selectstr += '<li id="selectedFriend_'+rows[i].uid+'" style="display:none;font-weight:bold;" onclick="undoselectForInvite(\'' + rows[i].uid + '\');"><span class="tic"></span><span class="selectname">'+rows[i].name+'</span></li>';
						users_to_invite += rows[i].uid + ',';		 	
					}
				}
				invitestr += '</ol>';
				selectstr += '</ul>';
					
				$("#friend_list_invite").html(invitestr);
				$("#selected_friend_list_invite").html(selectstr);
					
			});
		});
		
	//}
	
	var mouseX = e.pageX;
	var mouseY = e.pageY;
	if (mouseX == null || mouseY == null) {
		mouseX = e.clientX + $('body').offset().left;
		mouseY = e.clientY + $('body').offset().top;
	}
	
	if(page == 'h')
		mouseX = mouseX-90;
	else if(page == 'f')
		mouseX = mouseX + 20;
	
	FB.Canvas.getPageInfo(function(pageInfo) {
		var offset = Math.max(parseInt(pageInfo.scrollTop) - parseInt(pageInfo.offsetTop), 0);
		$("#inviteFriendpopup").css({
		      "top": Math.max(offset, 0),
		      "left": mouseX
		}).show();
	});
}


function selectForInvite(uid){
	$("#inviteFriend_"+uid).css({"display":"none"});
	$("#selectedFriend_"+uid).css({"display":"block"});
	selecteduid_for_invite += uid + ',';
}

function undoselectForInvite(uid){
	$("#inviteFriend_"+uid).css({"display":"block"});
	$("#selectedFriend_"+uid).css({"display":"none"});
	selecteduid_for_invite = selecteduid_for_invite.replace(uid+',', '');
}

function invited_selected(){
	var uid = selecteduid_for_invite.slice(0,-1);
	var arrDistinct = new Array();
	var uid_arr = uid.split(",");
	$(uid_arr).each(function(index, item) {
        if ($.inArray(item, arrDistinct) == -1)
            arrDistinct.push(item);
    });
	arrDistinctStr = arrDistinct.join(',');
	
	showInviteUI_header(arrDistinctStr);
	$('#inviteFriendpopup').hide();
	$("#selectedFriend").hide();
	selecteduid_for_invite = "";
	users_to_invite = "";
}

function selectForInvite_All(){
	var all_user = users_to_invite.slice(0,-1);
	var all_user_arr = all_user.split(",");
	
	var class_has = $("#selectAll_box").hasClass('box1_active');
	if(!class_has){
		$.each(all_user_arr, function() {
			$("#inviteFriend_"+this).css({"display":"none"});
			$("#selectedFriend_"+this).css({"display":"block"});
		});
		$("#selectAll_box").addClass('box1_active');
		selecteduid_for_invite = users_to_invite;
	}else if(class_has){
		$.each(all_user_arr, function() {
			$("#inviteFriend_"+this).css({"display":"block"});
			$("#selectedFriend_"+this).css({"display":"none"});
		});
		$("#selectAll_box").removeClass('box1_active');
		selecteduid_for_invite = "";
	}
}

function search_friend_for_invite(){
	var search_text = $('#search_invite').val();
	var rg = new RegExp(search_text, 'i');
	$('.user_name_invite li .invitename').each(function() {
		if ($.trim($(this).html()).search(rg) == -1) {
			$(this).parent().css('display', 'none');
		} else {
				$(this).parent().css('display', '');
		}
	});
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var slideCount1 = 0;
var tutorialText = ["The object of the game is to make words using letter tiles, on a 15x15 board. The player with the highest score wins.",
					"Second tutorial text is entered here",
					"third tutorial text is written here",
					"4th tutorial text is inserted here."
					];

function slidePrev(div_id,id){
	var fixValue = 30;	
	var count = $('#'+div_id+' li').length;
	var item_width = $('#'+div_id+' li').outerWidth() +fixValue;
	var listPos = parseInt($('#'+div_id).position().left);
	var check;
	if(id==1){
		check = slideCount1;
	}

	if(check==0){
		var indent = -(count-1)*item_width;
		var left_indent = indent+fixValue
		if(id==1){
			slideCount1 = count-1;
		}
	}else{
		var left_indent = listPos +item_width;
		if(id==1){
			slideCount1--;
		}
	}
	$("#"+div_id).animate({
			left:left_indent
		},200,function(){
			$("#tutorialText").fadeOut().html(tutorialText[slideCount1]).fadeIn(200);
		});
		jumpId = imageSlider1;
		
}

function slideNext(div_id,id){
	var fixValue = 30;
	var count = $('#'+div_id+' li').length;
	var item_width = $('#'+div_id+' li').outerWidth() +fixValue;
	var listPos = parseInt($('#'+div_id).position().left);
	var check;
	if(id==1){
		check = slideCount1;
	}

	var left_indent = 0;
	if(check==count-1){
		var left_indent = fixValue;
		if(id==1){
			slideCount1 = 0;
		}
	}else{
		var left_indent = listPos-item_width;
		if(id==1){
			slideCount1++;
		}
	}
	$("#"+div_id).animate({
			left:left_indent
		},200,function(){
			$("#tutorialText").fadeOut().html(tutorialText[slideCount1]).fadeIn(200);
		});
	jumpId = imageSlider1;
}
