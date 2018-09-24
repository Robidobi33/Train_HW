$(document).ready(function(){
   
    var name;
    var destination;
    var trainTime;
    var frequency;

    var config = {
        apiKey: "AIzaSyBNVZSddXwLBRbAcf9FpuKBh8_r2uJMEps",
        authDomain: "time-sheet-2e404.firebaseapp.com",
        databaseURL: "https://time-sheet-2e404.firebaseio.com",
        projectId: "time-sheet-2e404",
        storageBucket: "time-sheet-2e404.appspot.com",
        messagingSenderId: "886690277650"
      };
    
      firebase.initializeApp(config);
      var database = firebase.database();  

    $("#fml").on("click", function(event){
        event.preventDefault();
       
        name = $("#nameInput").val().trim();
        destination = $("#destInput").val().trim();
        trainTime = $("#timeInput").val().trim();
        frequency = $("#freqInput").val().trim();
        
        var newTr = $("<tr>");
        var newTdName = $("<td>");
        var newTdDest = $("<td>");
        var newTdTime = $("<td>");
        var newTdFreq = $("<td>");
        var newTdMin = $("<td>");

        newTdName.text(name);
        newTdDest.text(destination);
        newTdFreq.text(frequency);
        newTdTime.text(trainTime);
        newTdMin.text(minAway);

        newTr.append(newTdName, newTdDest, newTdFreq, newTdTime, minAway);
        $("#aTable").append(newTr);
        $("#nameInput").val("");
        $("#destInput").val("");
        $("#timeInput").val("");
        $("#freqInput").val("");
        $("#minAway").val("");

        database.ref().set({
            name: name,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency,
        });

        var timeRemainder = moment().diff(moment.unix(newTdTime), "minutes") % newTdFreq ;
		var minutes = newTdFreq - timeRemainder;

		var minAway = moment().add(minutes, "m").format("hh:mm A"); 

   });

});


