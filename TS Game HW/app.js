class RValue {
    static randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
class Unit {
}
class Swordsman extends Unit {
    constructor() {
        super(...arguments);
        this.Name = "Warrior";
        this.Health = RValue.randomIntFromInterval(2000, 2500);
        this.Attack = RValue.randomIntFromInterval(20, 30);
        this.Armour = RValue.randomIntFromInterval(100, 150);
    }
}
class Wizard extends Unit {
    constructor() {
        super(...arguments);
        this.Name = "Mage";
        this.Health = RValue.randomIntFromInterval(1000, 1500);
        this.Attack = RValue.randomIntFromInterval(20, 50);
        this.Armour = RValue.randomIntFromInterval(10, 40);
    }
}
class Archer extends Unit {
    constructor() {
        super(...arguments);
        this.Name = "Archer";
        this.Health = RValue.randomIntFromInterval(1500, 2300);
        this.Attack = RValue.randomIntFromInterval(10, 50);
        this.Armour = RValue.randomIntFromInterval(20, 50);
    }
}
class Battlefield {
    Attack(hAttack, toHealth, toArmour) {
        toHealth = toHealth - (hAttack - (toArmour * 0.5));
        return toHealth;
    }
}
function selectorHero(typeHero) {
    switch (typeHero) {
        case "Warrior":
            return new Swordsman();
        case "Mage":
            return new Wizard();
        case "Hunter":
            return new Archer();
    }
}
function startBattle(fP, sP) {
    let battle = new Battlefield();
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
        let $firstPlayer = selectorHero($("#First .active").find('img').attr("alt"));
        let $secondPlayer = selectorHero($("#Second .active").find('img').attr("alt"));
        $firstPlayer.Name += "_One";
        $secondPlayer.Name += "_Two";
        startBattle($firstPlayer, $secondPlayer);
    });
};
//# sourceMappingURL=app.js.map