
class Diablo_Character_Data
{
    constructor(data)
    {
        this.D3_data = data;
        for (let iter in this.D3_data){
            if (iter === "heroes"){
                this.D3_heroes = this.D3_data[iter];
            }
        }
    }
    CharacterMap()
    {
        var characterMap = new Map();
        var charID;
        var charName;
        for (let iter in this.D3_heroes){
            for(let iterator in this.D3_heroes[iter]){
                if (iterator === "id"){
                    charID = this.D3_heroes[iter][iterator];
                }
                else if (iterator === "name"){
                    charName = this.D3_heroes[iter][iterator];
                }
            }
            characterMap.set(charID,charName);
        }
        return characterMap
    }
    LastPlayed()
    {
        var lastTime = [];
        var lastThree;
        for (let iter in this.D3_heroes){
            for(let iterator in this.D3_heroes[iter]){
                if (iterator === "last-updated"){
                    lastTime.push(this.D3_heroes[iter][iterator]);
                }
            }
        }
        lastTime.sort();
        lastThree = lastTime.slice(0,4);
        return lastThree;
    }
    MostPlayed()
    {
        var classMostPlayed;
        var currentMostPlayed;
        var tempClass;
        for (let iter in this.D3_heroes["seasonalProfiles"]["season0"]["timePlayed"]){
            if (iter === "barbarian"){
                classMostPlayed = iter;
                currentMostPlayed = this.D3_heroes["seasonalProfiles"]["season0"]["timePlayed"][iter];
            }
            else{
                tempClass = this.D3_heroes["seasonalProfiles"]["season0"]["timePlayed"][iter];
                if (tempClass >= currentMostPlayed){
                    currentMostPlayed = tempClass;
                    classMostPlayed = iter;
                }
            }
        }
        return classMostPlayed;
    }
}

class HeroData{
    constructor(data){
        this.characterData = data;
    }
    GeneralInfo(){
        var infoList = [];;
        var infoHeaders = [];
        for (let iter in this.characterData){
            if (iter === "kills"){
                infoHeaders.push(iter);
                infoList.push(this.characterData[iter]["elites"]);
            }
            else{
                infoHeaders.push(iter);
                infoList.push(this.characterData[iter]);
            }
        }
        infoList = infoList.slice(0,10);
        infoHeaders = infoHeaders.slice(0,10);
        var retrunArray =[];
        retrunArray.push(infoHeaders);
        retrunArray.push(infoList);
        return retrunArray;
    }
}

const express = require('express');
const app = express();
const fetch = require('node-fetch');
const firebase = require("firebase");
var rawUserData;
var rawHeroData;
var username;

var config = {
    apiKey: "AIzaSyBmZQF4USrZKDDbGlVjx_S4oiIBpPDvnGY",
    authDomain: "swe-project-hw.firebaseapp.com",
    databaseURL: "https://swe-project-hw.firebaseio.com",
    projectId: "swe-project-hw",
    storageBucket: "swe-project-hw.appspot.com",
    messagingSenderId: "382894996954"
};
firebase.initializeApp(config);

var database = firebase.database();

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

app.get('/', function (req,res){
    res.send("Please get your Diablo 3 account's username and number and got to /(your username)-#### ");
});
app.get('/:userid', function (req,res) {
    username = req.params.userid;
    var url = `https://us.api.battle.net/d3/profile/${username}/?locale=en_US&apikey=twqr2eysu74xn7ezw9a68tsf3wyub25x`;
    Promise(fetch(url)
    ).then((res) =>{
        if (res.status >299 || res.status < 200){
            res.send("there was an error getting the data")
        }
        return Promise(res.json())
    }).then((json) => {
        console.log(json);
    })
})
