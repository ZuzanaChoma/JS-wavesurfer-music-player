var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'black',
  progressColor: 'purple',
  responsive: true
});



function LoadAudio() {


	var x = document.getElementById("file");
    for (var i = 0; i < x.files.length; i++) {
    	
    	song_name=x.files[i]["name"];

        var song_blob = URL.createObjectURL(x.files[i]); //blob to test offline, online should work without blob
    };
    wavesurfer.load(song_blob);
    GetContent(song_blob,song_name);
}

function GetContent(blob,song){ // can they have the same name ad a passing variables?

	var song_id = song.replace(/\s/g, "");
	var element = "<li id='" + song_id +"' onclick=SongReady('"+ song_id + "','"+ blob +"')>" + song_id + "</li><button id= 'delete_btn' onclick=RemoveSong('" + song_id + "')>Delete</button> <button id= 'add_to_play_btn' onclick=AddToPlay('"+ song_id + "','"+ blob +"')>Add to playlist</button>"; //passing as string instead of variable-fix it

	document.getElementById("current_content").innerHTML += element; //displays songs name, also in current content and shows waveform
	document.getElementById("song_name").innerHTML = song;

}

function SongReady(song_id,blob){

	document.getElementById("song_name").innerHTML = song_id;
	wavesurfer.load(blob);
	console.log(song_id);

}

function RemoveSong(itemid){

	var list = document.getElementById("current_content") //removes names and waveform of deleted song
	var item = document.getElementById(itemid);
	var btn_del = document.getElementById("delete_btn");
	var btn_pst = document.getElementById("add_to_play_btn");
   
    list.removeChild(item); //once you delete a song you cant added it again, because of the same id??
    btn_del.parentNode.removeChild(btn_del);
    btn_pst.parentNode.removeChild(btn_pst);
    wavesurfer.empty();
    document.getElementById("song_name").innerHTML = "";
}

function RemoveSongPlaylist(itemid){

	var list = document.getElementById("playlist_content") 
	var item = document.getElementById(itemid);
	var btn_plst_del = document.getElementById("delete_plst_btn");
   
    list.removeChild(item); 
    btn_plst_del.parentNode.removeChild(btn_plst_del);
    wavesurfer.empty();
}

function AddToPlay(song_id,blob){

	plst_song_id = song_id + "plst";
	console.log(plst_song_id)

	var element = "<li id='" + plst_song_id +"' onclick=SongReady('"+ song_id + "','"+ blob +"')>" + song_id + "</li><button id= 'delete_plst_btn' onclick=RemoveSongPlaylist('" + plst_song_id + "')>Delete</button>";
	document.getElementById("playlist_content").innerHTML += element;
}


function MakeVisible(list_id, hide_id) {
	console.log(list_id);
	var list = document.getElementById(list_id);
	var hide_list = document.getElementById(hide_id);
	if (list.style.display === "none") {
        list.style.display = "block";
    } else {
        list.style.display = "block";
    }

    hide_list.style.display = "none";

}

