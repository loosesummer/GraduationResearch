function getList(post,posturl) {
   var trelloKey = getTrello()[0];
  var trelloToken = getTrello()[1];
  var listJsons = getBoard();
  //var flag = false;
  var chanName = post.channel_name;
  for(var i = 0;i<listJsons.length;i++){
    var listname = listJsons[i].name;
    if(chanName != listname){continue;}
    //Logger.log(chanName +" & "+listname);
    var listID = listJsons[i].id
    var url = 'https://api.trello.com/1/lists/'+ listID + '/cards?key=' + trelloKey + '&token=' + trelloToken;
    var cardRes = UrlFetchApp.fetch(url, {method:'get'});
    var cardJson = JSON.parse(cardRes.getContentText());
    //setLog(cardRes.getContentText());
    var cards = [];
    var color = new Date()
    color = (color.getTime()%16581375).toString(16);
    for(var j = 0;j<cardJson.length;j++){
      var labelLen = cardJson[j].labels.length;
      var card =  {
        "color":color,
        "title": cardJson[j].name,
        "title_link": cardJson[j].url};
      
      //cardJson[j].desc += "_";
      Logger.log(cardJson[j]['desc']);
      if(cardJson[j].desc){card["footer"] = cardJson[j]['desc'];}
      if(labelLen) {
        var text = "　label:"
        for(var k =0;k<labelLen;k++){
          text += cardJson[j].labels[k].name + "，";
        }
        text = text.slice(0,-1);
        card["text"] = text;
      }
      cards.push(card);
    }
    //Logger.log(text);
    var data = {"channel":post.channel_name,"username":"Trello",
            "icon_url":'https://lh3.googleusercontent.com/BBy0R26dYhLeZW5QUJmiw-_jki0MhJeiZw40ay27awnDFBtGbEFFvtPOkyj3odqN7nlIxKB1u4V1QsKQmIwJ=w1309-h648',
            "attachments": cards}
    var options = {
      "method" : "POST",
      "contentType" : "application/json",
      "payload" : JSON.stringify(data)
    };
    UrlFetchApp.fetch(posturl, options);
    return true;
    
  }
  return false;
}

function ListTest(){
  var e = {parameter:{
    token:"HipxC5dIkSC38R7iJQXbuMJi",
    team_id:"T0001",
    team_domain:"例",
    channel_id:"C8TUZHAUC",
    channel_name:"test",
    timestamp:"1355517523.000005",
    user_id:"U2147483697",
    user_name:"スティーブ",
    text:"リスト　test",
    trigger_word:"カード"
  }}
  //Logger.log(e.parameter.trigger_word)
  var url = "https://hooks.slack.com/services/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";
    getList(e.parameter,url);
}
