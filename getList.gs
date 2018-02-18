function getList(post,app) {
  var trelloKey = getTrello()[0];
  var trelloToken = getTrello()[1];
  var listJsons = getBoard();
  //var flag = false;
  var inName = post.channel_name;
  for(var i = 0;i<listJsons.length;i++){
    var listname = listJsons[i].name;
    if(inName == listname){
      //Logger.log(inName +" & "+listname);
      var listID = listJsons[i].id
      var url = 'https://api.trello.com/1/lists/'+ listID + '/cards?key=' + trelloKey + '&token=' + trelloToken;
      var cardRes = UrlFetchApp.fetch(url, {method:'get'});
      var cardJson = JSON.parse(cardRes.getContentText());
      //setLog(cardRes.getContentText());
      var text = "";
      for(var j = 0;j<cardJson.length;j++){
        var cardname = cardJson[j].name
        //var cardID = cardJson[j].id
        var labelLen = cardJson[j].labels.length;
        text += cardname + '\n';
        if(labelLen) {
          text = text.slice(0,-1);
          text += "　━ label:"
          for(var k =0;k<labelLen;k++){
            text += cardJson[j].labels[k].name + "，";
          }
          text = text.slice(0,-1);
          text += '\n'; 
        }
      }
      //Logger.log(text);
      app.postMessage(post.channel_id, text, {
        username: "Trello",
        icon_url: "https://lh3.googleusercontent.com/BBy0R26dYhLeZW5QUJmiw-_jki0MhJeiZw40ay27awnDFBtGbEFFvtPOkyj3odqN7nlIxKB1u4V1QsKQmIwJ=w1309-h648"
      });
      return true;
    }
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
  var token = PropertiesService.getScriptProperties().getProperty('Slack_Token');
  var app = SlackApp.create(token);
  getList(e.parameter,app);
}
