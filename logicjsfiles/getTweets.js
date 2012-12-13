

var getTweets=function(){}

$(document).ready(function() {
	//alert('ss');
	
	window.getTweets1=new getTweets();

	$('#calTab').on('pagebeforeshow',function(){
		
	

		window.getTweets1.getDispTweets();

	})
	

});

getTweets.prototype.getDispTweets=function(){

	var searchterm;
	var campusName=window.masterInfo1.campusName;
	if(campusName==='carnegie mellon university'){
		searchterm='cmu party';
	}
	else if (campusName==='berkeley college'){
		searchterm='berkeley party';
	}
	else if (campusName==='michigan university'){
		searchterm='michigan university';
	}
	else {
		searchterm='chicago university';
	}
   
    String.prototype.linkify=function(){
              return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&;\?\/.=]+/g,function(m){
                return m.link(m);
              });
            }
    
    var url= "http://search.twitter.com/search.json?q="+
        searchterm + 
        "&rpp=4&callback=?";
    $.getJSON( url, function( data ) {
      $("#outputTwitter").empty();

      console.log('here2');

      var counter=0;
        $(data.results).each(function(i,v){
          if (counter<8){
	            this.text = this.text.linkify();
	           
	           //var tweet='<div class="tweet"><div class="tweet-left"><a target="_blank" href="http://twitter.com/'+this.from_user+'"><img width="48" height="48" alt="'+this.from_user+' on Twitter" src="'+this.profile_image_url+'" /></a></div><div class="tweet-right"><p class="text">'+this.text+'</p></div><br style="clear: both;" /></div>';
	            console.log(v);
	            var mainTweetdiv=$('<div class="tweet"></div>')
	            var tweetleft=$('<div class="tweet-left"></div>');
	            var tweetuseridurl=$('<a></a>');
	            tweetuseridurl.attr('href',"http://twitter.com/"+this.from_user);

	            var tweeterImage=$('<img>');
	            tweeterImage.attr('width',55);
	            tweeterImage.attr('height',55);
	            tweeterImage.attr('src',this.profile_image_url);

	            tweetleft.append(tweetuseridurl);
	            tweetleft.append(tweeterImage);

	            var tweetRight=$('<div class="commenterComment">'+this.text+'</div><br style="clear: both;"/>');
	            
	            mainTweetdiv.append(tweetleft);
	            mainTweetdiv.append(tweetRight);

	            counter+=1
	            
	            $('#outputTwitter').append(mainTweetdiv);
            }
        });
    });
}
