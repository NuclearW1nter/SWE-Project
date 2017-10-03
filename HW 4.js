
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
    }
}

