class RValue {
    public static randomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
abstract class Unit {
    Name: string;
    Health: number;
    Attack: number;
    Armour: number;
}
class Swordsman extends Unit {
    Name = "Warrior";
    Health = RValue.randomIntFromInterval(2000, 2500);
    Attack = RValue.randomIntFromInterval(20, 30);
    Armour = RValue.randomIntFromInterval(100, 150);
}
class Wizard extends Unit {
    Name = "Mage";
    Health = RValue.randomIntFromInterval(1000, 1500);
    Attack = RValue.randomIntFromInterval(20, 50);
    Armour = RValue.randomIntFromInterval(10, 40);
}
class Archer extends Unit {
    Name = "Archer";
    Health = RValue.randomIntFromInterval(1500, 2300);
    Attack = RValue.randomIntFromInterval(10, 50);
    Armour = RValue.randomIntFromInterval(20, 50);
}
 interface IAction {
    Attack(Attack: number, Health: number, Armour: number): number;
}

 class Battlefield implements IAction {
    Attack(hAttack: number, toHealth: number, toArmour: number): number {
        toHealth = toHealth - (hAttack - (toArmour * 0.5));
        return toHealth;
    }
}

function selectorHero(typeHero: string): Unit {
    switch (typeHero) {
        case "Warrior":
            return new Swordsman();
        case "Mage":
            return new Wizard();
        case "Hunter":
            return new Archer();
    }
}

function startBattle(fP: Unit, sP: Unit) {
    let battle: Battlefield = new Battlefield();
    while (true) {
        $("#basicText").append("<strong>" + fP.Name + ": " + fP.Health + "hp<strong/> was attacked by <strong>" + sP.Name + ": " + sP.Health + "hp<strong/> for " + battle.Attack(sP.Attack, fP.Health, fP.Armour) + "damage. <br/><br/>");
        fP.Health -= battle.Attack(sP.Attack, fP.Health, fP.Armour);
        if (fP.Health <= 0) {
            $("#basicText").append("<strong>" + sP.Name + ": " + sP.Health + "hp<strong/> is winner. <br/><br/>");
            break;
        }
        $("#basicText").append("<strong>" + sP.Name + ": " + sP.Health + "hp<strong/> was attacked by <strong>" + fP.Name + ": " + fP.Health + "hp<strong/> for " + battle.Attack(fP.Attack, sP.Health, sP.Armour) + "damage. <br/><br/>");
        sP.Health -= battle.Attack(fP.Attack, sP.Health, sP.Armour);
        if (sP.Health <= 0) {
            $("#basicText").append("<strong>" + fP.Name + ": " + fP.Health + "hp<strong/> is winner. <br/><br/>");
            break;
        }
    }
}

window.onload = () => {

    
    $("#VS").on("click", function () {
        let $firstPlayer: Unit = selectorHero($("#First .active").find('img').attr("alt"));
        let $secondPlayer: Unit = selectorHero($("#Second .active").find('img').attr("alt"));
        $firstPlayer.Name += "_One";
        $secondPlayer.Name += "_Two";
         startBattle($firstPlayer, $secondPlayer);
    })


}